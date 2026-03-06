import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAllDiagnosticSlugs, loadDiagnostic } from "@/engine/loader";
import ResultCard from "@/components/result/ResultCard";
import ShareButtons from "@/components/result/ShareButtons";

interface Props {
  params: Promise<{ diagnostic: string; slug: string }>;
}

export function generateStaticParams() {
  const slugs = getAllDiagnosticSlugs();
  const params: { diagnostic: string; slug: string }[] = [];

  for (const diagnostic of slugs) {
    const config = loadDiagnostic(diagnostic);
    if (!config) continue;
    for (const type of config.types) {
      params.push({ diagnostic, slug: type.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { diagnostic, slug } = await params;
  const config = loadDiagnostic(diagnostic);
  if (!config) return { title: "結果が見つかりません" };

  const type = config.types.find((t) => t.slug === slug);
  if (!type) return { title: "結果が見つかりません" };

  return {
    title: `${type.name} | ${config.meta.title} - My Types`,
    description: `あなたの${config.meta.title}は「${type.name}」！${type.description}`,
    openGraph: {
      title: `私の${config.meta.title}は「${type.name}」！`,
      description: type.description,
    },
  };
}

export default async function ResultPage({ params }: Props) {
  const { diagnostic, slug } = await params;
  const config = loadDiagnostic(diagnostic);
  if (!config) notFound();

  const type = config.types.find((t) => t.slug === slug);
  if (!type) notFound();

  const group = config.groups.find((g) => g.key === type.groupKey);
  if (!group) notFound();

  const t = await getTranslations();
  const shareText = t("result.shareText", {
    title: config.meta.title,
    typeName: type.name,
    description: type.description,
    hashtag: config.meta.title.replace(/\s/g, ""),
  });

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-lg">
        <p className="text-center text-sm font-medium text-purple-500 mb-6">
          {t("result.resultLabel", { title: config.meta.title })}
        </p>

        <ResultCard
          type={type}
          group={group}
          radarLabels={config.radarLabels}
          diagnosticTitle={config.meta.title}
        />
        <ShareButtons shareText={shareText} />

        <div className="mt-8 space-y-3">
          <Link
            href={`/${diagnostic}`}
            className="block w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:scale-105 active:scale-95 transition-transform"
          >
            {t("result.retake")}
          </Link>
          <Link
            href="/"
            className="block w-full text-center px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
          >
            {t("result.backToTop")}
          </Link>
        </div>
      </div>
    </main>
  );
}
