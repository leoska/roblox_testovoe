import cluster, { Worker } from 'node:cluster';
import { cpus } from 'node:os';

const COUNT_FORKS = process.env.FORKS
  ? parseInt(process.env.FORKS, 10)
  : cpus().length;

let APPLICATION_IS_STOPPING = false;

function initChildForks() {
  const childForks = new Map<number, Worker>();

  for (let i = 0; i < COUNT_FORKS; i += 1) {
    const child = cluster.fork();

    if (!child.process.pid) {
      throw new Error('Child process has no pid');
    }

    childForks.set(child.process.pid, child);
  }

  return childForks;
}

export default function processMaster() {
  if (!cluster.isPrimary) {
    throw new Error('This process is not a master!');
  }

  console.log(
    `Master process ${process.pid} is running. Initialize a fork workers.`,
  );

  const childForks = initChildForks();

  process.once('uncaughtException', err => {
    console.error('Uncaught exception', err);

    if (APPLICATION_IS_STOPPING) return;
    APPLICATION_IS_STOPPING = true;

    childForks.forEach(child => {
      try {
        child.kill();
      } catch (e) {
        console.error(e);
      }
    });
  });

  process.once('SIGINT', async () => {
    if (APPLICATION_IS_STOPPING) {
      console.warn('Application is already stopping.');
      return;
    }

    try {
      console.info('Application successfully stopped.');
      process.exit(0);
    } catch (e) {
      console.error(`Application can't stop correct: ${e}`);
      process.exit(1);
    }
  });

  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
}
