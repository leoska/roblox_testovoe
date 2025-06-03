import { Request, Response } from 'express';
import getAllRunningTasks from '../services/cron.service';

const getListTasks = async (_req: Request, res: Response) => {
  res.json(await getAllRunningTasks());
};

export default getListTasks;
