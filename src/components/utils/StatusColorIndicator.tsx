"use client";

import React from "react";

import { useFormContext } from "react-hook-form";

import { setStatusColor } from "@/constants/status";

import { cn } from "@/lib/utils";

const StatusColorIndicator = () => {
  const { watch } = useFormContext();
  return (
    <div
      className={cn(
        "absolute right-8 top-5 z-[5] h-4 w-4 rounded-full",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setStatusColor(watch("status"))
      )}
    />
  );
};

export default StatusColorIndicator;
