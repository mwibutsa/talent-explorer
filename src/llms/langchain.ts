import { ChatOpenAI } from "@langchain/openai";
import { TorreSearchParamsSchema, TorreSearchParams } from "./schema";

const chat = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
  openAIApiKey:
    "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",
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
}).withStructuredOutput(
  TorreSearchParamsSchema as unknown as Record<string, string>
);

export async function extractSearchParamsFromPrompt(
  prompt: string
): Promise<TorreSearchParams> {
  const result = await chat.invoke(prompt);
  return TorreSearchParamsSchema.parse(result);
}
