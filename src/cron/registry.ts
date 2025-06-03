import { ICronTask } from './base.task';

const DEFAULT_CRON_TIMEOUT_MS = process.env.CRON_TIMEOUT_MS
  ? parseInt(process.env.CRON_TIMEOUT_MS, 10)
  : 10000;

export class CronRegistry {
  private static tasks = new Map<string, ICronTask>();

  static register(task: ICronTask) {
    if (this.tasks.has(task.name)) {
      throw new Error(`Task ${task.name} already registered`);
    }
    this.tasks.set(task.name, task);
  }

  static getTasks() {
    return this.tasks;
  }
}

export function CronTask({
  name,
  intervalMs,
  timeoutMs,
}: {
  name: string;
  intervalMs: number;
  timeoutMs?: number;
}) {
  return function decorator(
    _target: any,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    if (!descriptor || typeof descriptor.value !== 'function') {
      throw new Error(`@CronTask can only be applied to methods`);
    }

    CronRegistry.register({
      name,
      intervalMs,
      timeoutMs: timeoutMs || DEFAULT_CRON_TIMEOUT_MS,
      handler: descriptor.value,
    });
  };
}
