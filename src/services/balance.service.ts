import sequelize from '../db/db';
import getUserById from '../repositories/user.repository';

const decreaseUserBalance = async (userId: number, amount: number) =>
  sequelize.transaction(async t => {
    const user = await getUserById(userId, t);
    if (!user) throw new Error('User not found');

    const newBalance = user.balance - amount;
    if (newBalance < 0) throw new Error('Insufficient funds');

    user.balance = newBalance;
    await user.save({ transaction: t });

    return newBalance;
  });

export default decreaseUserBalance;
