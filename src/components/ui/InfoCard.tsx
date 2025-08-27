"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ExternalLink, LucideIcon } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';

interface InfoCardProps {
  icon?: LucideIcon;
  title: string;
  value: string;
  description?: string;
  link?: string;
  copyable?: boolean;
  priority?: string;
  estimate?: string;
  availability?: string;
  category?: string;
  className?: string;
  onClick?: () => void;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  icon: IconComponent,
  title,
  value,
  description,
  link,
  copyable = false,
  priority,
  estimate,
  availability,
  category,
  className = "",
  onClick
}) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = async (text: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(text);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const isCopied = copiedItem === value;
  const hasAction = onClick || link;

  const CardContent = () => (
    <GlassCard 
      className={`group transition-all duration-300 ${hasAction ? 'cursor-pointer hover:scale-[1.02]' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          {IconComponent && (
            <div className="flex-shrink-0">
              <IconComponent className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
            
            <p className="text-purple-300 hover:text-purple-200 transition-colors text-lg font-medium truncate group-hover:text-white">
              {value}
            </p>
            
            {description && (
              <p className="text-sm text-gray-400 mt-1">{description}</p>
            )}
            
            {priority && (
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                {priority}
              </span>
            )}
            
            {estimate && (
              <p className="text-sm text-gray-400 mt-1">{estimate}</p>
            )}
            
            {availability && (
              <p className="text-sm text-green-400 mt-1">{availability}</p>
            )}
            
            {category && (
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">
                {category}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0">
          {link && !copyable && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-lg bg-gray-700/50 group-hover:bg-gray-600/50 transition-colors opacity-60 group-hover:opacity-100"
            >
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </motion.div>
          )}
          
          {copyable && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => copyToClipboard(value, e)}
              className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors group-hover:opacity-100 opacity-60"
              aria-label={`Copy ${title}`}
            >
              <AnimatePresence mode="wait">
                {isCopied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Check className="w-4 h-4 text-green-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Copy className="w-4 h-4 text-gray-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </div>
    </GlassCard>
  );

  if (link && !copyable && !onClick) {
    return (
      <motion.a
        href={link}
        target={link.startsWith('http') ? '_blank' : '_self'}
        rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="block focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-lg"
      >
        <CardContent />
      </motion.a>
    );
  }

  return <CardContent />;
};