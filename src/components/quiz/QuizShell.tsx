"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import type {
  QuizMode,
  SpectrumConfig,
  ChoiceConfig,
  ResultType,
  SpectrumAnswer,
  ChoiceAnswer,
} from "@/engine/types";
import { diagnose } from "@/engine/scoring";
import ProgressBar from "./ProgressBar";
import SpectrumInput from "./SpectrumInput";
import ChoiceInput from "./ChoiceInput";

interface QuizShellProps {
  diagnosticSlug: string;
  mode: QuizMode;
  spectrumConfig?: SpectrumConfig;
  choiceConfig?: ChoiceConfig;
  types: ResultType[];
  groups: { key: string; label: string; theme: string; color: string; emoji: string; typeCount: number }[];
  radarLabels: string[];
  title: string;
}

// Category labels are now loaded from i18n (quiz.categories namespace)

export default function QuizShell({
  diagnosticSlug,
  mode,
  spectrumConfig,
  choiceConfig,
  types,
  groups,
  radarLabels,
  title,
}: QuizShellProps) {
  const router = useRouter();
  const tCategories = useTranslations("quiz.categories");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [spectrumAnswers, setSpectrumAnswers] = useState<SpectrumAnswer[]>([]);
  const [choiceAnswers, setChoiceAnswers] = useState<ChoiceAnswer[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const questions =
    mode === "spectrum"
      ? spectrumConfig?.questions ?? []
      : choiceConfig?.questions ?? [];

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  // Build axis label map for spectrum mode
  const axisLabelMap: Record<string, string> = {};
  const axisHighLabelMap: Record<string, string> = {};
  const axisLowLabelMap: Record<string, string> = {};
  if (spectrumConfig) {
    for (const axis of spectrumConfig.axes) {
      axisLabelMap[axis.key] = axis.label;
      axisHighLabelMap[axis.key] = axis.highLabel;
      axisLowLabelMap[axis.key] = axis.lowLabel;
    }
  }

  const handleSpectrumAnswer = useCallback(
    (value: 1 | 2 | 3 | 4 | 5) => {
      if (isAnimating || !spectrumConfig) return;

      const q = spectrumConfig.questions[currentIndex];
      const newAnswer: SpectrumAnswer = { questionId: q.id, value };
      const newAnswers = [...spectrumAnswers, newAnswer];

      if (currentIndex < totalQuestions - 1) {
        setIsAnimating(true);
        setSpectrumAnswers(newAnswers);
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
          setIsAnimating(false);
        }, 300);
      } else {
        const result = diagnose(
          { meta: {} as never, groups, types, radarLabels, spectrum: spectrumConfig },
          "spectrum",
          newAnswers
        );
        router.push(`/${diagnosticSlug}/result/${result.type.slug}`);
      }
    },
    [currentIndex, spectrumAnswers, isAnimating, spectrumConfig, totalQuestions, types, groups, radarLabels, diagnosticSlug, router]
  );

  const handleChoiceAnswer = useCallback(
    (choiceIndex: number) => {
      if (isAnimating || !choiceConfig) return;

      const q = choiceConfig.questions[currentIndex];
      const newAnswer: ChoiceAnswer = { questionId: q.id, choiceIndex };
      const newAnswers = [...choiceAnswers, newAnswer];

      if (currentIndex < totalQuestions - 1) {
        setIsAnimating(true);
        setChoiceAnswers(newAnswers);
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
          setIsAnimating(false);
        }, 300);
      } else {
        const result = diagnose(
          { meta: {} as never, groups, types, radarLabels, choice: choiceConfig },
          "choice",
          newAnswers
        );
        router.push(`/${diagnosticSlug}/result/${result.type.slug}`);
      }
    },
    [currentIndex, choiceAnswers, isAnimating, choiceConfig, totalQuestions, types, groups, radarLabels, diagnosticSlug, router]
  );

  if (!currentQuestion) return null;

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-lg">
        <h1 className="text-center text-sm font-medium text-purple-500 mb-6">
          {title}
        </h1>
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />

        {mode === "spectrum" && spectrumConfig ? (
          <SpectrumInput
            question={spectrumConfig.questions[currentIndex]}
            axisLabel={axisLabelMap[spectrumConfig.questions[currentIndex].axis] ?? ""}
            highLabel={axisHighLabelMap[spectrumConfig.questions[currentIndex].axis]}
            lowLabel={axisLowLabelMap[spectrumConfig.questions[currentIndex].axis]}
            onAnswer={handleSpectrumAnswer}
            isAnimating={isAnimating}
          />
        ) : choiceConfig ? (
          <ChoiceInput
            question={choiceConfig.questions[currentIndex]}
            categoryLabel={tCategories(choiceConfig.questions[currentIndex].category as never)}
            onAnswer={handleChoiceAnswer}
            isAnimating={isAnimating}
          />
        ) : null}
      </div>
    </main>
  );
}
