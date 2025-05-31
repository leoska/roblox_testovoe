import { Umzug, SequelizeStorage } from 'umzug';
import sequelize from './db';

export const umzug = new Umzug({
  migrations: {
    glob: 'src/migrations/*.ts',
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export type Migration = typeof umzug._types.migration;
