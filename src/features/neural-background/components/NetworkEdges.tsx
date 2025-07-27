// neural-background/components/NetworkEdges.tsx
// Component for rendering neural network edges

import React from 'react';
import { Edge, Node, NetworkDimensions, PerformanceMode } from '../types';
import { edgePos } from '../utils/position-helpers';
import { getConstants } from '../utils/constants';

interface NetworkEdgesProps {
  edges: Edge[];
  nodes: Node[];
  dimensions: NetworkDimensions;
  performanceMode: PerformanceMode;
}

export function NetworkEdges({
  edges,
  nodes,
  dimensions,
  performanceMode
}: NetworkEdgesProps) {
  const constants = getConstants(performanceMode);

  return (
    <>
      {edges.map((e, i) => {
        const { from, to } = edgePos(e, nodes, dimensions);
        return (
          <line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#334155"
            strokeWidth={2}
            opacity={0.5}
            filter={constants.USE_FILTERS ? "url(#backgroundBlur)" : undefined}
            style={{ pointerEvents: "none" }}
          />
        );
      })}
    </>
  );
} 