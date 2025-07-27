// neural-background/utils/position-helpers.ts
// Helper functions for calculating positions in the neural network

import { Node, Edge, Signal, NetworkDimensions } from '../types';

export function nodePos(n: Node, dimensions: NetworkDimensions) {
  return {
    x: n.x * dimensions.width,
    y: n.y * dimensions.height,
  };
}

export function edgePos(e: Edge, nodes: Node[], dimensions: NetworkDimensions) {
  const from = nodePos(nodes[e.from], dimensions);
  const to = nodePos(nodes[e.to], dimensions);
  return { from, to };
}

export function signalPos(
  signal: Signal, 
  nodes: Node[], 
  dimensions: NetworkDimensions
) {
  const { from, to, progress } = signal;
  const a = nodePos(nodes[from], dimensions);
  const b = nodePos(nodes[to], dimensions);
  return {
    x: a.x + (b.x - a.x) * progress,
    y: a.y + (b.y - a.y) * progress,
  };
} 