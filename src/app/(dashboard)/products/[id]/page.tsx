import React from 'react';

import { prisma } from '@/server/db';

import type { NextPage } from "next";
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
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  return <div>{JSON.stringify(product, null, 2)}</div>;
};

export default Page;
