import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAllDiagnosticSlugs, loadDiagnostic } from "@/engine/loader";

interface Props {
  params: Promise<{ diagnostic: string }>;
}

export function generateStaticParams() {
  return getAllDiagnosticSlugs().map((diagnostic) => ({ diagnostic }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { diagnostic } = await params;
  const config = loadDiagnostic(diagnostic);
  if (!config) return { title: "診断が見つかりません" };

  return {
    title: `全${config.types.length}タイプ一覧 | ${config.meta.title} - My Types`,
    description: `${config.meta.title}の全${config.types.length}タイプを一覧で紹介。`,
  };
}

export default async function TypesPage({ params }: Props) {
  const { diagnostic } = await params;
  const config = loadDiagnostic(diagnostic);
  if (!config) notFound();

  const t = await getTranslations();
  const { meta, groups, types } = config;

  return (
    <main className="min-h-screen px-4 py-8 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href={`/${diagnostic}`}
            className="inline-flex items-center gap-1 text-sm text-purple-500 hover:text-purple-700 transition-colors mb-4"
          >
            {t("types.backToDiagnostic")}
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {t("types.pageTitle", { title: meta.title, count: types.length })}
          </h1>
        </div>

        {/* Group Sections */}
        <div className="space-y-10 mb-12">
          {groups.map((group) => {
            const groupTypes = types.filter((t) => t.groupKey === group.key);
            if (groupTypes.length === 0) return null;

            return (
              <section key={group.key}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{group.emoji}</span>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: group.color }}
                  >
                    {group.label}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4 ml-8">
                  {group.theme}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {groupTypes.map((type) => (
                    <Link
                      key={type.slug}
                      href={`/${diagnostic}/result/${type.slug}`}
                      className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4"
                      style={{ borderLeftColor: group.color }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">
                          {type.emoji}
                        </span>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-800 text-sm">
                            {type.name}
                          </p>
                          <p
                            className="text-xs font-mono"
                            style={{ color: group.color }}
                          >
                            {type.code}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA */}
        <section className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8">
          <p className="text-lg font-bold text-gray-700 mb-2">
            {t("types.ctaTitle")}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            {t("types.ctaDescription", { questionCount: meta.questionCount })}
          </p>
          <Link
            href={`/${diagnostic}/quiz`}
            className="inline-block w-full max-w-sm text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            {t("diagnostic.startQuiz")}
          </Link>
        </section>
      </div>
    </main>
  );
}
