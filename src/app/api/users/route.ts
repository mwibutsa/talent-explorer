import { NextRequest, NextResponse } from "next/server";
import { torreApiCall } from "@/utils/apiCall";

export async function POST(request: NextRequest) {
  const { query, limit } = await request.json();
  const { data } = await torreApiCall.post(
    `/entities/_searchStream`,
    {
      query,
      limit,
    },
    {
      responseType: "stream",
    }
  );

  const stream = data;

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Transfer-Encoding": "chunked",
    },
  });
}
