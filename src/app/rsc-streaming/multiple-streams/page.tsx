import { RenderStream } from '../render-stream';

const waitForNSeconds = (n: number) =>
  new Promise((resolve) => setTimeout(resolve, n * 1000));

const StreamNumber = ({ number }: { number: number }) => {
  const dataStream = new ReadableStream(
    {
      async start(controller) {
        const encoder = new TextEncoder();

        for (let i = 0; i < number; i++) {
          await waitForNSeconds(1);
          controller.enqueue(encoder.encode(`${i}`));
        }

        return () => {
          console.log('closing 2');
          controller.close();
        };
      },
      cancel() {},
    },
    { highWaterMark: 3 },
  );

  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold">Stream: {number}</h3>
      <RenderStream stream={dataStream} />
    </div>
  );
};

export default function Page() {
  return (
    <div>
      <StreamNumber number={10} />
      <StreamNumber number={5} />
      <StreamNumber number={3} />
    </div>
  );
}
