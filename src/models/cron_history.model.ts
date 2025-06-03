import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

class CronHistory extends Model<
  InferAttributes<CronHistory>,
  InferCreationAttributes<CronHistory>
> {
  declare task: string;

  declare server: string;

  declare started_at: Date;

  declare finished_at: Date;
}

export const initCronHistoryModel = (sequelize: Sequelize) => {
  CronHistory.init(
    {
      name: { type: DataTypes.STRING, primaryKey: true },
      locked_by: DataTypes.STRING,
      locked_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'CronHistory',
      tableName: 'cron_history',
      timestamps: false,
    },
  );
};

export default Cron;
