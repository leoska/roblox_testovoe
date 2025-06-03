import { CronTask } from '../registry';
import logger from '../../logger';
import BaseTask from '../base.task';

export class UpdateCdnTask extends BaseTask {
  @CronTask({
    name: 'update-cdn',
    intervalMs: 6 * 1000,
  })
  static async run() {
    logger.info('How we start update a cdn...');
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
  }
}
