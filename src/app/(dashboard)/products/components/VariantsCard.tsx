"use client";

import React, { useEffect, useState } from "react";
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
import { api } from "@/utils/api";

const VariantsCard = () => {
  const { watch } = useFormContext();
  const [options, setOptions] = useState<
    {
      name: string;
      value: string;
    }[]
  >([]);

  const { data: variantData } = api.variants.getVariantByOptions.useQuery(
    {
      productId: watch("id") as string,
      options,
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      queryKey: [
        "variants.getVariantByOptions",
        { productId: watch("id") as string, options },
      ],
    }
  );
  const { data, isLoading, isFetching } =
    api.variantOptions.getOptionsByProductId.useQuery(
      {
        productId: watch("id") as string,
      },
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      }
    );

  useEffect(() => {
    if (data) setOptions(data);
  }, [data]);

  return (
    <CardWrapper
      headerClassName="px-6 py-0"
      contentClassName="flex flex-row flex-wrap gap-5 px-6 py-4"
      className="h-fit py-6"
      title="Test"
    >
      <Loading isOpen={isLoading || isFetching} />
      {data?.map(({ name, value }, index) => (
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
          <SelectTrigger className="w-auto">
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
    </CardWrapper>
  );
};

export default VariantsCard;
