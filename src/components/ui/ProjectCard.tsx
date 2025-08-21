"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Users, Star } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { NeuralButton } from '@/components/NeuralButton';

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
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      <GlassCard className="h-full group cursor-pointer overflow-hidden" onClick={onClick}>
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center space-x-1 px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30">
              <Star className="w-3 h-3" />
              <span>Featured</span>
            </div>
          </div>
        )}

        {/* Image placeholder */}
        {image && (
          <div className="h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
            <div className="text-4xl font-bold text-white/20">{title.charAt(0)}</div>
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-purple-300 group-hover:text-purple-200 transition-colors mb-2">
                {title}
              </h3>
              
              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-3">
                {date && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{date}</span>
                  </div>
                )}
                {team && (
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{team}</span>
                  </div>
                )}
                <div className={`px-2 py-1 rounded-full border text-xs ${statusColors[status]}`}>
                  {status.replace('-', ' ')}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-4 leading-relaxed group-hover:text-gray-200 transition-colors">
            {description}
          </p>

          {/* Metrics */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center p-2 bg-gray-800/30 rounded-lg">
                  <div className={`text-lg font-bold ${metric.color || 'text-purple-300'}`}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-gray-400">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm border border-blue-500/30 hover:bg-blue-500/30 transition-colors cursor-pointer"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {link && (
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(link, '_blank');
                }}
              >
                  <NeuralButton 
                    variant="accent" 
                    size="sm" 
                    className="flex-1 w-full"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Project
                  </NeuralButton>
                </div>
              )}
            
            {github && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(github, '_blank');
                }}
                className="flex items-center justify-center px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50"
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