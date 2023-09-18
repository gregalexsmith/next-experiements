// https://sdk.vercel.ai/docs/api-reference/use-completion

import { OpenAIStream, StreamingTextResponse } from 'ai';
import { openai } from '../../helpers';

const content = (
  prompt: string,
) => `Given the following post content, detect if it has typo or not.
Respond with a JSON array of typos ["typo1", "typo2", ...] or an empty [] if there's none. Only respond with an array. Post content:
${prompt}

Output:
`;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: content(prompt),
      },
    ],
    max_tokens: 200,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  const stream = OpenAIStream(response, {
    onToken: (token) => {
      console.log(token);
    },
  });

  return new StreamingTextResponse(stream);
}
