import React from "react";

import type { NextPage } from "next";

import { prisma } from "@/server/db";

import CategoryFormWrapper from "../components/CategoryFormWrapper";

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

interface Params {
  categoryId: string;
}

type SearchParams = Record<string, string | string[] | undefined>;

const Page: NextPage<PageProps> = async ({ params }) => {
  const { categoryId } = params;
  const [category, tags] = await prisma.$transaction([
    prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        Media: {
          select: {
            type: true,
            url: true,
          },
        },
        Metadata: {
          select: {
            id: true,
            title: true,
            keywords: true,
            description: true,
          },
        },
      },
    }),
    prisma.tags.findMany(),
  ]);

  if (!category) return null;

  return (
    <div className="over flex w-full gap-5">
      <CategoryFormWrapper tags={tags} category={category} />
    </div>
  );
};

export default Page;
