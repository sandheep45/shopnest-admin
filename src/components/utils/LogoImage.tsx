"use client";

import React from 'react';

import Image from 'next/image';
import { useTheme } from 'next-themes';

const LogoImageFull = () => {
  const { theme } = useTheme();
  return (
    <div className="w-full py-3 dark:border-gray-500 border-b border-dashed flex items-center justify-center">
      <Image
        className="w-full h-10"
        src={
          theme === "dark" || theme === "system" || !theme
            ? "/svg/default-dark.svg"
            : "/svg/default.svg"
        }
        alt="logo"
        width={200}
        height={200}
      />
    </div>
  );
};

export default LogoImageFull;
