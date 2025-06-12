// utils/extractParams.ts
import { ChatOpenAI } from "@langchain/openai";
import { TorreSearchParamsSchema, TorreSearchParams } from "./schema";
import env from "@/config/env";

const chat = new ChatOpenAI({
  modelName: env.OPENAI_MODEL,
  temperature: 0,
  configuration: {
    baseURL: env.OPENAI_BASE_URL,
    apiKey: env.OPENAI_API_KEY,
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
