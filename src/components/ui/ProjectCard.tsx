"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Calendar, Users, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { NeuralButton } from '@/components/NeuralButton';
import { TypewriterText } from '@/components/TypewriterText';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  status?: 'completed' | 'in-progress' | 'planning';
  featured?: boolean;
  date?: string;
  team?: string;
  metrics?: {
    label: string;
    value: string;
    color?: string;
  }[];
  image?: string;
  onClick?: () => void;
  className?: string;
}

const statusColors = {
  completed: 'bg-green-500/20 text-green-300 border-green-500/30',
  'in-progress': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  planning: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  link,
  github,
  status = 'completed',
  featured = false,
  date,
  team,
  metrics,
  image,
  onClick,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract initials from the title (first letter of each word, max 3)
  const getInitials = (title: string) => {
    const words = title.split(' ').filter(word => word.length > 0);
    const initials = words.slice(0, 3).map(word => word[0]).join('');
    return initials.toUpperCase();
  };

  const initials = getInitials(title);

  // Truncate description to first sentence or 80 characters
  const getPreviewDescription = (desc: string) => {
    const firstSentence = desc.split('.')[0];
    if (firstSentence.length > 80) {
      return desc.substring(0, 80) + '...';
    }
    return firstSentence + '.';
  };

  // Show only primary technologies (max 3)
  const primaryTechnologies = technologies.slice(0, 3);
  const remainingTechCount = technologies.length - 3;

  // Show only top 2 metrics
  const primaryMetrics = metrics?.slice(0, 2) || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setShowTitle(true);
          }, 300);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
        rootMargin: '50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleExpandToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8
      }}
      className={className}
      layout
      style={{ backfaceVisibility: 'hidden', transform: 'translate3d(0, 0, 0)' }}
    >
      <GlassCard className="group cursor-pointer overflow-hidden" onClick={onClick}>
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center space-x-1 px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30">
              <Star className="w-3 h-3" />
              <span>Featured</span>
            </div>
          </div>
        )}

        {/* Compact Project Image */}
        <div ref={containerRef} className="w-full h-32 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
          {image && image.trim() !== "" ? (
            <Image 
              src={image} 
              alt={title}
              width={150}
              height={128}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">
                {isVisible ? (
                  <TypewriterText 
                    text={initials} 
                    speed={100}
                    className="text-gray-900"
                  />
                ) : (
                  <span className="text-gray-900">{initials}</span>
                )}
              </div>
              <div className="text-xs text-gray-800 font-semibold">
                {showTitle ? (
                  <TypewriterText 
                    text={title} 
                    speed={50}
                    className="text-gray-800"
                  />
                ) : (
                  <span className="opacity-0">{title}</span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-purple-300 group-hover:text-purple-200 transition-colors mb-2">
                {title}
              </h3>
              
              {/* Compact Meta information */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-2">
                <div className={`px-2 py-1 rounded-full border text-xs ${statusColors[status]}`}>
                  {status.replace('-', ' ')}
                </div>
                {date && (
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{date}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Expand/Collapse Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleExpandToggle}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-white transition-all ml-2 will-change-transform"
              style={{ backfaceVisibility: 'hidden' }}
              transition={{ 
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ 
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="will-change-transform"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>

          {/* Preview Description */}
          <p className="text-gray-300 mb-3 leading-relaxed group-hover:text-gray-200 transition-colors text-sm">
            {isExpanded ? description : getPreviewDescription(description)}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1 mb-3">
            {/* Always show primary technologies */}
            {primaryTechnologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                whileHover={{ scale: 1.05 }}
                className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs border border-blue-500/30 hover:bg-blue-500/30 transition-colors cursor-pointer will-change-transform"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {tech}
              </motion.span>
            ))}
            
            {/* Show expanded technologies in the same container */}
            <AnimatePresence>
              {isExpanded && remainingTechCount > 0 && (
                <>
                  {technologies.slice(3).map((tech, index) => (
                    <motion.span
                      key={`expanded-${tech}`}
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ 
                        opacity: 0, 
                        scale: 0.8, 
                        y: -10,
                        transition: {
                          delay: (technologies.slice(3).length - 1 - index) * 0.04,
                          duration: 0.3,
                          ease: [0.4, 0, 1, 1]
                        }
                      }}
                      transition={{ 
                        delay: 0.3 + index * 0.08,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs border border-blue-500/30 hover:bg-blue-500/30 transition-colors cursor-pointer will-change-transform"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </>
              )}
            </AnimatePresence>
            
            {/* Show +X more badge when collapsed */}
            <AnimatePresence>
              {remainingTechCount > 0 && !isExpanded && (
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    delay: primaryTechnologies.length * 0.05,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded text-xs border border-gray-600/30"
                >
                  +{remainingTechCount} more
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Expanded Content */}
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0, transformOrigin: "top" }}
                animate={{ opacity: 1, scaleY: 1, transformOrigin: "top" }}
                exit={{ 
                  opacity: 0, 
                  scaleY: 0, 
                  transformOrigin: "top",
                  transition: {
                    duration: 0.5,
                    ease: [0.4, 0, 0.6, 1],
                    opacity: { duration: 0.3, ease: [0.4, 0, 1, 1] },
                    scaleY: { duration: 0.5, ease: [0.4, 0, 0.6, 1] }
                  }
                }}
                transition={{ 
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  opacity: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  scaleY: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                }}
                className="overflow-hidden will-change-transform"
                style={{ backfaceVisibility: 'hidden' }}
              >

                {/* Metrics when expanded */}
                {primaryMetrics.length > 0 && (
                  <motion.div 
                    className="grid grid-cols-2 gap-2 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ 
                      opacity: 0,
                      transition: { 
                        duration: 0.3,
                        ease: [0.4, 0, 1, 1] 
                      }
                    }}
                    transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {primaryMetrics.map((metric, index) => (
                      <motion.div 
                        key={index} 
                        className="text-center p-2 bg-gray-800/30 rounded-lg will-change-transform"
                        style={{ backfaceVisibility: 'hidden' }}
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ 
                          opacity: 0, 
                          scale: 0.9, 
                          y: -10,
                          transition: {
                            delay: (primaryMetrics.length - 1 - index) * 0.05,
                            duration: 0.3,
                            ease: [0.4, 0, 1, 1]
                          }
                        }}
                        transition={{ 
                          delay: 0.5 + index * 0.1,
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                      >
                        <div className={`text-sm font-bold ${metric.color || 'text-purple-300'}`}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-400">{metric.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Meta info when expanded */}
                {/* {(date || team) && (
                  <motion.div 
                    className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ 
                      opacity: 0, 
                      y: -10,
                      transition: { 
                        duration: 0.3,
                        ease: [0.4, 0, 1, 1]
                      }
                    }}
                    transition={{ delay: 0.6, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {date && (
                      <motion.div 
                        className="flex items-center space-x-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ 
                          opacity: 0, 
                          x: -10,
                          transition: {
                            delay: 0.1,
                            duration: 0.2,
                            ease: [0.4, 0, 1, 1]
                          }
                        }}
                        transition={{ delay: 0.7, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Calendar className="w-3 h-3" />
                        <span>{date}</span>
                      </motion.div>
                    )}
                    {team && (
                      <motion.div 
                        className="flex items-center space-x-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ 
                          opacity: 0, 
                          x: -10,
                          transition: {
                            delay: 0.05,
                            duration: 0.2,
                            ease: [0.4, 0, 1, 1]
                          }
                        }}
                        transition={{ delay: 0.75, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Users className="w-3 h-3" />
                        <span>{team}</span>
                      </motion.div>
                    )}
                  </motion.div>
                )} */}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex gap-2">
            {link && (
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(link, '_blank');
                }}
                className="flex-1"
              >
                <NeuralButton 
                  variant="accent" 
                  size="sm" 
                  className="w-full"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Project
                </NeuralButton>
              </div>
            )}
            
            {github && (
              <motion.button
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(github, '_blank');
                }}
                className={`flex items-center justify-center px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm ${link ? 'flex-1' : 'w-full'}`}
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </motion.button>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};