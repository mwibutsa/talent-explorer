import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { extractSearchParamsFromPrompt } from "@/llms/langchain";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const params = await extractSearchParamsFromPrompt(prompt);

    if (params.skill) {
      params["skill/role"] = {
        text: params.skill.term,
        proficiency: params.skill.proficiency,
      };
      delete params.skill;
    }
    // Confirm the structure matches exactly what the API expects
    const payload = {
      ...params,
    };
    console.log(JSON.stringify(payload, null, 2));

    const { data } = await axios.post(
      "https://search.torre.co/people/_search",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );

    return NextResponse.json(data);
  } catch (err) {
    const error = err as AxiosError;
    console.error(
      "Search API error:",
      error?.response?.status,
      error?.response?.data
    );
    return NextResponse.json(
      { error: error?.response?.data || error.message },
      { status: error?.response?.status || 500 }
    );
  }
}
