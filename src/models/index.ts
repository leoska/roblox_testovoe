import sequelize from '../db/db';
import { initUserModel } from './user.model';
import { initCronModel } from './cron.model';
import { initCronHistoryModel } from './cron_history.model';

export default function initModels() {
  initUserModel(sequelize);
  initCronModel(sequelize);
  initCronHistoryModel(sequelize);
}
