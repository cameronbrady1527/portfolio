"use client";

import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CelebrationEffectProps {
  showParticles: boolean;
}

export const CelebrationEffect = memo(({ showParticles }: CelebrationEffectProps) => {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateDimensions = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      };
      updateDimensions();
      
      // Check for reduced motion preference
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleResize = () => updateDimensions();
      const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      
      window.addEventListener('resize', handleResize);
      mediaQuery.addEventListener('change', handleMotionChange);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        mediaQuery.removeEventListener('change', handleMotionChange);
      };
    }
  }, []);

  // Debug logging
  useEffect(() => {
    if (showParticles) {
      console.log('🎉 Celebration starting!', {
        dimensions,
        isMobile: dimensions.width < 768,
        prefersReducedMotion,
        particleCount: dimensions.width < 768 ? 60 : 100
      });
    }
  }, [showParticles, dimensions, prefersReducedMotion]);

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', 
    '#FF9FF3', '#54A0FF', '#5F27CD', '#FF3838', '#00D2D3',
    '#FF6348', '#2ED573', '#FFA502', '#3742FA', '#2F3542'
  ];
  
  const shapes = ['circle', 'square', 'triangle'];
  
  // Mobile-optimized particle count and reduced motion support
  const isMobile = dimensions.width < 768;
  const particleCount = prefersReducedMotion ? 10 : (isMobile ? 60 : 100);
  const burstCount = prefersReducedMotion ? 5 : (isMobile ? 15 : 20);
  const sparkCount = prefersReducedMotion ? 3 : (isMobile ? 10 : 15);
  
  // Simplified animations for reduced motion
  const animationDuration = prefersReducedMotion ? 1 : (isMobile ? 2 : 3);
  const animationComplexity = prefersReducedMotion ? 1 : 1;
  
  // Generate confetti with better mobile performance
  const confetti = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    size: isMobile ? 3 + Math.random() * 5 : 4 + Math.random() * 8,
    initialX: Math.random() * dimensions.width,
    initialY: -20 - Math.random() * 100,
    rotation: Math.random() * 360,
    delay: Math.random() * (isMobile ? 1.5 : 2),
  }));

  // Don't show celebration if user prefers reduced motion and it's a simple celebration
  if (prefersReducedMotion && !showParticles) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {showParticles && (
        <motion.div 
          key="celebration"
          className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onAnimationStart={() => console.log('🎊 Animation started!')}
          onAnimationComplete={() => console.log('✨ Animation completed!')}
        >
          {confetti.map((piece, i) => (
            <motion.div
              key={piece.id}
              initial={{
                x: piece.initialX,
                y: piece.initialY,
                rotate: piece.rotation,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                x: piece.initialX + (Math.random() - 0.5) * (isMobile ? 200 : 400),
                y: dimensions.height + 100,
                rotate: piece.rotation + 720 + Math.random() * 360,
                scale: [0, 1.2, 1],
                opacity: [0, 1, 0.8, 0],
              }}
              transition={{
                duration: prefersReducedMotion ? 1 : (isMobile ? 2 + Math.random() * 1.5 : 3 + Math.random() * 2),
                delay: prefersReducedMotion ? i * 0.05 : piece.delay,
                ease: prefersReducedMotion ? "easeOut" : [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
              }}
              className={
                `${piece.shape === 'circle' ? 'rounded-full' : ''} ` +
                `${piece.shape === 'square' ? 'rounded-sm' : ''} ` +
                `${piece.shape === 'triangle' ? 'rounded-sm transform rotate-45' : ''} ` +
                'shadow-lg absolute'
              }
            />
          ))}
          
          {/* Burst effect from center */}
          {Array.from({ length: burstCount }, (_, i) => (
            <motion.div
              key={`burst-${i}`}
              className="absolute rounded-full shadow-lg"
              initial={{
                x: dimensions.width / 2,
                y: dimensions.height / 2,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                x: dimensions.width / 2 + (Math.cos((i / burstCount) * Math.PI * 2) * (isMobile ? 150 + Math.random() * 200 : 200 + Math.random() * 300)),
                y: dimensions.height / 2 + (Math.sin((i / burstCount) * Math.PI * 2) * (isMobile ? 150 + Math.random() * 200 : 200 + Math.random() * 300)),
                scale: [0, 1.8, 0],
                opacity: [0, 0.9, 0],
              }}
              transition={{
                duration: isMobile ? 1.2 : 1.5,
                delay: 0.1 + (i * 0.03),
                ease: "easeOut",
              }}
              style={{
                width: isMobile ? 6 + Math.random() * 8 : 8 + Math.random() * 12,
                height: isMobile ? 6 + Math.random() * 8 : 8 + Math.random() * 12,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                filter: 'brightness(1.2)',
              }}
            />
          ))}
          
          {/* Firework-style sparks */}
          {Array.from({ length: sparkCount }, (_, i) => (
            <motion.div
              key={`spark-${i}`}
              className="absolute"
              initial={{
                x: dimensions.width * 0.3 + Math.random() * dimensions.width * 0.4,
                y: dimensions.height * 0.2 + Math.random() * dimensions.height * 0.3,
                scale: 0,
              }}
              animate={{
                x: dimensions.width * 0.3 + Math.random() * dimensions.width * 0.4 + (Math.random() - 0.5) * (isMobile ? 300 : 400),
                y: dimensions.height * 0.2 + Math.random() * dimensions.height * 0.3 + (Math.random() - 0.5) * (isMobile ? 200 : 300),
                scale: [0, 1.5, 0],
                rotate: isMobile ? 360 * 2 : 360 * 3,
              }}
              transition={{
                duration: isMobile ? 1.5 : 2,
                delay: 0.3 + Math.random() * 0.8,
                ease: "easeOut",
              }}
            >
              <div 
                className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'} rounded-full shadow-xl`}
                style={{ 
                  backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                  boxShadow: `0 0 ${isMobile ? '15px' : '20px'} ${colors[Math.floor(Math.random() * colors.length)]}`,
                  filter: 'brightness(1.3) saturate(1.2)',
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

CelebrationEffect.displayName = 'CelebrationEffect';