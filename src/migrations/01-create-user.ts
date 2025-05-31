import { QueryInterface, DataTypes } from 'sequelize';
import type { Migration } from '../db/umzug';

export const up: Migration = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}) => {
  await queryInterface.createTable('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
  });
};

export const down: Migration = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}) => {
  await queryInterface.dropTable('users');
};
