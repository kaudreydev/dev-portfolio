// Solution via https://dev.to/tene/dark-mode-using-tailwindcss-v40-2lc6

"use client";

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
    <div
      id="dark-mode-switcher"
      onClick={toggleDarkMode}
      className="relative w-14 h-8 rounded-3xl bg-slate-300 dark:bg-zinc-700 place--center cursor-pointer"
    >
      <div
        className={`absolute top-1 rounded-full w-6 h-6 bg-blue-500 ${isDarkMode ? "left-1" : "right-1"}`}
      >
        {/* <img
          height="32px"
          width="32px"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWVjbGlwc2UtaWNvbiBsdWNpZGUtZWNsaXBzZSI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48cGF0aCBkPSJNMTIgMmE3IDcgMCAxIDAgMTAgMTAiLz48L3N2Zz4="
        /> */}
      </div>
    </div>
  );
}
