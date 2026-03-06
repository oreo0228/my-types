"use client";

import { useEffect, useState } from "react";

interface RadarChartProps {
  values: number[];
  labels: string[];
  color: string;
  maxValue?: number;
  size?: number;
}

export default function RadarChart({
  values,
  labels,
  color,
  maxValue = 5,
  size = 280,
}: RadarChartProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const center = size / 2;
  const maxRadius = size * 0.38;
  const levels = maxValue;
  const axes = labels.length;
  const angleStep = (Math.PI * 2) / axes;
  const startAngle = -Math.PI / 2;

  function getPoint(axisIndex: number, value: number): [number, number] {
    const angle = startAngle + axisIndex * angleStep;
    const r = (value / levels) * maxRadius;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  }

  // Grid lines
  const gridPaths = Array.from({ length: levels }, (_, level) => {
    const r = ((level + 1) / levels) * maxRadius;
    const points = Array.from({ length: axes }, (_, i) => {
      const angle = startAngle + i * angleStep;
      return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
    });
    return `M${points.join("L")}Z`;
  });

  // Axis lines
  const axisLines = Array.from({ length: axes }, (_, i) => {
    const [x, y] = getPoint(i, levels);
    return { x1: center, y1: center, x2: x, y2: y };
  });

  // Data polygon
  const currentValues = animated ? values : values.map(() => 0);
  const dataPoints = currentValues.map((v, i) => getPoint(i, v));
  const dataPath = `M${dataPoints.map(([x, y]) => `${x},${y}`).join("L")}Z`;

  // Label positions
  const labelPositions = Array.from({ length: axes }, (_, i) => {
    const angle = startAngle + i * angleStep;
    const r = maxRadius + 30;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className="mx-auto"
    >
      {gridPaths.map((d, i) => (
        <path
          key={`grid-${i}`}
          d={d}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={1}
        />
      ))}

      {axisLines.map((line, i) => (
        <line
          key={`axis-${i}`}
          {...line}
          stroke="#e5e7eb"
          strokeWidth={1}
        />
      ))}

      <path
        d={dataPath}
        fill={`${color}30`}
        stroke={color}
        strokeWidth={2.5}
        className="transition-all duration-700 ease-out"
      />

      {dataPoints.map(([x, y], i) => (
        <circle
          key={`point-${i}`}
          cx={x}
          cy={y}
          r={4}
          fill={color}
          className="transition-all duration-700 ease-out"
        />
      ))}

      {labelPositions.map((pos, i) => (
        <text
          key={`label-${i}`}
          x={pos.x}
          y={pos.y}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-gray-600 text-[11px] font-medium"
        >
          {labels[i]}
        </text>
      ))}
    </svg>
  );
}
