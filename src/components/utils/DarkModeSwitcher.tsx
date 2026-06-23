// Solution via https://dev.to/tene/dark-mode-using-tailwindcss-v40-2lc6

"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { userTheme } from "~/store";

export default function DarkModeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = userTheme.get();
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
        html.classList.remove("light");
        userTheme.set("dark");
      } else {
        html.classList.add("light");
        html.classList.remove("dark");
        userTheme.set("light");
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
    <div className="my-6.25">
      <button
        id="dark-mode-switcher"
        aria-label={`${isDarkMode ? "light" : "dark"} mode`}
        onClick={toggleDarkMode}
        className="cursor-pointer text-[2rem] md:text-[1.8rem] bg-transparent border-0 leading-9 my-2"
        title={`switch to ${isDarkMode ? "light" : "dark"} mode`}
      >
        {isDarkMode ? <Moon /> : <Sun />}
      </button>
    </div>
  );
}
