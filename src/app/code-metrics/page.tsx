import { traverseDir } from './helpers/traverse-dir';
import { processFiles } from './helpers/process-files';
import { Grid } from './client';
import path from 'path';

const projectDirectory = path.join(process.cwd(), 'src');

const filesAndFolders = traverseDir(projectDirectory, [
  '**/node_modules',
  '**/.git/**',
  '**/.next/**',
  '**/screenshots/**',
]);

const filesOnly = filesAndFolders.filter((file) => file.type === 'file');

export default async function GitVisualize() {
  const filesWithMetrics = await processFiles(filesOnly);

  return (
    <main className=" px-8">
      <section className="flex flex-col gap-4 mb-4">
        <h1 className="text-lg">Code Metrics</h1>
        <p>
          Another experiement around file metrics, but more focused on source
          code.
        </p>
      </section>

      <section>
        <h2>Files</h2>

        <Grid rows={filesWithMetrics} />
      </section>
    </main>
  );
}
