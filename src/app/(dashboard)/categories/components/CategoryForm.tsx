"use client";

import React from "react";
import type { z } from "zod";

import type { Tags } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import CardWrapper from "@/components/utils/Card";
import FormInput from "@/components/utils/FormElements/FormInput";
import FormProvider from "@/components/utils/FormElements/FormProvider";
import FormSelect from "@/components/utils/FormElements/FormSelect";
import FormTextArea from "@/components/utils/FormElements/FormTextArea";
import MetaDataCard from "@/components/utils/MetaDataCard";
import StatusColorIndicator from "@/components/utils/StatusColorIndicator";
import Tagify from "@/components/utils/Tagift";
import ThumbnailCard from "@/components/utils/ThumbnailCard";

import { status } from "@/constants/status";

interface Props<S extends z.ZodType<any, any>> {
  initialValues: z.infer<S>;
  schema: S;
  tags: Tags[];
  thumbnailName: string;
}

export default function CategoryForm<S extends z.ZodType<any, any>>({
  initialValues,
  schema,
  tags,
  thumbnailName,
}: Props<S>) {
  return (
    <FormProvider
      className="flex w-full flex-1 gap-5 overflow-y-hidden"
      submitText="Create Category"
      schema={schema}
      initialValues={initialValues}
      onSubmit={async (values) => {
        const data = await Promise.resolve(values);
        console.log(data);
      }}
    >
      {/* Thumbnail, Status, Tags */}
      <div className="flex w-72 flex-col gap-7">
        {/* Thumbnail */}
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */}
        <ThumbnailCard name={thumbnailName} url={initialValues.Media.url} />

        <CardWrapper headerClassName="px-6 py-3" title="Tags">
          <Tagify
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            tags={initialValues?.tags?.split(",") || []}
            descriptionTag="Add tags to a category."
            availableTags={tags.map(({ name }) => name) || []}
          />
        </CardWrapper>

        <CardWrapper
          className="relative"
          headerClassName="px-6 py-3"
          title="Status"
        >
          <StatusColorIndicator />
          <FormSelect
            description="Set the category status."
            name="status"
            label="Status"
            isLabelHidden
          >
            {status.map((item) => (
              <SelectItem value={item.value} key={`${item.value}${item.label}`}>
                {item.label}
              </SelectItem>
            ))}
          </FormSelect>
        </CardWrapper>
      </div>
      <div className="flex flex-1 flex-col gap-7">
        <CardWrapper
          headerClassName="px-6 py-0"
          contentClassName="flex flex-col gap-5"
          title="General"
          className="h-fit py-6"
        >
          <FormInput
            type="text"
            className="border"
            name="name"
            label="Name"
            placeholder="Name"
            description="A category name is required and recommended to be unique."
          />
          <FormTextArea
            rows={13}
            className="border"
            name="description"
            label="Description"
            placeholder="Name"
            description="Set a description to the category for better visibility."
          />
        </CardWrapper>
        
        <MetaDataCard />

        <Button type="submit">Submit</Button>
      </div>
    </FormProvider>
  );
}
