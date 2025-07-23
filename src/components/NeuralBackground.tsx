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

// --- Constants ---
const NODE_COUNT = 50;
const EDGE_COUNT = 150;
const COLORS = ["#3b82f6", "#8b5cf6", "#60a5fa", "#06b6d4", "#0ea5e9", "#6366f1", "#8b5cf6", "#a855f7"];
const NODE_RADIUS = 18;
const SIGNAL_RADIUS = 12;
const RIPPLE_DURATION = 1200; // ms

// --- Helper: Generate nodes and edges ---
function generateNetwork(width: number, height: number) {
  // Place nodes in a grid-ish, but with some randomness
  const COLS = 7;
  const ROWS = Math.max(8, Math.floor(height / 100)); // More rows based on screen height, min 8
  const TOTAL_NODES = Math.min(COLS * ROWS, 70); // Cap at 70 nodes max
  const nodes: Node[] = Array.from({ length: TOTAL_NODES }, (_, i) => {
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    // Add jitter, but keep nodes within bounds
    const jitterX = (Math.random() - 0.5) * 0.35;
    const jitterY = (Math.random() - 0.5) * 0.35;
    return {
      id: i,
      x: Math.min(Math.max((col + 0.5 + jitterX) / COLS, 0.05), 0.95),
      y: Math.min(Math.max((row + 0.5 + jitterY) / ROWS, 0.05), 0.95),
      color: COLORS[i % COLORS.length],
    };
  });
  // Edges: connect each node to at least 3 others, up to 6
  const edges: Edge[] = [];
  for (let i = 0; i < TOTAL_NODES; i++) {
    const targets = new Set<number>();
    // Ensure at least 3 connections
    while (targets.size < 3) {
      const t = Math.floor(Math.random() * TOTAL_NODES);
      if (t !== i) targets.add(t);
    }
    // Add up to 3 more random connections
    while (targets.size < 6 && Math.random() > 0.3) {
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
  const [dimensions, setDimensions] = useState({ width: 1440, height: 900 });
  const [network] = useState(() => generateNetwork(1440, 900));
  const [signals, setSignals] = useState<Array<{ id: string; from: number; to: number; progress: number }>>([]);
  const [rippleNode, setRippleNode] = useState<null | number>(null);
  const [hoveredNode, setHoveredNode] = useState<null | number>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Initial burst of signals
  useEffect(() => {
    // Create 5 initial signals with staggered timing
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const randomNode = Math.floor(Math.random() * network.nodes.length);
        handleNodeClick(randomNode);
      }, i * 600);
    }
  }, []);

  // Responsive: update dimensions on resize
  useEffect(() => {
    function update() {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Animate signals using requestAnimationFrame
  useEffect(() => {
    if (signals.length === 0) {
      return undefined;
    }

    const animate = () => {
      setSignals(prev => {
        const updated = prev.map(signal => ({
          ...signal,
          progress: Math.min(signal.progress + 0.03, 1)
        }));

        // Check for completed signals
        const completed = updated.filter(s => s.progress >= 1);
        if (completed.length > 0) {
  
          // Trigger ripple effect for completed signals
          completed.forEach(signal => {
            setRippleNode(signal.to);
            setTimeout(() => setRippleNode(null), RIPPLE_DURATION);
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
  }, [signals.length]);

  // Random firing every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Create multiple signals at once
      const signalsToCreate = Math.min(4, 8 - signals.length); // Create up to 4 new signals
      for (let i = 0; i < signalsToCreate; i++) {
        setTimeout(() => {
          const randomNode = Math.floor(Math.random() * network.nodes.length);
          handleNodeClick(randomNode);
        }, i * 400); // Stagger them by 400ms
      }
    }, 1500);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [network, signals.length]);

  // Click handler
  function handleNodeClick(nodeId: number) {
    if (signals.length >= 8) return; // Allow up to 8 simultaneous signals
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

  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <svg
        ref={svgRef}
        className="w-full h-full select-none"
        aria-hidden="true"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        style={{ 
          height: "100vh",
          // Add CSS for signal animation
          "--signal-pulse": "2s ease-in-out infinite"
        } as React.CSSProperties}
        onMouseDown={(e) => {
          // Prevent any default behavior that might interfere
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
        </defs>

        {/* Thinking Glow - Breathing Effect */}
        <circle
          cx={dimensions.width / 2}
          cy={dimensions.height / 2}
          r={Math.min(dimensions.width, dimensions.height) * 0.6}
          fill="url(#thinkingGlow)"
          opacity="0.6"
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
          style={{
            animation: "thinkingBreath 8s ease-in-out infinite 2s",
            pointerEvents: "none"
          }}
        />

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
              style={{ pointerEvents: "none" }}
            />
          );
        })}
        {/* Signal */}
        {signals.map((signal) => {
          const pos = signalPos(signal);
          console.log('Rendering signal at:', pos, 'progress:', signal.progress);
          return (
            <g key={signal.id}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={10}
                fill="url(#energyGradient)"
                filter="drop-shadow(0 0 12px #f97316) drop-shadow(0 0 6px #fbbf24)"
                style={{ pointerEvents: "none" }}
              />
              <text
                x={pos.x + 15}
                y={pos.y - 15}
                fill="yellow"
                fontSize="10"
                style={{ pointerEvents: "none" }}
              >
                {Math.round(signal.progress * 100)}%
              </text>
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
                    r={NODE_RADIUS + 2}
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
                    r={NODE_RADIUS + 2}
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
                    r={NODE_RADIUS + 2}
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
                r={NODE_RADIUS}
                fill={n.color}
                stroke="#fff"
                strokeWidth={isRippling ? 3 : 1}
                style={{ 
                  filter: isHovered || isRippling ? "drop-shadow(0 0 16px #60a5fa)" : undefined,
                  cursor: "pointer",
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.2s ease, filter 0.2s ease",
                  pointerEvents: "all"
                }}
                onMouseDown={(e) => { 
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Node clicked (mousedown):', n.id); 
                  handleNodeClick(n.id); 
                }}
                onMouseEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setHoveredNode(n.id);
                  console.log('Node hovered:', n.id);
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
             0% { r: ${NODE_RADIUS + 2}; opacity: 0.9; }
             10% { r: ${NODE_RADIUS + 6}; opacity: 0.8; }
             20% { r: ${NODE_RADIUS + 10}; opacity: 0.7; }
             30% { r: ${NODE_RADIUS + 14}; opacity: 0.6; }
             40% { r: ${NODE_RADIUS + 18}; opacity: 0.5; }
             50% { r: ${NODE_RADIUS + 22}; opacity: 0.4; }
             60% { r: ${NODE_RADIUS + 26}; opacity: 0.3; }
             70% { r: ${NODE_RADIUS + 30}; opacity: 0.2; }
             80% { r: ${NODE_RADIUS + 34}; opacity: 0.1; }
             90% { r: ${NODE_RADIUS + 38}; opacity: 0.05; }
             100% { r: ${NODE_RADIUS + 28}; opacity: 0; }
          }
        `}</style>
      </svg>
    </div>
  );
}

export default NeuralBackground;
