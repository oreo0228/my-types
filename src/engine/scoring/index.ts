import type {
  DiagnosticConfig,
  QuizMode,
  SpectrumAnswer,
  ChoiceAnswer,
  DiagnosisResult,
} from "../types";
import { diagnoseSpectrum } from "./spectrum";
import { diagnoseChoice } from "./choice";

/**
 * Unified entry point: diagnose based on mode.
 */
export function diagnose(
  config: DiagnosticConfig,
  mode: QuizMode,
  answers: SpectrumAnswer[] | ChoiceAnswer[]
): DiagnosisResult {
  if (mode === "spectrum" && config.spectrum) {
    return diagnoseSpectrum(
      config.spectrum,
      config.types,
      answers as SpectrumAnswer[]
    );
  }
  if (mode === "choice" && config.choice) {
    return diagnoseChoice(
      config.choice,
      config.types,
      answers as ChoiceAnswer[]
    );
  }
  throw new Error(`Unsupported mode "${mode}" for diagnostic "${config.meta.slug}"`);
}

export { diagnoseSpectrum } from "./spectrum";
export { diagnoseChoice } from "./choice";
export { calculateAxisScores } from "./spectrum";
