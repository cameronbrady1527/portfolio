"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  value: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
  color?: 'purple' | 'blue' | 'green' | 'orange' | 'red' | 'yellow';
  popupContent?: React.ReactNode;
  gradient?: boolean;
  onClick?: () => void;
}

const colorMap = {
  purple: {
    text: 'text-purple-400',
    hover: 'group-hover:text-purple-300',
    glow: 'group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]',
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/30'
  },
  blue: {
    text: 'text-blue-400',
    hover: 'group-hover:text-blue-300',
    glow: 'group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30'
  },
  green: {
    text: 'text-green-400',
    hover: 'group-hover:text-green-300',
    glow: 'group-hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]',
    bg: 'bg-green-500/20',
    border: 'border-green-500/30'
  },
  orange: {
    text: 'text-orange-400',
    hover: 'group-hover:text-orange-300',
    glow: 'group-hover:drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]',
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/30'
  },
  red: {
    text: 'text-red-400',
    hover: 'group-hover:text-red-300',
    glow: 'group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]',
    bg: 'bg-red-500/20',
    border: 'border-red-500/30'
  },
  yellow: {
    text: 'text-yellow-400',
    hover: 'group-hover:text-yellow-300',
    glow: 'group-hover:drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]',
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/30'
  }
};

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  description,
  icon: IconComponent,
  color = 'purple',
  popupContent,
  gradient = true,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const colors = colorMap[color];

  return (
    <motion.div 
      className="relative group text-center"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Icon */}
      {IconComponent && (
        <motion.div
          className="flex justify-center mb-4"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
        >
          <IconComponent className={`w-8 h-8 ${colors.text} ${colors.hover} transition-colors`} />
        </motion.div>
      )}

      {/* Value */}
      <motion.div 
        className={`text-3xl font-bold mb-2 cursor-pointer transition-all duration-300 ${colors.text} ${colors.hover} ${colors.glow}`}
        whileHover={{ scale: 1.1 }}
      >
        {value}
      </motion.div>

      {/* Label */}
      <div className="text-gray-300 font-medium">{label}</div>
      
      {/* Description */}
      {description && (
        <div className="text-sm text-gray-400 mt-1">{description}</div>
      )}

      {/* Hover indicator */}
      <motion.div 
        className="text-xs text-gray-500 mt-1"
        animate={{ opacity: isHovered ? 1 : 0.7 }}
      >
        ↗
      </motion.div>

      {/* Popup Content */}
      {popupContent && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-50"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`bg-slate-900/95 backdrop-blur-sm border border-slate-600 rounded-lg p-4 shadow-xl min-w-[280px] ${colors.border}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{label.toLowerCase().replace(/\s/g, '-')}.info</span>
                </div>
                <div className="text-xs text-slate-300 font-mono leading-relaxed">
                  {popupContent}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Background gradient effect */}
      {gradient && (
        <motion.div
          className={`absolute inset-0 rounded-lg ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
        />
      )}
    </motion.div>
  );
};