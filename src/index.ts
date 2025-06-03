import cluster, { Worker } from 'node:cluster';
import sequelize from './db/db';
import app from './app';
import { umzug } from './db/umzug';
import processMaster from './master';

(async () => {
  console.log('Trying to connect to database for up migrations...');
  await sequelize.authenticate();

  console.log('Trying to apply migrations...');
  await umzug.up();

  processMaster();
})();

if (cluster.isPrimary) {
  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

  process.once('SIGINT', async () => {
    try {
      await Promise.race([app.stop(), timeout(EXIT_MAX_WAIT)]);

      logger.info('Application successfully stopped.');
      process.exit(0);
    } catch (e) {
      logger.error(`Application can't stop correct: ${e}`);
      process.exit(1);
    }
  });
}
