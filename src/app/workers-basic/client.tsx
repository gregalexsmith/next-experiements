'use client';

import { useState } from 'react';
import { Plus, RefreshCcw, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  addJob,
  addRepeatJob,
  cleanJobs,
  deleteRepeatableJob,
  refresh,
} from './actions';

export const AddJob = () => {
  const handleAddJob = async () => {
    await addJob('test', { waitFor: 5 });
  };
  // plus emoji: https://emojipedia.org/plus/
  return (
    <Button onClick={handleAddJob}>
      <Plus size={24} className="pr-1" /> Add Job
    </Button>
  );
};

export const AddRepeatableJob = () => {
  const handleAddJob = async () => {
    await addRepeatJob(
      'test-repeat',
      { waitFor: 4 },
      { every: 1000, limit: 3 },
    );
  };

  return (
    <Button onClick={handleAddJob}>
      <Plus size={24} className="pr-1" /> Add Repeatable Job
    </Button>
  );
};

export const CleanJobs = () => {
  return (
    <Button onClick={() => cleanJobs()} variant="ghostDestuctive">
      <Trash size={20} className="pr-1" />
      Clean
    </Button>
  );
};

export const Refresh = () => {
  const [isRotating, setIsRotating] = useState(false);

  const onClick = () => {
    refresh();
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

  return (
    <Button onClick={onClick} variant="ghost">
      <RefreshCcw size={20} className={`${isRotating ? 'animate-spin' : ''}`} />
      <span className="pl-1">Refresh</span>
    </Button>
  );
};

type DeleteJobProps = {
  jobKey: string;
};

export const DeleteRepeatableJob = ({ jobKey }: DeleteJobProps) => {
  return (
    <Button
      onClick={() => deleteRepeatableJob(jobKey)}
      variant="ghostDestuctive"
      size="xsm"
    >
      <Trash size={16} />
    </Button>
  );
};
