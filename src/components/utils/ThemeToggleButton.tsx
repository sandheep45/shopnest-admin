"use client";

import React, { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

import { Toggle } from '../ui/toggle';

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Toggle
      className="p-3"
      onClick={() =>
        setTheme(theme === "light" || theme === "system" ? "dark" : "light")
      }
      aria-label="toggle-theme"
    >
      <SunIcon
        className={`transition-all duration-100 ease-in-out ${
          theme === "dark" ? "w-6 h-6" : "w-0 h-0"
        }`}
      />
      <MoonIcon
        className={`transition-all duration-100 ease-in-out ${
          theme !== "dark" ? "w-6 h-6" : "w-0 h-0"
        }`}
      />
    </Toggle>
  );
};

export default ThemeToggleButton;
