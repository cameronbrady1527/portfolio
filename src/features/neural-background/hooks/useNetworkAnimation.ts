// neural-background/hooks/useNetworkAnimation.ts
// Custom hook for managing signal animations

import { useState, useEffect, useRef, useCallback } from 'react';
import { Signal, PerformanceMode } from '../types';
import { getConstants } from '../utils/constants';

export function useNetworkAnimation(performanceMode: PerformanceMode) {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [ripplingNodes, setRipplingNodes] = useState<Set<number>>(new Set());
  const animationRef = useRef<number | undefined>(undefined);
  const nodeCountRef = useRef(0);
  const autoAnimateCounterRef = useRef(0);
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

  const constants = getConstants(performanceMode);

  // Simplified ripple trigger - no queue needed
  const triggerRipple = useCallback((nodeId: number) => {
    setRipplingNodes(prev => new Set([...prev, nodeId]));
    
    setTimeout(() => {
      setRipplingNodes(prev => {
        const newSet = new Set(prev);
        newSet.delete(nodeId);
        return newSet;
      });
    }, constants.RIPPLE_DURATION);
  }, [constants.RIPPLE_DURATION]);

  // Animate signals using requestAnimationFrame
  useEffect(() => {
    if (signals.length === 0) {
      return undefined;
    }

    const animate = () => {
      setSignals(prev => {
        const updated = prev.map(signal => ({
          ...signal,
          progress: Math.min(signal.progress + constants.ANIMATION_SPEED, 1)
        }));

        // Check for completed signals
        const completed = updated.filter(s => s.progress >= 0.95);
        if (completed.length > 0) {
          // Trigger ripples for all completed signals immediately
          completed.forEach(signal => {
            triggerRipple(signal.to);
          });
          
          // Remove completed signals
          return updated.filter(s => s.progress < 0.95);
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
  }, [signals.length, constants.ANIMATION_SPEED, triggerRipple]);

  // Auto-animate nodes periodically (independent of signals)
  useEffect(() => {
    if (nodeCountRef.current === 0 || !isMounted) return;

    const autoAnimateInterval = setInterval(() => {
      // Auto-animate nodes periodically, regardless of signal state
      const randomSeed = Date.now() + autoAnimateCounterRef.current;
      const nodeIndex = Math.floor(seededRandom(randomSeed) * nodeCountRef.current);
      triggerRipple(nodeIndex);
      autoAnimateCounterRef.current++;
    }, constants.AUTO_FIRE_INTERVAL); // Use the same interval as signals

    return () => clearInterval(autoAnimateInterval);
  }, [constants.AUTO_FIRE_INTERVAL, triggerRipple, isMounted]);

  const addSignal = (from: number, to: number) => {
    if (signals.length >= constants.MAX_SIGNALS) return;
    
    // Use Date.now() for ID generation only after mounting to avoid hydration issues
    const randomSeed = isMounted ? Date.now() + signals.length * 1000 + from * 100 + to : signals.length * 1000 + from * 100 + to;
    const randomSuffix = Math.floor(seededRandom(randomSeed) * 10000);
    const signalId = `signal-${from}-${to}-${signals.length}-${randomSuffix}`;
    const newSignal: Signal = { 
      id: signalId, 
      from, 
      to, 
      progress: 0 
    };
    setSignals(prev => [...prev, newSignal]);
  };

  // Function to set node count for auto-animation
  const setNodeCount = (count: number) => {
    nodeCountRef.current = count;
  };

  return { signals, ripplingNodes, addSignal, setNodeCount };
} 