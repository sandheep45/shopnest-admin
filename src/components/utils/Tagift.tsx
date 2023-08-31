"use client";

import React, { useEffect, useRef, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

import { useFormContext } from "react-hook-form";

import useSearchableTags from "@/hooks/useSearchableTags";

import { Button } from "../ui/button";
import { FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

import Card from "./Card";

interface ITagifyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  availableTags: string[];
  tags: string[];
  descriptionTag?: string;
}

const Tagify: React.FC<ITagifyProps> = (props) => {
  const { register, setValue, formState } = useFormContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const {
    filteredOptions,
    inputValue,
    setInputValue,
    selectedTags,
    handleKeyDown,
    handleAddTag,
    handleRemoveTag,
    setSelectedTags,
  } = useSearchableTags({
    options: props.availableTags,
    placeholder: "Search...",
  });

  useEffect(() => {
    props.tags.some((tag) => tag) &&
      setSelectedTags(
        props.tags.map((tag) => ({
          label: tag,
          id: Math.random().toString(36).substring(7),
        }))
      );
  }, [props.tags, setSelectedTags]);

  useEffect(() => {
    setValue("tags", selectedTags.map((tag) => tag.label).join(", "));
  }, [selectedTags, setValue]);

  function focusInputOnClickDiv() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <div className="flex w-full flex-col gap-1">
      <FormLabel className="py-2">{props.title}</FormLabel>
      <div className="flex w-full flex-wrap rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-[#1e1e2d] dark:text-gray-300">
        <div onClick={focusInputOnClickDiv} className="flex w-full flex-wrap">
          {selectedTags.map((option) => (
            <span
              key={option.id}
              className="mb-2 mr-2 flex items-center gap-2 rounded-md bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-[#2b2b40] dark:text-gray-400"
            >
              {option.label}
              <Button
                className="h-auto w-auto p-0"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveTag(option.id)}
              >
                <Cross2Icon className="cursor-pointer" />
              </Button>
            </span>
          ))}
        </div>
        <div className="relative flex w-full">
          <Input
            {...register("tags")}
            ref={inputRef}
            id="tags"
            onFocus={() => setShowSuggestion(true)}
            onKeyDown={handleKeyDown}
            className="border-0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {formState.errors.root?.message && (
            <FormMessage>{formState.errors.root?.message}</FormMessage>
          )}
          {showSuggestion && filteredOptions.length > 0 && (
            <Card
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-[50px] z-[7] flex w-full flex-col items-center justify-center gap-3"
            >
              <button
                onClick={() => setShowSuggestion(false)}
                className="flex w-full justify-end py-3"
              >
                <Cross2Icon className="scale-x-110" />
              </button>
              <ScrollArea className="h-[100px] w-48">
                <div className="flex flex-wrap gap-2">
                  {filteredOptions.map((option) => (
                    <span
                      onClick={() => handleAddTag(option)}
                      key={option}
                      className=" cursor-pointer rounded-md bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-[#2b2b40] dark:text-gray-400"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          )}
        </div>
      </div>
      {props.descriptionTag && (
        <span className="px-3 text-sm dark:text-gray-500">
          {props.descriptionTag}
        </span>
      )}
    </div>
  );
};

export default Tagify;
