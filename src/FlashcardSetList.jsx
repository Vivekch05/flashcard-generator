import React, { useEffect, useState, useRef } from "react";
import { PencilSquareIcon, TrashIcon, PlayCircleIcon, ArrowDownTrayIcon, DocumentDuplicateIcon } from "@heroicons/react/24/solid";

export default function FlashcardSetList({ onStudy, onEdit }) {
  const [sets, setSets] = useState([]);
  const [search, setSearch] = useState("");
  const fileInputRef = useRef();

  // Load sets from localStorage
  const loadSets = () => {
    const saved = JSON.parse(localStorage.getItem("flashcardSets") || "[]");
    setSets(saved);
  };

  useEffect(() => {
    loadSets();
  }, []);

  const handleDelete = (idx) => {
    if (!window.confirm("Delete this set?")) return;
    const updated = sets.filter((_, i) => i !== idx);
    localStorage.setItem("flashcardSets", JSON.stringify(updated));
    setSets(updated);
  };

  const handleExport = (set) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(set, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${set.name.replace(/\s+/g, "_")}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleDuplicate = (set) => {
    const newSet = {
      ...set,
      name: set.name + " (Copy)",
      created: Date.now(),
    };
    const updated = [...sets, newSet];
    localStorage.setItem("flashcardSets", JSON.stringify(updated));
    setSets(updated);
  };

  // Filter sets by search
  const filteredSets = sets.filter((set) => {
    const q = search.toLowerCase();
    return (
      set.name.toLowerCase().includes(q) ||
      (set.tags && set.tags.some((tag) => tag.toLowerCase().includes(q)))
    );
  });

  // Import handler
  const handleImportClick = () => {
    fileInputRef.current.click();
  };
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const importedSet = JSON.parse(evt.target.result);
        if (!importedSet.name || !importedSet.cards) throw new Error();
        importedSet.created = Date.now();
        const updated = [...sets, importedSet];
        localStorage.setItem("flashcardSets", JSON.stringify(updated));
        setSets(updated);
        alert("Set imported!");
      } catch {
        alert("Invalid file format.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-xl font-semibold">Saved Flashcard Sets</h2>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="border rounded p-2 text-sm"
            placeholder="Search by name or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search sets"
          />
          <button
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1"
            onClick={handleImportClick}
            aria-label="Import set"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Import</span>
          </button>
          <input
            type="file"
            accept="application/json"
            ref={fileInputRef}
            onChange={handleImport}
            className="hidden"
            aria-label="Import set file"
          />
        </div>
      </div>
      {filteredSets.length === 0 ? (
        <p className="text-gray-500">No sets found.</p>
      ) : (
        <ul className="divide-y">
          {filteredSets.map((set, idx) => (
            <li key={set.created} className="py-2 flex flex-col md:flex-row md:items-center md:gap-4">
              <div className="flex-1">
                <span className="font-bold">{set.name}</span>
                {set.tags && set.tags.length > 0 && (
                  <span className="ml-2 text-xs text-gray-500">[{set.tags.join(", ")}]</span>
                )}
                <span className="ml-2 text-sm text-gray-400">({set.cards.length} cards)</span>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0 flex-wrap">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
                  onClick={() => onStudy && onStudy(set)}
                  disabled={!onStudy}
                  title="Study this set"
                  aria-label="Study set"
                >
                  <PlayCircleIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">Study</span>
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 flex items-center gap-1"
                  onClick={() => onEdit && onEdit(set, sets.indexOf(set))}
                  disabled={!onEdit}
                  title="Edit set"
                  aria-label="Edit set"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 flex items-center gap-1"
                  onClick={() => handleDuplicate(set)}
                  title="Duplicate set"
                  aria-label="Duplicate set"
                >
                  <DocumentDuplicateIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">Duplicate</span>
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center gap-1"
                  onClick={() => handleExport(set)}
                  title="Export set"
                  aria-label="Export set"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">Export</span>
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                  onClick={() => handleDelete(sets.indexOf(set))}
                  title="Delete set"
                  aria-label="Delete set"
                >
                  <TrashIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 