"use client";

import React from "react";
import type { z } from "zod";

import { useRouter } from "next/navigation";

import type { Tags } from "@prisma/client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectItem } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardWrapper from "@/components/utils/Card";
import FormProvider from "@/components/utils/FormElements/FormProvider";
import FormSelect from "@/components/utils/FormElements/FormSelect";
import StatusColorIndicator from "@/components/utils/StatusColorIndicator";
import Tagify from "@/components/utils/Tagift";
import ThumbnailCard from "@/components/utils/ThumbnailCard";
import { status } from "@/constants/status";

import MetaDataCard from "../../../../components/utils/MetaDataCard";

import AdvancedSection from "./AdvancedSection";
import GeneralSection from "./GeneralSection";
import ReviewDataTable from "./ReviewDataTable";

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
  tags,
  categories,
}: Props<S>) {
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    if (tab === "metadata" && initialValues.id)
      router.replace(`${initialValues.id}`);
  };

  return (
    <FormProvider
      className="flex w-full flex-1 gap-5 overflow-y-hidden"
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
        <ThumbnailCard name="Media.url" url={initialValues.Media.url} />

        <CardWrapper
          contentClassName="flex flex-col gap-5"
          headerClassName="px-6 py-3"
          title="Tags"
        >
          <FormSelect
            description="Set the category status."
            name="categoryId"
            label="Category"
          >
            <ScrollArea viewPortClassName="max-h-56">
              {categories.map((item) => (
                <SelectItem
                  value={item.value}
                  key={`${item.value}${item.label}`}
                >
                  {item.label}
                </SelectItem>
              ))}
            </ScrollArea>
          </FormSelect>

          <Tagify
            title="Tags"
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

      <div className="flex flex-1 flex-col items-end gap-5">
        <Tabs
          onValueChange={handleTabChange}
          defaultValue="general"
          className="w-full"
        >
          <TabsList className="bg-transparent">
            <TabsTrigger
              className="text-lg text-gray-500 hover:underline hover:decoration-blue-600 hover:underline-offset-[16px] data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:underline data-[state=active]:underline-offset-[16px] data-[state=active]:shadow-none"
              value="general"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              className="text-lg text-gray-500 hover:underline hover:decoration-blue-600 hover:underline-offset-[16px] data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:underline data-[state=active]:underline-offset-[16px] data-[state=active]:shadow-none"
              value="advanced"
            >
              Advanced
            </TabsTrigger>
            {initialValues?.id && (
              <TabsTrigger
                className="text-lg text-gray-500 hover:underline hover:decoration-blue-600 hover:underline-offset-[16px] data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:underline data-[state=active]:underline-offset-[16px] data-[state=active]:shadow-none"
                value="reviews"
              >
                Reviews
              </TabsTrigger>
            )}
            {initialValues?.id && (
              <TabsTrigger
                className="text-lg text-gray-500 hover:underline hover:decoration-blue-600 hover:underline-offset-[16px] data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:underline data-[state=active]:underline-offset-[16px] data-[state=active]:shadow-none"
                value="metadata"
              >
                MetaData
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent
            className="flex flex-col gap-7 py-5 data-[state=inactive]:hidden data-[state=inactive]:py-0"
            value="general"
          >
            <GeneralSection />
          </TabsContent>
          <TabsContent
            className="flex flex-col gap-7 py-5 data-[state=inactive]:hidden data-[state=inactive]:py-0"
            value="advanced"
          >
            <AdvancedSection />
          </TabsContent>
          {initialValues?.id && (
            <TabsContent
              className="py-5 data-[state=inactive]:hidden data-[state=inactive]:py-0"
              value="reviews"
            >
              <ReviewDataTable />
            </TabsContent>
          )}
          {initialValues?.id && (
            <TabsContent
              className="py-5 data-[state=inactive]:hidden data-[state=inactive]:py-0"
              value="metadata"
            >
              <MetaDataCard />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </FormProvider>
  );
}
