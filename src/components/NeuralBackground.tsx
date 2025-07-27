"use client";
// NeuralBackground.tsx
// Responsive, interactive neural network background for the portfolio. Nodes are clickable and animate a signal transfer with ripple effect.
//
// Usage: Place <NeuralBackground /> as the first child of a relative container (e.g., <div className="relative min-h-screen">) so it stays in the background. All main content should have a higher z-index (e.g., z-10).
//
// Navigation:
// - Responsive SVG neural network
// - Programmatic node/edge generation
// - Clickable nodes, animated signal, ripple effect
// - Accessibility: aria-hidden, z-[-1] (never above content)
// - Performance optimized with device detection

import React, { useRef, useState, useEffect } from "react";

// --- Types ---
type Node = {
  id: number;
  x: number; // 0-1 (relative)
  y: number; // 0-1 (relative)
  color: string;
};
type Edge = {
  from: number;
  to: number;
};

// --- Performance Detection ---
function detectDeviceCapabilities() {
  // Check for mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check for low-end devices (CPU cores)
  const isLowEnd = navigator.hardwareConcurrency <= 4;
  
  // Check for low memory devices (rough estimate)
  const isLowMemory = (navigator as any).deviceMemory ? (navigator as any).deviceMemory <= 4 : false;
  
  // Check for slow connection
  const isSlowConnection = (navigator as any).connection ? 
    ['slow-2g', '2g', '3g'].includes((navigator as any).connection.effectiveType) : false;
  
  // Determine performance mode
  if (prefersReducedMotion || isSlowConnection) {
    return 'minimal';
  } else if (isMobile || isLowEnd || isLowMemory) {
    return 'reduced';
  } else {
    return 'full';
  }
}

// --- Constants (Dynamic based on performance mode) ---
function getConstants(performanceMode: 'minimal' | 'reduced' | 'full') {
  switch (performanceMode) {
    case 'minimal':
      return {
        NODE_COUNT: 20, // Increased from 15 for better coverage
        EDGE_COUNT: 40,
        MAX_SIGNALS: 2,
        ANIMATION_SPEED: 0.015,
        RIPPLE_DURATION: 800,
        NODE_RADIUS: 14,
        SIGNAL_RADIUS: 8,
        AUTO_FIRE_INTERVAL: 3000,
        MAX_AUTO_SIGNALS: 1,
        USE_FILTERS: false,
        USE_THINKING_GLOW: false,
        USE_SIGNAL_TEXT: false
      };
    case 'reduced':
      return {
        NODE_COUNT: 36, // Increased from 30 for better coverage (6x6 grid)
        EDGE_COUNT: 72,
        MAX_SIGNALS: 4,
        ANIMATION_SPEED: 0.02,
        RIPPLE_DURATION: 1000,
        NODE_RADIUS: 16,
        SIGNAL_RADIUS: 10,
        AUTO_FIRE_INTERVAL: 2000,
        MAX_AUTO_SIGNALS: 2,
        USE_FILTERS: false,
        USE_THINKING_GLOW: true,
        USE_SIGNAL_TEXT: false
      };
    case 'full':
    default:
      return {
        NODE_COUNT: 56, // Increased from 50 for better coverage (7x8 grid)
        EDGE_COUNT: 140,
        MAX_SIGNALS: 6,
        ANIMATION_SPEED: 0.025,
        RIPPLE_DURATION: 1200,
        NODE_RADIUS: 18,
        SIGNAL_RADIUS: 12,
        AUTO_FIRE_INTERVAL: 1500,
        MAX_AUTO_SIGNALS: 3,
        USE_FILTERS: true,
        USE_THINKING_GLOW: true,
        USE_SIGNAL_TEXT: true
      };
  }
}

const COLORS = ["#3b82f6", "#8b5cf6", "#60a5fa", "#06b6d4", "#0ea5e9", "#6366f1", "#8b5cf6", "#a855f7"];

// --- Helper: Generate nodes and edges ---
function generateNetwork(width: number, height: number, performanceMode: 'minimal' | 'reduced' | 'full') {
  const constants = getConstants(performanceMode);
  
  // Calculate grid layout to cover the full screen
  const COLS = performanceMode === 'minimal' ? 5 : performanceMode === 'reduced' ? 6 : 7;
  
  // Calculate rows based on screen height and aspect ratio
  const aspectRatio = width / height;
  const baseRows = Math.max(6, Math.floor(height / 100));
  const adjustedRows = aspectRatio < 1 ? Math.floor(baseRows * 1.5) : baseRows; // More rows for tall screens
  
  // Calculate total nodes needed to fill the grid
  const TOTAL_NODES = Math.min(COLS * adjustedRows, constants.NODE_COUNT);
  
  // Ensure we have enough nodes to fill at least the minimum rows
  const actualRows = Math.ceil(TOTAL_NODES / COLS);
  
  const nodes: Node[] = Array.from({ length: TOTAL_NODES }, (_, i) => {
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    
    // Calculate base position in grid
    const baseX = (col + 0.5) / COLS;
    const baseY = (row + 0.5) / actualRows;
    
    // Add controlled jitter for natural randomness
    // Use smaller, more controlled jitter for better spacing
    const jitterRange = 0.15; // Reduced from 0.25 for more order
    const jitterX = (Math.random() - 0.5) * jitterRange;
    const jitterY = (Math.random() - 0.5) * jitterRange;
    
    // Apply jitter with some constraints to prevent clustering
    let finalX = baseX + jitterX;
    let finalY = baseY + jitterY;
    
    // Ensure nodes stay within reasonable bounds of their grid cell
    const cellWidth = 1 / COLS;
    const cellHeight = 1 / actualRows;
    const maxOffset = Math.min(cellWidth, cellHeight) * 0.4; // Limit offset to 40% of cell size
    
    finalX = Math.max(baseX - maxOffset, Math.min(baseX + maxOffset, finalX));
    finalY = Math.max(baseY - maxOffset, Math.min(baseY + maxOffset, finalY));
    
    // Keep within screen bounds
    finalX = Math.min(Math.max(finalX, 0.05), 0.95);
    finalY = Math.min(Math.max(finalY, 0.05), 0.95);
    
    return {
      id: i,
      x: finalX,
      y: finalY,
      color: COLORS[i % COLORS.length],
    };
  });
  
  // Edges: connect each node to fewer others in reduced modes
  const edges: Edge[] = [];
  const maxConnections = performanceMode === 'minimal' ? 2 : performanceMode === 'reduced' ? 3 : 4;
  
  for (let i = 0; i < TOTAL_NODES; i++) {
    const targets = new Set<number>();
    // Ensure at least 2 connections (1 for minimal)
    const minConnections = performanceMode === 'minimal' ? 1 : 2;
    while (targets.size < minConnections) {
      const t = Math.floor(Math.random() * TOTAL_NODES);
      if (t !== i) targets.add(t);
    }
    // Add up to maxConnections more random connections
    while (targets.size < maxConnections && Math.random() > 0.4) {
      const t = Math.floor(Math.random() * TOTAL_NODES);
      if (t !== i) targets.add(t);
    }
    for (const t of targets) {
      if (!edges.find(e => (e.from === i && e.to === t) || (e.from === t && e.to === i))) {
        edges.push({ from: i, to: t });
      }
    }
  }

  return { nodes, edges };
}

// --- Main Component ---
export function NeuralBackground() {
  const [performanceMode, setPerformanceMode] = useState<'minimal' | 'reduced' | 'full'>('full');
  const [dimensions, setDimensions] = useState({ width: 1440, height: 900 });
  const [network, setNetwork] = useState(() => generateNetwork(1440, 900, 'full'));
  const [signals, setSignals] = useState<Array<{ id: string; from: number; to: number; progress: number }>>([]);
  const [rippleNode, setRippleNode] = useState<null | number>(null);
  const [hoveredNode, setHoveredNode] = useState<null | number>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Detect device capabilities and set performance mode
  useEffect(() => {
    const mode = detectDeviceCapabilities();
    setPerformanceMode(mode);
    
    // Regenerate network with new performance mode
    setNetwork(generateNetwork(dimensions.width, dimensions.height, mode));
  }, []);

  // Regenerate network when performance mode changes
  useEffect(() => {
    setNetwork(generateNetwork(dimensions.width, dimensions.height, performanceMode));
  }, [performanceMode, dimensions.width, dimensions.height]);

  // Initial burst of signals (fewer for reduced modes)
  useEffect(() => {
    const constants = getConstants(performanceMode);
    const initialSignals = performanceMode === 'minimal' ? 1 : performanceMode === 'reduced' ? 2 : 3;
    
    for (let i = 0; i < initialSignals; i++) {
      setTimeout(() => {
        const randomNode = Math.floor(Math.random() * network.nodes.length);
        handleNodeClick(randomNode);
      }, i * 800);
    }
  }, [performanceMode, network.nodes.length]);

  // Responsive: update dimensions on resize
  useEffect(() => {
    function update() {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        const newDimensions = { width: rect.width, height: rect.height };
        setDimensions(newDimensions);
        
        // Regenerate network with new dimensions
        setNetwork(generateNetwork(newDimensions.width, newDimensions.height, performanceMode));
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [performanceMode]);

  // Animate signals using requestAnimationFrame
  useEffect(() => {
    if (signals.length === 0) {
      return undefined;
    }

    const constants = getConstants(performanceMode);
    
    const animate = () => {
      setSignals(prev => {
        const updated = prev.map(signal => ({
          ...signal,
          progress: Math.min(signal.progress + constants.ANIMATION_SPEED, 1)
        }));

        // Check for completed signals
        const completed = updated.filter(s => s.progress >= 1);
        if (completed.length > 0) {
          // Trigger ripple effect for completed signals
          completed.forEach(signal => {
            setRippleNode(signal.to);
            setTimeout(() => setRippleNode(null), constants.RIPPLE_DURATION);
          });
          
          // Remove completed signals
          return updated.filter(s => s.progress < 1);
        }

        return updated;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [signals.length, performanceMode]);

  // Random firing (less frequent for reduced modes)
  useEffect(() => {
    const constants = getConstants(performanceMode);
    
    const interval = setInterval(() => {
      // Create fewer signals for reduced modes
      const signalsToCreate = Math.min(constants.MAX_AUTO_SIGNALS, constants.MAX_SIGNALS - signals.length);
      for (let i = 0; i < signalsToCreate; i++) {
        setTimeout(() => {
          const randomNode = Math.floor(Math.random() * network.nodes.length);
          handleNodeClick(randomNode);
        }, i * 600);
      }
    }, constants.AUTO_FIRE_INTERVAL);
    
    return () => clearInterval(interval);
  }, [network, signals.length, performanceMode]);

  // Click handler
  function handleNodeClick(nodeId: number) {
    const constants = getConstants(performanceMode);
    if (signals.length >= constants.MAX_SIGNALS) return;
    
    // Find an edge from this node
    const outgoing = network.edges.filter(e => e.from === nodeId);
    if (outgoing.length === 0) return;
    const edge = outgoing[Math.floor(Math.random() * outgoing.length)];
    const newSignal = { 
      id: `${Date.now()}-${Math.random()}`, 
      from: edge.from, 
      to: edge.to, 
      progress: 0 
    };
    setSignals(prev => [...prev, newSignal]);
  }

  // Helper: get node absolute position
  function nodePos(n: Node) {
    return {
      x: n.x * dimensions.width,
      y: n.y * dimensions.height,
    };
  }

  // Helper: get edge positions
  function edgePos(e: Edge) {
    const from = nodePos(network.nodes[e.from]);
    const to = nodePos(network.nodes[e.to]);
    return { from, to };
  }

  // Helper: signal position
  function signalPos(signal: { from: number; to: number; progress: number }) {
    const { from, to, progress } = signal;
    const a = nodePos(network.nodes[from]);
    const b = nodePos(network.nodes[to]);
    return {
      x: a.x + (b.x - a.x) * progress,
      y: a.y + (b.y - a.y) * progress,
    };
  }

  const constants = getConstants(performanceMode);

  return (
    <div className="fixed inset-0 w-full h-full z-0">
      {/* Debug indicator - only show in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-mono z-10">
          Mode: {performanceMode}
        </div>
      )}
      <svg
        ref={svgRef}
        className="w-full h-full select-none"
        aria-hidden="true"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        style={{ 
          height: "100vh",
          "--signal-pulse": "2s ease-in-out infinite"
        } as React.CSSProperties}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
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

        {/* Thinking Glow - Breathing Effect (only in reduced/full modes) */}
        {constants.USE_THINKING_GLOW && (
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
        )}

        {/* Edges */}
        {network.edges.map((e, i) => {
          const { from, to } = edgePos(e);
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
        
        {/* Signal */}
        {signals.map((signal) => {
          const pos = signalPos(signal);
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

        {/* Nodes */}
        {network.nodes.map((n) => {
          const { x, y } = nodePos(n);
          const isHovered = hoveredNode === n.id;
          const isRippling = rippleNode === n.id;
          
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
                    opacity={0.7}
                    style={{
                      transformOrigin: `${x}px ${y}px`,
                      animation: `ripple 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
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
                    opacity={0.5}
                    style={{
                      transformOrigin: `${x}px ${y}px`,
                      animation: `ripple 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.08s`,
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
                    opacity={0.3}
                    style={{
                      transformOrigin: `${x}px ${y}px`,
                      animation: `ripple 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.16s`,
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
                  filter: (isHovered || isRippling) && constants.USE_FILTERS ? "drop-shadow(0 0 16px #60a5fa)" : undefined,
                  cursor: "pointer",
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.2s ease, filter 0.2s ease",
                  pointerEvents: "all"
                }}
                onMouseDown={(e) => { 
                  e.preventDefault();
                  e.stopPropagation();
                  handleNodeClick(n.id); 
                }}
                onMouseEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setHoveredNode(n.id);
                }}
                onMouseLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setHoveredNode(null);
                }}
                tabIndex={0}
                aria-label="Neural node"
              />
            </g>
          );
        })}
        <style>{`
          @keyframes ripple {
             0% { r: ${constants.NODE_RADIUS + 2}; opacity: 0.9; }
             10% { r: ${constants.NODE_RADIUS + 6}; opacity: 0.8; }
             20% { r: ${constants.NODE_RADIUS + 10}; opacity: 0.7; }
             30% { r: ${constants.NODE_RADIUS + 14}; opacity: 0.6; }
             40% { r: ${constants.NODE_RADIUS + 18}; opacity: 0.5; }
             50% { r: ${constants.NODE_RADIUS + 22}; opacity: 0.4; }
             60% { r: ${constants.NODE_RADIUS + 26}; opacity: 0.3; }
             70% { r: ${constants.NODE_RADIUS + 30}; opacity: 0.2; }
             80% { r: ${constants.NODE_RADIUS + 34}; opacity: 0.1; }
             90% { r: ${constants.NODE_RADIUS + 38}; opacity: 0.05; }
             100% { r: ${constants.NODE_RADIUS + 28}; opacity: 0; }
          }
        `}</style>
      </svg>
    </div>
  );
}

export default NeuralBackground;
