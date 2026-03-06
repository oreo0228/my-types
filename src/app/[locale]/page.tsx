"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { DIAGNOSTICS } from "@/data/diagnostics";
import { Link } from "@/i18n/navigation";

interface CardData {
  icon: string;
  image: string;
  title: string;
  description: string;
  duration: string;
  minutesLabel: string;
  href: string;
  playCount: number;
  isNew?: boolean;
  comingSoon: boolean;
}

function fmt(n: number, locale: string): string {
  if (locale === "ja") {
    if (n >= 10000) return `${(n / 10000).toFixed(1).replace(/\.0$/, "")}万`;
    if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  } else {
    if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return String(n);
}

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();

  const cards: CardData[] = DIAGNOSTICS.map((d) => ({
    icon: d.icon,
    image: d.image,
    title: t(d.titleKey),
    description: t(d.descriptionKey),
    duration: t(d.durationKey),
    minutesLabel: t("home.minutesLabel"),
    href: d.path,
    playCount: d.playCount,
    isNew: d.isNew,
    comingSoon: d.path === "#",
  }));

  const sorted = [...cards].sort((a, b) => b.playCount - a.playCount);
  const popular = sorted.slice(0, 6);
  const rest = sorted.slice(6);

  const popularLabel = t("home.popularTitle");
  const allLabel = t("home.allTitle");
  const newBadge = t("home.newBadge");

  // サブで選択中のインデックス → フィーチャーに表示
  const [selected, setSelected] = useState(0);
  const [fade, setFade] = useState(true);

  const goTo = useCallback((idx: number) => {
    setFade(false);
    setTimeout(() => {
      setSelected(idx);
      setFade(true);
    }, 250);
  }, []);

  const prev = useCallback(() => {
    goTo((selected - 1 + popular.length) % popular.length);
  }, [selected, popular.length, goTo]);

  const next = useCallback(() => {
    goTo((selected + 1) % popular.length);
  }, [selected, popular.length, goTo]);

  // 4秒ごとに自動切り替え
  useEffect(() => {
    const id = setInterval(() => {
      goTo((selected + 1) % popular.length);
    }, 4000);
    return () => clearInterval(id);
  }, [selected, popular.length, goTo]);

  const feat = popular[selected];

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-4xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">{t("home.heroTitle")}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{t("home.heroSubtitle")}</p>
      </section>

      {/* Featured — サブで選択中のコンテンツを大きく表示 */}
      <section className="max-w-4xl mx-auto px-4 pb-3">
        <div className="mb-3">
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5">{popularLabel}</span>
        </div>
        <div className="relative">
          <div className={`transition-opacity duration-250 ${fade ? "opacity-100" : "opacity-0"}`}>
            {feat.comingSoon ? (
              <div className="group grid grid-cols-1 sm:grid-cols-2 gap-0 bg-white border border-gray-200 opacity-70 cursor-default">
                <div className="aspect-video sm:aspect-auto overflow-hidden relative">
                  <img src={feat.image} alt="" className="w-full h-full object-cover grayscale" />
                  <span className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center">{selected + 1}</span>
                  <span className="absolute top-0 right-0 bg-gray-500 text-white text-[9px] font-bold px-1.5 py-0.5">{t("home.comingSoon")}</span>
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{feat.title}</h2>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-3">{feat.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                    <span>{t("home.duration", { duration: feat.duration, unit: feat.minutesLabel })}</span>
                  </div>
                  <span className="inline-block text-sm font-bold text-gray-400">{t("home.comingSoon")}</span>
                </div>
              </div>
            ) : (
              <Link href={feat.href} className="group grid grid-cols-1 sm:grid-cols-2 gap-0 bg-white border border-gray-200 hover:border-orange-300 transition-colors">
                <div className="aspect-video sm:aspect-auto overflow-hidden relative">
                  <img src={feat.image} alt="" className="w-full h-full object-cover" />
                  <span className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center">{selected + 1}</span>
                  {feat.isNew && <span className="absolute top-0 right-0 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5">{newBadge}</span>}
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{feat.title}</h2>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-3">{feat.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                    <span>{t("home.playCountShort", { count: fmt(feat.playCount, locale) })}</span>
                    <span>{t("home.duration", { duration: feat.duration, unit: feat.minutesLabel })}</span>
                  </div>
                  <span className="inline-block text-sm font-bold text-orange-500 group-hover:underline">{t("home.tryThis")}</span>
                </div>
              </Link>
            )}
          </div>
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center bg-white border border-gray-300 text-gray-500 hover:border-orange-400 hover:text-orange-500 shadow-sm transition-colors z-10">←</button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 flex items-center justify-center bg-white border border-gray-300 text-gray-500 hover:border-orange-400 hover:text-orange-500 shadow-sm transition-colors z-10">→</button>
        </div>
      </section>

      {/* Sub popular — クリックでフィーチャーを切り替え */}
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <div className="grid grid-cols-6 gap-2">
          {popular.map((c, i) => (
            <button key={c.title} onClick={() => goTo(i)} className={`group text-left bg-white border transition-colors ${i === selected ? "border-orange-400 ring-1 ring-orange-300" : "border-gray-200 hover:border-orange-300"}`}>
              <div className="aspect-video overflow-hidden relative">
                <img src={c.image} alt="" className="w-full h-full object-cover" />
                <span className="absolute top-0 left-0 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center">{i + 1}</span>
                {c.isNew && <span className="absolute top-0 right-0 bg-orange-500 text-white text-[8px] font-bold px-1 py-0.5">{newBadge}</span>}
              </div>
              <div className="p-2">
                <h3 className={`text-[11px] font-bold leading-tight line-clamp-1 transition-colors ${i === selected ? "text-orange-600" : "text-gray-900 group-hover:text-orange-600"}`}>{c.title}</h3>
                <span className="text-[10px] text-gray-400 block">{t("home.playCountShort", { count: fmt(c.playCount, locale) })}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Rest */}
      <section className="max-w-4xl mx-auto px-4 pb-10 pt-2">
        <span className="text-xs font-bold text-gray-600 mb-2 block">{allLabel}</span>
        <div className="grid grid-cols-3 gap-3">
          {rest.map((c, i) =>
            c.comingSoon ? (
              <div key={i} className="bg-white border border-gray-200 opacity-60">
                <div className="aspect-video overflow-hidden relative">
                  <img src={c.image} alt="" className="w-full h-full object-cover grayscale" />
                  <span className="absolute top-0 right-0 bg-gray-500 text-white text-[8px] font-bold px-1 py-0.5">{t("home.comingSoon")}</span>
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-bold text-gray-900 leading-snug mb-0.5">{c.title}</h3>
                  <p className="text-[10px] text-gray-500 leading-snug line-clamp-2 mb-2">{c.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">{t("home.duration", { duration: c.duration, unit: c.minutesLabel })}</span>
                    <span className="text-[10px] font-bold text-gray-400">{t("home.comingSoon")}</span>
                  </div>
                </div>
              </div>
            ) : (
              <Link key={i} href={c.href} className="group bg-white border border-gray-200 hover:border-orange-300 transition-colors">
                <div className="aspect-video overflow-hidden relative">
                  <img src={c.image} alt="" className="w-full h-full object-cover" />
                  {c.isNew && <span className="absolute top-0 right-0 bg-orange-500 text-white text-[8px] font-bold px-1 py-0.5">{newBadge}</span>}
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-bold text-gray-900 leading-snug mb-0.5 group-hover:text-orange-600 transition-colors">{c.title}</h3>
                  <p className="text-[10px] text-gray-500 leading-snug line-clamp-2 mb-2">{c.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">{t("home.playCountShort", { count: fmt(c.playCount, locale) })} · {t("home.duration", { duration: c.duration, unit: c.minutesLabel })}</span>
                    <span className="text-[10px] font-bold text-orange-500 group-hover:underline">{t("home.tryDiagnose")}</span>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      </section>
    </main>
  );
}
