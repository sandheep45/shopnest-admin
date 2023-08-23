"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

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

interface Props {
  productId?: string;
  variantId?: string;
  categoryId?: string;
}

const MetaDataCard: React.FC<Props> = ({
  categoryId,
  productId,
  variantId,
}) => {
  const { setValue } = useFormContext();
  const [currentMetaDataID, setCurrentMetaDataID] = useState("");
  const {
    data: allMetaData,
    isLoading,
    isFetching,
  } = api.metadata.getMetadataIdAndName.useQuery(
    {
      ...(categoryId && { categoryId }),
      ...(productId && { productId }),
      ...(variantId && { variantId }),
    },
    {
      queryKey: [
        "metadata.getMetadataIdAndName",
        {
          ...(categoryId && { categoryId }),
          ...(productId && { productId }),
          ...(variantId && { variantId }),
        },
      ],
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: !!categoryId || !!productId || !!variantId,
      onSuccess: (data) => setCurrentMetaDataID(data[0]?.id ?? ""),
    }
  );
  const { isLoading: isMetaDataLoading, isFetching: isMetaDataFetching } =
    api.metadata.getMetadatabyId.useQuery(currentMetaDataID, {
      queryKey: ["metadata.getMetadatabyId", currentMetaDataID],
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: (data) => setValue("MetaData", data),
    });

  return (
    <div className="relative w-full">
      <Loading
        isOpen={
          isLoading ||
          isFetching ||
          isMetaDataFetching ||
          (currentMetaDataID ? isMetaDataLoading : false)
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
