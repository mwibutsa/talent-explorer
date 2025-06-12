// utils/extractParams.ts
import { ChatOpenAI } from "@langchain/openai";
import { TorreSearchParamsSchema, TorreSearchParams } from "./schema";
import env from "@/config/env";

const chat = new ChatOpenAI({
  modelName: env.OPENAI_MODEL,
  temperature: 0,
  openAIApiKey: env.OPENAI_API_KEY,
  configuration: {
    baseURL: env.OPENAI_BASE_URL,
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
