// neural-background/types/index.ts
// Types specific to the neural background feature

export type Node = {
  id: number;
  x: number; // 0-1 (relative)
  y: number; // 0-1 (relative)
  color: string;
};

export type Edge = {
  from: number;
  to: number;
};

export type Signal = {
  id: string;
  from: number;
  to: number;
  progress: number;
};

export type PerformanceMode = 'minimal' | 'reduced' | 'full';

export type NetworkDimensions = {
  width: number;
  height: number;
};

export type NetworkData = {
  nodes: Node[];
  edges: Edge[];
}; 