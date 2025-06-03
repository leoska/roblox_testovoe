import CronLock from '../models/cron-lock.model';
import { Transaction } from 'sequelize';

export const getAllCronLocks = () => CronLock.findAll();

export const findOrCreateCronLock = async (
  name: string,
  locked_by: string,
  locked_at: Date,
  transaction?: Transaction,
): Promise<[CronLock, boolean]> => {
  const [cronLock, created] = await CronLock.findOrCreate({
    where: { name },
    defaults: {
      locked_by,
      locked_at,
    },
    lock: transaction ? transaction.LOCK.UPDATE : undefined,
  });

  return [cronLock, created];
};

export const updateCronLock = async (
  cronLock: CronLock,
  locked_by: string,
  locked_at: Date,
) => cronLock.update({ locked_by, locked_at });
