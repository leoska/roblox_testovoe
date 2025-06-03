import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

class Cron extends Model<InferAttributes<Cron>, InferCreationAttributes<Cron>> {
  declare name: string;

  declare locked_by: string;

  declare locked_at: Date;
}

export const initCronModel = (sequelize: Sequelize) => {
  Cron.init(
    {
      name: { type: DataTypes.STRING, primaryKey: true },
      locked_by: DataTypes.STRING,
      locked_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Cron',
      tableName: 'cron_locks',
      timestamps: false,
    },
  );
};

export default Cron;
