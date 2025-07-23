// GlassCard.tsx
// Reusable glassmorphism card component for the neural-themed portfolio
// Provides consistent modern styling with backdrop blur, gradient overlay, and neural glow effects
//
// Navigation:
// - Glassmorphism background with gradient overlay
// - Responsive design and accessibility
// - Customizable content and styling

import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

/**
 * GlassCard - A modern glassmorphism card component with neural theme styling
 * @param children - Content to display inside the card
 * @param className - Additional CSS classes
 * @param onClick - Optional click handler
 * @param interactive - Whether the card should be clickable
 */
export function GlassCard({ 
  children, 
  className = "", 
  onClick, 
  interactive = false 
}: GlassCardProps) {
  return (
    <div 
      className={`
        relative p-8 sm:p-12 
        bg-gray-800/80 text-white 
        rounded-2xl shadow-2xl 
        border border-blue-700/40 
        backdrop-blur-md overflow-hidden
        ${interactive ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''}
        ${className}
      `}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive && onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {/* Blue gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-700/30 via-transparent to-purple-700/20" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default GlassCard; 