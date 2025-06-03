import { getAllCronLocks } from '../repositories/cron-lock.repository';
import { CronRegistry } from '../cron/registry';

type TaskInfo = {
  task: string;
  running: boolean;
  server: string | null;
  seconds_since_start: number | null;
};

const getAllRunningTasks = async () => {
  const locks = await getAllCronLocks();
  const now = Date.now();

  const result: TaskInfo[] = [];

  CronRegistry.getTasks().forEach(task => {
    const lock = locks.find(l => l.name === task.name);
    const lockedBy = lock?.locked_by ?? null;
    const lockedAt = lock?.locked_at ? new Date(lock.locked_at) : null;
    const ageMs = lockedAt ? now - lockedAt.getTime() : null;

    result.push({
      task: task.name,
      running: !!lockedAt,
      server: lockedBy,
      seconds_since_start: ageMs ? Math.floor(ageMs / 1000) : null,
    });
  });

  return result;
};

export default getAllRunningTasks;
