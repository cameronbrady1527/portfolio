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
import { ScrollIndicator, InfoCard } from "@/components/ui";
import { useState, useEffect, useCallback } from "react";
import { GraduationCap, Target, Code, Database, Brain, Users, ExternalLink } from "lucide-react";

export default function About() {
  const [isAtTop, setIsAtTop] = useState(true);

  // Throttled scroll handler for consistency
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
            <GlassCard className="mb-8">
              <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
                <TypewriterText 
                  text="About Cameron" 
                  speed={80}
                  className="text-white"
                />
              </h1>
              {/* <p className="text-xl sm:text-2xl text-purple-300 font-medium mb-6">
                Fullstack Software Developer | Machine Learning Researcher | Nonprofit Consultant
              </p> */}
              <br />
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                I am a computational neuroscience enthusiast and machine learning researcher with a 
                  human-centered focus on advancing our understanding of the brain through AI and statistical learning. 
                You can also consider me a full-stack software developer and nonprofit consultant!  
                I am currently building the technical foundation for my future career as a neurosurgeon and 
                  research-driven student/employee, where I plan to bridge cutting-edge AI research with clinical 
                  practice to improve patient outcomes and advance neurological medicine.
              </p>
            </GlassCard>

            {/* Scroll Indicator */}
            <ScrollIndicator isVisible={isAtTop} />
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
              Vision & Mission
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <GlassCard>
                <h3 className="text-2xl font-bold mb-4 text-purple-300">My Mission</h3>
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    I am dedicated to developing early-detection and prevention systems for neurological disorders.
                    This dedication is fueled by my compulsion to do fundamentally positive work for others and the world.
                    My diverse skillset and interests, matched with an obsession for machine learning and systems thinking,
                    and met with a deep resolve to find the best solution, will allow me to do just that.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Currently, I am working at <StyledLink href="https://www.useastral.dev" variant="default" external>Astral AI</StyledLink>, 
                    gaining valuable experience in AI development while building the foundation for my 
                    medical research career through AI-powered web applications and data scraping automations.
                  </p>
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="text-2xl font-bold mb-4 text-purple-300">Long-term Goals</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">Graduate studies in CS with ML/Neuroscience focus</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">Medical school to become a neurosurgeon</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">Early-detection and prevention systems for neurological disorders</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">Creating highly-reliable prevention methods for Alzhiemer&apos;s Disease</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">Research-driven medical and clinical practice</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">Accessible healthcare for underserved communities</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">Teaching novel neural computing concepts to students</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">Full-scale brain mapping and neurological development simulation</span>
                  </div>
                </div>
              </GlassCard>
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
              <div className="space-y-6">
                <InfoCard
                  icon={GraduationCap}
                  title="Cornell University"
                  value="Interdisciplinary Studies, B.S."
                  description="Computer Science, Applied Economics and Management, Agricultural Studies"
                  priority="2020 - 2024"
                  category="Education"
                />
                
                <InfoCard
                  icon={Brain}
                  title="Self-Directed Learning"
                  value="Machine Learning & Neuroscience"
                  description="Continuous learning in computational neuroscience and AI applications"
                  priority="2022 - Present"
                  category="Research"
                />
              </div>

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
                    <span className="text-gray-300">Early Detection Systems</span>
                  </div>
                  <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <p className="text-sm text-purple-300">
                      Currently developing my first research project focused on Parkinson&apos;s disease detection using vocal biomarkers, achieving 94.9% precision. Seeking opportunities to collaborate and contribute to the field.
                    </p>
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
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-purple-300 flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Programming Languages
                </h3>
                {["Python", "JavaScript", "TypeScript", "Java", "HTML/CSS", "SQL"].map((skill) => (
                  <InfoCard
                    key={skill}
                    title="Programming Language"
                    value={skill}
                    description="Click to view projects"
                    onClick={() => {
                      const params = new URLSearchParams();
                      params.set('tech', skill);
                      window.location.href = `/projects?${params.toString()}`;
                    }}
                    className="hover:border-purple-400/50"
                  />
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-purple-300 flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Frameworks & Tools
                </h3>
                {["React", "Node.js", "Next.js", "Spring Boot", "Git", "PostgreSQL"].map((skill) => (
                  <InfoCard
                    key={skill}
                    title="Framework/Tool"
                    value={skill}
                    description="Click to view projects"
                    onClick={() => {
                      const params = new URLSearchParams();
                      params.set('tech', skill);
                      window.location.href = `/projects?${params.toString()}`;
                    }}
                    className="hover:border-blue-400/50"
                  />
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-purple-300 flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  ML & AI Tools
                </h3>
                {["Scikit-learn", "PyTorch", "Pandas", "Matplotlib", "Seaborn", "Jupyter"].map((skill) => (
                  <InfoCard
                    key={skill}
                    title="ML/AI Tool"
                    value={skill}
                    description="Click to view projects"
                    onClick={() => {
                      const params = new URLSearchParams();
                      params.set('tech', skill);
                      window.location.href = `/projects?${params.toString()}`;
                    }}
                    className="hover:border-green-400/50"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
              Work Experience Timeline
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-blue-400"></div>
              
              <div className="space-y-8">
                <div className="relative flex items-start">
                  <div className="ml-16 w-full">
                    <InfoCard
                      icon={Code}
                      title="Full-Stack Software Developer"
                      value="Astral AI [AI Startup] - Founding Engineering Team"
                      description="Building full-stack AI-powered web applications and web crawling automations for clients. Co-developing Astral platform for intelligent business solutions."
                      priority="2025 - Present"
                      category="Current Role"
                      link="https://www.useastral.dev"
                    />
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="ml-16 w-full">
                    <InfoCard
                      icon={Users}
                      title="Nonprofit Consultant"
                      value="Community Mindfulness Project - Independent Consultant"
                      description="Developed data-driven nonprofit analysis tools leveraging 1.8M+ organization records. Overhauled compensation research reducing time from months to days."
                      priority="2024 - Present"
                      category="Consulting"
                    />
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="ml-16 w-full">
                    <InfoCard
                      icon={GraduationCap}
                      title="Head Teaching Assistant"
                      value="Cornell Dyson School - Farm Business Management"
                      description="Led five TAs establishing standardized workflows for lessons, grading, and office hours. First point of contact for professors and students."
                      priority="2022 - 2024"
                      category="Academia"
                    />
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="ml-16 w-full">
                    <InfoCard
                      icon={Target}
                      title="CEO & Co-Founder"
                      value="The Clover Project, Inc."
                      description="Co-founded nonprofit combating food insecurity. Managed 6 directors and 250+ volunteers. Implemented comprehensive database and management systems."
                      priority="2019 - Present"
                      category="Leadership"
                      link="https://www.poughkeepsiejournal.com/story/news/local/2019/09/12/arlington-students-project-combating-hunger-dutchess-help/2164033001"
                    />
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
                Let&apos;s work together on innovative projects that improve lives through AI and medical technology.
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
