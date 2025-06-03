import { Sequelize } from 'sequelize';

export default new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'roblox_test',
  logging: false,
  pool: {
    max: 50,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    statement_timeout: 5000,
  },
});
