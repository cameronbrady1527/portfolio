// neural-background/components/NetworkNodes.tsx
// Component for rendering neural network nodes

import React from 'react';
import { Node, NetworkDimensions, PerformanceMode } from '../types';
import { nodePos } from '../utils/position-helpers';
import { getConstants } from '../utils/constants';

interface NetworkNodesProps {
  nodes: Node[];
  dimensions: NetworkDimensions;
  performanceMode: PerformanceMode;
  hoveredNode: number | null;
  ripplingNodes: Set<number>;
  onNodeClick: (nodeId: number) => void;
  onNodeHover: (nodeId: number | null) => void;
}

export function NetworkNodes({
  nodes,
  dimensions,
  performanceMode,
  hoveredNode,
  ripplingNodes,
  onNodeClick,
  onNodeHover
}: NetworkNodesProps) {
  const constants = getConstants(performanceMode);

  return (
    <>
      {nodes.map((n) => {
        const { x, y } = nodePos(n, dimensions);
        const isHovered = hoveredNode === n.id;
        const isRippling = ripplingNodes.has(n.id);
        
        return (
          <g key={n.id}>
            {/* Ripple effect */}
            {isRippling && (
              <>
                <circle
                  cx={x}
                  cy={y}
                  r={constants.NODE_RADIUS + 2}
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth={3}
                  opacity={0.8}
                  style={{
                    transformOrigin: `${x}px ${y}px`,
                    animation: `ripple ${constants.RIPPLE_DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                    pointerEvents: "none"
                  }}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={constants.NODE_RADIUS + 2}
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  opacity={0.6}
                  style={{
                    transformOrigin: `${x}px ${y}px`,
                    animation: `ripple ${constants.RIPPLE_DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s`,
                    pointerEvents: "none"
                  }}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={constants.NODE_RADIUS + 2}
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth={1.5}
                  opacity={0.4}
                  style={{
                    transformOrigin: `${x}px ${y}px`,
                    animation: `ripple ${constants.RIPPLE_DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s`,
                    pointerEvents: "none"
                  }}
                />
              </>
            )}
            
            {/* Main node circle */}
            <circle
              cx={x}
              cy={y}
              r={constants.NODE_RADIUS}
              fill={n.color}
              stroke="#fff"
              strokeWidth={isRippling ? 3 : 1}
              style={{ 
                filter: (isHovered || isRippling) && constants.USE_FILTERS 
                  ? "drop-shadow(0 0 16px #60a5fa)" 
                  : undefined,
                cursor: "pointer",
                transform: isHovered ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.2s ease, filter 0.2s ease, stroke-width 0.2s ease",
                pointerEvents: "all"
              }}
              onMouseDown={(e) => { 
                e.preventDefault();
                e.stopPropagation();
                onNodeClick(n.id); 
              }}
              onMouseEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onNodeHover(n.id);
              }}
              onMouseLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onNodeHover(null);
              }}
              tabIndex={0}
              aria-label="Neural node"
            />
          </g>
        );
      })}
    </>
  );
} 