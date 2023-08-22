"use client";

import React, { useEffect, useState } from "react";

import type { Mediatype, Status, Tags } from "@prisma/client";

import Loading from "@/components/ui/loading";
import { CreateCategorySchema } from "@/schema/category";

import CategoryForm from "../components/CategoryForm";

const initialValues = {
  description: "",
  name: "",
  status: "DRAFT" as Status,
  tags: "",
  Media: { create: { url: "", type: "IMAGE" as Mediatype } },
  Metadata: {
    create: {
      title: "",
      description: "",
      keywords: "",
    },
  },
};

const Page = () => {
  const [tags, setTags] = useState<Tags[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/categories/tags")
      .then((res) => res.json())
      .then(setTags)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="relative flex w-full gap-5">
      <Loading isOpen={isLoading} className="w-full" />
      <CategoryForm
        thumbnailName="Media.create.url"
        tags={tags}
        schema={CreateCategorySchema}
        initialValues={initialValues}
      />
    </div>
  );
};

export default Page;
