import { torreApiCall } from "@/utils/apiCall";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const { data } = await torreApiCall.get(`/genome/bios/${username}`);
  return NextResponse.json(data);
}
