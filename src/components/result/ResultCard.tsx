"use client";

import { useTranslations } from "next-intl";
import type { ResultType, Group } from "@/engine/types";
import RadarChart from "./RadarChart";

interface ResultCardProps {
  type: ResultType;
  group: Group;
  radarLabels: string[];
  diagnosticTitle?: string;
}

export default function ResultCard({
  type,
  group,
  radarLabels,
  diagnosticTitle,
}: ResultCardProps) {
  const t = useTranslations();
  const radarValues = radarLabels.map((_, i) => {
    const keys = Object.keys(type.radar);
    return type.radar[keys[i]] ?? 0;
  });

  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        className="rounded-3xl shadow-xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${group.color}15, ${group.color}05)`,
        }}
      >
        {/* Header */}
        <div
          className="px-6 pt-8 pb-4 text-center"
          style={{
            background: `linear-gradient(135deg, ${group.color}, ${group.color}cc)`,
          }}
        >
          {diagnosticTitle && (
            <p className="text-white/80 text-sm font-medium mb-1">
              {t("result.yourTypeIs", { title: diagnosticTitle })}
            </p>
          )}
          {type.image ? (
            <div className="w-28 h-28 mx-auto mb-3">
              <img
                src={type.image}
                alt={type.name}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          ) : (
            <div className="text-6xl mb-3">
              {type.emoji}
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            {type.name}
          </h1>
          <p className="text-white/70 text-xs font-mono mb-2">
            {type.code}
          </p>
          <p className="text-white/90 text-sm">
            {group.label} - {group.theme}
          </p>
        </div>

        {/* Description */}
        <div className="px-6 py-6">
          <p className="text-lg font-bold text-center mb-4" style={{ color: group.color }}>
            「{type.description}」
          </p>
          <div className="text-gray-700 leading-relaxed text-sm sm:text-base space-y-3">
            {type.detail.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Radar Chart */}
        <div className="px-6 pb-6">
          <h3 className="text-center font-bold text-gray-700 mb-2">
            {t("result.parameters")}
          </h3>
          <RadarChart values={radarValues} labels={radarLabels} color={group.color} />
        </div>
      </div>
    </div>
  );
}
