import sequelize from '../db/db';
import { initUserModel } from './user.model';
import { initCronModel } from './cron.model';

export default function initModels() {
  initUserModel(sequelize);
  initCronModel(sequelize);
}
