import React from "react";
import { useFormContext } from "react-hook-form";
import type { z } from "zod";

import { Label } from "@/components/ui/label";
import CardWrapper from "@/components/utils/Card";
import FormInput from "@/components/utils/FormElements/FormInput";
import FormTextArea from "@/components/utils/FormElements/FormTextArea";
import type { ProductSchemaToReadDB } from "@/schema/product";

import MetaDataCard from "./MetaDataCard";

const GeneralSection = () => {
  const { watch } = useFormContext<z.infer<typeof ProductSchemaToReadDB>>();
  return (
    <>
      <CardWrapper
        headerClassName="px-6 py-0"
        contentClassName="flex flex-col gap-5"
        className="h-fit py-6"
        title="General"
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

      <CardWrapper
        headerClassName="px-6 py-0"
        contentClassName="flex flex-col gap-5"
        className="h-fit py-6"
        title="Variations"
      >
        <FormInput
          label="Variations"
          name="VariantOptions.name"
          type="text"
          className="w-auto border"
          placeholder="Color"
        />
      </CardWrapper>

      <CardWrapper
        headerClassName="px-6 py-2"
        contentClassName="flex flex-col gap-7"
        className="h-fit py-6"
        title="Shipping"
      >
        <FormInput
          type="number"
          className="border"
          name="width"
          label="Width"
          placeholder="26"
          description="A category name is required and recommended to be unique."
        />

        <div className="flex w-full flex-col gap-1">
          <Label className="">Dimension</Label>
          <div className="grid grid-cols-3 gap-4">
            <FormInput
              type="number"
              className="border"
              name="height"
              label="Height"
              placeholder="18"
              isLabelHidden
            />
            <FormInput
              type="number"
              className="border"
              name="length"
              label="Length"
              placeholder="4"
              isLabelHidden
            />
            <FormInput
              type="number"
              className="border"
              name="weight"
              label="Weight"
              placeholder="105"
              isLabelHidden
            />
          </div>
          <p className="col-span-3 text-[0.8rem] text-muted-foreground">
            Enter the product dimensions in centimeters (cm).
          </p>
        </div>
      </CardWrapper>

      <MetaDataCard productId={watch()?.id || ""} />
    </>
  );
};

export default GeneralSection;
