import { NextResponse } from "next/server";

export function GET(_request: Request) {
  return NextResponse.json({ message: "Hello from the API!" });
}
