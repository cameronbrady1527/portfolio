// neural-background/hooks/useResponsiveNetwork.ts
// Custom hook for handling responsive network updates

import { useState, useEffect, useRef } from 'react';
import { PerformanceMode, NetworkDimensions, NetworkData } from '../types';
import { detectDeviceCapabilities } from '../utils/performance';
import { generateNetwork } from '../utils/network-generator';

export function useResponsiveNetwork() {
  const [performanceMode, setPerformanceMode] = useState<PerformanceMode>('full');
  const [dimensions, setDimensions] = useState<NetworkDimensions>({ width: 1440, height: 900 });
  const [network, setNetwork] = useState<NetworkData>(() => generateNetwork(1440, 900, 'full'));
  const svgRef = useRef<SVGSVGElement>(null);

  // Detect device capabilities and set performance mode
  useEffect(() => {
    const mode = detectDeviceCapabilities();
    setPerformanceMode(mode);
    setNetwork(generateNetwork(dimensions.width, dimensions.height, mode));
  }, [dimensions.width, dimensions.height]);

  // Regenerate network when performance mode changes
  useEffect(() => {
    setNetwork(generateNetwork(dimensions.width, dimensions.height, performanceMode));
  }, [performanceMode, dimensions.width, dimensions.height]);

  // Handle resize
  useEffect(() => {
    function update() {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        const newDimensions = { width: rect.width, height: rect.height };
        setDimensions(newDimensions);
        setNetwork(generateNetwork(newDimensions.width, newDimensions.height, performanceMode));
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [performanceMode]);

  return { performanceMode, dimensions, network, svgRef };
} 