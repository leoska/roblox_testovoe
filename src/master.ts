import cluster, { Worker } from 'node:cluster';
import { cpus } from 'node:os';
import logger from './logger';

const COUNT_FORKS = process.env.FORKS
  ? parseInt(process.env.FORKS, 10)
  : cpus().length;

let APPLICATION_IS_STOPPING = false;

function initChildFork() {
  const child = cluster.fork();

  if (!child.process.pid) {
    throw new Error('Child process has no pid');
  }

  return child;
}

function initChildForks() {
  const childForks = new Map<number, Worker>();

  for (let i = 0; i < COUNT_FORKS; i += 1) {
    const child = initChildFork();
    childForks.set(child.process.pid as number, child);
  }

  return childForks;
}

function killAllChildForks(childForks: Map<number, Worker>) {
  childForks.forEach(child => {
    try {
      child.kill();
    } catch (e) {
      logger.error(e);
    }
  });
}

export default function processMaster() {
  if (!cluster.isPrimary) {
    throw new Error('This process is not a master!');
  }

  logger.info(
    `Master process ${process.pid} is running. Initialize a fork workers.`,
  );

  const childForks = initChildForks();

  process.once('uncaughtException', err => {
    logger.error('Uncaught exception', err);

    if (APPLICATION_IS_STOPPING) return;
    APPLICATION_IS_STOPPING = true;

    killAllChildForks(childForks);
  });

  process.once('SIGINT', async () => {
    if (APPLICATION_IS_STOPPING) {
      logger.warn('Application is already stopping.');
      return;
    }

    APPLICATION_IS_STOPPING = true;

    try {
      killAllChildForks(childForks);
      logger.info('Application successfully stopped.');
    } catch (e) {
      logger.error(`Application can't stop correct: ${e}`);
      // eslint-disable-next-line n/no-process-exit
      process.exit(1);
    }
  });

  cluster.on('exit', worker => {
    if (APPLICATION_IS_STOPPING) return;
    logger.warn(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
}
