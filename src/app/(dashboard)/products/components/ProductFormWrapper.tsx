"use client";

import React from "react";
import type { z } from "zod";

import type { Tags } from "@prisma/client";

import { ProductSchemaToReadDB } from "@/schema/product";

import ProductForm from "./ProductForm";

interface Props {
  product: z.infer<typeof ProductSchemaToReadDB>;
  tags: Tags[];
  categories: {
    label: string;
    value: string;
  }[];
}

const ProductFormWrapper: React.FC<Props> = ({ categories, product, tags }) => {
  return (
    <ProductForm
      categories={categories}
      tags={tags}
      schema={ProductSchemaToReadDB}
      initialValues={product}
    />
  );
};

export default ProductFormWrapper;
