import { QueryInterface } from 'sequelize';
import type { Migration } from '../db/umzug';

export const up: Migration = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}) => {
  await queryInterface.bulkInsert('users', [
    {
      balance: 10000,
    },
  ]);
};

export const down: Migration = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}) => {
  await queryInterface.sequelize.query(
    'TRUNCATE TABLE users RESTART IDENTITY CASCADE',
  );
};
