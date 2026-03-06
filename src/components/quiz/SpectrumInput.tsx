"use client";

import type { SpectrumQuestion } from "@/engine/types";

interface SpectrumInputProps {
  question: SpectrumQuestion;
  axisLabel: string;
  highLabel?: string;
  lowLabel?: string;
  onAnswer: (value: 1 | 2 | 3 | 4 | 5) => void;
  isAnimating: boolean;
}

const buttonSizes = [
  "w-14 h-14",  // 1: strongly agree (large)
  "w-11 h-11",  // 2: somewhat agree (medium)
  "w-9 h-9",    // 3: neutral (small)
  "w-11 h-11",  // 4: somewhat disagree (medium)
  "w-14 h-14",  // 5: strongly disagree (large)
] as const;

export default function SpectrumInput({
  question,
  axisLabel,
  highLabel = "そう思う",
  lowLabel = "思わない",
  onAnswer,
  isAnimating,
}: SpectrumInputProps) {
  return (
    <div
      className={`w-full max-w-lg mx-auto transition-all duration-300 ${
        isAnimating
          ? "opacity-0 translate-x-8"
          : "opacity-100 translate-x-0"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 mb-5">
          {axisLabel}
        </span>

        <h2 className="text-lg sm:text-xl font-bold text-center mb-8 leading-relaxed">
          {question.statement}
        </h2>

        <div className="flex items-center justify-between px-1 mb-3">
          <span className="text-xs font-bold text-pink-400 shrink-0">{highLabel}</span>
          <span className="text-xs font-bold text-purple-400 shrink-0">{lowLabel}</span>
        </div>
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {([1, 2, 3, 4, 5] as const).map((value, i) => (
            <button
              key={value}
              onClick={() => onAnswer(value)}
              className={`${buttonSizes[i]} rounded-full border-2 transition-all duration-150 active:scale-90 ${
                i < 2
                  ? "border-pink-300 bg-pink-50 hover:bg-pink-200 hover:border-pink-500 active:bg-pink-300"
                  : i === 2
                    ? "border-gray-300 bg-gray-50 hover:bg-gray-200 hover:border-gray-500 active:bg-gray-300"
                    : "border-purple-300 bg-purple-50 hover:bg-purple-200 hover:border-purple-500 active:bg-purple-300"
              }`}
              aria-label={
                value === 1
                  ? "そう思う"
                  : value === 2
                    ? "ややそう思う"
                    : value === 3
                      ? "どちらでもない"
                      : value === 4
                        ? "あまりそう思わない"
                        : "そう思わない"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
