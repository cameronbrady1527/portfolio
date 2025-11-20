// Header.tsx
// Modern, non-obtrusive header with neural theme styling
// Features glassmorphism effects, smooth navigation, and subtle animations
//
// Navigation:
// - Glassmorphism background with backdrop blur
// - Smooth navigation links
// - Responsive mobile menu
// - Neural theme integration

"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NeuralButton } from "./NeuralButton";
import { ScramblingName } from "./ScramblingName";

interface HeaderProps {
  className?: string;
}

/**
 * Header - Modern navigation header with neural theme styling
 * @param className - Additional CSS classes
 */
export function Header({ className = "" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for header transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    // { name: "Research", href: "/research" },
  ];

  // Helper function to check if a nav item is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-gray-900/80 backdrop-blur-md border-b border-blue-700/30' 
          : 'bg-transparent'
        }
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-3 text-xl font-bold text-white hover:text-purple-300 transition-colors duration-200"
            >
              {/* Brain Icon */}
              <div className="flex items-center justify-center w-8 h-8 text-2xl hover:scale-110 transition-transform duration-200">
                🧠
              </div>
              <ScramblingName 
                text="Cameron Brady"
                className="text-xl font-bold text-white hover:text-purple-300 transition-colors duration-200"
                typewriterSpeed={120}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    transition-colors duration-200 font-medium relative group
                    ${active 
                      ? 'text-purple-300' 
                      : 'text-gray-300 hover:text-purple-300'
                    }
                  `}
                >
                  {item.name}
                  <span className={`
                    absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300
                    ${active ? 'w-full' : 'w-0 group-hover:w-full'}
                  `}></span>
                  {/* Active indicator dot */}
                  {active && (
                    <span className="absolute -top-1 -right-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                  )}
                </Link>
              );
            })}
            <NeuralButton 
              variant="primary" 
              size="sm"
              onClick={() => window.location.href = '/contact'}
            >
              Get In Touch
            </NeuralButton>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/90 backdrop-blur-md rounded-lg mt-2 border border-blue-700/30">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      block px-3 py-2 rounded-md transition-colors duration-200 relative
                      ${active 
                        ? 'text-purple-300 bg-gray-800/50' 
                        : 'text-gray-300 hover:text-purple-300 hover:bg-gray-800/50'
                      }
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="flex items-center justify-between">
                      {item.name}
                      {active && (
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                      )}
                    </span>
                  </Link>
                );
              })}
              <div className="px-3 py-2">
                <NeuralButton 
                  variant="primary" 
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => {
                    window.location.href = '/contact';
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Get In Touch
                </NeuralButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header; 