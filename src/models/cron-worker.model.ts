import { DataTypes, Model, Sequelize } from 'sequelize';

class CronWorker extends Model {
  declare server: string;

  declare count_tasks: number;
}

export const initCronWorkerModel = (sequelize: Sequelize) => {
  CronWorker.init(
    {
      server: { type: DataTypes.STRING, primaryKey: true },
      count_tasks: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'CronWorker',
      tableName: 'cron_worker',
      timestamps: true,
    },
  );
};

export default CronWorker;
