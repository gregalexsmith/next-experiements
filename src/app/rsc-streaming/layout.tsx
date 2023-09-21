import Link from 'next/link';

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen p-24">
      <h2>RSC Streaming</h2>

      <nav className="my-4">
        <ul className="flex">
          <li className="mr-4">
            <Link
              href="/rsc-streaming/continuous-interval"
              className="text-gray-600 hover:text-gray-800"
            >
              Continuous Interval
            </Link>
          </li>
          <li className="mr-4">
            <Link
              href="/rsc-streaming/multiple-streams"
              className="text-gray-600 hover:text-gray-800"
            >
              Multiple Streams
            </Link>
          </li>
        </ul>
      </nav>

      {children}
    </main>
  );
}
