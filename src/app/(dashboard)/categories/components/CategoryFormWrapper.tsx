"use client";

import React from "react";

import { CategorySchema } from "@/schema/category";
import type { Category, Mediatype, Tags } from "@prisma/client";

import CategoryForm from "./CategoryForm";

interface Props {
  category: Category & {
    Media: {
      type: Mediatype;
      url: string;
    };
    Metadata: {
      id: string;
      title: string;
      description: string;
      keywords: string;
    }[];
  };
  tags: Tags[];
}

const CategoryFormWrapper = ({ category, tags }: Props) => {
  return (
    <CategoryForm
      thumbnailName="Media.url"
      tags={tags}
      schema={CategorySchema}
      initialValues={category}
    />
  );
};

export default CategoryFormWrapper;
