import { Router } from 'express';
import getListTasks from '../controllers/cron.controller';

const cronRoute = Router();

cronRoute.get('/cron/list', getListTasks);

export default cronRoute;
