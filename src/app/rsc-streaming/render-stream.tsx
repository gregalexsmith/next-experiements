/**
 * References:
 * - https://github.com/vercel/ai/blob/main/packages/core/react/tokens.tsx
 */
import { Suspense } from 'react';

type Props = {
  stream: ReadableStream;
};

export async function RenderStream(props: Props) {
  const { stream } = props;
  const reader = stream.getReader();

  return (
    <Suspense>
      <RecursiveTokens reader={reader} />
    </Suspense>
  );
}

type InternalProps = {
  reader: ReadableStreamDefaultReader;
};

async function RecursiveTokens({ reader }: InternalProps) {
  const { done, value } = await reader.read();
  if (done) {
    return null;
  }
  const text = new TextDecoder().decode(value);

  return (
    <>
      {text}
      <Suspense fallback={null}>
        <RecursiveTokens reader={reader} />
      </Suspense>
    </>
  );
}
