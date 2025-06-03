import { Request, Response } from 'express';
import decreaseUserBalance from '../services/balance.service';

const decreaseBalance = async (
  req: Request<{ userId: string }>,
  res: Response,
) => {
  const { userId } = req.params;
  const { amount } = req.body;

  try {
    const balance = await decreaseUserBalance(parseInt(userId, 10), amount);
    res.json({ success: true, balance });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default decreaseBalance;
