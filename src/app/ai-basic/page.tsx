import { Chat, Completion } from './client';
import { RSCExample } from './server-example';

export default async function AIBasic({
  searchParams,
}: {
  searchParams: { showSSR: string | undefined };
}) {
  const showSSR = searchParams.showSSR === 'true';

  return (
    <main className="px-8">
      <section className="flex flex-col gap-4 mb-4">
        <h1 className="text-lg">AI - Basic</h1>
        <p>Basic features using the vercel/ai package</p>
      </section>

      <section className="py-4">
        <h2 className="text-xl font-semibold mb-2">Chat</h2>
        <Chat />
      </section>

      <section className="py-4">
        <h2 className="text-xl font-semibold mb-2">Completion</h2>
        <Completion />
      </section>

      <section className="py-4">
        <h2 className="text-xl font-semibold mb-2">RSC Token Example</h2>
        <div className="flex gap-4 mb-4">
          <a
            className="px-2 py-1 border-2 rounded border-gray-200"
            href="/ai-basic?showSSR=true"
          >
            Show RSC Example
          </a>
          <a
            className="px-2 py-1 border-2 rounded border-gray-200"
            href="/ai-basic"
          >
            Hide RSC Prompt
          </a>
        </div>

        {showSSR && <RSCExample />}
      </section>
    </main>
  );
}
