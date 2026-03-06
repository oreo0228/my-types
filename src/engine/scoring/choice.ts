import type {
  ChoiceConfig,
  ResultType,
  ChoiceAnswer,
  DiagnosisResult,
} from "../types";

/**
 * Calculate per-type scores from choice answers.
 */
export function calculateChoiceScores(
  config: ChoiceConfig,
  types: ResultType[],
  answers: ChoiceAnswer[]
): Map<number, number> {
  const scores = new Map<number, number>();

  for (const type of types) {
    scores.set(type.id, 0);
  }

  for (const answer of answers) {
    const question = config.questions.find((q) => q.id === answer.questionId);
    if (!question) continue;

    const choice = question.choices[answer.choiceIndex];
    if (!choice) continue;

    for (const [typeIdStr, points] of Object.entries(choice.scores)) {
      const typeId = Number(typeIdStr);
      scores.set(typeId, (scores.get(typeId) ?? 0) + points);
    }
  }

  return scores;
}

/**
 * Diagnose choice mode: aggregate scores, return highest-scoring type.
 */
export function diagnoseChoice(
  config: ChoiceConfig,
  types: ResultType[],
  answers: ChoiceAnswer[]
): DiagnosisResult {
  const scores = calculateChoiceScores(config, types, answers);

  let maxScore = -1;
  let resultType = types[0];

  // Lower ID wins on tie (stable)
  for (const type of types) {
    const score = scores.get(type.id) ?? 0;
    if (score > maxScore) {
      maxScore = score;
      resultType = type;
    }
  }

  return { type: resultType };
}
