'use client';
import { useState } from 'react';
import { useChat } from 'ai/react';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { getSummary } from './actions';

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      <WebsiteSourceForm />
    </div>
  );
}

type WebsiteSourceFormProps = {
  url: string;
};

type WebInfo = {
  text: string;
  html: string;
};

const WebsiteSourceForm = () => {
  const [response, setResponse] = useState<WebInfo | undefined>();
  const { register, formState, watch, handleSubmit } =
    useForm<WebsiteSourceFormProps>({
      defaultValues: {
        url: 'https://js.langchain.com/docs/get_started/introduction/',
      },
    });
  const { isSubmitting } = formState;
  const onSubmit = handleSubmit(async (data) => {
    const res = await getSummary(data.url);
    setResponse(res);
  });

  const url = watch('url');

  return (
    <div>
      <form onSubmit={onSubmit} className="text-base">
        <fieldset className="my-2">
          <label className="block mb-1">Scan:</label>
          <input
            {...register('url')}
            className="text-black border border-gray-200 rounded p-1"
          />
        </fieldset>

        <button
          disabled={isSubmitting}
          className="px-4 py-2text-white bg-blue-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Scan Website
        </button>
      </form>
      {response && (
        <details>
          <summary>
            Website Content. Total length:{' '}
            {response.text.length + response.html.length}
          </summary>
          <pre className="whitespace-break-spaces">
            {response && JSON.stringify(response, null, 2)}
          </pre>
        </details>
      )}
      {response && (
        <div className="mt-4">
          <Chat webInfo={response} url={url} />
        </div>
      )}
    </div>
  );
};

function Chat({
  webInfo,
  url,
}: {
  webInfo?: { text: string; html: string };
  url: string;
}) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/info-retrevial/api/chat',
  });

  const onSubmit = (e: any) => {
    handleSubmit(e, {
      options: {
        body: {
          url,
          webInfo,
        },
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      {messages.map((m) => (
        <span key={m.id}>
          {m.role === 'user' ? 'User: ' : 'AI: '}
          <ReactMarkdown
            className="whitespace-break-spaces"
            components={{
              a: ({ ...props }) => (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                />
              ),
            }}
          >
            {m.content}
          </ReactMarkdown>
        </span>
      ))}

      <form onSubmit={onSubmit} className="fixed bottom-0 w-full max-w-md">
        <label>
          <span>Message</span>
          <input
            className="w-full border border-gray-300 rounded mb-8 shadow-xl p-2"
            value={input}
            onChange={handleInputChange}
          />
        </label>
      </form>
    </div>
  );
}
