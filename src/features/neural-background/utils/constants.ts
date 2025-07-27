// neural-background/utils/constants.ts
// Performance constants for the neural background feature

import { PerformanceMode } from '../types';

export const COLORS = ["#3b82f6", "#8b5cf6", "#60a5fa", "#06b6d4", "#0ea5e9", "#6366f1", "#8b5cf6", "#a855f7"];

export function getConstants(performanceMode: PerformanceMode) {
  switch (performanceMode) {
    case 'minimal':
      return {
        NODE_COUNT: 20,
        EDGE_COUNT: 40,
        MAX_SIGNALS: 0,
        ANIMATION_SPEED: 0.015,
        RIPPLE_DURATION: 1200,
        NODE_RADIUS: 14,
        SIGNAL_RADIUS: 8,
        AUTO_FIRE_INTERVAL: 8000, // Increased from 5000ms
        MAX_AUTO_SIGNALS: 0,
        USE_FILTERS: false,
        USE_THINKING_GLOW: false,
        USE_SIGNAL_TEXT: false
      };
    case 'reduced':
      return {
        NODE_COUNT: 36,
        EDGE_COUNT: 72,
        MAX_SIGNALS: 1,
        ANIMATION_SPEED: 0.02,
        RIPPLE_DURATION: 1500,
        NODE_RADIUS: 16,
        SIGNAL_RADIUS: 10,
        AUTO_FIRE_INTERVAL: 6000, // Increased from 4000ms
        MAX_AUTO_SIGNALS: 1,
        USE_FILTERS: false,
        USE_THINKING_GLOW: true,
        USE_SIGNAL_TEXT: false
      };
    case 'full':
    default:
      return {
        NODE_COUNT: 56,
        EDGE_COUNT: 140,
        MAX_SIGNALS: 2,
        ANIMATION_SPEED: 0.025,
        RIPPLE_DURATION: 1800,
        NODE_RADIUS: 18,
        SIGNAL_RADIUS: 12,
        AUTO_FIRE_INTERVAL: 5000, // Increased from 3000ms
        MAX_AUTO_SIGNALS: 1,
        USE_FILTERS: true,
        USE_THINKING_GLOW: true,
        USE_SIGNAL_TEXT: false
      };
  }
} 