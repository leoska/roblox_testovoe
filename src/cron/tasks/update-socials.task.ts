import { CronTask } from '../registry';
import logger from '../../logger';
import BaseTask from '../base.task';

// eslint-disable-next-line import-x/prefer-default-export
export class UpdateSocialsTask extends BaseTask {
  @CronTask({
    name: 'update-socials',
    intervalMs: 4 * 1000,
  })
  static async run() {
    logger.info('Update socials...');
    await new Promise(resolve => {
      setTimeout(resolve, 20 * 60 * 1000);
    });
  }
}
