"use client";
// page.tsx
// Homepage for Cameron Brady's neural-themed portfolio
// Features hero section, featured projects, and call-to-action areas
//
// Navigation:
// - Hero section with typewriter effect
// - Featured projects showcase
// - Call-to-action buttons
// - Neural background integration

import { GlassCard } from "@/components/GlassCard";
import { TypewriterText } from "@/components/TypewriterText";
import { NeuralButton } from "@/components/NeuralButton";
import { Header } from "@/components/Header";
import { useState, useEffect } from "react";

export default function Home() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center p-8 relative">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            {/* Main Title */}
            <GlassCard className="mb-8">
              <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
                <TypewriterText 
                  text="Where Neuroscience Meets Code" 
                  speed={80}
                  className="text-white"
                />
              </h1>
              <p className="text-xl sm:text-2xl text-purple-300 font-medium mb-6">
                Building AI systems that understand the brain to heal it
              </p>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Interdisciplinary CS graduate from Cornell, developing ML solutions 
                for neurological disorders and creating full-stack applications 
                that make real-world impact.
              </p>
            </GlassCard>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <NeuralButton 
                variant="primary" 
                size="lg"
                onClick={() => window.location.href = '/projects'}
              >
                View Projects
              </NeuralButton>
              <NeuralButton 
                variant="secondary" 
                size="lg"
                onClick={() => window.location.href = '/research'}
              >
                See Research
              </NeuralButton>
            </div>

            {/* Scroll Indicator - Smooth transition */}
            <div 
              className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out ${
                isAtTop 
                  ? 'opacity-100 translate-y-0 animate-bounce' 
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <div className="flex flex-col items-center text-white/60 hover:text-white/80 transition-colors cursor-pointer group">
                <span className="text-sm font-medium mb-2 group-hover:scale-110 transition-transform">
                  Scroll to explore
                </span>
                <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
              Featured Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project Card 1 */}
              <GlassCard interactive className="text-center">
                <h3 className="text-xl font-bold mb-3 text-purple-300">Sesha v3</h3>
                <p className="text-gray-300 mb-4">
                  AI-powered pipeline for processing and analyzing complex data streams
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">Python</span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">ML</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-sm">AI</span>
                </div>
                <NeuralButton variant="accent" size="sm">
                  View Project
                </NeuralButton>
              </GlassCard>

              {/* Project Card 2 */}
              <GlassCard interactive className="text-center">
                <h3 className="text-xl font-bold mb-3 text-purple-300">Parkinson's Detection</h3>
                <p className="text-gray-300 mb-4">
                  ML model achieving 94.9% accuracy in early Parkinson's detection
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-sm">Healthcare</span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">ML</span>
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-sm">Research</span>
                </div>
                <NeuralButton variant="accent" size="sm">
                  View Project
                </NeuralButton>
              </GlassCard>

              {/* Project Card 3 */}
              <GlassCard interactive className="text-center">
                <h3 className="text-xl font-bold mb-3 text-purple-300">Nonprofit Scraper</h3>
                <p className="text-gray-300 mb-4">
                  Automated data collection system helping nonprofits access critical information
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">Web Scraping</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-sm">OCR</span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">Impact</span>
                </div>
                <NeuralButton variant="accent" size="sm">
                  View Project
                </NeuralButton>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto relative">
            <div className="relative p-8 sm:p-12 bg-gray-800/80 text-white rounded-2xl shadow-2xl border border-blue-700/40 backdrop-blur-md overflow-visible">
              {/* Blue gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-700/30 via-transparent to-purple-700/20" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="relative group">
                    <div className="text-3xl font-bold text-orange-400 mb-2 cursor-pointer group-hover:text-orange-300 group-hover:drop-shadow-[0_0_8px_rgba(251,146,60,0.5)] transition-all duration-300">
                      8+
                    </div>
                    <div className="text-gray-300">Technologies Mastered</div>
                    <div className="text-xs text-gray-500 mt-1">↗</div>
                    
                    {/* Code editor popup */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                      <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-600 rounded-lg p-4 shadow-xl min-w-[280px]">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-xs text-slate-400 font-mono">featured-tech-stack.ts</span>
                        </div>
                        <pre className="text-xs text-slate-300 font-mono leading-relaxed">
{`const technologies = [
  "Python",        // ML/AI & Backend
  "React/Next.js", // Frontend & Full-stack
  "TypeScript",    // Type Safety & DX
  "PostgreSQL",    // Database & Data
  "PyTorch"        // Deep Learning
];`}
                        </pre>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="text-3xl font-bold text-purple-400 mb-2 cursor-pointer group-hover:text-purple-300 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] transition-all duration-300">
                      6+
                    </div>
                    <div className="text-gray-300">Years Experience</div>
                    <div className="text-xs text-gray-500 mt-1">↗</div>
                    
                    {/* Experience popup */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                      <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-600 rounded-lg p-4 shadow-xl min-w-[280px]">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-xs text-slate-400 font-mono">experience.md</span>
                        </div>
                        <pre className="text-xs text-slate-300 font-mono leading-relaxed">
{`## Professional Journey

• Full-Stack Development: 4+ years
• Machine Learning: 3+ years  
• Research & Academia: 2+ years
• Teaching & Mentoring: 1+ year

Total: 6+ years of technical growth`}
                        </pre>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="text-3xl font-bold text-green-400 mb-2 cursor-pointer group-hover:text-green-300 group-hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.5)] transition-all duration-300">
                      15+
                    </div>
                    <div className="text-gray-300">Projects Completed</div>
                    <div className="text-xs text-gray-500 mt-1">↗</div>
                    
                    {/* Projects popup */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                      <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-600 rounded-lg p-4 shadow-xl min-w-[280px]">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-xs text-slate-400 font-mono">project-portfolio.md</span>
                        </div>
                        <pre className="text-xs text-slate-300 font-mono leading-relaxed">
{`## Project Categories

• AI/ML Applications: 5 projects
• Full-Stack Web Apps: 4 projects
• Data Analysis Tools: 3 projects
• Research & Academic: 2 projects
• Automation Scripts: 1 project

Featured: Sesha v3, Parkinson's Detection,
         Nonprofit Scraper`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            

          </div>
        </section>
      </main>
    </div>
  );
}
