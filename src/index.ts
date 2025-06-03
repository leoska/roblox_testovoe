import cluster from 'node:cluster';
import sequelize from './db/db';
import { umzug } from './db/umzug';
import processMaster from './master';
import processFork from './fork';
import logger from './logger';

(async () => {
  if (cluster.isPrimary) {
    logger.info('Trying to connect to database for up migrations...');
    await sequelize.authenticate();

    logger.info('Trying to apply migrations...');
    await umzug.up();

    processMaster();
    return;
  }

  await processFork();
})();
