import sequelize from '../db/db';
import { initUserModel } from './user.model';
import { initCronLockModel } from './cron-lock.model';
import { initCronHistoryModel } from './cron-history.model';
import { initCronWorkerModel } from './cron-worker.model';

export default function initModels() {
  initUserModel(sequelize);
  initCronLockModel(sequelize);
  initCronHistoryModel(sequelize);
  initCronWorkerModel(sequelize);
}
