import React from 'react';

interface SparklineProps {
  data: number[];
  color?: "red" | "green";
  width?: number;
  height?: number;
}

export default function Sparkline({ data, color = "green", width = 60, height = 20 }: SparklineProps) {
  if (!data || data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");

  const strokeColor = color === "green" ? "#10b981" : "#ef4444"; // emerald-500 : red-500
  const fillUrl = `url(#gradient-${color})`;

  // Create area path
  const areaPoints = `${points} ${width},${height} 0,${height}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M ${points}`} fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M ${areaPoints}`} fill={fillUrl} stroke="none" />
    </svg>
  );
}
