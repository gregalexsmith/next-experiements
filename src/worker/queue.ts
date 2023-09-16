import { ConnectionOptions, Queue } from 'bullmq';
import { withTimeout } from '../helpers';

const TIMEOUT = 200;

const connection: ConnectionOptions = {
  host: 'localhost',
  port: 6379,
  commandTimeout: TIMEOUT,
  maxLoadingRetryTime: TIMEOUT,
};

const queue = new Queue('my-queue', { connection });

export const getQueue = async () => {
  await withTimeout(queue.waitUntilReady(), TIMEOUT);
  if (queue.redisVersion) {
    return queue;
  }
  throw new Error(
    'Queue not found - run "docker-compose up" to run redis and "npm run worker"',
  );
};

export async function addJob() {
  const job = await queue.add('my-job', {
    text: 'hello world',
  });

  console.log(`Added job ${job.id}`);
}

export async function scheduleJob() {
  const job = await queue.add(
    'my-scheduled-job',
    {
      text: 'scheduled job',
    },
    {
      delay: 5000,
    },
  );

  console.log(`Scheduled job ${job.id}`);
}

export async function addRepeatJob() {
  const job = await queue.add(
    'my-repeated-job',
    {
      text: 'repeated job',
    },
    {
      repeat: {
        every: 5000,
        limit: 10,
      },
    },
  );

  console.log(`Repeated job ${job.id}`);
}
