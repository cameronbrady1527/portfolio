// neural-background/components/NetworkGlow.tsx
// Component for rendering background glow effects

import React from 'react';
import { NetworkDimensions, PerformanceMode } from '../types';
import { getConstants } from '../utils/constants';

interface NetworkGlowProps {
  dimensions: NetworkDimensions;
  performanceMode: PerformanceMode;
}

export function NetworkGlow({
  dimensions,
  performanceMode
}: NetworkGlowProps) {
  const constants = getConstants(performanceMode);

  if (!constants.USE_THINKING_GLOW) {
    return null;
  }

  return (
    <>
      <circle
        cx={dimensions.width / 2}
        cy={dimensions.height / 2}
        r={Math.min(dimensions.width, dimensions.height) * 0.6}
        fill="url(#thinkingGlow)"
        opacity="0.6"
        filter={constants.USE_FILTERS ? "url(#backgroundBlur)" : undefined}
        style={{
          animation: "thinkingBreath 8s ease-in-out infinite",
          pointerEvents: "none"
        }}
      />
      <circle
        cx={dimensions.width / 2}
        cy={dimensions.height / 2}
        r={Math.min(dimensions.width, dimensions.height) * 0.5}
        fill="url(#thinkingGlow)"
        opacity="0.5"
        filter={constants.USE_FILTERS ? "url(#backgroundBlur)" : undefined}
        style={{
          animation: "thinkingBreath 8s ease-in-out infinite 1s",
          pointerEvents: "none"
        }}
      />
      <circle
        cx={dimensions.width / 2}
        cy={dimensions.height / 2}
        r={Math.min(dimensions.width, dimensions.height) * 0.4}
        fill="url(#thinkingGlow)"
        opacity="0.4"
        filter={constants.USE_FILTERS ? "url(#backgroundBlur)" : undefined}
        style={{
          animation: "thinkingBreath 8s ease-in-out infinite 2s",
          pointerEvents: "none"
        }}
      />
    </>
  );
} 