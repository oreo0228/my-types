"use client";

import { useState } from "react";

const CHARS = [
  { name: "CRPO", image: "/images/types/sns-brain-type/crpo.webp" },
  { name: "CRLO", image: "/images/types/sns-brain-type/crlo.webp" },
  { name: "CMPO", image: "/images/types/sns-brain-type/cmpo.webp" },
  { name: "WRPO", image: "/images/types/sns-brain-type/wrpo.webp" },
  { name: "WMPO", image: "/images/types/sns-brain-type/wmpo.webp" },
  { name: "WMLX", image: "/images/types/sns-brain-type/wmlx.webp" },
];

const VARIANTS = [
  "A: ヒーロー横並び",
  "B: CTA下に円形",
  "C: 背景散らし",
  "D: スクロールバナー",
  "E: グループ代表",
];

/* ─── A: ヒーロー横並び ───
   タイトル下にキャラ3体を横並びで配置 */
function PatternA() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="w-full max-w-lg">
        <section className="text-center mb-12">
          <p className="text-sm font-medium text-purple-500 mb-2">My Types</p>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            SNS脳タイプ診断
          </h1>
          {/* Characters row */}
          <div className="flex justify-center items-end gap-1 mb-6 -mx-2">
            <img src={CHARS[1].image} alt="" className="w-24 h-24 object-contain opacity-70 -rotate-6" />
            <img src={CHARS[0].image} alt="" className="w-32 h-32 object-contain" />
            <img src={CHARS[3].image} alt="" className="w-24 h-24 object-contain opacity-70 rotate-6" />
          </div>
          <p className="text-gray-600 mb-2">全16タイプからあなたのSNS脳を診断！</p>
          <p className="text-gray-400 text-sm mb-8">全17問 · 約3分</p>
          <button className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg">
            診断スタート
          </button>
        </section>
      </div>
    </main>
  );
}

/* ─── B: CTA下に円形アイコン ───
   CTAボタンの下にキャラを小さい円で並べる */
function PatternB() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="w-full max-w-lg">
        <section className="text-center mb-12">
          <p className="text-sm font-medium text-purple-500 mb-2">My Types</p>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            SNS脳タイプ診断
          </h1>
          <p className="text-gray-600 mb-2">全16タイプからあなたのSNS脳を診断！</p>
          <p className="text-gray-400 text-sm mb-8">全17問 · 約3分</p>
          <button className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg mb-6">
            診断スタート
          </button>
          {/* Character circles */}
          <div className="flex justify-center items-center gap-3">
            {CHARS.slice(0, 5).map((c, i) => (
              <div
                key={c.name}
                className="w-14 h-14 rounded-full bg-white shadow-md overflow-hidden border-2 border-purple-100"
                style={{ transform: `translateY(${i % 2 === 0 ? -4 : 4}px)` }}
              >
                <img src={c.image} alt="" className="w-full h-full object-contain scale-150" />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">16タイプのキャラがあなたを待ってます</p>
        </section>
      </div>
    </main>
  );
}

/* ─── C: 背景散らし ───
   キャラを背景にランダムっぽく散らして装飾的に配置 */
function PatternC() {
  const positions = [
    "top-4 left-0 w-20 opacity-40 -rotate-12",
    "top-16 right-0 w-18 opacity-35 rotate-12",
    "bottom-32 left-2 w-16 opacity-30 rotate-6",
    "bottom-16 right-4 w-20 opacity-40 -rotate-6",
  ];
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="w-full max-w-lg relative">
        {/* Scattered characters */}
        {CHARS.slice(0, 4).map((c, i) => (
          <img
            key={c.name}
            src={c.image}
            alt=""
            className={`absolute object-contain pointer-events-none ${positions[i]}`}
          />
        ))}
        <section className="text-center mb-12 relative z-10">
          <p className="text-sm font-medium text-purple-500 mb-2">My Types</p>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            SNS脳タイプ診断
          </h1>
          <p className="text-gray-600 mb-2">全16タイプからあなたのSNS脳を診断！</p>
          <p className="text-gray-400 text-sm mb-8">全17問 · 約3分</p>
          <button className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg">
            診断スタート
          </button>
        </section>
      </div>
    </main>
  );
}

/* ─── D: スクロールバナー ───
   タイトルとCTAの間にキャラが横スクロールするバナー */
function PatternD() {
  const doubled = [...CHARS, ...CHARS];
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="w-full max-w-lg">
        <section className="text-center mb-12">
          <p className="text-sm font-medium text-purple-500 mb-2">My Types</p>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            SNS脳タイプ診断
          </h1>
          <p className="text-gray-600 mb-6">全16タイプからあなたのSNS脳を診断！</p>
          {/* Scrolling banner */}
          <div className="overflow-hidden mb-6 -mx-4">
            <div className="flex gap-4 animate-[scroll_12s_linear_infinite]">
              {doubled.map((c, i) => (
                <img
                  key={i}
                  src={c.image}
                  alt=""
                  className="w-24 h-24 object-contain shrink-0"
                />
              ))}
            </div>
          </div>
          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
          <p className="text-gray-400 text-sm mb-8">全17問 · 約3分</p>
          <button className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg">
            診断スタート
          </button>
        </section>
      </div>
    </main>
  );
}

/* ─── E: グループ代表キャラ ───
   4グループの代表キャラをグループカードの上に配置 */
function PatternE() {
  const groups = [
    { label: "アクティブ発信者", color: "#ec4899", char: CHARS[0] },
    { label: "マイペース発信者", color: "#f97316", char: CHARS[2] },
    { label: "アクティブ閲覧者", color: "#22c55e", char: CHARS[3] },
    { label: "マイペース閲覧者", color: "#8b5cf6", char: CHARS[4] },
  ];
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="w-full max-w-lg">
        <section className="text-center mb-8">
          <p className="text-sm font-medium text-purple-500 mb-2">My Types</p>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            SNS脳タイプ診断
          </h1>
          <p className="text-gray-600 mb-2">全16タイプからあなたのSNS脳を診断！</p>
          <p className="text-gray-400 text-sm mb-8">全17問 · 約3分</p>
          <button className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg">
            診断スタート
          </button>
        </section>
        {/* Group cards with representative characters */}
        <section className="mb-8">
          <h2 className="text-center text-lg font-bold text-gray-700 mb-4">4つのグループ</h2>
          <div className="grid grid-cols-2 gap-3">
            {groups.map((g) => (
              <div key={g.label} className="bg-white rounded-xl p-3 shadow-sm text-center">
                <img src={g.char.image} alt="" className="w-20 h-20 mx-auto object-contain -mt-1 mb-1" />
                <p className="font-bold text-sm" style={{ color: g.color }}>{g.label}</p>
                <p className="text-gray-400 text-xs">4タイプ</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

const COMPONENTS = [PatternA, PatternB, PatternC, PatternD, PatternE];

export default function DiagnosticCharPreview() {
  const [current, setCurrent] = useState(0);
  const C = COMPONENTS[current];

  return (
    <div>
      <C />
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/95 border-t border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-1.5 overflow-x-auto">
          {VARIANTS.map((v, i) => (
            <button
              key={v}
              onClick={() => setCurrent(i)}
              className={`shrink-0 px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                current === i
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
