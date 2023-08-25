import { NextResponse } from "next/server";

import { prisma } from "@/server/db";

export async function GET() {
  const variant = await prisma.variant.findFirst({
    where: {
      AND: [
        {
          productId: "64730d2aedd14ce327603fc9",
        },
        { options: { some: { name: "Color", value: "black" } } },
        { options: { some: { name: "Size", value: "XL" } } },
        { options: { some: { name: "Material", value: "cotton" } } },
        { options: { some: { name: "Style", value: "retro" } } },
      ],
    },
    include: {
      options: true,
    },
  });

  return NextResponse.json(variant);
}
