"use client";
// research/page.tsx
// Research page for Cameron Brady's portfolio
// Features research publications, methodologies, and academic work
//
// Sections:
// - Hero section with research overview
// - Research areas and focus
// - Publications and papers
// - Research methodologies
// - Neural background integration

import { GlassCard } from "@/components/GlassCard";
import { NeuralButton } from "@/components/NeuralButton";
import { Header } from "@/components/Header";
import { TypewriterText } from "@/components/TypewriterText";
import { useState, useEffect } from "react";
import { researchPapers, getPapersByArea } from "@/lib/research-data";

export default function Research() {
  const [selectedArea, setSelectedArea] = useState("all");
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const researchAreas = [
    { id: "all", name: "All Research", color: "purple" },
    { id: "neurology", name: "Neurology", color: "blue" },
    { id: "ai-ml", name: "AI/ML", color: "green" },
    { id: "healthcare", name: "Healthcare", color: "orange" },
    { id: "signal-processing", name: "Signal Processing", color: "pink" },
  ];

  const filteredPapers = getPapersByArea(selectedArea);

  const methodologies = [
    {
      title: "ML Pipeline",
      description: "End-to-end ML pipeline from data collection to model deployment",
      steps: [
        "Data Collection & Prep",
        "Feature Engineering",
        "Model Selection & Training",
        "Validation & Testing",
        "Deployment & Monitoring"
      ],
      icon: "🤖"
    },
    {
      title: "Statistical Analysis",
      description: "Comprehensive statistical methods for research validation",
      steps: [
        "Hypothesis Formulation",
        "Experimental Design",
        "Data Collection",
        "Statistical Testing",
        "Results Interpretation"
      ],
      icon: "📊"
    },
    {
      title: "Signal Processing",
      description: "Advanced signal processing for neural and biomedical data",
      steps: [
        "Signal Acquisition",
        "Noise Reduction",
        "Feature Extraction",
        "Pattern Recognition",
        "Real-time Processing"
      ],
      icon: "⚡"
    }
  ];



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
                  text="Research" 
                  speed={80}
                  className="text-white"
                />
              </h1>
              <p className="text-xl sm:text-2xl text-purple-300 font-medium mb-6">
                Advancing the Intersection of AI and Neuroscience
              </p>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Exploring the frontiers of machine learning applications in healthcare, 
                with a focus on neurological disorders and brain-computer interfaces.
              </p>
            </GlassCard>

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

        {/* Research Areas */}
        <section className="py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
              Research Areas
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {researchAreas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setSelectedArea(area.id)}
                  className={`
                    px-6 py-3 rounded-full font-medium transition-all duration-300
                    ${selectedArea === area.id
                      ? `bg-${area.color}-500 text-white shadow-lg shadow-${area.color}-500/25`
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600'
                    }
                  `}
                >
                  {area.name}
                </button>
              ))}
            </div>

            {/* Research Papers */}
            <div className="space-y-6">
              {filteredPapers.map((paper) => (
                <GlassCard key={paper.id} interactive className="group">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Paper Info */}
                    <div className="flex-1">
                      {/* Featured Badge */}
                      {paper.featured && (
                        <div className="inline-block bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
                          Featured Research
                        </div>
                      )}

                      <h3 className="text-xl font-bold mb-2 text-purple-300 group-hover:text-purple-200 transition-colors">
                        {paper.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-3">
                        {paper.authors.join(", ")}
                      </p>
                      
                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {paper.abstract}
                      </p>

                      {/* Keywords */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {paper.keywords.map((keyword) => (
                          <span 
                            key={keyword}
                            className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-sm"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>

                      {/* Journal Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{paper.journal}, {paper.year}</span>
                        <span>Citations: {paper.citations}</span>
                        <span className={`px-2 py-1 rounded ${
                          paper.impact === 'High' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {paper.impact} Impact
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 lg:w-48">
                      <NeuralButton 
                        variant="primary" 
                        size="sm"
                        onClick={() => window.location.href = `/research/${paper.id}`}
                      >
                        View Details
                      </NeuralButton>
                      <NeuralButton 
                        variant="accent" 
                        size="sm"
                        onClick={() => window.open(`https://doi.org/${paper.doi}`, '_blank')}
                      >
                        View Paper
                      </NeuralButton>
                      <NeuralButton 
                        variant="secondary" 
                        size="sm"
                        onClick={() => window.open(`https://scholar.google.com/scholar?q=${encodeURIComponent(paper.title)}`, '_blank')}
                      >
                        Google Scholar
                      </NeuralButton>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* No Papers Message */}
            {filteredPapers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔬</div>
                <h3 className="text-2xl font-bold text-white mb-2">No research papers found</h3>
                <p className="text-gray-300">Try selecting a different research area or check back later for new publications.</p>
              </div>
            )}
          </div>
        </section>

        {/* Research Methodologies */}
        <section className="py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
              Research Methodologies
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {methodologies.map((methodology, index) => (
                <GlassCard key={index} className="text-center">
                  <div className="text-4xl mb-4">{methodology.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-purple-300">
                    {methodology.title}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {methodology.description}
                  </p>
                  
                  <div className="space-y-2">
                    {methodology.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {stepIndex + 1}
                        </div>
                        <span className="text-gray-300 text-sm whitespace-nowrap">{step}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Research Stats */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <GlassCard>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">5</div>
                  <div className="text-gray-300">Publications</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">51</div>
                  <div className="text-gray-300">Total Citations</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">3</div>
                  <div className="text-gray-300">Research Areas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">94.9%</div>
                  <div className="text-gray-300">Best Accuracy</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <GlassCard>
              <h2 className="text-3xl font-bold mb-4 text-white">
                Interested in Research Collaboration?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Let's explore new frontiers in AI and neuroscience together.
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
                  onClick={() => window.location.href = '/projects'}
                >
                  View Projects
                </NeuralButton>
              </div>
            </GlassCard>
          </div>
        </section>
      </main>
    </div>
  );
}
