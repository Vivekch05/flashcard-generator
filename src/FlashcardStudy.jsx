import React, { useState } from "react";

const ASSESSMENTS = [
  { label: "Easy", color: "bg-green-500" },
  { label: "Medium", color: "bg-yellow-500" },
  { label: "Hard", color: "bg-red-500" },
];

export default function FlashcardStudy({ set, onExit }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState([]); // {assessment: "Easy"|...}

  const cards = set.cards;
  const current = cards[index];

  const handleFlip = () => setFlipped(true);

  const handleAssessment = (assessment) => {
    setResults((prev) => [...prev, assessment]);
    setFlipped(false);
    if (index < cards.length - 1) {
      setIndex(index + 1);
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setFlipped(false);
    setResults([]);
  };

  // Summary
  if (results.length === cards.length) {
    const summary = ASSESSMENTS.map((a) => ({
      label: a.label,
      count: results.filter((r) => r === a.label).length,
    }));
    return (
      <div className="bg-white p-6 rounded shadow mb-6 text-center">
        <h2 className="text-xl font-bold mb-4">Study Complete!</h2>
        <div className="mb-4">
          {summary.map((s) => (
            <div key={s.label} className="mb-1">
              <span className="font-semibold">{s.label}:</span> {s.count}
            </div>
          ))}
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
          onClick={handleRestart}
          aria-label="Restart study session"
        >
          Restart
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={onExit}
          aria-label="Exit study session"
        >
          Exit
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded shadow mb-6 text-center">
      <h2 className="text-xl font-bold mb-4">Study: {set.name}</h2>
      <div className="mb-2 text-gray-500">
        Card {index + 1} of {cards.length}
      </div>
      <div className="flex justify-center mb-4" style={{ perspective: 1000 }}>
        <div
          className={`relative w-full max-w-xs h-32 transition-transform duration-500 transform ${flipped ? "rotate-y-180" : ""}`}
          style={{ perspective: 1000 }}
        >
          <div
            className={`absolute w-full h-full flex items-center justify-center text-lg font-semibold bg-gray-50 border rounded-lg shadow cursor-pointer select-none transition-transform duration-500 ${flipped ? "rotate-y-180" : ""}`}
            onClick={!flipped ? handleFlip : undefined}
            aria-label={!flipped ? "Show answer" : "Show question"}
            style={{ backfaceVisibility: "hidden", minHeight: 80 }}
            title={!flipped ? "Click to flip" : undefined}
          >
            {flipped ? current.answer : current.question}
          </div>
          <div
            className={`absolute w-full h-full flex items-center justify-center text-lg font-semibold bg-gray-100 border rounded-lg shadow transition-transform duration-500 ${flipped ? "rotate-y-0" : "rotate-y-180"}`}
            style={{ backfaceVisibility: "hidden", minHeight: 80, transform: "rotateY(180deg)" }}
            aria-label={flipped ? "Show answer" : "Show question"}
          >
            {flipped ? current.question : current.answer}
          </div>
        </div>
      </div>
      {!flipped ? (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleFlip}
          aria-label="Flip card"
        >
          Flip
        </button>
      ) : (
        <div className="flex justify-center gap-2">
          {ASSESSMENTS.map((a) => (
            <button
              key={a.label}
              className={`${a.color} text-white px-4 py-2 rounded hover:opacity-90`}
              onClick={() => handleAssessment(a.label)}
              aria-label={`Mark as ${a.label}`}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
      <div className="mt-4">
        <button
          className="text-gray-500 underline text-sm"
          onClick={onExit}
          aria-label="Exit study session"
        >
          Exit Study
        </button>
      </div>
    </div>
  );
} 