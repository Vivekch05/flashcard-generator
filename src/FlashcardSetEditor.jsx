import React, { useState, useEffect } from "react";

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
    if (!setName.trim() || flashcards.length === 0) return;
    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    onSaveSet({
      name: setName.trim(),
      tags: tagList,
      cards: flashcards,
      created: Date.now(),
    });
    setSetName("");
    setTags("");
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-2">
        {editing ? "Edit Flashcard Set" : "Working Flashcard Set"}
      </h2>
      {flashcards.length === 0 ? (
        <p className="text-gray-500">No flashcards in the set yet.</p>
      ) : (
        <div className="mb-4">
          {flashcards.map((fc, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <input
                className="border rounded p-1 flex-1"
                value={fc.question}
                onChange={(e) => handleEdit(idx, "question", e.target.value)}
                placeholder="Question"
              />
              <span className="mx-1">→</span>
              <input
                className="border rounded p-1 flex-1"
                value={fc.answer}
                onChange={(e) => handleEdit(idx, "answer", e.target.value)}
                placeholder="Answer"
              />
              <button
                className="text-red-500 hover:underline ml-2"
                onClick={() => handleDelete(idx)}
                title="Delete"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-2 mb-2">
        <input
          className="border rounded p-2"
          value={setName}
          onChange={(e) => setSetName(e.target.value)}
          placeholder="Set name (e.g. Biology Ch 1)"
        />
        <input
          className="border rounded p-2"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated, e.g. biology,plants)"
        />
      </div>
      <div className="flex gap-2">
        <button
          className={`${editing ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"} text-white px-4 py-2 rounded`}
          onClick={handleSave}
          disabled={!setName.trim() || flashcards.length === 0}
        >
          {editing ? "Update Set" : "Save Set"}
        </button>
        {editing && (
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={onCancelEdit}
            type="button"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
} 