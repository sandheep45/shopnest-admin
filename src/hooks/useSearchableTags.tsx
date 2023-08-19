"use client";

import { useState } from 'react';

interface Props {
  options: string[]; // Array of options to search through
  placeholder?: string;
}

interface Tag {
  label: string;
  id: string;
}

const useSearchableTags = ({ options, placeholder = "Search..." }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const filteredOptions = options.filter(
    (option) =>
      option.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 &&
      !selectedTags.some((tag) => tag.label.trim() === option.trim())
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key === "Enter" && !inputValue) {
      event.preventDefault();
    }

    if (key === "Enter" && inputValue) {
      event.preventDefault();
      const newTag: Tag = {
        label: inputValue,
        id: Math.random().toString(36).substring(7),
      };

      if (selectedTags.some((tag) => tag.label.trim() === newTag.label.trim()))
        return;

      setSelectedTags([...selectedTags, newTag]);
      setInputValue("");
    }
    if (key === "Backspace" && !inputValue) {
      setSelectedTags(selectedTags.slice(0, selectedTags.length - 1));
    }
    //on tab press, select the first element in the filteredOptions
    if (key === "Tab" && filteredOptions.length > 0) {
      event.preventDefault();
      const newTag: Tag = {
        label: filteredOptions[0] ?? "",
        id: Math.random().toString(36).substring(7),
      };

      if (selectedTags.some((tag) => tag.label.trim() === newTag.label.trim()))
        return;

      setSelectedTags([...selectedTags, newTag]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (id: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== id));
  };

  const handleAddTag = (tag: string) => {
    const newTag: Tag = {
      label: tag,
      id: Math.random().toString(36).substring(7),
    };

    if (selectedTags.some((tag) => tag.label.trim() === newTag.label.trim()))
      return;

    setSelectedTags((currentTags) => [...currentTags, newTag]);
  };

  return {
    inputValue,
    setInputValue,
    selectedTags,
    handleKeyDown,
    handleRemoveTag,
    filteredOptions,
    placeholder,
    handleAddTag,
    setSelectedTags,
  };
};

export default useSearchableTags;
