import React from "react";

import type { NextPage } from "next";

import { prisma } from "@/server/db";

import ProductFormWrapper from "../components/ProductFormWrapper";
interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

interface Params {
  id: string;
}

type SearchParams = Record<string, string | string[] | undefined>;

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = params;
  const [product, tags, categories] = await prisma.$transaction([
    prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        Media: {
          select: {
            type: true,
            url: true,
          },
        },
        VariantOptions: {
          select: {
            name: true,
            value: true,
          },
        },
      },
    }),
    prisma.tags.findMany(),
    prisma.category.findMany(),
  ]);

  const categoriesOptions = categories.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  if (!product) return null;

  return (
    <div className="over flex w-full gap-5">
      <ProductFormWrapper
        categories={categoriesOptions}
        tags={tags}
        product={product}
      />
    </div>
  );
};

export default Page;
