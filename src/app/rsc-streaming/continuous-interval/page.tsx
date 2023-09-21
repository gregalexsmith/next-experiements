import { RenderStream } from '../render-stream';

let interval: any;

export default function Page() {
  const dataStream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      // const writer = controller.writable.getWriter();

      interval = setInterval(() => {
        controller.enqueue(encoder.encode('Hello World!'));
      }, 200);

      return () => {
        console.log('closing 1');
        clearInterval(interval);
        controller.close();
      };
    },
    cancel() {
      clearInterval(interval);
    },
  });

  return <RenderStream stream={dataStream} />;
}
