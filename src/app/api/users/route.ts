import { NextRequest, NextResponse } from "next/server";
import { torreApiCall } from "@/utils/apiCall";

export async function POST(request: NextRequest) {
  const { query } = await request.json();

  const response = await torreApiCall.post(
    `/entities/_searchStream`,
    {
      query,
    },
    {
      responseType: "stream",
    }
  );

  // Create a readable stream from the response data
  const stream = response.data;

  // Return a streaming response
  return new NextResponse(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Transfer-Encoding": "chunked",
    },
  });
}
