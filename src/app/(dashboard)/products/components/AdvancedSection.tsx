"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import MetaDataCard from "./MetaDataCard";
import VariantsCard from "./VariantsCard";

const AdvancedSection = () => {
  const { watch } = useFormContext();

  return (
    <div className="flex w-full flex-col gap-5">
      <VariantsCard />

      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <MetaDataCard variantId={watch("Variant.id")} />
    </div>
  );
};

export default AdvancedSection;
