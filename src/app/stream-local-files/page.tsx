import { readdirSync, statSync } from 'fs';
import Link from 'next/link';
import path from 'path';
import { usePathname } from '../../helpers';

const paths = {
  ableton: process.env.PATH_ABLETON as string,
};

interface Mp3File {
  name: string;
  path: string;
}

const findMp3Files = (directory: string): Mp3File[] => {
  let mp3Files: Mp3File[] = [];

  const files = readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      mp3Files = mp3Files.concat(findMp3Files(filePath));
    } else {
      if (path.extname(file) === '.mp3') {
        mp3Files.push({ name: file, path: filePath });
      }
    }
  }

  return mp3Files;
};

export default function SteamLocalFiles({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const pathname = usePathname();

  const files = findMp3Files(paths.ableton);
  const activeFile = searchParams.filepath;
  const streamLink = `/api/stream?path=${activeFile}`;

  const toSearchParam = (filePath: string) => {
    return `${pathname}?filepath=${filePath}`;
  };

  return (
    <main className="min-h-screen px-8">
      <section className="flex flex-col gap-4">
        <h1 className="text-lg">
          Stream local files: Can we use Next to browse and stream Ableton
          exports?
        </h1>

        <p>
          This proof of concept renders a list of mp3 files from a specified
          folder on the host machine and allows the user to stream them via the
          API at /api/stream.
        </p>

        <p>
          This is not a production-ready solution, but more of a self-hosted
          experiment
        </p>
      </section>

      <div className="flex mt-8">
        <ul>
          <h2 className="text-lg mb-4">Files:</h2>
          {files.map((file) => (
            <li key={file.path}>
              {/* The link should open the file in vscode */}
              <Link href={toSearchParam(file.path)}>{file.name}</Link>
            </li>
          ))}
        </ul>
        {activeFile && (
          <audio controls autoPlay preload="none" key={activeFile}>
            <source src={streamLink} type="audio/mp3" />
          </audio>
        )}
      </div>
    </main>
  );
}
