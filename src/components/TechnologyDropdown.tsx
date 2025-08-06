import React, { useState, useRef, useEffect } from 'react';

interface TechnologyDropdownProps {
  technologies: string[];
  selectedTechnology: string;
  onTechnologyChange: (technology: string) => void;
  className?: string;
  isAnimating?: boolean;
  animatingTech?: string | null;
}

export function TechnologyDropdown({ 
  technologies, 
  selectedTechnology, 
  onTechnologyChange, 
  className = "",
  isAnimating = false,
  animatingTech = null
}: TechnologyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (technology: string) => {
    onTechnologyChange(technology);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-left text-gray-300 hover:bg-gray-700/50 hover:border-purple-400/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400/50 ${
          isAnimating ? 'border-green-400/50 bg-green-500/20 animate-pulse shadow-lg shadow-green-400/25 scale-105' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <span className={selectedTechnology ? "text-white" : "text-gray-400"}>
            {isAnimating && animatingTech ? animatingTech : (selectedTechnology || "Select Technology")}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-gray-900/95 backdrop-blur-sm border border-gray-600/50 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          <div className="py-2">
            <button
              onClick={() => handleSelect("")}
              className={`w-full px-4 py-2 text-left hover:bg-gray-700/50 transition-colors ${
                selectedTechnology === "" ? "text-purple-300 bg-purple-500/20" : "text-gray-300"
              }`}
            >
              All Technologies
            </button>
            {technologies.map((technology) => (
              <button
                key={technology}
                onClick={() => handleSelect(technology)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-700/50 transition-colors ${
                  selectedTechnology === technology ? "text-purple-300 bg-purple-500/20" : "text-gray-300"
                }`}
              >
                {technology}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 