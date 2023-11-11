import { execSync } from 'child_process';
import { ListLink } from '../../components';

const commands = [
  { id: 1, command: 'ls' },
  { id: 2, command: 'cat ./src/app/run-console/page.tsx' },
  { id: 3, command: 'npm run lint' },
  { id: 4, command: 'npm install' },
];

// Executes a shell command and returns the output
const executeCommandAtPath = (command: string): string => {
  try {
    const output = execSync(command, {
      cwd: process.cwd(),
      encoding: 'utf-8',
    });

    return output;
  } catch (error) {
    const err = error as Error;
    return `An error occurred: ${err.message}`;
  }
};

export default function StreamConsole({
  searchParams,
}: {
  searchParams: { commandId: string | undefined };
}) {
  const id = parseInt(searchParams.commandId as string);
  const command = commands.find((c) => c.id === id)?.command;
  const output = command ? executeCommandAtPath(command) : '';

  return (
    <main className="min-h-screen px-8">
      <section className="flex flex-col gap-4 mb-4">
        <h1 className="text-lg">Run Console</h1>
        <p>
          Running shell command via Node.js and displaying the output in the
          browser. (Another local-only experiment)
        </p>
      </section>

      <ul className="list-disc ml-4 mb-8">
        {commands.map((command) => (
          <ListLink
            key={command.id}
            href={`/run-console/?commandId=${command.id}`}
          >
            {command.command}
          </ListLink>
        ))}
      </ul>

      <section className="flex flex-col gap-1 mt-2">
        <pre>{output}</pre>
      </section>
    </main>
  );
}
