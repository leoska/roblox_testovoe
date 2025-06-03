import { Router } from 'express';
import decreaseBalance from '../controllers/balance.controller';

const cronRoute = Router();

cronRoute.get('/cron/list', decreaseBalance);

export default cronRoute;
