import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { SunIcon, MoonIcon } from "lucide-react";

export const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      className="relative w-14 h-7 bg-gray-200 rounded-full mb-4"
    >
      <div
        className="text-white flex items-center justify-center h-6 w-6 rounded-full bg-gray-600 transition-all cursor-pointer absolute top-1/2 -translate-y-1/2 left-1 dark:left-7">
        {theme === "light" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
      </div>
    </div>
  )
}
