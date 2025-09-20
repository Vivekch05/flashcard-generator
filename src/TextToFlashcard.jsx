import React, { useState } from "react";
import { DocumentTextIcon, SparklesIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

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
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) {
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const generated = parseTextToFlashcards(input);
    setFlashcards(generated);
    if (onGenerate && generated.length > 0) {
      onGenerate(generated);
    }
    setIsGenerating(false);
  };

  const handleEdit = (idx, field, value) => {
    setFlashcards((prev) =>
      prev.map((fc, i) => (i === idx ? { ...fc, [field]: value } : fc))
    );
  };

  const handleDelete = (idx) => {
    setFlashcards((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleClear = () => {
    setInput("");
    setFlashcards([]);
  };

  const handleAddAllToSet = () => {
    if (flashcards.length > 0 && onGenerate) {
      onGenerate(flashcards);
      // Optionally clear the generated flashcards after adding
      // setFlashcards([]);
    }
  };

  return (
    <section className="card dark:card-dark p-8 fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg floating-animation">
          <DocumentTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Generate Flashcards</h2>
          <p className="text-gray-600 dark:text-gray-400">Paste your notes and let AI create flashcards</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Paste your notes or text
          </label>
          <textarea
            className="input-field dark:input-field-dark min-h-[120px] resize-none"
            placeholder="Example formats:\n\nPhotosynthesis: The process by which green plants convert sunlight into energy\n- Mitochondria: The powerhouse of the cell\nCell Membrane - The semipermeable membrane surrounding the cytoplasm\n\nJust paste your notes and click Generate!"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Paste your notes or text"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Debug button with fallback styles */}
          <button
            className="btn-primary flex items-center space-x-2 pulse-glow"
            onClick={handleGenerate}
            disabled={!input.trim() || isGenerating}
            aria-label="Generate Flashcards"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <SparklesIcon className="h-5 w-5" />
                <span>Generate Flashcards</span>
              </>
            )}
          </button>
          
          {flashcards.length > 0 && (
            <button
              className="btn-secondary flex items-center space-x-2"
              onClick={handleClear}
              aria-label="Clear all"
            >
              <XMarkIcon className="h-5 w-5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>


      {flashcards.length > 0 && (
        <div className="mt-8 slide-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
              <PlusIcon className="h-5 w-5 text-emerald-500" />
              <span>Generated Flashcards ({flashcards.length})</span>
            </h3>
            <button
              onClick={handleAddAllToSet}
              className="btn-success flex items-center space-x-2"
              aria-label="Add all to working set"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add All to Set ({flashcards.length})</span>
            </button>
          </div>
          
          <div className="space-y-3">
            {flashcards.map((fc, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 scale-in hover:shadow-md transition-all duration-300" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Question {idx + 1}
                    </label>
                    <input
                      className="input-field dark:input-field-dark text-sm"
                      value={fc.question}
                      onChange={(e) => handleEdit(idx, "question", e.target.value)}
                      placeholder="Question"
                      aria-label={`Edit question ${idx + 1}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Answer {idx + 1}
                    </label>
                    <input
                      className="input-field dark:input-field-dark text-sm"
                      value={fc.answer}
                      onChange={(e) => handleEdit(idx, "answer", e.target.value)}
                      placeholder="Answer"
                      aria-label={`Edit answer ${idx + 1}`}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-3">
                  <button
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                    onClick={() => handleDelete(idx)}
                    title="Delete"
                    aria-label={`Delete flashcard ${idx + 1}`}
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
} 