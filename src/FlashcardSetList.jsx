import React, { useEffect, useState, useRef } from "react";
import { 
  PencilSquareIcon, 
  TrashIcon, 
  PlayCircleIcon, 
  ArrowDownTrayIcon, 
  DocumentDuplicateIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon
} from "@heroicons/react/24/solid";

export default function FlashcardSetList({ onStudy, onEdit, onNotification }) {
  const [sets, setSets] = useState([]);
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [sortBy, setSortBy] = useState("recent"); // recent, name, cards
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
    if (!window.confirm("Are you sure you want to delete this set? This action cannot be undone.")) return;
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

  // Filter and sort sets
  const filteredAndSortedSets = sets
    .filter((set) => {
      const matchesSearch = set.name.toLowerCase().includes(search.toLowerCase()) ||
        (set.tags && set.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())));
      const matchesTag = !filterTag || (set.tags && set.tags.includes(filterTag));
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "cards":
          return b.cards.length - a.cards.length;
        case "recent":
        default:
          return b.created - a.created;
      }
    });

  // Get all unique tags
  const allTags = [...new Set(sets.flatMap(set => set.tags || []))];

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
        if (onNotification) {
          onNotification({ message: "Set imported successfully!", type: "success" });
        }
      } catch {
        if (onNotification) {
          onNotification({ message: "Invalid file format. Please select a valid flashcard set JSON file.", type: "error" });
        }
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <section className="card dark:card-dark p-8 fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg floating-animation">
          <DocumentDuplicateIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Your Flashcard Sets</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage, study, and organize your learning materials</p>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-xl pl-12 pr-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all duration-300 ease-out bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
              placeholder="Search sets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search sets"
            />
          </div>
          
          <select
            className="input-field dark:input-field-dark"
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            aria-label="Filter by tag"
          >
            <option value="">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          
          <select
            className="input-field dark:input-field-dark"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort by"
          >
            <option value="recent">Most Recent</option>
            <option value="name">Name A-Z</option>
            <option value="cards">Most Cards</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredAndSortedSets.length} of {sets.length} sets
          </div>
          <button
            className="btn-primary flex items-center space-x-2"
            onClick={handleImportClick}
            aria-label="Import set"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            <span>Import Set</span>
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

      {/* Sets List */}
      {filteredAndSortedSets.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full flex items-center justify-center mb-4 floating-animation">
            <DocumentDuplicateIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            {sets.length === 0 ? "No sets created yet" : "No sets match your search"}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {sets.length === 0 
              ? "Create your first flashcard set to get started with studying"
              : "Try adjusting your search terms or filters"
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedSets.map((set, idx) => (
            <div key={set.created} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{set.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>{set.cards.length} cards</span>
                      <span>•</span>
                      <span>{new Date(set.created).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {set.tags && set.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {set.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    className="btn-primary flex items-center space-x-2 px-4 py-2"
                    onClick={() => onStudy && onStudy(set)}
                    disabled={!onStudy}
                    title="Study this set"
                    aria-label="Study set"
                  >
                    <PlayCircleIcon className="h-5 w-5" />
                    <span>Study</span>
                  </button>
                  
                  <button
                    className="btn-secondary flex items-center space-x-2 px-4 py-2"
                    onClick={() => onEdit && onEdit(set, sets.indexOf(set))}
                    disabled={!onEdit}
                    title="Edit set"
                    aria-label="Edit set"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                    <span>Edit</span>
                  </button>
                  
                  <button
                    className="btn-secondary flex items-center space-x-2 px-4 py-2"
                    onClick={() => handleDuplicate(set)}
                    title="Duplicate set"
                    aria-label="Duplicate set"
                  >
                    <DocumentDuplicateIcon className="h-5 w-5" />
                    <span>Copy</span>
                  </button>
                  
                  <button
                    className="btn-secondary flex items-center space-x-2 px-4 py-2"
                    onClick={() => handleExport(set)}
                    title="Export set"
                    aria-label="Export set"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5" />
                    <span>Export</span>
                  </button>
                  
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
                    onClick={() => handleDelete(sets.indexOf(set))}
                    title="Delete set"
                    aria-label="Delete set"
                  >
                    <TrashIcon className="h-5 w-5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
} 