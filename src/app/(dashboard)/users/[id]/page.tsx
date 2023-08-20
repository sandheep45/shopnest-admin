import React from "react";

import type { NextPage } from "next";

import { prisma } from "@/server/db";

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
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return <div>{JSON.stringify(user, null, 2)}</div>;
};

export default Page;
