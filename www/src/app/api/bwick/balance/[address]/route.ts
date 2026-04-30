import { NextResponse } from "next/server";

const lcdBaseUrl = "http://174.138.87.223:1317";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ address: string }> },
) {
  const { address } = await params;
  const response = await fetch(
    `${lcdBaseUrl}/cosmos/bank/v1beta1/balances/${encodeURIComponent(address)}`,
    { cache: "no-store" },
  );
  const body = await response.text();

  return new NextResponse(body, {
    status: response.status,
    headers: {
      "content-type":
        response.headers.get("content-type") ?? "application/json",
    },
  });
}
