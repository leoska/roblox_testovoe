import { Transaction } from 'sequelize';
import { User } from '../models/user.model';

export const getUserById = async (id: number, transaction?: Transaction) =>
  User.findByPk(id, {
    transaction,
    lock: transaction ? transaction.LOCK.UPDATE : undefined,
  });

export const updateUserBalance = async (
  user: User,
  newBalance: number,
  transaction?: Transaction,
) => {
  user.balance = newBalance;
  await user.save({ transaction });
  return user;
};
