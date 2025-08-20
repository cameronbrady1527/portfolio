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
              <GlassCard>
                <h3 className="text-2xl font-bold mb-4 text-purple-300">Education</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-400 pl-4">
                    <h4 className="font-semibold text-white">Cornell University</h4>
                    <p className="text-gray-300">Interdisciplinary Studies, B.S.</p>
                    <p className="text-sm text-gray-400">Computer Science, Applied Economics and Management, Agricultural Studies</p>
                    <p className="text-sm text-gray-400">2020 - 2024</p>
                  </div>
                  <div className="border-l-4 border-blue-400 pl-4">
                    <h4 className="font-semibold text-white">Self-Directed Learning</h4>
                    <p className="text-gray-300">Machine Learning & Neuroscience</p>
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
              <GlassCard>
                <h3 className="text-xl font-bold mb-4 text-purple-300">Programming Languages</h3>
                <div className="space-y-3">
                  {["Python", "JavaScript", "TypeScript", "Java", "HTML/CSS", "SQL"].map((skill) => (
                    <button
                      key={skill}
                      onClick={() => {
                        const params = new URLSearchParams();
                        params.set('tech', skill);
                        window.location.href = `/projects?${params.toString()}`;
                      }}
                      className="w-full text-left p-3 rounded-lg bg-gray-800/30 hover:bg-gray-700/50 border border-gray-600/50 hover:border-purple-400/50 transition-all duration-300 group"
                    >
                      <span className="text-gray-300 group-hover:text-purple-300 transition-colors font-medium">
                        {skill}
                      </span>
                      <div className="text-xs text-gray-400 mt-1 group-hover:text-purple-400/70 transition-colors">
                        Click to view projects →
                      </div>
                    </button>
                  ))}
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="text-xl font-bold mb-4 text-purple-300">Frameworks & Tools</h3>
                <div className="space-y-3">
                  {["React", "Node.js", "Next.js", "Spring Boot", "Git", "PostgreSQL"].map((skill) => (
                    <button
                      key={skill}
                      onClick={() => {
                        const params = new URLSearchParams();
                        params.set('tech', skill);
                        window.location.href = `/projects?${params.toString()}`;
                      }}
                      className="w-full text-left p-3 rounded-lg bg-gray-800/30 hover:bg-gray-700/50 border border-gray-600/50 hover:border-blue-400/50 transition-all duration-300 group"
                    >
                      <span className="text-gray-300 group-hover:text-blue-300 transition-colors font-medium">
                        {skill}
                      </span>
                      <div className="text-xs text-gray-400 mt-1 group-hover:text-blue-400/70 transition-colors">
                        Click to view projects →
                      </div>
                    </button>
                  ))}
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="text-xl font-bold mb-4 text-purple-300">ML & AI Tools</h3>
                <div className="space-y-3">
                  {["Scikit-learn", "PyTorch", "Pandas", "Matplotlib", "Seaborn", "Jupyter"].map((skill) => (
                    <button
                      key={skill}
                      onClick={() => {
                        const params = new URLSearchParams();
                        params.set('tech', skill);
                        window.location.href = `/projects?${params.toString()}`;
                      }}
                      className="w-full text-left p-3 rounded-lg bg-gray-800/30 hover:bg-gray-700/50 border border-gray-600/50 hover:border-green-400/50 transition-all duration-300 group"
                    >
                      <span className="text-gray-300 group-hover:text-green-300 transition-colors font-medium">
                        {skill}
                      </span>
                      <div className="text-xs text-gray-400 mt-1 group-hover:text-green-400/70 transition-colors">
                        Click to view projects →
                      </div>
                    </button>
                  ))}
                </div>
              </GlassCard>
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
                  {/* <div className="absolute left-6 w-4 h-4 bg-purple-400 rounded-full -translate-x-2"></div> */}
                  <div className="ml-16">
                    <GlassCard>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-purple-300">Full-Stack Software Developer</h3>
                        <span className="text-sm text-gray-400">2025 - Present</span>
                      </div>
                      <p className="text-gray-300 mb-2"><StyledLink href="https://www.useastral.dev" variant="default" external>Astral AI</StyledLink> <strong>[AI Startup]</strong>, <i>Founding Engineering Team</i></p>
                      <p className="text-gray-400">
                        -  Building full-stack AI-powered web applications and web crawling automations for clients 
                        (see <StyledLink href="/projects/1" variant="default">sesha-v3</StyledLink> or <StyledLink href="/projects/2" variant="default">astral-aggregator</StyledLink>).
                      </p>
                      <p className="text-gray-400 pt-1">
                        -  Co-developing Astral, a platform optimizing the building and deployment of intelligent solutions to complex 
                          business problems, with implementation and AI-workflow complexity abstracted by the use of natural language.
                      </p>
                      <p className="text-gray-400 pt-1">
                        -  Collaboratively pushing the boundaries of software development, establishing best practices and workflows with artificial intelligence models 
                        (check out <StyledLink href="https://github.com/astral-ai-labs" variant="github" external>astral-ai-labs</StyledLink> on GitHub).
                      </p>
                    </GlassCard>
                  </div>
                </div>

                <div className="relative flex items-start">
                  {/* <div className="absolute left-6 w-4 h-4 bg-blue-400 rounded-full -translate-x-2"></div> */}
                  <div className="ml-16">
                    <GlassCard>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-purple-300">Nonprofit Consultant</h3>
                        <span className="text-sm text-gray-400">2024 - Present</span>
                      </div>
                      <p className="text-gray-300 mb-2">Community Mindfulness Project, <i>Independent Consultant</i></p>
                      <p className="text-gray-400">
                        -  Developed industry-competitive, data-driven, and open-source nonprofit data collection and analysis tools, 
                           leveraging financial records from over 1.8 million of American 501(c)3 organizations 
                           (see <StyledLink href="/projects/4" variant="default">nonprofit-data-scraper</StyledLink>).
                      </p>
                      <p className="text-gray-400 pt-2">
                        -  Spearheading the creation of a digital board handbook and new SOPs, whilst advising on strategic program 
                           development and board governance best practices, streamlining repetitive practices.
                      </p>
                      <p className="text-gray-400 pt-2">
                        -  Produced significant overhaul to executive compensation and budget deliberations, resulting in a major time reduction 
                           in compensation data research from months to merely days.
                      </p>
                    </GlassCard>
                  </div>
                </div>

                <div className="relative flex items-start">
                  {/* <div className="absolute left-6 w-4 h-4 bg-blue-400 rounded-full -translate-x-2"></div> */}
                  <div className="ml-16">
                    <GlassCard>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-purple-300">Head Teaching Assistant</h3>
                        <span className="text-sm text-gray-400">2022 - 2024</span>
                      </div>
                      <p className="text-gray-300 mb-2">Cornell Dyson School of Applied Economics and Management</p>
                      <p className="text-gray-400">
                        -  Served as Head TA for Farm Business Management, leading five TAs by establishing standardized, 
                           tech-friendly workflows for lessons, grading, and office hours.
                      </p>
                      <p className="text-gray-400 pt-2">
                        -  Acted as a first point of contact for professors, course administrators, TAs, and students.
                      </p>
                    </GlassCard>
                  </div>
                </div>

                <div className="relative flex items-start">
                  {/* <div className="absolute left-6 w-4 h-4 bg-green-400 rounded-full -translate-x-2"></div> */}
                  <div className="ml-16">
                    <GlassCard>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-purple-300">CEO & Co-Founder</h3>
                        <span className="text-sm text-gray-400">2019 - Present</span>
                      </div>
                      <p className="text-gray-300 mb-2">The Clover Project, Inc.</p>
                      <p className="text-gray-400">
                        -  Co-founded a mission-driven nonprofit to combat food insecurity by cultivating and distributing produce, 
                        managing a team of six directors and over 250 volunteers.
                      </p>
                      <p className="text-gray-400 pt-2">
                        -  Implemented a comprehensive database and volunteer management system to track inventory, donations, and volunteer hours, 
                           streamlining operations and improving efficiency.
                      </p>
                      <p className="text-gray-400 pt-2">
                        -  Maintaining an advisory role whilst redesigning our website and planning expansion efforts into other territories outside of Hyde Park, NY.
                      </p>
                      <p className="text-gray-400 pt-4">
                        <i>* See <StyledLink href="https://www.poughkeepsiejournal.com/story/news/local/2019/09/12/arlington-students-project-combating-hunger-dutchess-help/2164033001" variant="default" external>this local news article</StyledLink> to see our founding story... or our roots!</i>
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
