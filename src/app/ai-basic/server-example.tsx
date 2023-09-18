import { OpenAI } from 'openai';
import { OpenAIStream } from 'ai';
import { Tokens } from 'ai/react';
import { openai } from './helpers';

type Message = OpenAI.Chat.Completions.CreateChatCompletionRequestMessage;

export const RSCExample = async () => {
  const messages: Message[] = [
    { role: 'user', content: 'Hello, how are you?' },
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  });

  const stream = OpenAIStream(response);

  return (
    <>
      <p>Hello, how are you?</p>
      <Tokens stream={stream} />
    </>
  );
};
