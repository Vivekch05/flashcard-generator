import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-3 px-4 text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
      <span>Made with <span aria-label="love">❤️</span> by Your Name. </span>
      <a href="https://github.com/your-repo" className="underline hover:text-blue-600 dark:hover:text-blue-400" target="_blank" rel="noopener noreferrer">GitHub</a>
    </footer>
  );
} 