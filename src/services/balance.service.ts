import decreaseBalanceByUserID from '../repositories/user.repository';
import { BadRequest, NotFound } from '../http-errors';

const decreaseUserBalance = async (userId: number, amount: number) => {
  try {
    const [count, newBalance] = await decreaseBalanceByUserID(userId, amount);

    if (!count) throw new NotFound('User not found');

    return newBalance;
  } catch (e: any) {
    if (
      e.message.indexOf(
        '"users" violates check constraint "users_balance_check"',
      ) > -1
    )
      throw new BadRequest('Insufficient funds');

    throw e;
  }
};

export default decreaseUserBalance;
