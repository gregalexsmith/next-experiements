import Link from 'next/link';
import { scanDirectory, FileFolderInfo } from './scan-directory';

const paths = {
  workingDirectory: process.cwd(),
  root: process.env.PATH_FILE_NAV as string,
};

const rootPath = paths.workingDirectory;

const fileOrFolderEmoji = (type: FileFolderInfo['type']) => {
  return type === 'file' ? '📄' : '📁';
};

const round = (num: number) => Math.round(num * 100) / 100;

const formatFileSize = (size: number) => {
  if (size > 1000000000) return `${round(size / 1000000000)} GB`;
  if (size > 1000000) return `${round(size / 1000000)} MB`;
  if (size > 1000) return `${round(size / 1000)} KB`;
  return `${size} B`;
};

const pathname = '/file-navigation';

export default function DiskSpace({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const directory = searchParams.path || rootPath;
  const files = scanDirectory(directory);

  return (
    <main className="min-h-screen px-8">
      <section className="flex flex-col gap-4 mb-8">
        <h1 className="text-lg">
          File Navigation - Can we navigate & measure the file system?
        </h1>
        <p>
          Another prototype around local files - this time using Node to measure
          the size of files and folders from a given path.
        </p>
      </section>

      {searchParams.path && (
        <Link href={`${pathname}/`} className="text-blue-500 underline">
          Back
        </Link>
      )}

      <section className="flex flex-col gap-1 mt-2">
        {files.map((file) => (
          <div key={file.path} className="flex gap-2">
            <p>{fileOrFolderEmoji(file.type)}</p>
            <p>{file.name}</p>
            <p>{formatFileSize(file.size)}</p>
            {file.type === 'directory' && (
              <Link
                href={`${pathname}/?path=${file.path}`}
                className="text-blue-500 underline"
              >
                View
              </Link>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
