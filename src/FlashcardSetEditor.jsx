import React, { useState, useEffect } from "react";
import { FolderIcon, TagIcon, CheckIcon, XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";

export default function FlashcardSetEditor({
  flashcards,
  setFlashcards,
  onSaveSet,
  editing = false,
  initialName = "",
  initialTags = "",
  onCancelEdit,
}) {
  const [setName, setSetName] = useState(initialName);
  const [tags, setTags] = useState(initialTags);
  const [saveError, setSaveError] = useState("");

  // Update fields when editing changes
  useEffect(() => {
    setSetName(initialName);
    setTags(initialTags);
  }, [initialName, initialTags]);

  const handleEdit = (idx, field, value) => {
    setFlashcards((prev) =>
      prev.map((fc, i) => (i === idx ? { ...fc, [field]: value } : fc))
    );
  };

  const handleDelete = (idx) => {
    setFlashcards((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    // Validation
    if (!setName.trim()) {
      setSaveError("Please enter a set name");
      return;
    }
    
    if (flashcards.length === 0) {
      setSaveError("Please add at least one flashcard");
      return;
    }
    
    // Check if all flashcards have both question and answer
    const incompleteCards = flashcards.filter(fc => !fc.question.trim() || !fc.answer.trim());
    if (incompleteCards.length > 0) {
      setSaveError(`Please complete all ${incompleteCards.length} incomplete flashcards`);
      return;
    }
    
    setSaveError(""); // Clear any previous errors
    
    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    
    const setData = {
      name: setName.trim(),
      tags: tagList,
      cards: flashcards,
      created: Date.now(),
    };
    
    try {
      onSaveSet(setData);
      
      // Clear the form after successful save
      if (!editing) {
        setFlashcards([]);
        setSetName("");
        setTags("");
      }
    } catch (error) {
      console.error("Error saving set:", error);
      setSaveError("Failed to save set. Please try again.");
    }
  };

  const handleAddCard = () => {
    setFlashcards((prev) => [...prev, { question: "", answer: "" }]);
  };

  return (
    <section className="card dark:card-dark p-8 fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg floating-animation">
          <FolderIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {editing ? "Edit Flashcard Set" : "Working Flashcard Set"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {editing ? "Make changes to your set" : "Build and organize your flashcards"}
          </p>
        </div>
      </div>

      {/* Error Message */}
      {saveError && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
          <p className="text-red-800 dark:text-red-200 text-sm">{saveError}</p>
        </div>
      )}


      {flashcards.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-full flex items-center justify-center mb-4 floating-animation">
            <FolderIcon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No flashcards yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Generate some flashcards or add them manually to get started
          </p>
          <button
            onClick={handleAddCard}
            className="btn-primary flex items-center space-x-2 mx-auto"
            aria-label="Add first card"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add First Card</span>
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Set Name *
              </label>
              <input
                className="input-field dark:input-field-dark"
                value={setName}
                onChange={(e) => setSetName(e.target.value)}
                placeholder="e.g., Biology Chapter 1, React Hooks, Spanish Vocabulary"
                aria-label="Set name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <TagIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="input-field dark:input-field-dark pl-10"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="biology, plants, photosynthesis (comma separated)"
                  aria-label="Tags"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Flashcards ({flashcards.length})
              </h3>
              <button
                onClick={handleAddCard}
                className="btn-secondary flex items-center space-x-2"
                aria-label="Add new card"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Add Card</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {flashcards.map((fc, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 scale-in hover:shadow-md transition-all duration-300" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Question {idx + 1} *
                      </label>
                      <input
                        className={`input-field dark:input-field-dark text-sm ${
                          !fc.question.trim() ? 'border-red-300 dark:border-red-600' : ''
                        }`}
                        value={fc.question}
                        onChange={(e) => handleEdit(idx, "question", e.target.value)}
                        placeholder="Enter your question here..."
                        aria-label={`Edit question ${idx + 1}`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Answer {idx + 1} *
                      </label>
                      <input
                        className={`input-field dark:input-field-dark text-sm ${
                          !fc.answer.trim() ? 'border-red-300 dark:border-red-600' : ''
                        }`}
                        value={fc.answer}
                        onChange={(e) => handleEdit(idx, "answer", e.target.value)}
                        placeholder="Enter your answer here..."
                        aria-label={`Edit answer ${idx + 1}`}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <button
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                      onClick={() => handleDelete(idx)}
                      title="Delete card"
                      aria-label={`Delete card ${idx + 1}`}
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col">
          <button
            className={`${editing ? "btn-success" : "btn-primary"} flex items-center space-x-2 ${
              (!setName.trim() || flashcards.length === 0) ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSave}
            disabled={!setName.trim() || flashcards.length === 0}
            aria-label={editing ? "Update set" : "Save set"}
          >
            <CheckIcon className="h-5 w-5" />
            <span>{editing ? "Update Set" : "Save Set"}</span>
          </button>
          {(!setName.trim() || flashcards.length === 0) && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {!setName.trim() ? "Enter a set name" : "Add at least one flashcard"}
            </p>
          )}
        </div>
        
        {editing && (
          <button
            className="btn-secondary flex items-center space-x-2"
            onClick={onCancelEdit}
            type="button"
            aria-label="Cancel editing"
          >
            <XMarkIcon className="h-5 w-5" />
            <span>Cancel</span>
          </button>
        )}
      </div>
    </section>
  );
} 