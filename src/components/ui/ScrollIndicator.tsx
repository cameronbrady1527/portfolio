"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  isVisible: boolean;
  onClick?: () => void;
  label?: string;
  className?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  isVisible,
  onClick,
  label = "Scroll to explore",
  className = ""
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior: scroll to next section
      window.scrollTo({ 
        top: window.innerHeight, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <motion.div 
      className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out ${
        isVisible 
          ? 'opacity-100 translate-y-0 animate-bounce' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      } ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20 
      }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center text-white/60 hover:text-white/80 focus:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-lg p-2 transition-all group"
        aria-label="Scroll to next section"
      >
        <span className="text-sm font-medium mb-2 group-hover:scale-110 group-focus:scale-110 transition-transform">
          {label}
        </span>
        <motion.div 
          className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center relative"
          whileHover={{ borderColor: 'rgba(255, 255, 255, 0.8)' }}
        >
          <motion.div 
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ 
              opacity: [0.6, 1, 0.6],
              y: [0, 2, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </motion.div>
      </motion.button>
    </motion.div>
  );
};