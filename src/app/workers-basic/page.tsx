export const runtime = 'nodejs';

import { CheckCircle, Clock, Info, Loader, XCircle } from 'lucide-react';
import { CodeInline } from '../../components';
import { getQueue } from '../../worker/queue';
import {
  AddJob,
  AddRepeatableJob,
  CleanJobs,
  DeleteRepeatableJob,
  Refresh,
} from './client';

const Stats = async () => {
  const queue = await getQueue();
  const counts = await queue.getJobCounts();
  return (
    <section className="py-1 rounded-md">
      <h2 className="text-md font-semibold mb-2">Stats</h2>
      <div className="flex gap-8">
        <div className="flex items-center">
          <Loader size="20" className="mr-2 text-blue-500" />
          <div>Active: {counts.active}</div>
        </div>
        <div className="flex items-center">
          <Info size="20" className="mr-2 text-gray-500" />
          <div>Waiting: {counts.waiting}</div>
        </div>
        <div className="flex items-center">
          <Clock size="20" className="mr-2 text-yellow-500" />
          <div>Delayed: {counts.delayed}</div>
        </div>
        <div className="flex items-center">
          <CheckCircle size="20" className="mr-2 text-green-500" />
          <div>Completed: {counts.completed}</div>
        </div>
        <div className="flex items-center">
          <XCircle size="24" className="mr-2 text-red-500" />
          <div>Failed: {counts.failed}</div>
        </div>
      </div>
    </section>
  );
};

const Jobs = async () => {
  const queue = await getQueue();
  const jobs = await queue.getJobs([
    'active',
    'waiting',
    'delayed',
    'completed',
    'failed',
  ]);

  return (
    <>
      Id - Name - State - Wait for - Progress
      {jobs.map(async (job) => (
        <div key={job.id}>
          {job.id} - {job.name} - {await job.getState()} - {job.data.waitFor}s -{' '}
          {job.progress}
          {job.failedReason && `- ${job.failedReason}`}
        </div>
      ))}
    </>
  );
};

const RepeatableJobs = async () => {
  const queue = await getQueue();
  const repeatableJobs = await queue.getRepeatableJobs();
  return (
    <section className="pt-4 rounded-md">
      <h2 className="text-xl font-semibold mb-2">Repeatable Jobs</h2>
      {repeatableJobs.map((job) => (
        <div key={job.key}>
          {job.key} - {job.name} - {job.pattern}{' '}
          <DeleteRepeatableJob jobKey={job.key} />
        </div>
      ))}
    </section>
  );
};

export default async function GitVisualize() {
  return (
    <main className="px-8">
      <section className="flex flex-col gap-4 mb-4">
        <h1 className="text-lg">Workers - Basic</h1>
        <p>
          A basic job management flow using server actions. This page requires
          you to run the following commands:
        </p>
        <ul className="list-disc pl-6">
          <li>
            <CodeInline>docker-compose up</CodeInline> to start redis
          </li>
          <li>
            <CodeInline>npm run worker</CodeInline> to start the worker
          </li>
        </ul>
        <p>
          The worker is setup to process a <CodeInline>waitFor</CodeInline>{' '}
          property, and waits for a number of seconds before completing the job
          while logging progress along the way.
        </p>
      </section>

      <section className="pt-4 mb-2 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Actions</h2>
        <div className="flex gap-2">
          <AddJob />
          <AddRepeatableJob />
        </div>
      </section>

      <RepeatableJobs />

      <section className="py-4 rounded-md">
        <section className="pt-4 mb-4 rounded-md">
          <div className="flex gap-2 items-center content-center">
            <h2 className="text-xl font-semibold">Jobs</h2>
            <CleanJobs />
            <Refresh />
          </div>
          <Stats />
        </section>
        <Jobs />
      </section>
    </main>
  );
}
