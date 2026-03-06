// ── Meta ──

export type QuizMode = "spectrum" | "choice";

export interface DiagnosticMeta {
  slug: string;
  title: string;
  description: string;
  questionCount: number;
  duration: string;
  quizModes: QuizMode[];
  defaultMode: QuizMode;
  theme: {
    gradient: [string, string]; // from, to (tailwind-safe hex)
  };
}

// ── Groups & Types ──

export interface Group {
  key: string;
  label: string;
  theme: string;
  color: string;
  emoji: string;
  typeCount: number;
}

export interface ResultType {
  id: number;
  slug: string;
  code: string;
  name: string;
  emoji: string;
  character: string;
  description: string;
  detail: string;
  groupKey: string;
  radar: Record<string, number>;
}

// ── Spectrum ──

export interface SpectrumAxisDef {
  key: string;
  label: string;
  highLabel: string;
  lowLabel: string;
  threshold: number;
  highCode: string;
  lowCode: string;
}

export interface SpectrumQuestion {
  id: number;
  axis: string;
  statement: string;
}

export interface SpectrumConfig {
  axes: SpectrumAxisDef[];
  questions: SpectrumQuestion[];
}

// ── Choice ──

export interface ChoiceOption {
  text: string;
  scores: Record<string, number>; // typeId (string) -> points
}

export interface ChoiceQuestion {
  id: number;
  category: string;
  text: string;
  choices: ChoiceOption[];
}

export interface ChoiceConfig {
  questions: ChoiceQuestion[];
}

// ── Unified Config ──

export interface DiagnosticConfig {
  meta: DiagnosticMeta;
  groups: Group[];
  types: ResultType[];
  radarLabels: string[];
  spectrum?: SpectrumConfig;
  choice?: ChoiceConfig;
}

// ── Answers ──

export interface SpectrumAnswer {
  questionId: number;
  value: 1 | 2 | 3 | 4 | 5;
}

export interface ChoiceAnswer {
  questionId: number;
  choiceIndex: number;
}

// ── Result ──

export interface DiagnosisResult {
  type: ResultType;
  axisScores?: Record<string, number>; // spectrum mode: 0-100 per axis
}
