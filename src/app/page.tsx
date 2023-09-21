import { ListLink } from '../components';

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <h1 className="text-lg mb-4">Experiments:</h1>
      <ul className="flex flex-col gap-2 list-disc">
        <ListLink href="/ai-basic">ai-basic</ListLink>
        <ListLink href="/code-metrics">code-metrics</ListLink>
        <ListLink href="/crud-file-db">crud-file-db</ListLink>
        <ListLink href="/file-navigation">file-navigation</ListLink>
        <ListLink href="/react-three-fiber">react-three-fiber</ListLink>
        <ListLink href="/rsc-streaming">rsc-streaming</ListLink>
        <ListLink href="/run-console">run-console</ListLink>
        <ListLink href="/stream-local-files">stream-local-files</ListLink>
        <ListLink href="/workers-basic">workers-basic</ListLink>
      </ul>
    </main>
  );
}
