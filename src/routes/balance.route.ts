import { Router } from 'express';
import decreaseBalance from '../controllers/balance.controller';

const balanceRoute = Router();

balanceRoute.post('/user/balance/decrease', decreaseBalance);

export default balanceRoute;
