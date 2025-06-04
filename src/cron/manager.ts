import path from 'node:path';
import { readdir } from 'node:fs/promises';
import uuidv4 from '../uuidv4';
import { CronRegistry } from './registry';
import logger from '../logger';
import {
  deleteCronLock,
  findOrCreateCronLock,
  updateCronLock,
} from '../repositories/cron-lock.repository';
import sequelize from '../db/db';
import { ICronTask } from './base.task';
import cronHistoryCreate from '../repositories/cron-history.repository';
import AbortError from './abort.error';
import {
  cronWorkerCreate,
  decreaseTaskInCronWorker,
  getAllCronWorkers,
  increaseTaskInCronWorker,
} from '../repositories/cron-worker.repository';

enum CronTaskStatus {
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  ABORTED = 'ABORTED',
}

const FORK_ID = uuidv4();

async function loadCronTasks() {
  const tasksDir = path.join(__dirname, 'tasks');

  const files = (await readdir(tasksDir)).filter(file => file.endsWith('.ts'));

  const imports: Promise<typeof import('./base.task')>[] = [];

  files.forEach(file => {
    const fullPath = path.join(tasksDir, file);
    imports.push(import(fullPath));
  });

  await Promise.all(imports);
}

async function checkCurrectRunningTasks() {
  const workers = await getAllCronWorkers();

  let pos = -1;
  for (let i = 0; i < workers.length; i += 1) {
    const worker = workers[i];

    if (worker.server === FORK_ID) {
      pos = i;
      break;
    }
  }

  if (pos === -1) {
    throw new Error('Cron worker not found in cron_worker.');
  }

  return pos === workers.length - 1;
}

// Ничего умнее не придумал, как законстылить бесконечную потерю -3 часа. Хотя время складывается без часового пояса...
function getFixedDate(timestamp: number) {
  return timestamp + 180 * 60 * 1000;
}

async function tryRunTask({ name, timeoutMs, handler }: ICronTask) {
  if (!(await checkCurrectRunningTasks())) return;

  const now = new Date();

  const canRunCronTask = await sequelize.transaction(async transaction => {
    const [cronLock, created] = await findOrCreateCronLock(
      name,
      FORK_ID,
      now,
      transaction,
    );

    if (created) return true;

    const lockAge = now.getTime() - getFixedDate(cronLock.locked_at.getTime());

    if (lockAge < timeoutMs) return false;

    await updateCronLock(cronLock, FORK_ID, now);
    return true;
  });

  if (!canRunCronTask) return;

  await increaseTaskInCronWorker(FORK_ID);

  const controller = new AbortController();
  const timeoutID = setTimeout(() => controller.abort(), timeoutMs);
  let cronStatus = CronTaskStatus.COMPLETED;
  const startedAt = new Date();

  try {
    await new Promise<void>((resolve, reject) => {
      if (controller.signal.aborted) {
        reject(new AbortError('Aborted'));
        return;
      }

      controller.signal?.addEventListener('abort', () => {
        clearTimeout(timeoutID);
        reject(new AbortError('Aborted'));
      });

      handler()
        .then(() => resolve())
        .catch(reject);
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
  const finishedAt = new Date();

  await cronHistoryCreate({
    task: name,
    server: FORK_ID,
    status: cronStatus,
    started_at: startedAt,
    finished_at: finishedAt,
  });

  await decreaseTaskInCronWorker(FORK_ID);

  const deletedCount = await deleteCronLock(name, FORK_ID);
  if (!deletedCount) {
    throw new Error(
      `Something went wrong: Cron ${name} lock not found after successfully completed.`,
    );
  }
}

export default function startCronManager() {
  loadCronTasks().then(async () => {
    await cronWorkerCreate(FORK_ID);

    CronRegistry.getTasks().forEach(task => {
      setInterval(() => tryRunTask(task), task.intervalMs);
    });
  });
}
