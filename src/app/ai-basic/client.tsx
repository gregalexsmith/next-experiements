'use client';

import { useChat } from 'ai/react';
import { Loader } from 'lucide-react';

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
