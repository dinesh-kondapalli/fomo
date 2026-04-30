import { NextResponse } from "next/server";

const lcdBaseUrl = "http://174.138.87.223:1317";

export async function GET() {
  const response = await fetch(
    `${lcdBaseUrl}/cosmos/base/tendermint/v1beta1/node_info`,
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
