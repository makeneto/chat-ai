import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const chatModel = openai.chat("gpt-5");

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const response = streamText({
    model: chatModel,
    messages: convertToModelMessages(messages),
  });

  return response.toUIMessageStreamResponse();
}
