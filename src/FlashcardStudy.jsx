import React, { useState } from "react";
import { 
  PlayIcon, 
  CheckIcon, 
  ArrowPathIcon, 
  XMarkIcon,
  ChartBarIcon,
  TrophyIcon
} from "@heroicons/react/24/solid";

const ASSESSMENTS = [
  { label: "Easy", color: "bg-emerald-500 hover:bg-emerald-600", icon: CheckIcon },
  { label: "Medium", color: "bg-yellow-500 hover:bg-yellow-600", icon: CheckIcon },
  { label: "Hard", color: "bg-red-500 hover:bg-red-600", icon: CheckIcon },
];

export default function FlashcardStudy({ set, onExit }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState([]); // {assessment: "Easy"|...}
  const [showHint, setShowHint] = useState(false);

  const cards = set.cards;
  const current = cards[index];
  const progress = ((index + 1) / cards.length) * 100;

  const handleFlip = () => setFlipped(true);

  const handleAssessment = (assessment) => {
    setResults((prev) => [...prev, assessment]);
    setFlipped(false);
    setShowHint(false);
    if (index < cards.length - 1) {
      setIndex(index + 1);
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setFlipped(false);
    setResults([]);
    setShowHint(false);
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
      setFlipped(false);
      setShowHint(false);
      setResults((prev) => prev.slice(0, -1));
    }
  };

  // Summary
  if (results.length === cards.length) {
    const summary = ASSESSMENTS.map((a) => ({
      label: a.label,
      count: results.filter((r) => r === a.label).length,
      percentage: Math.round((results.filter((r) => r === a.label).length / results.length) * 100)
    }));
    
    const totalEasy = summary.find(s => s.label === "Easy")?.count || 0;
    const totalHard = summary.find(s => s.label === "Hard")?.count || 0;
    const mastery = Math.round(((totalEasy + (summary.find(s => s.label === "Medium")?.count || 0) * 0.5) / results.length) * 100);

    return (
      <div className="card dark:card-dark p-8 text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
            <TrophyIcon className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Study Complete!</h2>
          <p className="text-gray-600 dark:text-gray-400">Great job completing your study session</p>
        </div>

        {/* Mastery Score */}
        <div className="mb-8">
          <div className="text-4xl font-bold text-gradient mb-2">{mastery}%</div>
          <div className="text-gray-600 dark:text-gray-400">Mastery Score</div>
        </div>

        {/* Assessment Breakdown */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {summary.map((s) => (
            <div key={s.label} className="text-center">
              <div className={`text-2xl font-bold ${
                s.label === "Easy" ? "text-emerald-600" : 
                s.label === "Medium" ? "text-yellow-600" : "text-red-600"
              } mb-1`}>
                {s.count}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{s.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-500">{s.percentage}%</div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            className="btn-primary flex items-center space-x-2"
            onClick={handleRestart}
            aria-label="Restart study session"
          >
            <ArrowPathIcon className="h-5 w-5" />
            <span>Restart Session</span>
          </button>
          <button
            className="btn-secondary flex items-center space-x-2"
            onClick={onExit}
            aria-label="Exit study session"
          >
            <XMarkIcon className="h-5 w-5" />
            <span>Exit Study</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card dark:card-dark p-8 max-w-4xl mx-auto fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Studying: {set.name}
        </h2>
        <div className="flex items-center justify-center space-x-4 text-gray-600 dark:text-gray-400">
          <span>Card {index + 1} of {cards.length}</span>
          <span>•</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-2xl">
          <div
            className={`relative w-full h-64 transition-all duration-700 transform ${
              flipped ? "rotate-y-180" : ""
            }`}
            style={{ perspective: 1000 }}
          >
            {/* Front of card */}
            <div
              className={`absolute w-full h-full flex items-center justify-center text-xl font-semibold rounded-2xl shadow-lg cursor-pointer select-none transition-all duration-500 ${
                flipped ? "rotate-y-180 opacity-0" : "opacity-100"
              }`}
              style={{ 
                backfaceVisibility: "hidden",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white"
              }}
              onClick={!flipped ? handleFlip : undefined}
              title={!flipped ? "Click to flip" : undefined}
            >
              <div className="text-center px-6">
                <div className="text-sm text-blue-100 mb-2">Question</div>
                <div className="text-2xl leading-relaxed">{current.question}</div>
              </div>
            </div>

            {/* Back of card */}
            <div
              className={`absolute w-full h-full flex items-center justify-center text-xl font-semibold rounded-2xl shadow-lg transition-all duration-500 ${
                flipped ? "rotate-y-0 opacity-100" : "rotate-y-180 opacity-0"
              }`}
              style={{ 
                backfaceVisibility: "hidden",
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                color: "white",
                transform: "rotateY(180deg)"
              }}
            >
              <div className="text-center px-6">
                <div className="text-sm text-pink-100 mb-2">Answer</div>
                <div className="text-2xl leading-relaxed">{current.answer}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      {!flipped ? (
        <div className="text-center">
          <button
            className="btn-primary flex items-center space-x-2 mx-auto"
            onClick={handleFlip}
            aria-label="Flip card"
          >
            <PlayIcon className="h-5 w-5" />
            <span>Flip Card</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Self-Assessment */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              How well did you know this?
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {ASSESSMENTS.map((a) => {
                const IconComponent = a.icon;
                return (
                  <button
                    key={a.label}
                    className={`${a.color} text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2`}
                    onClick={() => handleAssessment(a.label)}
                    aria-label={`Mark as ${a.label}`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{a.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center space-x-4">
            <button
              className="btn-secondary flex items-center space-x-2"
              onClick={handlePrevious}
              disabled={index === 0}
              aria-label="Previous card"
            >
              <ArrowPathIcon className="h-4 w-4" />
              <span>Previous</span>
            </button>
          </div>
        </div>
      )}

      {/* Exit Button */}
      <div className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          className="text-gray-500 dark:text-gray-400 underline text-sm hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
          onClick={onExit}
          aria-label="Exit study session"
        >
          Exit Study
        </button>
      </div>
    </div>
  );
} 