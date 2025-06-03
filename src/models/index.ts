import sequelize from '../db/db';
import { initUserModel } from './user.model';
import { initCronLockModel } from './cron-lock.model';
import { initCronHistoryModel } from './cron-history.model';

export default function initModels() {
  initUserModel(sequelize);
  initCronLockModel(sequelize);
  initCronHistoryModel(sequelize);
}
