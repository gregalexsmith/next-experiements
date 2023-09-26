import { OpenAIStream } from 'ai';
import { Tokens } from 'ai/react';
import { OpenAI } from 'openai';
import { openai } from './helpers';

type Message = OpenAI.Chat.Completions.CreateChatCompletionRequestMessage;

export const RSCExample = async () => {
  const messages: Message[] = [
    { role: 'user', content: 'Can you explain react server components?' },
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  });

  const stream = OpenAIStream(response);

  return (
    <>
      {messages.map((message, i) => (
        <div key={i} className="flex gap-2">
          <span className="text-gray-400">{message.role}:</span>
          <span>{message.content}</span>
        </div>
      ))}
      <div className="flex gap-2">
        <span className="text-gray-400">Response:</span>
        <span>
          <Tokens stream={stream} />
        </span>
      </div>
    </>
  );
};
