"use client";

import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import Image from 'next/image';
import { useTheme } from 'next-themes';

import { Pencil1Icon } from '@radix-ui/react-icons';

import { Button } from '../ui/button';

import CardWrapper from './Card';

interface Props {
  url: string;
  name: string;
}

const generateImageUrl = (url: string, theme: string | undefined) => {
  if (url) return url;
  return theme === "dark" || !theme
    ? "/svg/blank-image-dark.svg"
    : "/svg/blank-image.svg";
};

const ThumbnailCard = ({ url, name }: Props) => {
  const { theme } = useTheme();
  const { register, setValue, watch } = useFormContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //i want base64 string of the image
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setValue(name, reader.result);
    };
  };

  return (
    <CardWrapper
      className="p-7"
      title="Thumbnail"
      description="Set the category thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted"
      footerClassName="text-center p-0"
      contentClassName="flex items-center justify-center p-0"
      headerClassName="p-0"
    >
      <div className="bg-[#e5e7eb] dark:bg-[#151521] rounded-md m-2 shadow-2xl relative">
        <Button
          onClick={() => inputRef.current?.click()}
          type="button"
          aria-label="change-avatar"
          className="absolute -top-3 -right-3 rounded-full p-2 h-7 bg-gray-200 hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-gray-300 shadow-2xl text-black"
        >
          <Pencil1Icon className="w-[14px] h-[14px]" />
        </Button>
        <input
          className="hidden"
          {...register(name)}
          onChange={handleChange}
          type="file"
          ref={inputRef}
        />
        <Image
          className="rounded-md w-36 h-36"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          src={`${generateImageUrl(watch(name) ?? url, theme)}`}
          alt="placeholder"
          width={200}
          height={200}
        />
      </div>
    </CardWrapper>
  );
};

export default ThumbnailCard;
