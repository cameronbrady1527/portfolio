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
  // Hooks -----
  const { performanceMode, dimensions, network, svgRef } = useResponsiveNetwork();
  const { signals, ripplingNodes, addSignal, setNodeCount } = useNetworkAnimation(performanceMode);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [autoFireCounter, setAutoFireCounter] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  
  // Ensure we're mounted before using client-side APIs
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Seeded random number generator for consistent but random-looking behavior
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Set node count for auto-animation
  useEffect(() => {
    setNodeCount(network.nodes.length);
  }, [network.nodes.length, setNodeCount]);

  const handleNodeClick = useCallback((nodeId: number) => {
    // Only create signals in full performance mode
    if (performanceMode !== 'full') return;
    
    const outgoing = network.edges.filter(e => e.from === nodeId);
    if (outgoing.length === 0) return;
    const edge = outgoing[Math.floor(Math.random() * outgoing.length)];
    addSignal(edge.from, edge.to);
  }, [network.edges, addSignal, performanceMode]);

  // Initial burst of signals (only in full mode)
  useEffect(() => {
    if (!isMounted || performanceMode !== 'full') return;
    
    const initialSignals = 1;
    
    for (let i = 0; i < initialSignals; i++) {
      setTimeout(() => {
        // Use Date.now() only after mounting to avoid hydration issues
        const randomSeed = Date.now() + i * 1000;
        const nodeIndex = Math.floor(seededRandom(randomSeed) * network.nodes.length);
        handleNodeClick(nodeIndex);
      }, i * 2000);
    }
  }, [performanceMode, network.nodes.length, handleNodeClick, isMounted]);

  // Auto-firing interval (only in full mode)
  useEffect(() => {
    if (!isMounted || performanceMode !== 'full') return;
    
    const constants = getConstants(performanceMode);
    
    const interval = setInterval(() => {
      const signalsToCreate = Math.min(constants.MAX_AUTO_SIGNALS, constants.MAX_SIGNALS - signals.length);
      for (let i = 0; i < signalsToCreate; i++) {
        setTimeout(() => {
          // Use Date.now() only after mounting to avoid hydration issues
          const randomSeed = Date.now() + autoFireCounter + i * 1000;
          const nodeIndex = Math.floor(seededRandom(randomSeed) * network.nodes.length);
          handleNodeClick(nodeIndex);
        }, i * 600);
      }
      setAutoFireCounter(prev => prev + signalsToCreate);
    }, constants.AUTO_FIRE_INTERVAL);
    
    return () => clearInterval(interval);
  }, [network, signals.length, performanceMode, handleNodeClick, autoFireCounter, isMounted]);

  const constants = getConstants(performanceMode);

  // Don't render if we don't have a network yet
  if (network.nodes.length === 0 || dimensions.width === 0 || dimensions.height === 0) {
    return (
      <div className="fixed inset-0 w-full h-full z-0 opacity-80 blur-[0.1px]">
        <svg
          ref={svgRef}
          className="w-full h-full select-none"
          aria-hidden="true"
          viewBox="0 0 1440 900"
          style={{ height: "100vh" }}
          onMouseDown={(e) => e.preventDefault()}
        />
      </div>
    );
  }

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
        {performanceMode === 'full' && (
          <NetworkSignals signals={signals} nodes={network.nodes} dimensions={dimensions} performanceMode={performanceMode} />
        )}
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