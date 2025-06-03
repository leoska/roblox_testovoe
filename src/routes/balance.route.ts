import { Router } from 'express';
import decreaseBalance from '../controllers/balance.controller';
import validate from '../middlewares/validate.middleware';

const balanceRoute = Router();

const decreaseBalanceParamsValidator = validate({
  params: params => {
    const isIntegerString = (value: any) => /^\d+$/.test(value);

    if (!params.id) return 'id is required';

    if (!isIntegerString(params.id)) return 'id param must be a integer';

    const id = parseInt(params.id, 10);

    if (id < 1) return 'id param must be greater than 0';

    return null;
  },
});

balanceRoute.post(
  '/user/:userId/balance/decrease',
  decreaseBalanceParamsValidator,
  decreaseBalance,
);

export default balanceRoute;
