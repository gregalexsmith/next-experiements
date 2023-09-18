'use client';

import { useChat, useCompletion } from 'ai/react';
import { Loader } from 'lucide-react';
import { useState, useCallback } from 'react';

export const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: '/ai-basic/api/chat',
    });

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          {m.role}: {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          value={input}
          placeholder="Say something..."
          disabled={isLoading}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isLoading && (
          <Loader size="20" className="ml-2 animate-spin text-blue-500" />
        )}
      </form>
    </div>
  );
};

export const Completion = () => {
  // Locally store our blog posts content
  const [content, setContent] = useState('');
  const { complete, isLoading } = useCompletion({
    api: 'ai-basic/api/completion',
  });

  const checkAndPublish = useCallback(
    async (c: string) => {
      const completion = await complete(c);
      if (!completion) throw new Error('Failed to check typos');
      const typos = JSON.parse(completion);
      // you should more validation here to make sure the response is valid
      if (typos?.length && !window.confirm('Typos found… continue?')) return;
      else alert('No typos found!');
    },
    [complete],
  );

  return (
    <div>
      <fieldset className="flex flex-col gap-2">
        <label htmlFor="content">Spell Checking:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </fieldset>
      <div className="flex gap-2 items-center mt-2">
        <button
          onClick={() => checkAndPublish(content)}
          className="bg-primary text-white px-2 py-1 rounded"
        >
          Publish
        </button>

        {isLoading && (
          <Loader size="20" className="animate-spin text-blue-500" />
        )}
      </div>
    </div>
  );
};
