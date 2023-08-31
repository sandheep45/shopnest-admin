"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { useFormContext } from "react-hook-form";

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
import FormTextArea from "@/components/utils/FormElements/FormTextArea";

import { api } from "@/utils/api";

const VariantsCard = () => {
  const { setValue } = useFormContext();
  const router = useRouter();
  const { productId } = useParams();
  const [options, setOptions] = useState<
    {
      name: string;
      value: string;
    }[]
  >([]);

  const { data: optionsData, isInitialLoading: optionsDataIsInitaillyLoading } =
    api.variantOptions.getOptionsByProductId.useQuery(
      {
        productId: productId as string,
      },
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        enabled: !!productId,
      }
    );
  const { data: variantData, isInitialLoading: variantsIsInitiallyLoading } =
    api.variants.getVariantByOptions.useQuery(
      {
        productId: productId as string,
        options,
      },
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        enabled:
          !!productId && options.every(({ value }) => !value.includes(", ")),
      }
    );

  useEffect(() => {
    if (optionsData)
      setOptions(
        optionsData.map((options) => ({
          name: options.name,
          value: options.value.split(", ")[0] ?? "",
        }))
      );
  }, [optionsData]);

  useEffect(() => {
    if (variantData) {
      setValue("Variant", variantData);
      router.push(`?variantId=${variantData.id}`);
    }
  }, [variantData, setValue, router]);

  return (
    <div className="relative w-full">
      <Loading
        isOpen={optionsDataIsInitaillyLoading || variantsIsInitiallyLoading}
      />
      <div className="relative flex flex-col gap-5">
        <CardWrapper
          headerClassName="px-6 py-0"
          contentClassName="flex flex-col gap-5"
          className="h-fit py-6"
          title="Inventory"
        >
          <div className="flex w-full flex-wrap gap-4">
            {optionsData?.map(({ name, value }, index) => (
              <Select
                onValueChange={(currentValue) =>
                  setOptions((currentOptions) => [
                    ...currentOptions.slice(0, index),
                    {
                      name,
                      value: currentValue,
                    },
                    ...currentOptions.slice(index + 1),
                  ])
                }
                value={options[index]?.value}
                key={`${name}${value}`}
              >
                <SelectTrigger className="w-fit">
                  <SelectValue>
                    <span className="pr-5">
                      {options[index]?.value.toLocaleUpperCase()
                        ? options[index]?.value.toLocaleUpperCase()
                        : `Select ${name}`}
                    </span>
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  <ScrollArea viewPortClassName="max-h-56" className="">
                    {value.split(", ").map((item) => (
                      <SelectItem key={item} value={item}>
                        {item.toLocaleUpperCase()}
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            ))}
          </div>
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
          <FormTextArea
            rows={13}
            className="border"
            name="Variant.description"
            label="Description"
            placeholder="Name"
            description="Set a description to the variant for better visibility."
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
    </div>
  );
};

export default VariantsCard;
