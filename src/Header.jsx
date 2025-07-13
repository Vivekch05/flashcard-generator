import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // On mount, check localStorage or system preference
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDark = () => {
    setDark((d) => {
      const newDark = !d;
      if (newDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newDark;
    });
  };

  return (
    <header className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm py-3 px-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold tracking-tight text-blue-700 dark:text-blue-300">The Smart Study & Flashcard Generator</h1>
      <button
        className="ml-4 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        onClick={toggleDark}
        aria-label="Toggle dark mode"
      >
        {dark ? <SunIcon className="h-6 w-6 text-yellow-400" /> : <MoonIcon className="h-6 w-6 text-gray-700" />}
      </button>
    </header>
  );
} 