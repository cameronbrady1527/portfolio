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
    return 'reduced'; // Conservative default for SSR
  }

  // Check for mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check for low-end devices (CPU cores) - be more aggressive
  const isLowEnd = !navigator.hardwareConcurrency || navigator.hardwareConcurrency <= 6;
  
  // Check for low memory devices
  const extendedNavigator = navigator as ExtendedNavigator;
  const isLowMemory = extendedNavigator.deviceMemory ? extendedNavigator.deviceMemory <= 8 : false;
  
  // Check for slow connection
  const isSlowConnection = extendedNavigator.connection ? 
    ['slow-2g', '2g', '3g'].includes(extendedNavigator.connection.effectiveType) : false;
  
  // Check screen size - smaller screens likely indicate less powerful devices
  const smallScreen = window.screen.width < 1600 || window.screen.height < 1000;
  
  // Check for touch capability (tablets, touchscreen laptops)
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Check for battery (indicates mobile/laptop device)
  const hasBattery = 'getBattery' in navigator;
  
  // Conservative approach: only use 'full' mode for clearly powerful desktop setups
  const isPowerfulDesktop = !isMobile && 
                           !hasTouch && 
                           !hasBattery && 
                           !smallScreen && 
                           navigator.hardwareConcurrency >= 8 && 
                           (!extendedNavigator.deviceMemory || extendedNavigator.deviceMemory >= 8);
  
  // Determine performance mode
  if (prefersReducedMotion || isSlowConnection) {
    return 'minimal';
  } else if (isPowerfulDesktop) {
    return 'full';
  } else {
    return 'reduced'; // Default to reduced for better compatibility
  }
} 