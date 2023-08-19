import { type NextRequest, NextResponse } from "next/server";

import { prisma } from '@/server/db';

export async function GET(_request: NextRequest) {
  try {
    const tags = await prisma.tags.findMany();
    return NextResponse.json(tags);
  } catch (error) {
    return NextResponse.error();
  }
}
