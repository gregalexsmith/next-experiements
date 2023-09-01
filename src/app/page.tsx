import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <h1 className="text-lg mb-4">Experiments:</h1>
      <ul>
        <li>
          <Link href="/stream-local-files">stream-local-files</Link>
        </li>
      </ul>
    </main>
  );
}
