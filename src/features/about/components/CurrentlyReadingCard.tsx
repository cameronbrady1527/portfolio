"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, BookOpen, Star } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import Image from 'next/image';

interface BookData {
  title: string;
  author: string;
  coverImage: string;
  review: string;
  rating: number;
  progress?: string;
  genre?: string;
  startedDate?: string;
}

interface CurrentlyReadingCardProps {
  book: BookData;
}

export const CurrentlyReadingCard: React.FC<CurrentlyReadingCardProps> = ({ book }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [showEllipses, setShowEllipses] = useState(false);
  const [isInitialPhase, setIsInitialPhase] = useState(true);

  // Split review into words and find truncation point based on word count
  const allWords = book.review.split(' ');
  const initialWordCount = Math.min(30, allWords.length); // Show first 30 words initially
  const fullMax = allWords.length;
  const hasMoreContent = allWords.length > initialWordCount;
  

  // Handle ellipses timing with useEffect
  useEffect(() => {
    if (isFlipped && hasMoreContent && !showEllipses && !isExpanded) {
      const delay = initialWordCount * 60 + 300;
      const timer = setTimeout(() => {
        setShowEllipses(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isFlipped, hasMoreContent, showEllipses, isExpanded, initialWordCount]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setAnimationKey(prev => prev + 1);
    setIsInitialPhase(true);
    setShowEllipses(false); // Reset ellipses state
    setIsExpanded(false); // Reset expansion state
    setIsCollapsing(false); // Reset collapsing state
  };

  const handleExpandToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isExpanded) {
      // Collapsing sequence: words disappear, ellipses return, container shrinks
      setIsCollapsing(true);
      
      // Step 1: Remove words from end to beginning
      setTimeout(() => {
        // Step 2: Add ellipses back
        setShowEllipses(true);
        // Step 3: Shrink container back to initial phase size and finish collapse
        setTimeout(() => {
          setIsExpanded(false);
          setIsCollapsing(false);
          setIsInitialPhase(true);
        }, 200);
      }, (fullMax - initialWordCount) * 40 + 200);
    } else {
      // Expanding sequence: remove ellipses, grow container to full size, show more words
      setShowEllipses(false);
      
      setTimeout(() => {
        // Grow container to accommodate full content
        setIsInitialPhase(false);
        setTimeout(() => {
          setIsExpanded(true);
        }, 400); // Wait for container to grow
      }, 200); // Wait for ellipses to disappear
    }
  };

  return (
    <GlassCard className="relative h-120 w-full cursor-pointer justify-between group">
      <div 
        className="relative w-full h-full"
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ 
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
          onClick={handleFlip}
        >
          {/* Front - Book Cover */}
          <div className="flex flex-col items-center justify-between h-full px-4 py-0">
            <div className="flex flex-col items-center flex-1 justify-center">
              <div className="relative mb-4 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={book.coverImage}
                  alt={`Cover of ${book.title}`}
                  width={140}
                  height={210}
                  className="rounded-lg shadow-lg object-cover"
                  style={{ aspectRatio: '2/3' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-1">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-300 mb-3">
                  by {book.author}
                </p>
                
                <div className="flex items-center justify-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < book.rating 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>

                {book.progress && (
                  <p className="text-xs text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">
                    {book.progress}
                  </p>
                )}
              </div>
            </div>

            <br />

            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-1 text-xs text-gray-400">
                <BookOpen className="w-4 h-4" />
                <span>Tap to read review</span>
              </div>
              <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                <BookOpen className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ rotateY: isFlipped ? 0 : -180 }}
          transition={{ duration: 0.6 }}
          style={{ 
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
          onClick={handleFlip}
        >
          {/* Back - Review */}
          <div className="flex flex-col justify-between h-full px-4 py-0">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">My Thoughts</h4>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < book.rating 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <motion.div 
                className="text-gray-300 text-sm leading-relaxed overflow-hidden"
                animate={{
                  height: isInitialPhase ? 'fit-content' : '18rem'
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                style={{
                  // Ensure the initial phase container only shows the truncated content
                  maxHeight: isInitialPhase ? `${Math.ceil(initialWordCount / 8) * 1.5}rem` : 'none'
                }}
              >
                <div className="pr-2">
                  {allWords.map((word, index) => {
                    const isInInitialRange = index < initialWordCount;
                    const isInExpandedRange = index >= initialWordCount && index < fullMax;
                    
                    // Determine animation state
                    let shouldShow = false;
                    let animationDelay = 0;
                    
                    if (isInInitialRange) {
                      // Always show initial range words
                      shouldShow = true;
                      animationDelay = index * 0.06; // Staggered wave appearance
                    } else if (isInExpandedRange) {
                      if (isExpanded && !isCollapsing) {
                        // Show expanded words when expanding - continue from where we left off
                        shouldShow = true;
                        animationDelay = (index - initialWordCount) * 0.06;
                      } else if (isCollapsing) {
                        // Hide expanded words with receding wave (from end to beginning)
                        shouldShow = false;
                        animationDelay = (fullMax - index - 1) * 0.04; // Reverse order
                      }
                    }
                    
                    return (
                      <React.Fragment key={`fragment-${index}`}>
                        <motion.span
                          key={`word-${index}-${animationKey}`}
                          initial={{ 
                            opacity: 0, 
                            y: 15,
                            filter: 'blur(4px)',
                            scale: 0.9
                          }}
                          animate={shouldShow ? {
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0px)',
                            scale: 1
                          } : {
                            opacity: 0,
                            y: 15,
                            filter: 'blur(4px)',
                            scale: 0.9
                          }}
                          transition={{
                            duration: shouldShow ? 0.6 : 0.4,
                            delay: animationDelay,
                            ease: shouldShow ? [0.25, 0.46, 0.45, 0.94] : [0.76, 0, 0.24, 1]
                          }}
                          className="inline-block mr-1"
                        >
                          {word}
                        </motion.span>
                        
                        {/* Show ellipses after the last initial word */}
                        {index === initialWordCount - 1 && showEllipses && hasMoreContent && !isExpanded && (
                          <motion.span
                            key={`ellipsis-${animationKey}`}
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -10 }}
                            transition={{ 
                              duration: 0.4, 
                              delay: 0,
                              ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            className="inline-block text-gray-300"
                            style={{ marginLeft: '0.1rem' }}
                          >
                            ...
                          </motion.span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </motion.div>

              {hasMoreContent && (
                <motion.button
                  onClick={handleExpandToggle}
                  className="flex items-center space-x-1 mt-3 text-purple-400 hover:text-purple-300 transition-colors text-xs"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isExpanded ? (
                    <>
                      <span>Show less</span>
                      <ChevronUp className="w-3 h-3" />
                    </>
                  ) : (
                    <>
                      <span>Read more</span>
                      <ChevronDown className="w-3 h-3" />
                    </>
                  )}
                </motion.button>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-600/30">
              <div className="flex justify-between items-center text-xs text-gray-400">
                <div className="flex flex-col space-y-1">
                  {book.genre && <span>Genre: {book.genre}</span>}
                  {book.startedDate && <span>Started: {book.startedDate}</span>}
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Tap to flip back</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </GlassCard>
  );
};