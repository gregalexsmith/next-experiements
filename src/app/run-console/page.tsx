import { usePathname } from '../../helpers';
import { execSync } from 'child_process';
import { ListLink } from '../../components';

const commands = [
  { id: 1, command: 'ls -la' },
  { id: 2, command: 'ls' },
  { id: 3, command: 'npm run lint' },
  { id: 4, command: 'npm install' },
];

// Executes a command in Node.js and returns the output
const executeCommandAtPath = (path: string, command: string): string => {
  try {
    const output = execSync(command, {
      cwd: path,
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
  const pathname = usePathname();
  const output = searchParams.commandId
    ? executeCommandAtPath(
        process.cwd(),
        commands.find(
          (c) => c.id === parseInt(searchParams.commandId as string),
        )?.command || '',
      )
    : '';

  return (
    <main className="min-h-screen px-8">
      <section className="flex flex-col gap-4 mb-8">
        <h1 className="text-lg">Run Console</h1>
      </section>

      <ul className="list-disc">
        {commands.map((command) => (
          <ListLink
            key={command.id}
            href={`${pathname}/?commandId=${command.id}`}
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
