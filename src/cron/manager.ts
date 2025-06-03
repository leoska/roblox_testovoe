import uuidv4 from '../uuidv4';
import { CronRegistry } from './registry';
import logger from '../logger';
import path from 'node:path';
import * as fs from 'node:fs';
import {
  findOrCreateCronLock,
  updateCronLock,
} from '../repositories/cron-lock.repository';
import sequelize from '../db/db';
import { ICronTask } from './base.task';
import cronHistoryCreate from '../repositories/cron-history.repository';
import AbortError from './abort.error';

enum CronTaskStatus {
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  ABORTED = 'ABORTED',
}

const FORK_ID = uuidv4();

async function loadCronTasks() {
  const tasksDir = path.join(__dirname, 'tasks');

  const files = fs.readdirSync(tasksDir).filter(file => file.endsWith('.ts'));

  for (const file of files) {
    const fullPath = path.join(tasksDir, file);
    await import(fullPath);
  }
}

export default function startCronManager() {
  loadCronTasks().then(() =>
    CronRegistry.getTasks().forEach(task => {
      setInterval(() => tryRunTask(task), task.intervalMs);
    }),
  );
}

async function tryRunTask({ name, timeoutMs, handler }: ICronTask) {
  const now = new Date();

  const canRunCronTask = await sequelize.transaction(async transaction => {
    const [cronLock, created] = await findOrCreateCronLock(
      name,
      FORK_ID,
      now,
      transaction,
    );

    if (created) return true;

    const lockAge = now.getTime() - cronLock.locked_at.getTime();

    logger.info(
      `Cron ${name} is locked. Age: ${lockAge}ms, ${cronLock.locked_at.getTime()}, ${now.getTime()}`,
    );

    if (lockAge < timeoutMs) return false;

    await updateCronLock(cronLock, FORK_ID, now);
    return true;
  });

  if (!canRunCronTask) return;

  const controller = new AbortController();
  const timeoutID = setTimeout(() => controller.abort(), timeoutMs);
  let cronStatus = CronTaskStatus.COMPLETED;
  const started_at = new Date();

  try {
    await new Promise(async (resolve, reject) => {
      if (controller.signal.aborted) return reject(new AbortError('Aborted'));

      controller.signal?.addEventListener('abort', () => {
        clearTimeout(timeoutID);
        reject(new AbortError('Aborted'));
      });

      await handler();
      resolve(undefined);
    });

    logger.info(`Cron ${name} completed`);
  } catch (error: any) {
    if (error instanceof AbortError) {
      cronStatus = CronTaskStatus.ABORTED;
    } else {
      cronStatus = CronTaskStatus.FAILED;
    }

    logger.error(`Cron error ${name}:`, error);
  }

  clearTimeout(timeoutID);
  const finished_at = new Date();

  await cronHistoryCreate({
    task: name,
    server: FORK_ID,
    status: cronStatus,
    started_at,
    finished_at,
  });
}
