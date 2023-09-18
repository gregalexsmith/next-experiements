// app/page.tsx
import OpenAI from 'openai';
import { OpenAIStream } from 'ai';

import { Tokens } from 'ai/react';

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const RSCExample = async () => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [{ role: 'user', content: 'Hello, how are you?' }],
  });

  const stream = OpenAIStream(response);

  return (
    <>
      <p>Hello, how are you?</p>
      <Tokens stream={stream} />
    </>
  );
};
