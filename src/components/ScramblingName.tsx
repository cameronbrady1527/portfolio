// ScramblingName.tsx
// Component that displays a name with typewriter effect on load and letter scrambling on hover
// Creates an engaging interactive experience for the portfolio header
//
// Navigation:
// - Typewriter effect on initial load
// - Letter scrambling animation on hover (left to right)
// - Smooth transitions and neural theme integration

"use client";

import React, { useState, useEffect, useCallback } from "react";

interface ScramblingNameProps {
  text: string;
  className?: string;
  typewriterSpeed?: number;
  scrambleSpeed?: number;
}

/**
 * ScramblingName - Displays text with typewriter effect on load and letter scrambling on hover
 * @param text - The text to display
 * @param className - Additional CSS classes
 * @param typewriterSpeed - Speed of typewriter effect in ms
 * @param scrambleSpeed - Speed of letter scrambling in ms
 */
export function ScramblingName({ 
  text, 
  className = "", 
  typewriterSpeed = 100,
  scrambleSpeed = 50 
}: ScramblingNameProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [scrambleState, setScrambleState] = useState<{ [key: number]: number }>({});
  const [hasStartedAnimation, setHasStartedAnimation] = useState(false);

  // Letters for scrambling effect (A-Z, a-z, and 0-9)
  const scrambleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Memoized scrambling function
  const getScrambledText = useCallback(() => {
    return text
      .split("")
      .map((char, index) => {
        if (char === " ") return " ";
        const iterations = scrambleState[index] || 0;
        if (iterations < 2) {
          return scrambleLetters[Math.floor(Math.random() * scrambleLetters.length)];
        }
        return text[index];
      })
      .join("");
  }, [text, scrambleState, scrambleLetters]);

  // Typewriter effect on load
  useEffect(() => {
    if (isTyping && displayText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, typewriterSpeed);
      return () => clearTimeout(timer);
    } else if (isTyping && displayText.length === text.length) {
      setIsTyping(false);
    }
  }, [displayText, text, isTyping, typewriterSpeed]);

  // Letter scrambling effect on hover (left to right)
  useEffect(() => {
    if (!isHovering) {
      setScrambleState({});
      setHasStartedAnimation(false);
      return;
    }

    if (hasStartedAnimation) return; // Prevent multiple animations

    setHasStartedAnimation(true);

    // Get letter indices (excluding spaces)
    const letterIndices = text.split("").map((char, index) => ({ char, index })).filter(item => item.char !== " ");
    
    // Process each letter sequentially
    const processLetter = (letterIndex: number) => {
      if (letterIndex >= letterIndices.length) return;
      
      const { index } = letterIndices[letterIndex];
      let iteration = 0;
      
      const scrambleInterval = setInterval(() => {
        setScrambleState(prev => ({
          ...prev,
          [index]: iteration
        }));
        
        iteration++;
        
        if (iteration >= 2) {
          clearInterval(scrambleInterval);
          
          // Move to next letter after 0.1ms
          setTimeout(() => {
            processLetter(letterIndex + 1);
          }, 0.1);
        }
      }, 100); // 100ms per iteration
    };

    // Start with the first letter
    processLetter(0);

  }, [isHovering, text, hasStartedAnimation]);

  // Determine what text to display
  const currentText = isHovering ? getScrambledText() : displayText;

  return (
    <span
      className={`cursor-pointer transition-all duration-200 font-mono ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {currentText}
    </span>
  );
}

export default ScramblingName; 