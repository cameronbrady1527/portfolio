// neural-background/utils/network-generator.ts
// Network generation logic for neural background

import { Node, Edge, PerformanceMode, NetworkData } from '../types';
import { getConstants, COLORS } from './constants';

export function generateNetwork(
  width: number, 
  height: number, 
  performanceMode: PerformanceMode
): NetworkData {
  const constants = getConstants(performanceMode);
  
  // Calculate grid layout to cover the full screen
  const COLS = performanceMode === 'minimal' ? 3 : performanceMode === 'reduced' ? 3 : 6;
  
  // Calculate rows based on screen height and aspect ratio
  const aspectRatio = width / height;
  const baseRows = Math.max(6, Math.floor(height / 100));
  const adjustedRows = aspectRatio < 1 ? Math.floor(baseRows * 1.5) : baseRows;
  
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
    
    // Add controlled jitter for natural randomness using deterministic seed
    const jitterRange = 0.2;
    const seed = (i * 9301 + 49297) % 233280; // Simple deterministic seed
    const jitterX = ((seed / 233280) - 0.5) * jitterRange;
    const jitterY = (((seed * 9301 + 49297) % 233280) / 233280 - 0.5) * jitterRange;
    
    // Apply jitter with some constraints to prevent clustering
    let finalX = baseX + jitterX;
    let finalY = baseY + jitterY;
    
    // Ensure nodes stay within reasonable bounds of their grid cell
    const cellWidth = 1 / COLS;
    const cellHeight = 1 / actualRows;
    const maxOffset = Math.min(cellWidth, cellHeight) * 0.4;
    
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
  
  // Generate edges
  const edges: Edge[] = [];
  const maxConnections = performanceMode === 'minimal' ? 2 : performanceMode === 'reduced' ? 3 : 4;
  
  for (let i = 0; i < TOTAL_NODES; i++) {
    const targets = new Set<number>();
    // const minConnections = 1;
    const minConnections = performanceMode === 'minimal' ? 1 : 2;
    
    // Use deterministic seed for edge generation
    let seed = (i * 9301 + 49297) % 233280;
    
    while (targets.size < minConnections) {
      seed = (seed * 9301 + 49297) % 233280;
      const t = Math.floor((seed / 233280) * TOTAL_NODES);
      if (t !== i) targets.add(t);
    }
    
    while (targets.size < maxConnections) {
      seed = (seed * 9301 + 49297) % 233280;
      const randomValue = seed / 233280;
      if (randomValue > 0.4) {
        const t = Math.floor(randomValue * TOTAL_NODES);
        if (t !== i) targets.add(t);
      } else {
        break;
      }
    }
    
    for (const t of targets) {
      if (!edges.find(e => (e.from === i && e.to === t) || (e.from === t && e.to === i))) {
        edges.push({ from: i, to: t });
      }
    }
  }

  return { nodes, edges };
} 