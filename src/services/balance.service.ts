import decreaseBalanceByUserID from '../repositories/user.repository';

const decreaseUserBalance = async (userId: number, amount: number) => {
  const [count, newBalance] = await decreaseBalanceByUserID(userId, amount);

  if (count === 0) throw new Error('Insufficient funds');

  return newBalance;
};

export default decreaseUserBalance;
