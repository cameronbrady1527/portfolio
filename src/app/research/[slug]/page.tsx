"use client";
// app/research/[slug]/page.tsx
// Dynamic research paper page with detailed paper information

import React from 'react';
import { GlassCard } from "@/components/GlassCard";
import { NeuralButton } from "@/components/NeuralButton";
import { Header } from "@/components/Header";
import { StyledLink } from "@/components/StyledLink";
import { getPaperById } from "@/lib/research-data";
import { notFound } from 'next/navigation';

interface ResearchPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ResearchPage({ params }: ResearchPageProps) {
  const { slug } = await params;
  const paperId = parseInt(slug);
  const paper = getPaperById(paperId);

  if (!paper) {
    notFound();
  }

  const areaColors = {
    'neurology': 'blue',
    'ai-ml': 'green',
    'healthcare': 'orange',
    'signal-processing': 'pink'
  };

  const areaColor = areaColors[paper.area as keyof typeof areaColors] || 'purple';

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
              {paper.featured && (
                <div className="inline-block bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                  Featured Research
                </div>
              )}

              <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
                {paper.title}
              </h1>
              
              <p className="text-lg sm:text-xl text-purple-300 font-medium mb-4">
                {paper.authors.join(", ")}
              </p>
              
              <p className="text-md text-gray-400 mb-6">
                {paper.journal} • {paper.year} • DOI: {paper.doi}
              </p>

              {/* Keywords */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {paper.keywords.map((keyword) => (
                  <span 
                    key={keyword}
                    className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm border border-gray-600/50"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <NeuralButton 
                  variant="primary" 
                  size="lg"
                  onClick={() => window.open(`https://doi.org/${paper.doi}`, '_blank')}
                >
                  View Full Paper
                </NeuralButton>
                <NeuralButton 
                  variant="secondary" 
                  size="lg"
                  onClick={() => window.open(`https://scholar.google.com/scholar?q=${encodeURIComponent(paper.title)}`, '_blank')}
                >
                  Google Scholar
                </NeuralButton>
                <NeuralButton 
                  variant="accent" 
                  size="lg"
                  onClick={() => window.history.back()}
                >
                  Back to Research
                </NeuralButton>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Paper Stats */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Paper Metrics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <GlassCard className="text-center">
                <div className="text-3xl font-bold text-purple-300 mb-2">{paper.citations}</div>
                <div className="text-gray-300">Citations</div>
              </GlassCard>
              <GlassCard className="text-center">
                <div className="text-3xl font-bold text-blue-300 mb-2">{paper.impact}</div>
                <div className="text-gray-300">Impact Factor</div>
              </GlassCard>
              <GlassCard className="text-center">
                <div className="text-3xl font-bold text-green-300 mb-2">{paper.year}</div>
                <div className="text-gray-300">Publication Year</div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Paper Details */}
        {paper.content && (
          <section className="py-16 px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">
                Research Details
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Full Abstract */}
                <GlassCard>
                  <h3 className="text-2xl font-bold mb-4 text-purple-300">Abstract</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {paper.content.fullAbstract}
                  </p>
                </GlassCard>

                {/* Methodology */}
                <GlassCard>
                  <h3 className="text-2xl font-bold mb-4 text-purple-300">Methodology</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {paper.content.methodology}
                  </p>
                </GlassCard>
              </div>

              {/* Results */}
              <div className="mt-8">
                <GlassCard>
                  <h3 className="text-2xl font-bold mb-4 text-green-300">Key Results</h3>
                  <ul className="space-y-3">
                    {paper.content.results.map((result, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300">{result}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>

              {/* Conclusions */}
              <div className="mt-8">
                <GlassCard>
                  <h3 className="text-2xl font-bold mb-4 text-blue-300">Conclusions</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {paper.content.conclusions}
                  </p>
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
                Interested in This Research?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Let's discuss potential collaborations or explore related research opportunities.
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
                  View All Research
                </NeuralButton>
              </div>
            </GlassCard>
          </div>
        </section>
      </main>
    </div>
  );
} 