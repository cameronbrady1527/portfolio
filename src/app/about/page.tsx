"use client";
// about/page.tsx
// About page for Cameron Brady's portfolio
// Features personal background, education, skills, and experience
//

import { GlassCard } from "@/components/GlassCard";
import { NeuralButton } from "@/components/NeuralButton";
import { Header } from "@/components/Header";
import { TypewriterText } from "@/components/TypewriterText";
import { StyledLink } from "@/components/StyledLink";
import { useState, useEffect } from "react";

export default function About() {
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
            <GlassCard className="mb-8">
              <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
                <TypewriterText 
                  text="About Cameron" 
                  speed={80}
                  className="text-white"
                />
              </h1>
              <p className="text-xl sm:text-2xl text-purple-300 font-medium mb-6">
                Bridging Neuroscience and Computer Science
              </p>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                To sum me up succinctly would be to say that I love to help people and I love to solve problems
                [I will add more here later...]
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

        {/* Background Section */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
              Background & Education
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <GlassCard>
                <h3 className="text-2xl font-bold mb-4 text-purple-300">Education</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-400 pl-4">
                    <h4 className="font-semibold text-white">Cornell University</h4>
                    <p className="text-gray-300">Interdisciplinary CS, B.S.</p>
                    <p className="text-sm text-gray-400">2020 - 2024</p>
                  </div>
                  <div className="border-l-4 border-blue-400 pl-4">
                    <h4 className="font-semibold text-white">Neuroscience Research</h4>
                    <p className="text-gray-300">Independent Study & Research</p>
                    <p className="text-sm text-gray-400">2022 - Present</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="text-2xl font-bold mb-4 text-purple-300">Research Focus</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Machine Learning for Healthcare</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Neurological Disorder Detection</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">AI-Powered Medical Diagnostics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-300">Data Pipeline Optimization</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
              Skills & Technologies
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <GlassCard>
                <h3 className="text-xl font-bold mb-4 text-purple-300">Programming Languages</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Python</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">TypeScript/JS</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Java</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">SQL</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-orange-400 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="text-xl font-bold mb-4 text-purple-300">Frameworks & Tools</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">React/Next.js</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">PostgreSQL</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">PyTorch/TensorFlow</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Docker/AWS</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-orange-400 h-2 rounded-full" style={{width: '80%'}}></div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="text-xl font-bold mb-4 text-purple-300">Research & Analysis</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Statistical Analysis</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Data Visualization</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Research Design</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{width: '82%'}}></div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
              Experience Timeline
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-blue-400"></div>
              
              <div className="space-y-8">
                <div className="relative flex items-start">
                  <div className="absolute left-6 w-4 h-4 bg-purple-400 rounded-full -translate-x-2"></div>
                  <div className="ml-16">
                    <GlassCard>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-purple-300">Software Developer</h3>
                        <span className="text-sm text-gray-400">2025 - Present</span>
                      </div>
                      <p className="text-gray-300 mb-2"><StyledLink href="https://www.useastral.dev" variant="button" external>Astral AI</StyledLink> <strong>[Startup]</strong></p>
                      <p className="text-gray-400">
                        -  Developing a full-stack web application for AI-generated article creation via source aggregation.
                      </p>
                      <p className="text-gray-400">
                        -  Rebuilding <StyledLink href="https://www.klavis.ai" variant="default" external>Klavis.AI</StyledLink> MCP integrations and servers to improve our platform's performance and accessibility.
                      </p>
                    </GlassCard>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="absolute left-6 w-4 h-4 bg-blue-400 rounded-full -translate-x-2"></div>
                  <div className="ml-16">
                    <GlassCard>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-purple-300">Nonprofit Consultant</h3>
                        <span className="text-sm text-gray-400">2024 - 2025</span>
                      </div>
                      <p className="text-gray-300 mb-2">Community Mindfulness Project</p>
                      <p className="text-gray-400">
                        -  Developed industry-competitive, data-driven, and open-source nonprofit data collection and analysis tools, leveraging financial records from over 1.8 million of American 501(c)3 organizations.
                        <StyledLink href="https://github.com/cameronbrady1527/nonprofit-revenue-scraper" variant="github" external>
                          View on GitHub
                        </StyledLink>
                      </p>
                      <p className="text-gray-400">
                        -  Spearheading the creation of a digital board handbook and new SOPs, whilst advising on strategic program development and board governance best practices.
                      </p>
                    </GlassCard>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="absolute left-6 w-4 h-4 bg-blue-400 rounded-full -translate-x-2"></div>
                  <div className="ml-16">
                    <GlassCard>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-purple-300">Head Teaching Assistant</h3>
                        <span className="text-sm text-gray-400">2022 - 2024</span>
                      </div>
                      <p className="text-gray-300 mb-2">Cornell Dyson School of Applied Economics and Management</p>
                      <p className="text-gray-400">
                        -  Served as Head TA for Farm Business Management, leading five TAs by establishing standardized, tech-friendly workflows for lessons, grading, and office hours.
                      </p>
                      <p className="text-gray-400">
                        -  Acted as a communication bridge between course administration, students, and peer TAs.
                      </p>
                    </GlassCard>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="absolute left-6 w-4 h-4 bg-green-400 rounded-full -translate-x-2"></div>
                  <div className="ml-16">
                    <GlassCard>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-purple-300">CEO & Co-Founder</h3>
                        <span className="text-sm text-gray-400">2019 - 2024</span>
                      </div>
                      <p className="text-gray-300 mb-2">The Clover Project, Inc.</p>
                      <p className="text-gray-400">
                        -  Co-founded a mission-driven nonprofit to combat food insecurity by cultivating and distributing produce, managing a team of six directors and over 250 volunteers.
                      </p>
                      <p className="text-gray-400">
                        -  Implemented a comprehensive database system to track inventory, donations, and volunteer hours, streamlining operations and improving efficiency.
                      </p>
                    </GlassCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <GlassCard>
              <h2 className="text-3xl font-bold mb-4 text-white">
                Ready to Collaborate?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Let's work together on innovative projects that improve lives.
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
