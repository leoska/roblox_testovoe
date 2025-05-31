import { sequelize } from '../config/database';
import * as userRepo from '../repositories/user.repository';

export const updateUserBalance = async (userId: number, amount: number) =>
  sequelize.transaction(async t => {
    const user = await userRepo.getUserById(userId, t);
    if (!user) throw new Error('User not found');

    const newBalance = user.balance + amount;
    if (newBalance < 0) throw new Error('Insufficient funds');

    await userRepo.updateUserBalance(user, newBalance, t);

    return newBalance;
  });
