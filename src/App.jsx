import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import TextToFlashcard from "./TextToFlashcard";
import FlashcardSetEditor from "./FlashcardSetEditor";
import FlashcardSetList from "./FlashcardSetList";
import FlashcardStudy from "./FlashcardStudy";

function App() {
  // Working set of flashcards (can add from multiple generations)
  const [workingSet, setWorkingSet] = useState([]);
  // For triggering set list refresh
  const [refreshKey, setRefreshKey] = useState(0);
  // Editing state
  const [editingSet, setEditingSet] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editorName, setEditorName] = useState("");
  const [editorTags, setEditorTags] = useState("");
  // Study mode state
  const [studySet, setStudySet] = useState(null);

  // Add generated flashcards to working set
  const handleAddToSet = (newCards) => {
    setWorkingSet((prev) => [
      ...prev,
      ...newCards.filter(
        (card) => card.question && card.answer && !prev.some(
          (c) => c.question === card.question && c.answer === card.answer
        )
      ),
    ]);
  };

  // Save or update set in localStorage
  const handleSaveSet = (setObj) => {
    let prevSets = JSON.parse(localStorage.getItem("flashcardSets") || "[]");
    if (editingSet !== null && editingIndex !== null) {
      // Update existing set
      prevSets[editingIndex] = {
        ...setObj,
        created: editingSet.created, // preserve original timestamp
      };
    } else {
      // Save new set
      prevSets = [...prevSets, setObj];
    }
    localStorage.setItem("flashcardSets", JSON.stringify(prevSets));
    setWorkingSet([]); // Clear working set after save
    setEditingSet(null);
    setEditingIndex(null);
    setEditorName("");
    setEditorTags("");
    setRefreshKey((k) => k + 1); // Trigger set list refresh
    alert("Set saved!");
  };

  // Edit handler
  const handleEditSet = (set, idx) => {
    setEditingSet(set);
    setEditingIndex(idx);
    setWorkingSet(set.cards);
    setEditorName(set.name);
    setEditorTags(set.tags ? set.tags.join(", ") : "");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingSet(null);
    setEditingIndex(null);
    setWorkingSet([]);
    setEditorName("");
    setEditorTags("");
  };

  // Study handler
  const handleStudy = (set) => {
    setStudySet(set);
  };

  // Exit study mode
  const handleExitStudy = () => {
    setStudySet(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="p-8 bg-white dark:bg-gray-900 rounded shadow-md w-full max-w-xl my-8 border border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">Welcome! Start by creating or importing your first flashcard set.</p>
          {studySet ? (
            <FlashcardStudy set={studySet} onExit={handleExitStudy} />
          ) : (
            <>
              <TextToFlashcard onGenerate={handleAddToSet} />
              <FlashcardSetEditor
                flashcards={workingSet}
                setFlashcards={setWorkingSet}
                onSaveSet={handleSaveSet}
                editing={editingSet !== null}
                initialName={editorName}
                initialTags={editorTags}
                onCancelEdit={handleCancelEdit}
              />
              <FlashcardSetList key={refreshKey} onStudy={handleStudy} onEdit={handleEditSet} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App; 