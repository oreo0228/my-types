import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllDiagnosticSlugs, loadDiagnostic } from "@/engine/loader";
import type { QuizMode } from "@/engine/types";
import QuizShell from "@/components/quiz/QuizShell";

interface Props {
  params: Promise<{ diagnostic: string }>;
  searchParams: Promise<{ mode?: string }>;
}

export function generateStaticParams() {
  return getAllDiagnosticSlugs().map((diagnostic) => ({ diagnostic }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { diagnostic } = await params;
  const config = loadDiagnostic(diagnostic);
  if (!config) return { title: "診断が見つかりません" };

  return {
    title: `${config.meta.title} - クイズ | My Types`,
    description: `${config.meta.title}の診断クイズ`,
  };
}

export default async function QuizPage({ params, searchParams }: Props) {
  const { diagnostic } = await params;
  const { mode: modeParam } = await searchParams;
  const config = loadDiagnostic(diagnostic);
  if (!config) notFound();

  // Determine quiz mode
  const requestedMode = modeParam as QuizMode | undefined;
  const mode: QuizMode =
    requestedMode && config.meta.quizModes.includes(requestedMode)
      ? requestedMode
      : config.meta.defaultMode;

  if (mode === "spectrum" && !config.spectrum) notFound();
  if (mode === "choice" && !config.choice) notFound();

  return (
    <QuizShell
      diagnosticSlug={diagnostic}
      mode={mode}
      spectrumConfig={config.spectrum}
      choiceConfig={config.choice}
      types={config.types}
      groups={config.groups}
      radarLabels={config.radarLabels}
      title={config.meta.title}
    />
  );
}
