import sequelize from '../db/db';
import { initUserModel } from './user.model';

initUserModel(sequelize);
