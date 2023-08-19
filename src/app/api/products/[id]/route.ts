import { type NextRequest, NextResponse } from "next/server";

import { prisma } from '@/server/db';

interface Context {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, context: Context) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: context.params.id,
      },
    });
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    const product = await prisma.product.delete({
      where: {
        id: context.params.id,
      },
    });
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.error();
  }
}
