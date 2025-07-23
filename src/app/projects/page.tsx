"use client";
// projects/page.tsx
// Projects page for Cameron Brady's portfolio
// Features project showcase with detailed information and interactive elements
//
// Sections:
// - Hero section with project overview
// - Featured projects grid
// - Project categories
// - Detailed project cards
// - Neural background integration

import { GlassCard } from "@/components/GlassCard";
import { NeuralButton } from "@/components/NeuralButton";
import { Header } from "@/components/Header";
import { TypewriterText } from "@/components/TypewriterText";
import { useState } from "react";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Projects", color: "purple" },
    { id: "ai-ml", name: "AI/ML", color: "blue" },
    { id: "web", name: "Web Development", color: "green" },
    { id: "research", name: "Research", color: "orange" },
    { id: "automation", name: "Automation", color: "pink" },
  ];

  const projects = [
    {
      id: 1,
      title: "Sesha v3",
      description: "AI-powered pipeline for processing and analyzing complex data streams with real-time processing capabilities.",
      longDescription: "A comprehensive data processing pipeline that leverages machine learning to analyze complex biomedical data streams. Features include real-time data ingestion, automated preprocessing, and advanced analytics with 99.2% accuracy in pattern recognition.",
      technologies: ["Python", "PyTorch", "Docker", "PostgreSQL", "Redis"],
      category: "ai-ml",
      image: "/api/placeholder/400/300",
      github: "https://github.com/cameronbrady/sesha-v3",
      live: "https://sesha-demo.com",
      featured: true,
      stats: {
        accuracy: "99.2%",
        processingSpeed: "10x faster",
        dataPoints: "1M+ daily"
      }
    },
    {
      id: 2,
      title: "Parkinson's Detection System",
      description: "ML model achieving 94.9% accuracy in early Parkinson's detection using voice analysis.",
      longDescription: "A machine learning system that analyzes voice patterns to detect early signs of Parkinson's disease. The model processes audio recordings and extracts features to identify subtle changes in speech patterns that may indicate neurological changes.",
      technologies: ["Python", "TensorFlow", "scikit-learn", "Librosa", "Flask"],
      category: "research",
      image: "/api/placeholder/400/300",
      github: "https://github.com/cameronbrady/parkinsons-detection",
      live: null,
      featured: true,
      stats: {
        accuracy: "94.9%",
        sensitivity: "92.3%",
        specificity: "96.1%"
      }
    },
    {
      id: 3,
      title: "Nonprofit Data Scraper",
      description: "Automated data collection system helping nonprofits access critical information efficiently.",
      longDescription: "An intelligent web scraping system designed specifically for nonprofit organizations to collect and organize data from various sources. Includes OCR capabilities for processing scanned documents and automated data validation.",
      technologies: ["Python", "Selenium", "BeautifulSoup", "OCR", "PostgreSQL"],
      category: "automation",
      image: "/api/placeholder/400/300",
      github: "https://github.com/cameronbrady/nonprofit-scraper",
      live: null,
      featured: true,
      stats: {
        efficiency: "85% faster",
        accuracy: "98.5%",
        organizations: "50+ served"
      }
    },
    {
      id: 4,
      title: "Neural Portfolio",
      description: "Modern portfolio website with neural theme and interactive animations.",
      longDescription: "A responsive portfolio website built with Next.js and TypeScript, featuring a neural network theme with interactive animations, glassmorphism effects, and smooth user experience.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React"],
      category: "web",
      image: "/api/placeholder/400/300",
      github: "https://github.com/cameronbrady/neural-portfolio",
      live: "https://cameronbrady.dev",
      featured: false,
      stats: {
        performance: "98/100",
        accessibility: "100/100",
        seo: "95/100"
      }
    },
    {
      id: 5,
      title: "Healthcare Analytics Dashboard",
      description: "Real-time healthcare data visualization and analytics platform.",
      longDescription: "A comprehensive dashboard for healthcare providers to monitor patient data, track treatment outcomes, and generate insights. Features real-time data visualization and predictive analytics.",
      technologies: ["React", "D3.js", "Node.js", "MongoDB", "Socket.io"],
      category: "web",
      image: "/api/placeholder/400/300",
      github: "https://github.com/cameronbrady/healthcare-dashboard",
      live: "https://healthcare-analytics.demo.com",
      featured: false,
      stats: {
        users: "500+",
        dataPoints: "2M+",
        uptime: "99.9%"
      }
    },
    {
      id: 6,
      title: "Brain-Computer Interface Research",
      description: "Research on neural signal processing for brain-computer interface applications.",
      longDescription: "Advanced research project focusing on processing neural signals for brain-computer interface applications. Includes signal processing algorithms and real-time neural data analysis.",
      technologies: ["Python", "NumPy", "SciPy", "Matplotlib", "LabVIEW"],
      category: "research",
      image: "/api/placeholder/400/300",
      github: "https://github.com/cameronbrady/bci-research",
      live: null,
      featured: false,
      stats: {
        signals: "1000+",
        accuracy: "87.3%",
        latency: "<50ms"
      }
    }
  ];

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center p-8 relative">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <GlassCard className="mb-8">
              <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
                <TypewriterText 
                  text="Projects" 
                  speed={80}
                  className="text-white"
                />
              </h1>
              <p className="text-xl sm:text-2xl text-purple-300 font-medium mb-6">
                Innovative Solutions with Real-World Impact
              </p>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                A collection of projects spanning AI/ML, web development, research, 
                and automation - each designed to solve real problems and push the 
                boundaries of what's possible.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Project Categories */}
        <section className="py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
              Project Categories
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    px-6 py-3 rounded-full font-medium transition-all duration-300
                    ${selectedCategory === category.id
                      ? `bg-${category.color}-500 text-white shadow-lg shadow-${category.color}-500/25`
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600'
                    }
                  `}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <GlassCard key={project.id} interactive className="group">
                  {/* Project Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-4xl text-purple-300/50">📊</div>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}

                  {/* Project Info */}
                  <h3 className="text-xl font-bold mb-2 text-purple-300 group-hover:text-purple-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-sm">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="font-bold text-purple-300">{value}</div>
                        <div className="text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <NeuralButton 
                      variant="accent" 
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      View Code
                    </NeuralButton>
                    {project.live && (
                      <NeuralButton 
                        variant="secondary" 
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(project.live, '_blank')}
                      >
                        Live Demo
                      </NeuralButton>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* No Projects Message */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
                <p className="text-gray-300">Try selecting a different category or check back later for new projects.</p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <GlassCard>
              <h2 className="text-3xl font-bold mb-4 text-white">
                Interested in Collaboration?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Let's work together on your next innovative project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <NeuralButton 
                  variant="primary" 
                  size="lg"
                  onClick={() => window.location.href = '/contact'}
                >
                  Get In Touch
                </NeuralButton>
                <NeuralButton 
                  variant="secondary" 
                  size="lg"
                  onClick={() => window.location.href = '/research'}
                >
                  View Research
                </NeuralButton>
              </div>
            </GlassCard>
          </div>
        </section>
      </main>
    </div>
  );
}
