import React from 'react';

interface StyledLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  variant?: 'default' | 'button' | 'research' | 'github';
}

export function StyledLink({ 
  href, 
  children, 
  className = "", 
  external = false,
  variant = 'default'
}: StyledLinkProps) {
  const baseClasses = "transition-all duration-300 relative group";
  
  const variantClasses = {
    default: `
      text-blue-300 hover:text-blue-200 
      border-b border-blue-500/30 hover:border-blue-400
      hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.4)]
    `,
    button: `
      inline-flex items-center px-3 py-1 
      bg-purple-500/20 hover:bg-purple-500/30
      border border-purple-500/40 hover:border-purple-400/60
      rounded-lg text-purple-300 hover:text-purple-200
      hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25
    `,
    research: `
      inline-flex items-center gap-2
      text-green-300 hover:text-green-200
      bg-green-500/10 hover:bg-green-500/20
      px-2 py-1 rounded text-sm
      border border-green-500/30 hover:border-green-400/50
    `,
    github: `
      inline-flex items-center gap-2
      text-gray-300 hover:text-white
      bg-gray-700/50 hover:bg-gray-600/50
      px-2 py-1 rounded text-sm
      border border-gray-600/50 hover:border-gray-500/70
    `
  };

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
      {external && <span className="ml-1 text-xs">↗</span>}
      {variant === 'default' && (
        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
      )}
    </a>
  );
} 