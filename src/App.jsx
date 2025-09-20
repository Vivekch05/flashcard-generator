import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import TextToFlashcard from "./TextToFlashcard";
import FlashcardSetEditor from "./FlashcardSetEditor";
import FlashcardSetList from "./FlashcardSetList";
import FlashcardStudy from "./FlashcardStudy";
import Notification from "./Notification";
import ErrorBoundary from "./ErrorBoundary";
import LoadingSpinner from "./LoadingSpinner";

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
  // Stats for dashboard
  const [stats, setStats] = useState({ totalSets: 0, totalCards: 0, recentActivity: [] });
  // Notification state
  const [notification, setNotification] = useState(null);
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      loadStats();
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [refreshKey]);

  const loadStats = () => {
    try {
      const sets = JSON.parse(localStorage.getItem("flashcardSets") || "[]");
      setStats({
        totalSets: sets.length,
        totalCards: sets.reduce((acc, set) => acc + (set.cards?.length || 0), 0),
        recentActivity: sets.slice(-3).reverse()
      });
    } catch (error) {
      console.error("Error loading stats:", error);
      setNotification({
        message: "Error loading your data. Please refresh the page.",
        type: "error"
      });
    }
  };

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
    try {
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
      loadStats(); // Refresh stats
      setNotification({
        message: editingSet ? "Set updated successfully!" : "Set saved successfully!",
        type: "success"
      });
    } catch (error) {
      console.error("Error saving set:", error);
      setNotification({
        message: "Failed to save set. Please try again.",
        type: "error"
      });
    }
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

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Loading Smart Study..." size="large" />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col gradient-bg dark:gradient-bg-dark transition-colors duration-300">
        <Header />
        <main className="flex-1 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {studySet ? (
            <div className="max-w-4xl mx-auto">
              <FlashcardStudy set={studySet} onExit={handleExitStudy} />
            </div>
          ) : (
            <>
              {/* Dashboard Overview */}
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="card dark:card-dark p-6 text-center scale-in hover:shadow-xl transition-all duration-300" style={{ animationDelay: '0.1s' }}>
                    <div className="text-3xl font-bold text-gradient mb-2">{stats.totalSets}</div>
                    <div className="text-gray-600 dark:text-gray-400">Total Sets</div>
                  </div>
                  <div className="card dark:card-dark p-6 text-center scale-in hover:shadow-xl transition-all duration-300" style={{ animationDelay: '0.2s' }}>
                    <div className="text-3xl font-bold text-emerald-600 mb-2">{stats.totalCards}</div>
                    <div className="text-gray-600 dark:text-gray-400">Total Cards</div>
                  </div>
                  <div className="card dark:card-dark p-6 text-center scale-in hover:shadow-xl transition-all duration-300" style={{ animationDelay: '0.3s' }}>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{workingSet.length}</div>
                    <div className="text-gray-600 dark:text-gray-400">Working Set</div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
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
                </div>
                <div>
                  <FlashcardSetList key={refreshKey} onStudy={handleStudy} onEdit={handleEditSet} onNotification={setNotification} />
                </div>
              </div>
            </>
          )}
        </div>
        </main>
        <Footer />
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App; 