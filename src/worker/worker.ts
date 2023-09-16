import { Job, Worker } from 'bullmq';

const connection = {
  host: 'localhost',
  port: 6379,
};

const waitForNSeconds = (n: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, n * 1000);
  });

const waitForNSecondsAndUpdateProgress = async (n: number, job: Job) => {
  for (let i = 0; i < n; i++) {
    await job.updateProgress((i / n) * 100);
    await waitForNSeconds(1);
  }
};

new Worker(
  'my-queue',
  async (job): Promise<'DONE'> => {
    await job.log(`Started processing job with id ${job.id}`);
    console.log(`Job with id ${job.id}`, job.data);
    const waitFor = job.data.waitFor;
    await waitForNSecondsAndUpdateProgress(waitFor, job);

    await job.updateProgress(100);
    return 'DONE';
  },
  { connection },
);
