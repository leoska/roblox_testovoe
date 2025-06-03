import { Op } from 'sequelize';
import { User } from '../models/user.model';
import sequelize from '../db/db';

const decreaseBalanceByUserID = async (id: number, amount: number) => {
  const [count, [updated]] = await User.update(
    { balance: sequelize.literal(`balance - ${amount}`) },
    {
      where: {
        id,
        balance: { [Op.gte]: amount },
      },
      returning: true,
    },
  );

  return [count, updated.balance];
};

export default decreaseBalanceByUserID;
