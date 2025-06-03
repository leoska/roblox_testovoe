import { Router } from 'express';
import decreaseBalance from '../controllers/balance.controller';
import validate from '../middlewares/validate.middleware';

const balanceRoute = Router();

const decreaseBalanceParamsValidator = validate({
  params: params => {
    const isIntegerString = (value: any) => /^\d+$/.test(value);

    if (!params.userId) return 'userId is required';

    if (!isIntegerString(params.userId))
      return 'userId param must be a integer';

    const userId = parseInt(params.userId, 10);

    if (userId < 1) return 'userId param must be greater than 0';

    return null;
  },
  body: body => {
    if (!body.amount) return 'amount is required';

    if (!Number.isInteger(body.amount)) return 'amount must be a integer';

    if (body.amount < 1) return 'userId param must be greater than 0';

    return null;
  },
});

balanceRoute.post(
  '/user/:userId/balance/decrease',
  decreaseBalanceParamsValidator,
  decreaseBalance,
);

export default balanceRoute;
