import {
  CreationOptional,
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
  declare id: CreationOptional<number>;

  declare task: string;

  declare server: string;

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
