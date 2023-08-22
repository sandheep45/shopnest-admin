import { type NextRequest, NextResponse } from "next/server";

import { prisma } from "@/server/db";

interface Context {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, context: Context) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: context.params.id,
      },
    });
    return NextResponse.json({ category });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    const category = await prisma.category.delete({
      where: {
        id: context.params.id,
      },
    });
    return NextResponse.json({ category });
  } catch (error) {
    return NextResponse.error();
  }
}
