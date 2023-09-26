'use client';

import { Button } from '@/components/ui/button';
import { CodeInline } from '../../components';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <div className="border-2 border-red-500 bg-red-200 p-4">
        {error.message}
      </div>
      <div className="p-4">
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
      </div>

      <Button
        className="ml-4"
        variant="default"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
