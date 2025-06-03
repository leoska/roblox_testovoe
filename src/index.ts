import sequelize from './db/db';
import app from './app';
import { umzug } from './db/umzug';

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    await umzug.up();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Startup error:', err);
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
  }
})();
