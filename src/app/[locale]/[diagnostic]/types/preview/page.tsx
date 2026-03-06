"use client";

import { useState } from "react";

const SAMPLE_TYPES = [
  { slug: "crpo", name: "華麗なるステージの主役", image: "/images/types/sns-brain-type/crpo.webp" },
  { slug: "crlo", name: "ノンストップ実況者", image: "/images/types/sns-brain-type/crlo.webp" },
  { slug: "crpx", name: "秘密の舞台監督", image: "/images/types/sns-brain-type/crpx.webp" },
  { slug: "crlx", name: "距離ゼロの連射砲", image: "/images/types/sns-brain-type/crlx.webp" },
];

const VARIANTS = [
  { name: "現状", imgClass: "w-full", textClass: "text-xs mt-1" },
  { name: "1", imgClass: "w-[90%] mx-auto", textClass: "text-xs mt-1.5 font-bold" },
  { name: "2", imgClass: "w-[85%] mx-auto", textClass: "text-sm mt-1.5 font-bold" },
  { name: "3", imgClass: "w-[80%] mx-auto", textClass: "text-sm mt-2 font-bold" },
  { name: "4", imgClass: "w-[75%] mx-auto", textClass: "text-sm mt-2 font-bold" },
  { name: "5", imgClass: "w-[70%] mx-auto", textClass: "text-base mt-2 font-bold" },
];

export default function TypesSizePreview() {
  const [current, setCurrent] = useState(0);
  const v = VARIANTS[current];

  return (
    <div>
      <main className="min-h-screen px-4 py-8 bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-center mb-6 text-gray-800">
            {v.name}
          </h1>
          <div className="grid grid-cols-2 gap-2">
            {SAMPLE_TYPES.map((type) => (
              <div key={type.slug} className="text-center">
                <img
                  src={type.image}
                  alt={type.name}
                  className={`object-contain ${v.imgClass}`}
                />
                <p className={`text-gray-800 ${v.textClass}`}>
                  {type.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/95 border-t border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-2">
          {VARIANTS.map((vv, i) => (
            <button
              key={vv.name}
              onClick={() => setCurrent(i)}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                current === i
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {vv.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
