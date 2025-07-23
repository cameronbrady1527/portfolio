// NeuralButton.tsx
// Modern gradient button component with neural glow effects
// Features hover animations, gradient backgrounds, and accessibility support
//
// Navigation:
// - Gradient background with neural glow
// - Hover and focus animations
// - Accessibility and keyboard navigation

import React from "react";

interface NeuralButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

/**
 * NeuralButton - Modern gradient button with neural theme styling
 * @param children - Button content
 * @param onClick - Click handler
 * @param className - Additional CSS classes
 * @param variant - Button style variant
 * @param size - Button size
 * @param disabled - Whether button is disabled
 */
export function NeuralButton({ 
  children, 
  onClick, 
  className = "", 
  variant = 'primary',
  size = 'md',
  disabled = false
}: NeuralButtonProps) {
  const baseClasses = `
    relative px-6 py-3 
    text-white font-bold rounded-lg 
    shadow-lg hover:scale-105 hover:shadow-xl 
    transition-all duration-200 
    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/60
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
  `;

  const variantClasses = {
    primary: 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500',
    secondary: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
    accent: 'bg-gradient-to-r from-green-500 via-blue-500 to-purple-500'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default NeuralButton; 