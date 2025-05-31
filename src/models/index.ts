import sequelize from '../db/db';
import { initUserModel } from './User.model';

initUserModel(sequelize);
