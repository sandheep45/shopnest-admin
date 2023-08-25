"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

import Image from "next/image";

import { Label } from "@/components/ui/label";
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
import { api } from "@/utils/api";

import MetaDataCard from "./MetaDataCard";
import VariantsCard from "./VariantsCard";

const AdvancedSection = () => {
  const [currentVariantId, setCurrentVariantId] = useState("");
  const { setValue, watch } = useFormContext();
  const {
    data: allVariants,
    isLoading: isVariantsLoading,
    isFetching: isVariantsFetching,
  } = api.variants.getVariantsByProductId.useQuery(watch()?.id as string, {
    queryKey: ["variants.getVariantsByProductId", watch()?.id as string],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!watch()?.id,
    onSuccess: (data) => setCurrentVariantId(data[0]?.id ?? ""),
  });
  const { isFetching, isLoading } = api.variants.getVariantById.useQuery(
    currentVariantId,
    {
      queryKey: ["variants.getVariantById", currentVariantId],
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: !!currentVariantId,
      onSuccess: (data) => setValue("Variant", data),
    }
  );

  return (
    <div className="relative w-full">
      <Select onValueChange={setCurrentVariantId} value={currentVariantId}>
        <SelectTrigger className="absolute right-5 top-5 z-[5] w-auto">
          <SelectValue>
            <span className="pr-5">
              {allVariants?.find(({ id }) => id === currentVariantId)?.sku ??
                "Select Variant"}
            </span>
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <ScrollArea viewPortClassName="max-h-56" className="">
            {allVariants?.map((variant) => (
              <SelectItem key={variant.id} value={variant.id}>
                {variant.sku}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <div className="flex flex-col gap-5">
        <div className="relative flex flex-col gap-5">
          <Loading
            isOpen={
              isFetching || isLoading || isVariantsFetching || isVariantsLoading
            }
          />
          <CardWrapper
            headerClassName="px-6 py-0"
            contentClassName="flex flex-col gap-5"
            className="h-fit py-6"
            title="Inventory"
          >
            <FormInput
              type="number"
              className="border"
              name="Variant.sku"
              label="SKU"
              placeholder="Name"
              description="Enter the product SKU."
            />
            <FormInput
              type="number"
              className="border"
              name="Variant.barcode"
              label="Barcode"
              placeholder="Name"
              description="Enter the product barcode number."
            />

            <div className="flex w-full flex-col gap-1">
              <Label className="">Quantity</Label>
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  type="number"
                  className="border"
                  name="Variant.onSelfQuantity"
                  label="On Self"
                  placeholder="18"
                  isLabelHidden
                />
                <FormInput
                  type="number"
                  className="border"
                  name="Variant.inWareHouseQuantity"
                  label="In Warehouse"
                  placeholder="4"
                  isLabelHidden
                />
              </div>
              <p className="text-[0.8rem] text-muted-foreground">
                Enter the product dimensions in centimeters (cm).
              </p>
            </div>
          </CardWrapper>

          <CardWrapper
            headerClassName="px-6 py-0"
            contentClassName="flex flex-col gap-5"
            className="h-fit py-6"
            title="Media"
          >
            <div className="flex w-full items-center gap-10 rounded-md border border-dashed border-blue-500 bg-blue-500/10 px-10 py-7">
              <Image
                className="object-contain"
                src="/svg/upload.svg"
                alt="upload-to-cloud"
                height={50}
                width={50}
              />
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold ">
                  Drop files here or click to upload.
                </h2>
                <span className="text-sm dark:text-gray-500">
                  Upload up to 10 images. Only *.png, *.jpg and *.jpeg image
                </span>
              </div>
            </div>
          </CardWrapper>
        </div>

        <VariantsCard />

        <MetaDataCard variantId={currentVariantId} />
      </div>
    </div>
  );
};

export default AdvancedSection;
