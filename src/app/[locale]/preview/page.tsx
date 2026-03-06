"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { DIAGNOSTICS } from "@/data/diagnostics";
import { Link } from "@/i18n/navigation";

const PATTERN_NAMES = [
  "1. ポータル",
  "2. シャープ",
  "3. フィード",
  "4. コンパクト",
  "5a. マガジン",
  "5b. マガジンB",
  "6. カジュアル",
  "7. ボールド",
  "8. ハイブリッド",
  "9. ゲーミフィ",
  "10. クラシック",
];

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
}

function fmt(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1).replace(/\.0$/, "")}万`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

function useCardData(): CardData[] {
  const t = useTranslations();
  return DIAGNOSTICS.map((d) => ({
    icon: d.icon,
    image: d.image,
    title: t(d.titleKey),
    description: t(d.descriptionKey),
    duration: t(d.durationKey),
    minutesLabel: t("home.minutesLabel"),
    href: d.path,
    playCount: d.playCount,
    isNew: d.isNew,
  }));
}

function useSorted(cards: CardData[]) {
  const sorted = [...cards].sort((a, b) => b.playCount - a.playCount);
  return { popular: sorted.slice(0, 6), rest: sorted.slice(6) };
}

function useLabels() {
  const t = useTranslations("home");
  return { popular: t("popularTitle"), all: t("allTitle"), newBadge: t("newBadge"), rank: t("rankLabel") };
}

/* ================================================================
   1. ポータル — 角張り、情報サイト風
   ================================================================ */
function P1({ cards }: { cards: CardData[] }) {
  const t = useTranslations("home");
  const L = useLabels();
  const { popular, rest } = useSorted(cards);
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-4xl mx-auto px-4 pt-8 pb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t("heroTitle")}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{t("heroSubtitle")}</p>
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5">{L.popular}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {popular.map((c, i) => (
            <Link key={i} href={c.href} className="group bg-white border border-gray-200 hover:border-orange-300 transition-colors">
              <div className="h-32 overflow-hidden relative">
                <img src={c.image} alt="" className="w-full h-full object-cover" />
                <span className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center">{i + 1}</span>
                {c.isNew && <span className="absolute top-0 right-0 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5">{L.newBadge}</span>}
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm text-gray-900 leading-snug mb-1 group-hover:text-orange-600 transition-colors">{c.title}</h3>
                <p className="text-[11px] text-gray-500 line-clamp-2 mb-2">{c.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">{fmt(c.playCount)}人が診断</span>
                  <span className="text-[11px] font-bold text-orange-500 group-hover:underline">診断する →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-10 pt-4">
        <span className="text-xs font-bold text-gray-600 mb-2 block">{L.all}</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-200">
          {rest.map((c, i) => (
            <Link key={i} href={c.href} className="group flex items-center gap-3 bg-white p-3 hover:bg-yellow-50 transition-colors">
              <div className="w-14 h-14 shrink-0 overflow-hidden bg-gray-100"><img src={c.image} alt="" className="w-full h-full object-cover" /></div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-gray-900 truncate group-hover:text-orange-600 transition-colors">{c.title}</h3>
                <span className="text-[10px] text-gray-400">{fmt(c.playCount)}人 · {c.duration}{c.minutesLabel}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ================================================================
   2. シャープ — 角張り、モノトーン、ハイコントラスト
   ================================================================ */
function P2({ cards }: { cards: CardData[] }) {
  const t = useTranslations("home");
  const L = useLabels();
  const { popular, rest } = useSorted(cards);
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-6">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">{t("heroTitle")}</h1>
        <div className="h-0.5 bg-gray-900 mt-3 w-10" />
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-6">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">{L.popular}</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-gray-900">
          {popular.map((c, i) => (
            <Link key={i} href={c.href} className="group bg-white">
              <div className="h-36 overflow-hidden relative">
                <img src={c.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {i < 3 && <span className="absolute top-0 left-0 bg-gray-900 text-white text-[10px] font-bold px-2 py-1">{i + 1}</span>}
                {c.isNew && <span className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-bold px-2 py-1">{L.newBadge}</span>}
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm text-gray-900 mb-1">{c.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-gray-400">{fmt(c.playCount)}人</span>
                  <span className="text-[10px] font-bold text-gray-900 border border-gray-900 px-2 py-0.5 group-hover:bg-gray-900 group-hover:text-white transition-colors">START</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-10 pt-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">{L.all}</span>
        <div className="grid grid-cols-3 gap-px bg-gray-200">
          {rest.map((c, i) => (
            <Link key={i} href={c.href} className="group bg-white p-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-8 h-8 shrink-0 overflow-hidden bg-gray-100"><img src={c.image} alt="" className="w-full h-full object-cover" /></span>
                <h3 className="text-xs font-bold text-gray-900 truncate">{c.title}</h3>
              </div>
              <span className="text-[10px] text-gray-400">{fmt(c.playCount)}人</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ================================================================
   3. フィード — カード型3列、押しやすいボタン
   ================================================================ */
function P3({ cards }: { cards: CardData[] }) {
  const t = useTranslations("home");
  const L = useLabels();
  const { popular, rest } = useSorted(cards);
  return (
    <main className="min-h-screen bg-gray-100">
      <section className="max-w-4xl mx-auto px-4 pt-8 pb-6 text-center">
        <h1 className="text-xl font-bold text-gray-800">{t("heroTitle")}</h1>
        <p className="text-xs text-gray-500 mt-1">{t("heroSubtitle")}</p>
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <span className="text-sm font-bold text-gray-700 mb-3 block">{L.popular}</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {popular.map((c, i) => (
            <Link key={i} href={c.href} className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow">
              <div className="h-32 overflow-hidden relative">
                <img src={c.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent h-16" />
                {i < 3 && <span className="absolute bottom-2 left-2 bg-yellow-400 text-gray-900 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">{i + 1}</span>}
                {c.isNew && <span className="absolute top-2 right-2 text-[9px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">{L.newBadge}</span>}
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm text-gray-900 leading-snug mb-2">{c.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">{fmt(c.playCount)}人が診断</span>
                  <span className="text-[11px] font-bold text-white bg-pink-500 px-3 py-1 rounded-full group-hover:bg-pink-600 transition-colors">やってみる</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-10 pt-2">
        <span className="text-sm font-bold text-gray-500 mb-3 block">{L.all}</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {rest.map((c, i) => (
            <Link key={i} href={c.href} className="group flex gap-3 bg-white rounded-lg p-3 shadow-sm hover:shadow transition-shadow">
              <div className="w-14 h-14 shrink-0 rounded overflow-hidden bg-gray-100"><img src={c.image} alt="" className="w-full h-full object-cover" /></div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-pink-600 transition-colors">{c.title}</h3>
                <span className="text-[10px] text-gray-400 mt-1 block">{fmt(c.playCount)}人</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ================================================================
   4. コンパクト — 情報密度高、角張り、TOP6横3列+リスト
   ================================================================ */
function P4({ cards }: { cards: CardData[] }) {
  const t = useTranslations("home");
  const L = useLabels();
  const { popular, rest } = useSorted(cards);
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-4xl mx-auto px-4 pt-8 pb-3">
        <h1 className="text-lg font-bold text-gray-900">{t("heroTitle")}</h1>
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <div className="flex items-center gap-1 mb-3">
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5">TOP 6</span>
          <span className="text-xs text-gray-500">{L.popular}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {popular.map((c, i) => (
            <Link key={i} href={c.href} className="group border border-gray-200 hover:border-red-300 transition-colors">
              <div className="h-24 overflow-hidden relative">
                <img src={c.image} alt="" className="w-full h-full object-cover" />
                <span className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center">{i + 1}</span>
                {c.isNew && <span className="absolute top-0 right-0 bg-orange-500 text-white text-[8px] font-bold px-1 py-0.5">{L.newBadge}</span>}
              </div>
              <div className="p-2">
                <h3 className="text-xs font-bold text-gray-900 leading-tight line-clamp-2 mb-1 group-hover:text-red-600 transition-colors">{c.title}</h3>
                <span className="text-[10px] text-gray-400">{fmt(c.playCount)}人</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-10">
        <div className="border-t border-gray-200 pt-3">
          <span className="text-xs font-bold text-gray-600 mb-2 block">{L.all}</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
            {rest.map((c, i) => (
              <Link key={i} href={c.href} className="group flex items-center gap-3 py-2 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 shrink-0 overflow-hidden bg-gray-100"><img src={c.image} alt="" className="w-full h-full object-cover" /></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{c.title}</h3>
                  <span className="text-[10px] text-gray-400">{fmt(c.playCount)}人</span>
                </div>
                <span className="text-gray-300 text-sm shrink-0">›</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================================================================
   5. マガジン×ポータル — 5のレイアウト+1の角張りスタイル
   ================================================================ */
function P5({ cards }: { cards: CardData[] }) {
  const t = useTranslations("home");
  const L = useLabels();
  const { popular, rest } = useSorted(cards);

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
        <h1 className="text-2xl font-bold text-gray-800">{t("heroTitle")}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{t("heroSubtitle")}</p>
      </section>

      {/* Featured — サブで選択中のコンテンツを大きく表示 */}
      <section className="max-w-4xl mx-auto px-4 pb-3">
        <div className="mb-3">
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5">{L.popular}</span>
        </div>
        <div className="relative">
          <div className={`transition-opacity duration-250 ${fade ? "opacity-100" : "opacity-0"}`}>
            <Link href={feat.href} className="group grid grid-cols-1 sm:grid-cols-2 gap-0 bg-white border border-gray-200 hover:border-orange-300 transition-colors">
              <div className="aspect-video sm:aspect-auto overflow-hidden relative">
                <img src={feat.image} alt="" className="w-full h-full object-cover" />
                <span className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center">{selected + 1}</span>
                {feat.isNew && <span className="absolute top-0 right-0 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5">{L.newBadge}</span>}
              </div>
              <div className="p-5 flex flex-col justify-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{feat.title}</h2>
                <p className="text-sm text-gray-500 mb-3 line-clamp-3">{feat.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                  <span>{fmt(feat.playCount)}人が診断</span>
                  <span>約{feat.duration}{feat.minutesLabel}</span>
                </div>
                <span className="inline-block text-sm font-bold text-orange-500 group-hover:underline">この診断をやってみる →</span>
              </div>
            </Link>
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
                {c.isNew && <span className="absolute top-0 right-0 bg-orange-500 text-white text-[8px] font-bold px-1 py-0.5">{L.newBadge}</span>}
              </div>
              <div className="p-2">
                <h3 className={`text-[11px] font-bold leading-tight line-clamp-1 transition-colors ${i === selected ? "text-orange-600" : "text-gray-900 group-hover:text-orange-600"}`}>{c.title}</h3>
                <span className="text-[10px] text-gray-400 block">{fmt(c.playCount)}人</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Rest */}
      <section className="max-w-4xl mx-auto px-4 pb-10 pt-2">
        <span className="text-xs font-bold text-gray-600 mb-2 block">{L.all}</span>
        <div className="grid grid-cols-3 gap-3">
          {rest.map((c, i) => (
            <Link key={i} href={c.href} className="group bg-white border border-gray-200 hover:border-orange-300 transition-colors">
              <div className="aspect-video overflow-hidden relative">
                <img src={c.image} alt="" className="w-full h-full object-cover" />
                {c.isNew && <span className="absolute top-0 right-0 bg-orange-500 text-white text-[8px] font-bold px-1 py-0.5">{L.newBadge}</span>}
              </div>
              <div className="p-3">
                <h3 className="text-xs font-bold text-gray-900 leading-snug mb-0.5 group-hover:text-orange-600 transition-colors">{c.title}</h3>
                <p className="text-[10px] text-gray-500 leading-snug line-clamp-2 mb-2">{c.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">{fmt(c.playCount)}人 · {c.duration}{c.minutesLabel}</span>
                  <span className="text-[10px] font-bold text-orange-500 group-hover:underline">診断する →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ================================================================
   5b. マガジン×ポータル — 矢印がサブ両端バージョン
   ================================================================ */
function P5B({ cards }: { cards: CardData[] }) {
  const t = useTranslations("home");
  const L = useLabels();
  const { popular, rest } = useSorted(cards);

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
        <h1 className="text-2xl font-bold text-gray-800">{t("heroTitle")}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{t("heroSubtitle")}</p>
      </section>

      {/* Featured */}
      <section className="max-w-4xl mx-auto px-4 pb-3">
        <div className="mb-3">
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5">{L.popular}</span>
        </div>
        <div className={`transition-opacity duration-250 ${fade ? "opacity-100" : "opacity-0"}`}>
          <Link href={feat.href} className="group grid grid-cols-1 sm:grid-cols-2 gap-0 bg-white border border-gray-200 hover:border-orange-300 transition-colors">
            <div className="aspect-video sm:aspect-auto overflow-hidden relative">
              <img src={feat.image} alt="" className="w-full h-full object-cover" />
              <span className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center">{selected + 1}</span>
              {feat.isNew && <span className="absolute top-0 right-0 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5">{L.newBadge}</span>}
            </div>
            <div className="p-5 flex flex-col justify-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{feat.title}</h2>
              <p className="text-sm text-gray-500 mb-3 line-clamp-3">{feat.description}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                <span>{fmt(feat.playCount)}人が診断</span>
                <span>約{feat.duration}{feat.minutesLabel}</span>
              </div>
              <span className="inline-block text-sm font-bold text-orange-500 group-hover:underline">この診断をやってみる →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Sub popular — 矢印がサブ両端 */}
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <div className="relative">
          <div className="grid grid-cols-6 gap-2">
            {popular.map((c, i) => (
              <button key={c.title} onClick={() => goTo(i)} className={`group text-left bg-white border transition-colors ${i === selected ? "border-orange-400 ring-1 ring-orange-300" : "border-gray-200 hover:border-orange-300"}`}>
                <div className="aspect-video overflow-hidden relative">
                  <img src={c.image} alt="" className="w-full h-full object-cover" />
                  <span className="absolute top-0 left-0 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center">{i + 1}</span>
                  {c.isNew && <span className="absolute top-0 right-0 bg-orange-500 text-white text-[8px] font-bold px-1 py-0.5">{L.newBadge}</span>}
                </div>
                <div className="p-2">
                  <h3 className={`text-[11px] font-bold leading-tight line-clamp-1 transition-colors ${i === selected ? "text-orange-600" : "text-gray-900 group-hover:text-orange-600"}`}>{c.title}</h3>
                  <span className="text-[10px] text-gray-400 block">{fmt(c.playCount)}人</span>
                </div>
              </button>
            ))}
          </div>
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center bg-white border border-gray-300 text-gray-500 hover:border-orange-400 hover:text-orange-500 shadow-sm transition-colors z-10">←</button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 flex items-center justify-center bg-white border border-gray-300 text-gray-500 hover:border-orange-400 hover:text-orange-500 shadow-sm transition-colors z-10">→</button>
        </div>
      </section>

      {/* Rest */}
      <section className="max-w-4xl mx-auto px-4 pb-10 pt-2">
        <span className="text-xs font-bold text-gray-600 mb-2 block">{L.all}</span>
        <div className="grid grid-cols-3 gap-3">
          {rest.map((c, i) => (
            <Link key={i} href={c.href} className="group bg-white border border-gray-200 hover:border-orange-300 transition-colors">
              <div className="aspect-video overflow-hidden relative">
                <img src={c.image} alt="" className="w-full h-full object-cover" />
                {c.isNew && <span className="absolute top-0 right-0 bg-orange-500 text-white text-[8px] font-bold px-1 py-0.5">{L.newBadge}</span>}
              </div>
              <div className="p-3">
                <h3 className="text-xs font-bold text-gray-900 leading-snug mb-0.5 group-hover:text-orange-600 transition-colors">{c.title}</h3>
                <p className="text-[10px] text-gray-500 leading-snug line-clamp-2 mb-2">{c.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">{fmt(c.playCount)}人 · {c.duration}{c.minutesLabel}</span>
                  <span className="text-[10px] font-bold text-orange-500 group-hover:underline">診断する →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ================================================================
   6. カジュアル — 温かみ、左ボーダー、3列カード
   ================================================================ */
function P6({ cards }: { cards: CardData[] }) {
  const t = useTranslations("home");
  const L = useLabels();
  const { popular, rest } = useSorted(cards);
  const ac = ["border-l-rose-400","border-l-sky-400","border-l-amber-400","border-l-emerald-400","border-l-violet-400","border-l-orange-400","border-l-cyan-400","border-l-pink-400","border-l-lime-400","border-l-teal-400","border-l-indigo-400","border-l-red-400","border-l-blue-400","border-l-yellow-400","border-l-purple-400","border-l-green-400","border-l-fuchsia-400","border-l-slate-400"];
  return (
    <main className="min-h-screen bg-amber-50/50">
      <section className="max-w-4xl mx-auto px-4 pt-8 pb-5 text-center">
        <p className="text-[11px] text-amber-600 mb-1">— 診断まとめサイト —</p>
        <h1 className="text-2xl font-bold text-gray-800">{t("heroTitle")}</h1>
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5">PICK UP</span>
          <span className="text-xs text-gray-500">みんながやってる診断</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {popular.map((c, i) => (
            <Link key={i} href={c.href} className={`group flex gap-2 bg-white border-l-4 ${ac[i]} p-2.5 shadow-sm hover:shadow transition-shadow`}>
              <div className="w-16 h-16 shrink-0 overflow-hidden rounded bg-gray-100"><img src={c.image} alt="" className="w-full h-full object-cover" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  {i < 3 && <span className="text-[10px] text-amber-600 font-bold">#{i + 1}</span>}
                  {c.isNew && <span className="text-[8px] font-bold bg-red-100 text-red-600 px-1 py-0.5 rounded">{L.newBadge}</span>}
                </div>
                <h3 className="font-bold text-xs text-gray-800 leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">{c.title}</h3>
                <span className="text-[10px] text-gray-400">{fmt(c.playCount)}人</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-10 pt-2">
        <span className="text-xs font-bold text-gray-500 mb-2 block">{L.all}</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {rest.map((c, i) => (
            <Link key={i} href={c.href} className={`group flex gap-2 bg-white border-l-4 ${ac[(i + 6) % ac.length]} p-2.5 hover:shadow-sm transition-shadow`}>
              <div className="w-12 h-12 shrink-0 overflow-hidden rounded bg-gray-100"><img src={c.image} alt="" className="w-full h-full object-cover" /></div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-xs text-gray-800 leading-snug truncate group-hover:text-amber-700 transition-colors">{c.title}</h3>
                <span className="text-[10px] text-gray-400">{fmt(c.playCount)}人 · {c.duration}{c.minutesLabel}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ================================================================
   7. ボールド — ダーク3列、角張り、黄色CTA
   ================================================================ */
function P7({ cards }: { cards: CardData[] }) {
  const t = useTranslations("home");
  const L = useLabels();
  const { popular, rest } = useSorted(cards);
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-6">
        <h1 className="text-3xl font-black tracking-tight">{t("heroTitle")}</h1>
        <p className="text-sm text-gray-400 mt-1">{t("heroSubtitle")}</p>
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <span className="text-xs font-bold text-yellow-500 uppercase tracking-wider mb-3 block">{L.popular}</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {popular.map((c, i) => (
            <Link key={i} href={c.href} className="group bg-gray-800 border border-gray-700 hover:border-yellow-500 transition-all">
              <div className="h-28 overflow-hidden relative">
                <img src={c.image} alt="" className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute top-0 left-0 flex">
                  {i < 3 && <span className="bg-yellow-500 text-gray-900 text-[10px] font-black px-1.5 py-0.5">{i + 1}</span>}
                  {c.isNew && <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5">{L.newBadge}</span>}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm leading-tight mb-2">{c.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">{fmt(c.playCount)}人</span>
                  <span className="text-[10px] font-black bg-yellow-500 text-gray-900 px-2 py-1 group-hover:bg-yellow-400 transition-colors">診断する</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-10 pt-2">
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3 block">{L.all}</span>
        <div className="grid grid-cols-3 gap-2">
          {rest.map((c, i) => (
            <Link key={i} href={c.href} className="group flex gap-2 bg-gray-800 border border-gray-700 p-2 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 shrink-0 overflow-hidden bg-gray-700"><img src={c.image} alt="" className="w-full h-full object-cover" /></div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold leading-tight truncate">{c.title}</h3>
                <span className="text-[10px] text-gray-500">{fmt(c.playCount)}人</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ================================================================
   8. ハイブリッド — TOP6カード＋リスト3列
   ================================================================ */
function P8({ cards }: { cards: CardData[] }) {
  const t = useTranslations("home");
  const L = useLabels();
  const { popular, rest } = useSorted(cards);
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-4xl mx-auto px-4 pt-8 pb-4">
        <div className="bg-white border border-gray-200 px-4 py-2.5 flex items-center justify-between">
          <h1 className="text-base font-bold text-gray-900">{t("heroTitle")}</h1>
          <span className="text-[10px] text-gray-400">{t("heroSubtitle")}</span>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1 h-4 bg-red-500" />
          <span className="text-sm font-bold text-gray-900">{L.popular}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {popular.map((c, i) => (
            <Link key={i} href={c.href} className="group bg-white border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="h-24 overflow-hidden relative">
                <img src={c.image} alt="" className="w-full h-full object-cover" />
                <span className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center">{i + 1}</span>
                {c.isNew && <span className="absolute top-0 right-0 bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5">{L.newBadge}</span>}
              </div>
              <div className="p-2">
                <h3 className="text-xs font-bold text-gray-900 leading-tight line-clamp-2 mb-1">{c.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">{fmt(c.playCount)}人</span>
                  <span className="text-[10px] font-bold text-white bg-blue-500 px-2 py-0.5 group-hover:bg-blue-600 transition-colors">GO</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-10 pt-2">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1 h-4 bg-gray-400" />
          <span className="text-sm font-bold text-gray-700">{L.all}</span>
        </div>
        <div className="bg-white border border-gray-200 divide-y divide-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {rest.map((c, i) => (
              <Link key={i} href={c.href} className="group flex items-center gap-2.5 p-2.5 hover:bg-blue-50 transition-colors">
                <div className="w-12 h-12 shrink-0 overflow-hidden bg-gray-100"><img src={c.image} alt="" className="w-full h-full object-cover" /></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{c.title}</h3>
                  <span className="text-[10px] text-gray-400">{fmt(c.playCount)}人 · {c.duration}{c.minutesLabel}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================================================================
   9. ゲーミフィ — 人気バー、PLAYボタン、3列
   ================================================================ */
function P9({ cards }: { cards: CardData[] }) {
  const t = useTranslations("home");
  const L = useLabels();
  const { popular, rest } = useSorted(cards);
  const maxPlay = popular[0]?.playCount || 1;
  return (
    <main className="min-h-screen bg-indigo-950 text-white">
      <section className="max-w-4xl mx-auto px-4 pt-8 pb-5 text-center">
        <span className="inline-block text-[10px] font-bold bg-indigo-700 text-indigo-200 px-3 py-1 rounded-full mb-2 tracking-wider">DIAGNOSTIC HUB</span>
        <h1 className="text-2xl font-black">{t("heroTitle")}</h1>
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <span className="text-xs font-bold text-yellow-500 mb-3 block">{L.popular}</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {popular.map((c, i) => {
            const bar = Math.round((c.playCount / maxPlay) * 100);
            return (
              <Link key={i} href={c.href} className="group bg-indigo-900/60 border border-indigo-700/50 rounded-lg p-3 hover:border-yellow-500/60 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-12 h-12 shrink-0 overflow-hidden rounded bg-indigo-800"><img src={c.image} alt="" className="w-full h-full object-cover" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      {i < 3 && <span className="text-[9px] font-black bg-yellow-500 text-indigo-900 px-1 py-0.5 rounded-sm">#{i + 1}</span>}
                      {c.isNew && <span className="text-[9px] font-bold bg-green-500 text-white px-1 py-0.5 rounded-sm">{L.newBadge}</span>}
                    </div>
                    <h3 className="font-bold text-xs leading-snug line-clamp-2">{c.title}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-1.5 bg-indigo-800 rounded-full overflow-hidden"><div className="h-full bg-yellow-500 rounded-full" style={{ width: `${bar}%` }} /></div>
                  <span className="text-[9px] text-indigo-400 shrink-0">{fmt(c.playCount)}</span>
                </div>
                <span className="block text-center text-[10px] font-bold bg-yellow-500 text-indigo-900 py-1 group-hover:bg-yellow-400 transition-colors">PLAY</span>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-10 pt-2">
        <span className="text-xs font-bold text-indigo-400 mb-3 block">{L.all}</span>
        <div className="grid grid-cols-3 gap-2">
          {rest.map((c, i) => (
            <Link key={i} href={c.href} className="group flex gap-2 bg-indigo-900/40 border border-indigo-800/50 rounded p-2 hover:border-indigo-600 transition-colors">
              <div className="w-10 h-10 shrink-0 overflow-hidden rounded bg-indigo-800"><img src={c.image} alt="" className="w-full h-full object-cover" /></div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[11px] font-bold leading-tight truncate">{c.title}</h3>
                <span className="text-[9px] text-indigo-400">{fmt(c.playCount)}人</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ================================================================
   10. クラシック — タブUI、読みやすさ、3列、角張り
   ================================================================ */
function P10({ cards }: { cards: CardData[] }) {
  const t = useTranslations("home");
  const L = useLabels();
  const { popular, rest } = useSorted(cards);
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-4xl mx-auto px-4 pt-8 pb-3 border-b-2 border-gray-800">
        <h1 className="text-xl font-bold text-gray-900">{t("heroTitle")}</h1>
      </section>
      <section className="max-w-4xl mx-auto px-4 pt-3 pb-4">
        <div className="flex gap-0 text-xs font-bold border-b border-gray-200 mb-4">
          <span className="px-3 py-1.5 border-b-2 border-gray-900 text-gray-900">{L.popular}</span>
          <span className="px-3 py-1.5 text-gray-400">{L.all}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {popular.map((c, i) => (
            <Link key={i} href={c.href} className="group">
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                <img src={c.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-0 left-0 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-0.5">{i + 1}{L.rank}</span>
                {c.isNew && <span className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5">{L.newBadge}</span>}
              </div>
              <div className="pt-2">
                <h3 className="font-bold text-sm text-gray-900 group-hover:text-blue-700 transition-colors">{c.title}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-gray-400">{fmt(c.playCount)}人が診断 · {c.duration}{c.minutesLabel}</span>
                  <span className="text-xs font-bold border border-gray-300 text-gray-600 px-2 py-0.5 group-hover:border-blue-500 group-hover:text-blue-600 transition-colors">診断する</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-10 pt-2">
        <span className="text-xs font-bold text-gray-400 mb-3 block border-t border-gray-100 pt-3">{L.all}</span>
        <div className="grid grid-cols-3 gap-x-4">
          {rest.map((c, i) => (
            <Link key={i} href={c.href} className="group flex items-center gap-2.5 py-2 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 shrink-0 overflow-hidden bg-gray-100"><img src={c.image} alt="" className="w-full h-full object-cover" /></div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-gray-900 truncate group-hover:text-blue-700 transition-colors">{c.title}</h3>
                <span className="text-[10px] text-gray-400">{fmt(c.playCount)}人 · {c.duration}{c.minutesLabel}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ─── Preview Page ─── */
const PATTERNS = [P1, P2, P3, P4, P5, P5B, P6, P7, P8, P9, P10];

export default function PreviewPage() {
  const [current, setCurrent] = useState(0);
  const cards = useCardData();
  const C = PATTERNS[current];
  return (
    <div>
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/95 border-t border-gray-200 px-4 py-2.5">
        <div className="max-w-5xl mx-auto flex items-center gap-1.5 overflow-x-auto">
          {PATTERN_NAMES.map((n, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`shrink-0 px-2.5 py-1 text-[11px] font-medium transition-all ${current === i ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{n}</button>
          ))}
        </div>
      </div>
      <div className="pb-14"><C cards={cards} /></div>
    </div>
  );
}
