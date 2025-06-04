import { Op, literal } from 'sequelize';
import CronWorker from '../models/cron-worker.model';

export const cronWorkerCreate = (server: string) =>
  CronWorker.create({
    server,
  });

export const getAllCronWorkers = () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  return CronWorker.findAll({
    order: [[literal('count_tasks'), 'DESC']],
    where: {
      updatedAt: {
        [Op.gte]: oneHourAgo,
      },
    },
  });
};

export const increaseTaskInCronWorker = async (server: string) =>
  CronWorker.increment('count_tasks', { where: { server } });

export const decreaseTaskInCronWorker = async (server: string) =>
  CronWorker.increment('count_tasks', { where: { server } });

export const removeOlderWorkers = async () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  return CronWorker.destroy({
    where: {
      updatedAt: {
        [Op.lt]: oneHourAgo,
      },
    },
  });
};
