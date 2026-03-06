"use client";

interface CharacterBannerProps {
  images: string[];
}

export default function CharacterBanner({ images }: CharacterBannerProps) {
  const doubled = [...images, ...images];
  return (
    <div className="overflow-hidden -mx-4">
      <div
        className="flex gap-4"
        style={{ animation: "charScroll 12s linear infinite" }}
      >
        {doubled.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            aria-hidden="true"
            className="w-24 h-24 object-contain shrink-0"
          />
        ))}
      </div>
      <style>{`
        @keyframes charScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
