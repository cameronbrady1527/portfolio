"use client";
// app/projects/[slug]/page.tsx
// Dynamic project page with detailed project information

import React from 'react';
import { GlassCard } from "@/components/GlassCard";
import { NeuralButton } from "@/components/NeuralButton";
import { Header } from "@/components/Header";

import { getProjectById } from "@/lib/projects-data";
import { notFound } from 'next/navigation';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [project, setProject] = React.useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadProject = async () => {
      const { slug } = await params;
      const projectId = parseInt(slug);
      const projectData = getProjectById(projectId);
      setProject(projectData);
      setLoading(false);
    };
    loadProject();
  }, [params]);

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <Header />
        <main className="pt-16 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </main>
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  const categoryColors = {
    'ai-ml': 'blue',
    'web': 'green',
    'research': 'orange',
    'automation': 'pink'
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const categoryColor = categoryColors[project.category as keyof typeof categoryColors] || 'purple';

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
              {/* Featured Badge */}
              {project.featured && (
                <div className="inline-block bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                  Featured Project
                </div>
              )}

              <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
                {project.title}
              </h1>
              <p className="text-xl sm:text-2xl text-purple-300 font-medium mb-6">
                {project.longDescription}
              </p>
              
              {/* Technologies */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {project.technologies.map((tech: string) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm border border-gray-600/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <NeuralButton 
                  variant="primary" 
                  size="lg"
                  onClick={() => window.open(project.github, '_blank')}
                >
                  View Code
                </NeuralButton>
                {project.live && (
                  <NeuralButton 
                    variant="secondary" 
                    size="lg"
                    onClick={() => window.open(project.live!, '_blank')}
                  >
                    Live Demo
                  </NeuralButton>
                )}
                <NeuralButton 
                  variant="accent" 
                  size="lg"
                  onClick={() => window.history.back()}
                >
                  Back to Projects
                </NeuralButton>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Project Stats */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Key Metrics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(project.stats).map(([key, value]) => (
                <GlassCard key={key} className="text-center">
                  <div className="text-3xl font-bold text-purple-300 mb-2">{String(value)}</div>
                  <div className="text-gray-300 capitalize">{key}</div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Project Details */}
        {project.content && (
          <section className="py-16 px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">
                Project Details
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Overview */}
                <GlassCard>
                  <h3 className="text-2xl font-bold mb-4 text-purple-300">Overview</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.content.overview}
                  </p>
                </GlassCard>

                {/* Technical Details */}
                <GlassCard>
                  <h3 className="text-2xl font-bold mb-4 text-purple-300">Technical Details</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.content.technicalDetails}
                  </p>
                </GlassCard>
              </div>

              {/* Challenges & Solutions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <GlassCard>
                  <h3 className="text-2xl font-bold mb-4 text-orange-300">Challenges</h3>
                  <ul className="space-y-3">
                    {project.content.challenges.map((challenge: string, index: number) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                <GlassCard>
                  <h3 className="text-2xl font-bold mb-4 text-green-300">Solutions</h3>
                  <ul className="space-y-3">
                    {project.content.solutions.map((solution: string, index: number) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>

              {/* Results */}
              <div className="mt-8">
                <GlassCard>
                  <h3 className="text-2xl font-bold mb-4 text-blue-300">Results</h3>
                  <ul className="space-y-3">
                    {project.content.results.map((result: string, index: number) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300">{result}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <GlassCard>
              <h2 className="text-3xl font-bold mb-4 text-white">
                Interested in This Project?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Let&apos;s discuss how we can collaborate on similar projects or explore new opportunities.
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
                  View All Projects
                </NeuralButton>
              </div>
            </GlassCard>
          </div>
        </section>
      </main>
    </div>
  );
}
