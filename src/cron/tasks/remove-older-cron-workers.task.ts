import { CronTask } from '../registry';
import logger from '../../logger';
import BaseTask from '../base.task';
import { removeOlderWorkers } from '../../repositories/cron-worker.repository';

// eslint-disable-next-line import-x/prefer-default-export
export class RemoveOlderCronWorkersTask extends BaseTask {
  @CronTask({
    name: 'remove-older-cron-workers',
    intervalMs: 60 * 60 * 1000,
  })
  static async run() {
    logger.info('Removing older cron workers...');
    const count = await removeOlderWorkers();
    logger.info(`Removing ${count} older cron workers`);
  }
}
