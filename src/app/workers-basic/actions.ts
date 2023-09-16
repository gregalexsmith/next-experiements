'use server';

import { JobsOptions } from 'bullmq';
import { getQueue } from '../../worker/queue';
import { revalidatePath } from 'next/cache';

export const refresh = () => {
  revalidatePath('/workers-basic');
};

export const addJob = async (name: string, data: any) => {
  const queue = await getQueue();
  await queue.add(name, data);
  refresh();
};

export const addRepeatJob = async (
  name: string,
  data: any,
  repeat: JobsOptions['repeat'],
) => {
  const queue = await getQueue();
  await queue.add(name, data, {
    repeat: repeat,
  });
  refresh();
};

export const deleteRepeatableJob = async (key: string) => {
  const queue = await getQueue();
  console.log(key);
  await queue.removeRepeatableByKey(key);
  refresh();
};

export const cleanJobs = async () => {
  const queue = await getQueue();
  await queue.clean(0, 100, 'completed');
  await queue.clean(0, 100, 'failed');
  refresh();
};
