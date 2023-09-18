import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest } from 'next/server';
import { openai } from '../../helpers';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
