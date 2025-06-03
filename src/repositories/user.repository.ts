import { Transaction } from 'sequelize';
import { User } from '../models/user.model';

const getUserById = async (id: number, transaction?: Transaction) =>
  User.findByPk(id, {
    transaction,
    lock: transaction ? transaction.LOCK.UPDATE : undefined,
  });

export default getUserById;
