import sequelize from './db/db';
import app from './app';
import logger from './logger';
import startCronManager from './cron/manager';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

export default async function processFork() {
  try {
    await sequelize.authenticate();
    logger.info('Database connected');

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      startCronManager();
    });
  } catch (err) {
    logger.error('Startup error:', err);
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
  }
}
