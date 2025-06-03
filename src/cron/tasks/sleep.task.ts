import { CronTask } from '../registry';
import logger from '../../logger';
import BaseTask from '../base.task';

export class SleepTask extends BaseTask {
  @CronTask({
    name: 'sleep',
    intervalMs: 5 * 1000,
  })
  static async run() {
    logger.info('Just sleeping 2 minutes...');
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
  }
}
