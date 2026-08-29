import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../theme/theme';

// Anneau de progression — remplace les points de progression de la V1.
// `progression` va de 0 à 1. Purement décoratif : la fraction (ex. "3/7")
// s'affiche à côté, pas dedans.
export default function ProgressRing({
  progression = 0,
  size = 48,
  strokeWidth = 6,
  color = colors.accentIndigo,
  trackColor = colors.divider,
}) {
  const r = (size - strokeWidth) / 2;
  const circonference = 2 * Math.PI * r;
  const rempli = Math.max(0, Math.min(1, progression)) * circonference;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle cx={cx} cy={cy} r={r} stroke={trackColor} strokeWidth={strokeWidth} fill="none" />
      {rempli > 0 && (
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${rempli} ${circonference}`}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      )}
    </Svg>
  );
}
