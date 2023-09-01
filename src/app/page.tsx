import Link from 'next/link';

const ListLink = ({ href, children }: { href: string; children: any }) => (
  <li>
    <Link href={href} className="text-blue-500 underline">
      {children}
    </Link>
  </li>
);

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <h1 className="text-lg mb-4">Experiments:</h1>
      <ul className="flex flex-col gap-2 list-disc">
        <ListLink href="/stream-local-files">stream-local-files</ListLink>
        <ListLink href="/file-navigation">file-navigation</ListLink>
      </ul>
    </main>
  );
}
