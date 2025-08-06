// neural-background/hooks/useResponsiveNetwork.ts
// Custom hook for handling responsive network updates

import { useState, useEffect, useRef } from 'react';
import { PerformanceMode, NetworkDimensions, NetworkData } from '../types';
import { detectDeviceCapabilities } from '../utils/performance';
import { generateNetwork } from '../utils/network-generator';

export function useResponsiveNetwork() {
  const [performanceMode, setPerformanceMode] = useState<PerformanceMode>('full');
  const [dimensions, setDimensions] = useState<NetworkDimensions>({ width: 0, height: 0 });
  const [network, setNetwork] = useState<NetworkData>(() => ({ nodes: [], edges: [] }));
  const [isMounted, setIsMounted] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Ensure we're mounted before doing client-side operations
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Detect device capabilities and set performance mode
  useEffect(() => {
    if (!isMounted) return;
    
    const mode = detectDeviceCapabilities();
    setPerformanceMode(mode);
    
    // Only generate network if we have valid dimensions
    if (dimensions.width > 0 && dimensions.height > 0) {
      setNetwork(generateNetwork(dimensions.width, dimensions.height, mode));
    }
  }, [dimensions.width, dimensions.height, isMounted]);

  // Regenerate network when performance mode changes
  useEffect(() => {
    if (!isMounted) return;
    
    // Only generate network if we have valid dimensions
    if (dimensions.width > 0 && dimensions.height > 0) {
      setNetwork(generateNetwork(dimensions.width, dimensions.height, performanceMode));
    }
  }, [performanceMode, dimensions.width, dimensions.height, isMounted]);

  // Handle resize
  useEffect(() => {
    if (!isMounted) return;
    
    function update() {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        const newDimensions = { width: rect.width, height: rect.height };
        
        // Only update if we have valid dimensions
        if (newDimensions.width > 0 && newDimensions.height > 0) {
          setDimensions(newDimensions);
          setNetwork(generateNetwork(newDimensions.width, newDimensions.height, performanceMode));
        }
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [performanceMode, isMounted]);

  return { performanceMode, dimensions, network, svgRef };
} 