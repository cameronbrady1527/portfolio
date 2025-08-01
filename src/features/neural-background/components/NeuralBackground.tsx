// neural-background/components/NeuralBackground.tsx
// Main neural background component - refactored and modular

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getConstants } from '../utils/constants';
import { useResponsiveNetwork } from '../hooks/useResponsiveNetwork';
import { useNetworkAnimation } from '../hooks/useNetworkAnimation';
import { NetworkNodes } from './NetworkNodes';
import { NetworkEdges } from './NetworkEdges';
import { NetworkSignals } from './NetworkSignals';
import { NetworkGlow } from './NetworkGlow';

export function NeuralBackground() {
  const { performanceMode, dimensions, network, svgRef } = useResponsiveNetwork();
  const { signals, ripplingNodes, addSignal, setNodeCount } = useNetworkAnimation(performanceMode);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // Set node count for auto-animation
  useEffect(() => {
    setNodeCount(network.nodes.length);
  }, [network.nodes.length, setNodeCount]);

  const handleNodeClick = useCallback((nodeId: number) => {
    const outgoing = network.edges.filter(e => e.from === nodeId);
    if (outgoing.length === 0) return;
    const edge = outgoing[Math.floor(Math.random() * outgoing.length)];
    addSignal(edge.from, edge.to);
  }, [network.edges, addSignal]);

  // Initial burst of signals (very minimal now)
  useEffect(() => {
    const initialSignals = performanceMode === 'minimal' ? 0 : performanceMode === 'reduced' ? 0 : 1;
    
    for (let i = 0; i < initialSignals; i++) {
      setTimeout(() => {
        const randomNode = Math.floor(Math.random() * network.nodes.length);
        handleNodeClick(randomNode);
      }, i * 2000);
    }
  }, [performanceMode, network.nodes.length, handleNodeClick]);

  // Auto-firing interval
  useEffect(() => {
    const constants = getConstants(performanceMode);
    
    const interval = setInterval(() => {
      const signalsToCreate = Math.min(constants.MAX_AUTO_SIGNALS, constants.MAX_SIGNALS - signals.length);
      for (let i = 0; i < signalsToCreate; i++) {
        setTimeout(() => {
          const randomNode = Math.floor(Math.random() * network.nodes.length);
          handleNodeClick(randomNode);
        }, i * 600);
      }
    }, constants.AUTO_FIRE_INTERVAL);
    
    return () => clearInterval(interval);
  }, [network, signals.length, performanceMode, handleNodeClick]);

  const constants = getConstants(performanceMode);

  return (
    <div className="fixed inset-0 w-full h-full z-0 opacity-80 blur-[0.1px]">
      <svg
        ref={svgRef}
        className="w-full h-full select-none"
        aria-hidden="true"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        style={{ height: "100vh" }}
        onMouseDown={(e) => e.preventDefault()}
      >
        {/* Definitions for gradients and filters */}
        <defs>
          <radialGradient id="signalGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="energyGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="40%" stopColor="#f97316" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#dc2626" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="thinkingGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
          {constants.USE_FILTERS && (
            <filter id="backgroundBlur">
              <feGaussianBlur stdDeviation="0.8" />
            </filter>
          )}
        </defs>

        <NetworkGlow dimensions={dimensions} performanceMode={performanceMode} />
        <NetworkEdges edges={network.edges} nodes={network.nodes} dimensions={dimensions} performanceMode={performanceMode} />
        <NetworkSignals signals={signals} nodes={network.nodes} dimensions={dimensions} performanceMode={performanceMode} />
        <NetworkNodes
          nodes={network.nodes}
          dimensions={dimensions}
          performanceMode={performanceMode}
          hoveredNode={hoveredNode}
          ripplingNodes={ripplingNodes}
          onNodeClick={handleNodeClick}
          onNodeHover={setHoveredNode}
        />
        
        <style>{`
          @keyframes ripple {
             0% { r: ${constants.NODE_RADIUS + 2}; opacity: 0.9; }
             10% { r: ${constants.NODE_RADIUS + 8}; opacity: 0.8; }
             20% { r: ${constants.NODE_RADIUS + 14}; opacity: 0.7; }
             30% { r: ${constants.NODE_RADIUS + 20}; opacity: 0.6; }
             40% { r: ${constants.NODE_RADIUS + 26}; opacity: 0.5; }
             50% { r: ${constants.NODE_RADIUS + 32}; opacity: 0.4; }
             60% { r: ${constants.NODE_RADIUS + 38}; opacity: 0.3; }
             70% { r: ${constants.NODE_RADIUS + 44}; opacity: 0.2; }
             80% { r: ${constants.NODE_RADIUS + 50}; opacity: 0.1; }
             90% { r: ${constants.NODE_RADIUS + 56}; opacity: 0.05; }
             100% { r: ${constants.NODE_RADIUS + 62}; opacity: 0; }
          }
        `}</style>
      </svg>
    </div>
  );
}

export default NeuralBackground; 