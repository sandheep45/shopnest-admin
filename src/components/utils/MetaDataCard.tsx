"use client";

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { useParams, useSearchParams } from "next/navigation";

import Loading from "@/components/ui/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CardWrapper from "@/components/utils/Card";
import FormInput from "@/components/utils/FormElements/FormInput";
import FormTextArea from "@/components/utils/FormElements/FormTextArea";
import { api } from "@/utils/api";

const MetaDataCard = () => {
  const variantId = useSearchParams().get("variantId");
  const { productId, categoryId } = useParams();
  const { setValue } = useFormContext();
  const [currentMetaDataID, setCurrentMetaDataID] = useState("");
  const {
    data: allMetaData,
    isLoading,
    isFetching,
  } = api.metadata.getMetadataIdAndName.useQuery(
    {
      ...(categoryId && { categoryId: categoryId as string }), //categoryId
      ...(productId && !variantId && { productId: productId as string }), //productId
      ...(variantId && { variantId }),
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: !!productId || !!variantId || !!categoryId,
    }
  );
  const {
    isLoading: isMetaDataLoading,
    isFetching: isMetaDataFetching,
    data,
  } = api.metadata.getMetadatabyId.useQuery(currentMetaDataID, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!currentMetaDataID,
  });

  useEffect(() => {
    if (data) setValue("MetaData", data);
  }, [setValue, data]);

  useEffect(() => {
    if (allMetaData?.[0]?.id) setCurrentMetaDataID(allMetaData[0]?.id);
  }, [allMetaData]);

  return (
    <div className="relative w-full">
      <Loading
        isOpen={
          isLoading || isFetching || isMetaDataFetching || isMetaDataLoading
        }
      />
      <Select onValueChange={setCurrentMetaDataID} value={currentMetaDataID}>
        <SelectTrigger className="absolute right-5 top-5 w-auto">
          <SelectValue>
            <span className="pr-5">
              {allMetaData?.find(({ id }) => id === currentMetaDataID)?.title ??
                "Select MetaData"}
            </span>
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <ScrollArea viewPortClassName="max-h-56" className="">
            {allMetaData?.map((metadata) => (
              <SelectItem key={metadata.id} value={metadata.id}>
                {metadata.title}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <CardWrapper
        headerClassName="px-6 py-0"
        contentClassName="flex flex-col gap-5"
        className="h-fit py-6"
        title="Meta Options"
      >
        <FormInput
          type="text"
          className="border"
          name="MetaData.title"
          label="Meta Tag Title"
          placeholder="Name"
          description="Set a meta tag title. Recommended to be simple and precise keywords."
        />

        <FormTextArea
          rows={13}
          className="border"
          name="MetaData.description"
          label="Meta Tag Description"
          placeholder="Name"
          description="Set a meta tag description to the product for increased SEO ranking."
        />

        <FormInput
          type="text"
          className="border"
          name="MetaData.keywords"
          label="Meta Tag Keywords"
          description="Set a list of keywords that the product is related to. Separate the keywords by adding a comma , between each keyword."
          placeholder="Name"
        />
      </CardWrapper>
    </div>
  );
};

export default MetaDataCard;
