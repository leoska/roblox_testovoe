import { Request, Response } from 'express';
import decreaseUserBalance from '../services/balance.service';

const decreaseBalance = async (
  req: Request<{ userId: string }>,
  res: Response,
) => {
  const { userId } = req.params;
  const { amount } = req.body;

  try {
    const parsedUserId = parseInt(userId, 10);
    const balance = await decreaseUserBalance(parsedUserId, amount);
    res.json({ success: true, balance });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

export default decreaseBalance;
