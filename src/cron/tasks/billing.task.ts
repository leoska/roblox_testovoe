import { CronTask } from '../registry';
import logger from '../../logger';
import BaseTask from '../base.task';

export class BillingTask extends BaseTask {
  @CronTask({
    name: 'billing',
    intervalMs: 7 * 1000,
  })
  static async run() {
    logger.info('Start calculate a billing reports...');
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
  }
}
