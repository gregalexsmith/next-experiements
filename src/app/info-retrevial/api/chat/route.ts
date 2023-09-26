import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = `You are a helpful research assistant.
You are helping the user to understand information on the web.
Here is the website they are researching in plain text and HTML:

URL: {url}

--- TEXT ---
{text_content}
--- END TEXT ---

--- HTML ---
{html_content}
--- END HTML ---

Current conversation:
{chat_history}
 
User: {input}
AI:`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages = body.messages ?? [];
  const webInfo = body.webInfo ?? {};
  const url = body.url ?? '';

  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;

  const prompt = PromptTemplate.fromTemplate(TEMPLATE);
  const model = new ChatOpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo-16k',
  });

  const outputParser = new BytesOutputParser();
  const chain = prompt.pipe(model).pipe(outputParser);

  const stream = await chain.stream({
    url,
    text_content: webInfo.text,
    html_content: webInfo.html,
    chat_history: formattedPreviousMessages.join('\n'),
    input: currentMessageContent,
  });

  return new StreamingTextResponse(stream);
}
