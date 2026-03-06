import type {
  SpectrumConfig,
  ResultType,
  SpectrumAnswer,
  DiagnosisResult,
} from "../types";

/**
 * Calculate normalized axis scores (0-100) from spectrum answers.
 */
export function calculateAxisScores(
  config: SpectrumConfig,
  answers: SpectrumAnswer[]
): Record<string, number> {
  const axisSums: Record<string, number> = {};
  const axisCounts: Record<string, number> = {};

  for (const axis of config.axes) {
    axisSums[axis.key] = 0;
    axisCounts[axis.key] = 0;
  }

  for (const answer of answers) {
    const question = config.questions.find((q) => q.id === answer.questionId);
    if (!question) continue;

    // 1(agree)=5pts, 2=4pts, 3=3pts, 4=2pts, 5(disagree)=1pt
    const score = 6 - answer.value;
    axisSums[question.axis] += score;
    axisCounts[question.axis] += 1;
  }

  const result: Record<string, number> = {};
  for (const axis of config.axes) {
    const count = axisCounts[axis.key];
    if (count === 0) {
      result[axis.key] = 0;
      continue;
    }
    const min = count;
    const max = count * 5;
    result[axis.key] = ((axisSums[axis.key] - min) / (max - min)) * 100;
  }

  return result;
}

/**
 * Generate a type code from axis scores using the axis definitions.
 */
function scoreToCode(
  config: SpectrumConfig,
  scores: Record<string, number>
): string {
  return config.axes
    .map((axis) =>
      scores[axis.key] > axis.threshold ? axis.highCode : axis.lowCode
    )
    .join("");
}

/**
 * Diagnose spectrum mode: calculate axis scores, generate code, find type.
 */
export function diagnoseSpectrum(
  config: SpectrumConfig,
  types: ResultType[],
  answers: SpectrumAnswer[]
): DiagnosisResult {
  const axisScores = calculateAxisScores(config, answers);
  const code = scoreToCode(config, axisScores);
  const type = types.find((t) => t.code === code) ?? types[0];
  return { type, axisScores };
}
