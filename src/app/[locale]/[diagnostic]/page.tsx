import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAllDiagnosticSlugs, loadDiagnostic } from "@/engine/loader";
import ShareButtons from "@/components/result/ShareButtons";

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
    title: `${config.meta.title} | My Types`,
    description: config.meta.description,
  };
}

export default async function DiagnosticIntroPage({ params }: Props) {
  const { diagnostic } = await params;
  const config = loadDiagnostic(diagnostic);
  if (!config) notFound();

  const t = await getTranslations();
  const { meta, groups } = config;

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="w-full max-w-lg">
        {/* Hero */}
        <section className="text-center mb-12">
          <p className="text-sm font-medium text-purple-500 mb-2">My Types</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {meta.title}
          </h1>
          <p className="text-gray-600 mb-2 text-base sm:text-lg">
            {t("diagnostic.intro", { count: config.types.length })}
          </p>
          <p className="text-gray-400 text-sm mb-8">
            {t("diagnostic.questionInfo", { questionCount: meta.questionCount, duration: meta.duration })}
          </p>
          <Link
            href={`/${diagnostic}/quiz`}
            className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            {t("diagnostic.startQuiz")}
          </Link>
        </section>

        {/* Groups */}
        {groups.length > 0 && (
          <section className="mb-8">
            <h2 className="text-center text-lg font-bold text-gray-700 mb-4">
              {t("diagnostic.groupsTitle", { count: groups.length })}
            </h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {groups.map((group) => (
                <div
                  key={group.key}
                  className="bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className="text-2xl mb-1">{group.emoji}</div>
                  <p className="font-medium" style={{ color: group.color }}>
                    {group.label}
                  </p>
                  <p className="text-gray-400 text-xs">{group.theme}</p>
                  <p
                    className="text-[10px] mt-1 font-medium"
                    style={{ color: `${group.color}99` }}
                  >
                    {t("diagnostic.typeCountLabel", { count: group.typeCount })}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Types link */}
        <section className="mb-12 text-center">
          <Link
            href={`/${diagnostic}/types`}
            className="inline-flex items-center gap-1 bg-white/80 backdrop-blur-sm text-purple-600 font-bold px-6 py-3 rounded-xl shadow-sm hover:bg-white hover:shadow-md transition-all"
          >
            {t("diagnostic.viewAllTypes", { count: config.types.length })}
          </Link>
        </section>

        {/* Share */}
        <section className="mb-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center">
            <ShareButtons
              shareText={`${t("diagnostic.shareIntro", { title: meta.title })}\n#${meta.title.replace(/\s/g, "")} #MyTypes`}
              heading={t("diagnostic.shareHeading")}
              subtext={t("diagnostic.shareSubtext")}
            />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center">
          <Link
            href={`/${diagnostic}/quiz`}
            className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            {t("diagnostic.startQuiz")}
          </Link>
        </section>
      </div>
    </main>
  );
}
