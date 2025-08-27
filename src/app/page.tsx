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
import { ScrollIndicator, StatCard, ProjectCard } from "@/components/ui";
import { useState, useEffect, useCallback } from "react";
import { Code, Brain, Zap } from "lucide-react";
import { projects } from "@/lib/projects-data";

export default function Home() {
  const [isAtTop, setIsAtTop] = useState(true);

  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

  // Throttled scroll handler for consistency with other pages
  const throttledScroll = useCallback(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsAtTop(window.scrollY < 100);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    return handleScroll;
  }, []);

  useEffect(() => {
    const scrollHandler = throttledScroll();
    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [throttledScroll]);

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
                  text="Hi there! I'm Cameron Brady" 
                  speed={80}
                  className="text-white"
                />
              </h1>
              <p className="text-xl sm:text-2xl text-purple-300 font-medium mb-6">
              Machine Learning Researcher | Computational Neuroscience Enthusiast | Future Neurosurgeon | Full Stack Engineer
              </p>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Passionate about leveraging machine learning and AI to advance computational neuroscience and develop early detection systems for neurological disorders. Currently working on Parkinson&apos;s disease detection through vocal biomarkers while building the foundation for my medical career. My ultimate goal is to become a neurosurgeon who bridges the gap between cutting-edge AI research and clinical practice.
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
                onClick={() => window.location.href = '/about'}
              >
                About Me
              </NeuralButton>
            </div>

            {/* Scroll Indicator */}
            <ScrollIndicator isVisible={isAtTop} />
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
              Featured Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  github={project.github}
                  link={project.live || undefined}
                  featured={project.featured}
                  image={project.image}
                  date={project.date}
                  metrics={Object.entries(project.stats).map(([key, value]) => ({
                    label: key.charAt(0).toUpperCase() + key.slice(1),
                    value: value
                  }))}
                  onClick={() => window.location.href = `/projects/${project.id}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
              Quick Stats
            </h2>
            
            <div className="relative p-8 sm:p-12 bg-gray-800/80 text-white rounded-2xl shadow-2xl border border-blue-700/40 backdrop-blur-md overflow-visible">
              {/* Blue gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-700/30 via-transparent to-purple-700/20" />
              
              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <StatCard
                    value="5+"
                    label="Programming Languages"
                    icon={Code}
                    color="orange"
                    popupContent={
                      <pre>
{`const technologies = [
  "Python",        // ML/AI & Backend
  "JavaScript",    // Frontend & Full-Stack
  "TypeScript",    // Type Safety & DX
  "Java",          // Backend & Algorithms
  "HTML/CSS",      // Web Development
];`}
                      </pre>
                    }
                  />
                  
                  <StatCard
                    value="4+"
                    label="Years Experience"
                    icon={Brain}
                    color="purple"
                    popupContent={
                      <pre>
{`## Professional Journey

• Full-Stack Development: 3+ years
• Research & Academia: 2+ years
• Machine Learning: 2+ years  
• Teaching & Mentoring: 2+ years

Total: 4+ years of technical growth`}
                      </pre>
                    }
                  />
                  
                  <StatCard
                    value="6+"
                    label="Projects Completed"
                    icon={Zap}
                    color="green"
                    onClick={() => window.location.href = '/projects'}
                    popupContent={
                      <pre>
{`## Project Categories

• AI/ML Applications: 3 projects
• Full-Stack Web Apps: 2 projects
• Data Analysis Tools: 1 project
• Automation Scripts: 1 project

Featured: Sesha v3, Parkinson's Detection,
         Nonprofit Scraper, McDiver, 
         Astral AI, Flashcards`}
                      </pre>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
