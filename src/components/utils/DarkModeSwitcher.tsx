// Solution via https://dev.to/tene/dark-mode-using-tailwindcss-v40-2lc6

"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function DarkModeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      const html = document.documentElement;
      if (newMode) {
        html.classList.add("dark");
        window.localStorage.setItem("theme", "dark");
      } else {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  }, []);

  // Sync the theme with the <html> element
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <button
      id="dark-mode-switcher"
      onClick={toggleDarkMode}
      className="cursor-pointer opacity-50 transition-all duration-200 hover:opacity-100"
      title={`switch to ${isDarkMode ? "light" : "dark"} mode`}
    >
      {isDarkMode ? <Moon /> : <Sun />}
    </button>
  );
}
