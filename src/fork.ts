import sequelize from './db/db';
import { umzug } from './db/umzug';
import app from './app';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Startup error:', err);
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
  }
})();
