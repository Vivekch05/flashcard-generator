import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon, AcademicCapIcon, ChartBarIcon, CogIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const [dark, setDark] = useState(false);
  const [totalSets, setTotalSets] = useState(0);
  const [totalCards, setTotalCards] = useState(0);

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
    
    // Load stats
    loadStats();
  }, []);

  const loadStats = () => {
    const sets = JSON.parse(localStorage.getItem("flashcardSets") || "[]");
    setTotalSets(sets.length);
    setTotalCards(sets.reduce((acc, set) => acc + set.cards.length, 0));
  };

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
    <header className="sticky top-0 z-20 glass-effect dark:glass-effect-dark border-b border-gray-200/50 dark:border-gray-700/50 shadow-soft dark:shadow-soft-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <AcademicCapIcon className="h-10 w-10 text-gradient floating-animation" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">Smart Study</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Flashcard Generator</p>
            </div>
          </div>

          {/* Stats */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm">
              <ChartBarIcon className="h-5 w-5 text-emerald-500" />
              <span className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">{totalSets}</span> Sets
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">{totalCards}</span> Cards
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              onClick={toggleDark}
              aria-label="Toggle dark mode"
            >
              {dark ? (
                <SunIcon className="h-6 w-6 text-yellow-400" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-600" />
              )}
            </button>
            <button
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Settings"
            >
              <CogIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 