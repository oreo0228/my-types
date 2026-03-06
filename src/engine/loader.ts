import type {
  DiagnosticConfig,
  DiagnosticMeta,
  Group,
  ResultType,
  SpectrumConfig,
  ChoiceConfig,
} from "./types";

// Static imports of all content JSON files.
// When adding a new diagnostic, add its imports here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonAny = any;
import snsMeta from "@/content/sns-brain-type/meta.json";
import snsTypes from "@/content/sns-brain-type/types.json";
import snsSpectrum from "@/content/sns-brain-type/spectrum-questions.json";
import snsChoice from "@/content/sns-brain-type/choice-questions.json";

interface RawTypesData {
  groups: Group[];
  types: ResultType[];
  radarLabels: string[];
}

function buildConfig(
  meta: DiagnosticMeta,
  typesData: RawTypesData,
  spectrum?: SpectrumConfig,
  choice?: ChoiceConfig
): DiagnosticConfig {
  return {
    meta,
    groups: typesData.groups,
    types: typesData.types,
    radarLabels: typesData.radarLabels,
    spectrum: meta.quizModes.includes("spectrum") ? spectrum : undefined,
    choice: meta.quizModes.includes("choice") ? choice : undefined,
  };
}

// Registry of all diagnostics
const registry: Record<string, DiagnosticConfig> = {
  "sns-brain-type": buildConfig(
    snsMeta as JsonAny as DiagnosticMeta,
    snsTypes as JsonAny as RawTypesData,
    snsSpectrum as JsonAny as SpectrumConfig,
    snsChoice as JsonAny as ChoiceConfig
  ),
};

/**
 * List all diagnostic slugs.
 */
export function getAllDiagnosticSlugs(): string[] {
  return Object.keys(registry);
}

/**
 * Load a full diagnostic configuration by slug.
 * Returns null if the slug does not exist.
 */
export function loadDiagnostic(slug: string): DiagnosticConfig | null {
  return registry[slug] ?? null;
}
