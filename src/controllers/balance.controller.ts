import { Request, Response } from 'express';
import { updateUserBalance } from '../services/balance.service';

const decreaseBalance = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;

  try {
    const balance = await updateUserBalance(userId, amount);
    res.json({ success: true, balance });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default decreaseBalance;
