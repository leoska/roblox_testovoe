import { CronTask } from '../registry';
import logger from '../../logger';
import BaseTask from '../base.task';

export class UpdateSocialsTask extends BaseTask {
  @CronTask({
    name: 'update-socials',
    intervalMs: 4 * 1000,
  })
  static async run() {
    logger.info('Update socials...');
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
  }
}
