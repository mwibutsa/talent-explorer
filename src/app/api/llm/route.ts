import { NextRequest, NextResponse } from "next/server";
import { extractSearchParamsFromPrompt } from "@/llms/langchain";

export const POST = async (request: NextRequest) => {
  try {
    const { prompt } = await request.json();

    const params = await extractSearchParamsFromPrompt(prompt);

    return NextResponse.json(params);
  } catch (error) {
    return NextResponse.json({
      error: (error as Error).message,
      status: 500,
    });
  }
};
