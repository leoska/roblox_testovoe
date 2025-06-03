import { DataTypes, Model, Sequelize } from 'sequelize';

class CronLock extends Model {
  declare name: string;

  declare locked_by: string;

  declare locked_at: Date;
}

export const initCronLockModel = (sequelize: Sequelize) => {
  CronLock.init(
    {
      name: { type: DataTypes.STRING, primaryKey: true },
      locked_by: DataTypes.STRING,
      locked_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'CronLock',
      tableName: 'cron_locks',
      timestamps: false,
    },
  );
};

export default CronLock;
