import { User } from '../models/user.model';
import sequelize from '../db/db';

const decreaseBalanceByUserID = async (id: number, amount: number) => {
  const [count, [updated]] = await User.update(
    { balance: sequelize.literal(`balance - ${amount}`) },
    {
      where: {
        id,
      },
      returning: true,
    },
  );

  return [count, count ? updated.balance : undefined];
};

export default decreaseBalanceByUserID;
