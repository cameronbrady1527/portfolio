// neural-background/components/NetworkSignals.tsx
// Component for rendering neural network signals

import React from 'react';
import { Signal, Node, NetworkDimensions, PerformanceMode } from '../types';
import { signalPos } from '../utils/position-helpers';
import { getConstants } from '../utils/constants';

interface NetworkSignalsProps {
  signals: Signal[];
  nodes: Node[];
  dimensions: NetworkDimensions;
  performanceMode: PerformanceMode;
}

export function NetworkSignals({
  signals,
  nodes,
  dimensions,
  performanceMode
}: NetworkSignalsProps) {
  const constants = getConstants(performanceMode);

  return (
    <>
      {signals.map((signal) => {
        const pos = signalPos(signal, nodes, dimensions);
        return (
          <g key={signal.id}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={constants.SIGNAL_RADIUS}
              fill="url(#energyGradient)"
              filter={constants.USE_FILTERS ? "drop-shadow(0 0 12px #f97316) drop-shadow(0 0 6px #fbbf24)" : undefined}
              style={{ pointerEvents: "none" }}
            />
            {constants.USE_SIGNAL_TEXT && (
              <text
                x={pos.x + 15}
                y={pos.y - 15}
                fill="yellow"
                fontSize="10"
                style={{ pointerEvents: "none" }}
              >
                {Math.round(signal.progress * 100)}%
              </text>
            )}
          </g>
        );
      })}
    </>
  );
} 