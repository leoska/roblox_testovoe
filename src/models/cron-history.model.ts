import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export interface CronHistoryAttributes {
  task: string;
  server: string;
  status: string;
  started_at: Date;
  finished_at: Date;
}

class CronHistory extends Model<
  InferAttributes<CronHistory>,
  InferCreationAttributes<CronHistory>
> {
  declare id: CreationOptional<number>;

  declare task: string;

  declare server: string;

  declare status: string;

  declare started_at: Date;

  declare finished_at: Date;
}

export const initCronHistoryModel = (sequelize: Sequelize) => {
  CronHistory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      task: DataTypes.STRING,
      server: DataTypes.STRING,
      status: DataTypes.STRING,
      started_at: DataTypes.DATE,
      finished_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'CronHistory',
      tableName: 'cron_history',
      timestamps: false,
    },
  );
};

export default CronHistory;
