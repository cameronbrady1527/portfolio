// neural-background/utils/performance.ts
// Device capability detection for performance optimization

import { PerformanceMode } from '../types';

// Extended Navigator interface for experimental APIs
interface ExtendedNavigator extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType: string;
  };
}

export function detectDeviceCapabilities(): PerformanceMode {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return 'full'; // Default for SSR
  }

  // Check for mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check for low-end devices (CPU cores) - be more conservative
  const isLowEnd = !navigator.hardwareConcurrency || navigator.hardwareConcurrency <= 8;
  
  // Check for low memory devices (rough estimate) - be more conservative
  const extendedNavigator = navigator as ExtendedNavigator;
  const isLowMemory = extendedNavigator.deviceMemory ? extendedNavigator.deviceMemory <= 8 : true; // Default to true if unknown
  
  // Check for slow connection
  const isSlowConnection = extendedNavigator.connection ? 
    ['slow-2g', '2g', '3g'].includes(extendedNavigator.connection.effectiveType) : false;
  
  // Determine performance mode
  if (prefersReducedMotion || isSlowConnection) {
    return 'minimal';
  } else if (isMobile || isLowEnd || isLowMemory) {
    return 'reduced';
  } else {
    return 'full';
  }
} 