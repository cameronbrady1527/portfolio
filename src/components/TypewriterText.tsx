"use client";
// TypewriterText.tsx
// Animated typewriter text effect for engaging hero sections
// Creates a character-by-character typing animation with customizable speed and styling
//
// Navigation:
// - Character-by-character animation
// - Customizable speed and styling
// - Accessibility and keyboard navigation

import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number; // milliseconds per character
  className?: string;
  onComplete?: () => void;
}

/**
 * TypewriterText - Animated text that types out character by character
 * @param text - The text to animate
 * @param speed - Speed of typing in milliseconds per character
 * @param className - Additional CSS classes
 * @param onComplete - Callback when animation completes
 */
export function TypewriterText({ 
  text, 
  speed = 100, 
  className = "",
  onComplete 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default TypewriterText; 