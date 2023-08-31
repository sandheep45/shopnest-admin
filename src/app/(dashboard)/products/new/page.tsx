import React from "react";

import { prisma } from "@/server/db";

import ProductFormWrapper from "../components/ProductFormWrapper";

const initialValue = {
  categoryId: "",
  description: "",
  height: 0,
  id: "",
  length: 0,
  Media: {
    type: "IMAGE",
    url: "",
  },
  name: "",
  rating: 0,
  status: "DRAFT",
  tags: "",
  weight: 0,
  width: 0,
} as const;

const Page = async () => {
  const [tags, categories] = await prisma.$transaction([
    prisma.tags.findMany(),
    prisma.category.findMany(),
  ]);

  const categoriesOptions = categories.map(({ id, name }) => ({
    label: name,
    value: id,
  }));
  return (
    <div className="over flex w-full gap-5">
      <ProductFormWrapper
        categories={categoriesOptions}
        tags={tags}
        product={initialValue}
      />
    </div>
  );
};

export default Page;
