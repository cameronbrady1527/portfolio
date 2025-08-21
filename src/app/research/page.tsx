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
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { StatCard } from "@/components/ui/StatCard";
import { InfoCard } from "@/components/ui/InfoCard";
import { Brain, Cpu, Activity, FlaskConical, Lightbulb, Target, Infinity } from "lucide-react";
import { useState, useEffect } from "react";
import { getPapersByArea } from "@/lib/research-data";

export default function Research() {
  const [selectedArea] = useState("all");
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const researchAreas = [
    { id: "all", name: "All Research", color: "purple" },
    { id: "neurology", name: "Neurology", color: "blue" },
    { id: "ai-ml", name: "AI/ML", color: "green" },
    { id: "healthcare", name: "Healthcare", color: "orange" },
    { id: "signal-processing", name: "Signal Processing", color: "pink" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      icon: "ML"
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
      icon: "Stats"
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
      icon: "Signal"
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
                with a focus on neurological disorders and early detection systems.
                <span className="text-purple-300 font-medium"> My research journey is just beginning</span> - 
                I am actively developing projects and building the foundation for future academic work.
              </p>
            </GlassCard>

            <ScrollIndicator isVisible={isAtTop} />
          </div>
        </section>

        {/* Research Status Section */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <GlassCard>
              <div className="text-center space-y-6">
                <div className="text-4xl mb-4 font-bold text-purple-300">Research</div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Research Journey in Progress
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                                  I&apos;m currently in the early stages of my research career, actively developing
                projects and building the foundation for future academic work. While I haven&apos;t
                published formal research papers yet, I&apos;m deeply engaged in:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="text-left space-y-3">
                    <h3 className="text-xl font-semibold text-purple-300">Current Focus</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Parkinson&apos;s Disease Detection Project</li>
                      <li>• Machine Learning for Healthcare Applications</li>
                      <li>• Vocal Biomarker Analysis</li>
                      <li>• Building Research Skills & Knowledge</li>
                    </ul>
                  </div>
                  
                  <div className="text-left space-y-3">
                    <h3 className="text-xl font-semibold text-blue-300">Future Goals</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Publish First Research Paper</li>
                      <li>• Collaborate with Medical Researchers</li>
                      <li>• Develop Clinical Applications</li>
                      <li>• Pursue Advanced Research Opportunities</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <p className="text-purple-300 font-medium">
                    I&apos;m actively seeking research collaborations and opportunities to contribute 
                    to the field of AI-powered healthcare diagnostics.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Research Projects & Ideas */}
        <section className="py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
              Research Projects & Ideas
            </h2>
            
            <div className="space-y-6">
              {/* Parkinson's Detection Project */}
              <GlassCard interactive className="group">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
                      Active Project
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-purple-300 group-hover:text-purple-200 transition-colors">
                      Parkinson&apos;s Disease Detection Using Vocal Biomarkers
                    </h3>
                    
                    <p className="text-gray-300 mb-4">
                      Advanced machine learning framework for Parkinson&apos;s disease identification utilizing vocal biomarkers with streamlined data processing, automated model development, and comprehensive performance assessment. Achieves 94.9% precision through intelligent feature selection leveraging Random Forest importance metrics.
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["Vocal Biomarkers", "Machine Learning", "Signal Processing", "Healthcare AI", "94.9% Precision"].map((keyword) => (
                        <span key={keyword} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-sm text-gray-400">
                      Status: In Development • Target: Research Paper Publication
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 lg:w-48">
                    <NeuralButton variant="primary" size="sm">
                      View Project Details
                    </NeuralButton>
                    <NeuralButton variant="secondary" size="sm">
                      Research Proposal
                    </NeuralButton>
                  </div>
                </div>
              </GlassCard>
              
              {/* Future Research Ideas */}
              <GlassCard interactive className="group">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
                      Research Ideas
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-purple-300 group-hover:text-purple-200 transition-colors">
                      AI-Powered Neurological Disorder Detection
                    </h3>
                    
                    <p className="text-gray-300 mb-4">
                      Exploring various approaches to early detection of neurological disorders 
                      including Alzheimer&apos;s, dementia, and other cognitive impairments using 
                      machine learning and AI techniques.
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["Alzheimer&apos;s Detection", "Cognitive Assessment", "AI Diagnostics", "Early Intervention"].map((keyword) => (
                        <span key={keyword} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-sm text-gray-400">
                      Status: Research Phase • Target: Future Publications
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 lg:w-48">
                    <NeuralButton variant="accent" size="sm">
                      Research Outline
                    </NeuralButton>
                    <NeuralButton variant="secondary" size="sm">
                      Collaboration Interest
                    </NeuralButton>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
              Research Areas of Interest
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <InfoCard
                icon={Brain}
                title="Neurology"
                value="Neurological Research"
                description="Focus on neurological disorders, brain-computer interfaces, and neural signal processing"
                priority="Research Area"
                category="High Priority"
              />

              <InfoCard
                icon={Cpu}
                title="AI/ML"
                value="Artificial Intelligence"
                description="Machine learning applications in healthcare and biomedical data analysis"
                priority="Research Area"
                category="High Priority"
              />

              <InfoCard
                icon={Activity}
                title="Signal Processing"
                value="Signal Analysis"
                description="Advanced signal processing for neural and biomedical data analysis"
                priority="Research Area"
                category="Medium Priority"
              />
            </div>
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
                  <div className="text-4xl mb-4 font-bold text-purple-300">{methodology.icon}</div>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StatCard
                label="Active Projects"
                value="1"
                description="Current research in progress"
                icon={FlaskConical}
                color="purple"
              />
              <StatCard
                label="Research Ideas"
                value="3+"
                description="Concepts in development"
                icon={Lightbulb}
                color="blue"
              />
              <StatCard
                label="Research Areas"
                value="3"
                description="Primary focus domains"
                icon={Target}
                color="green"
              />
              <StatCard
                label="Future Potential"
                value="∞"
                description="Endless possibilities"
                icon={Infinity}
                color="orange"
              />
            </div>
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
                Let&apos;s explore new frontiers in AI and neuroscience together.
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
