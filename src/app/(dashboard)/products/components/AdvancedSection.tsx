"use client";

import React from "react";

import MetaDataCard from "../../../../components/utils/MetaDataCard";

import VariantsCard from "./VariantsCard";

const AdvancedSection = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <VariantsCard />

      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <MetaDataCard />
    </div>
  );
};

export default AdvancedSection;
