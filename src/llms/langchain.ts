// utils/extractParams.ts
import { ChatOpenAI } from "@langchain/openai";
import { TorreSearchParamsSchema, TorreSearchParams } from "./schema";

const chat = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0,
  openAIApiKey:
    "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",
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
}).withStructuredOutput(TorreSearchParamsSchema);

export async function extractSearchParamsFromPrompt(
  prompt: string
): Promise<TorreSearchParams> {
  const result = await chat.invoke(prompt);
  return TorreSearchParamsSchema.parse(result);
}
