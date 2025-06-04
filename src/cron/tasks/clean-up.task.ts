import { CronTask } from '../registry';
import logger from '../../logger';
import BaseTask from '../base.task';

// eslint-disable-next-line import-x/prefer-default-export
export class CleanUpTask extends BaseTask {
  @CronTask({
    name: 'cleanup-temp',
    intervalMs: 3 * 1000,
  })
  static async run() {
    logger.info('Cleaning temp files...');
    await new Promise(resolve => {
      setTimeout(resolve, 20 * 60 * 1000);
    });
  }
}
