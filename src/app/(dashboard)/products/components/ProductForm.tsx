"use client";

import React from "react";
import type { z } from "zod";

import type { Tags } from "@prisma/client";

import FormProvider from "@/components/utils/FormElements/FormProvider";

interface Props<S extends z.ZodType<any, any>> {
  initialValues: z.infer<S>;
  schema: S;
  tags: Tags[];
  categories: {
    label: string;
    value: string;
  }[];
}

export default function ProductForm<S extends z.ZodType<any, any>>({
  initialValues,
  schema,
}: Props<S>) {
  return (
    <FormProvider
      className="flex w-full flex-1 gap-5 overflow-y-hidden"
      schema={schema}
      initialValues={initialValues}
      onSubmit={async (values) => {
        const data = await Promise.resolve(values);
        console.log(data);
      }}
    ></FormProvider>
  );
}
