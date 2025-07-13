import React, { useState } from "react";

// Simple parser: lines like 'Term: Definition' or '- Term: Definition'
function parseTextToFlashcards(text) {
  const lines = text.split("\n");
  const flashcards = [];
  lines.forEach((line) => {
    // Remove bullet if present
    const cleanLine = line.replace(/^[-*]\s*/, "").trim();
    // Match 'Term: Definition' or 'Term - Definition'
    const match = cleanLine.match(/^(.+?)(:| - )(.*)$/);
    if (match) {
      const question = match[1].trim();
      const answer = match[3].trim();
      if (question && answer) {
        flashcards.push({ question, answer });
      }
    }
  });
  return flashcards;
}

export default function TextToFlashcard({ onGenerate }) {
  const [input, setInput] = useState("");
  const [flashcards, setFlashcards] = useState([]);

  const handleGenerate = () => {
    const generated = parseTextToFlashcards(input);
    setFlashcards(generated);
    if (onGenerate) onGenerate(generated);
  };

  const handleEdit = (idx, field, value) => {
    setFlashcards((prev) =>
      prev.map((fc, i) => (i === idx ? { ...fc, [field]: value } : fc))
    );
  };

  const handleDelete = (idx) => {
    setFlashcards((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <section className="bg-blue-50/40 dark:bg-gray-800 p-6 rounded shadow mb-8 transition-colors duration-300">
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Paste your notes or text</h2>
      <textarea
        className="w-full border rounded p-2 mb-4 min-h-[100px] focus:outline-blue-400 focus:ring-2 transition bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
        placeholder="E.g.\nPhotosynthesis: The process by which green plants...\n- Mitochondria: The powerhouse of the cell."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="Paste your notes or text"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto mb-4"
        onClick={handleGenerate}
        aria-label="Generate Flashcards"
      >
        Generate Flashcards
      </button>

      {flashcards.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100">Generated Flashcards</h3>
          {flashcards.map((fc, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-2">
              <input
                className="border rounded p-1 flex-1 bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                value={fc.question}
                onChange={(e) => handleEdit(idx, "question", e.target.value)}
                placeholder="Question"
                aria-label={`Edit question ${idx + 1}`}
              />
              <span className="mx-1 hidden sm:inline text-gray-700 dark:text-gray-300">→</span>
              <input
                className="border rounded p-1 flex-1 bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                value={fc.answer}
                onChange={(e) => handleEdit(idx, "answer", e.target.value)}
                placeholder="Answer"
                aria-label={`Edit answer ${idx + 1}`}
              />
              <button
                className="text-red-500 hover:underline ml-2"
                onClick={() => handleDelete(idx)}
                title="Delete"
                aria-label={`Delete flashcard ${idx + 1}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
} 