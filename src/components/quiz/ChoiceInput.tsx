"use client";

import type { ChoiceQuestion } from "@/engine/types";

interface ChoiceInputProps {
  question: ChoiceQuestion;
  categoryLabel?: string;
  onAnswer: (choiceIndex: number) => void;
  isAnimating: boolean;
}

export default function ChoiceInput({
  question,
  categoryLabel,
  onAnswer,
  isAnimating,
}: ChoiceInputProps) {
  return (
    <div
      className={`w-full max-w-lg mx-auto transition-all duration-300 ${
        isAnimating
          ? "opacity-0 translate-x-8"
          : "opacity-100 translate-x-0"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {categoryLabel && (
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 mb-4">
            {categoryLabel}
          </span>
        )}
        <h2 className="text-lg sm:text-xl font-bold mb-6 leading-relaxed">
          {question.text}
        </h2>
        <div className="space-y-3">
          {question.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => onAnswer(index)}
              className="w-full text-left px-5 py-4 rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 active:scale-[0.98] transition-all duration-150 text-sm sm:text-base"
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
