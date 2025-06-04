import { Transaction } from 'sequelize';
import CronLock from '../models/cron-lock.model';

export const getAllCronLocks = () => CronLock.findAll();

export const findOrCreateCronLock = async (
  name: string,
  lockedBy: string,
  lockedAt: Date,
  transaction?: Transaction,
): Promise<[CronLock, boolean]> => {
  const [cronLock, created] = await CronLock.findOrCreate({
    where: { name },
    defaults: {
      locked_by: lockedBy,
      locked_at: lockedAt,
    },
    lock: transaction ? transaction.LOCK.UPDATE : undefined,
  });

  return [cronLock, created];
};

export const updateCronLock = async (
  cronLock: CronLock,
  lockedBy: string,
  lockedAt: Date,
) => cronLock.update({ locked_by: lockedBy, locked_at: lockedAt });

export const deleteCronLock = (name: string, lockedBy: string) =>
  CronLock.destroy({ where: { name, locked_by: lockedBy } });
