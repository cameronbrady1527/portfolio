"use client";
// app/research/[slug]/page.tsx
// Dynamic research paper page with detailed paper information

import React from 'react';
import { GlassCard } from "@/components/GlassCard";
import { NeuralButton } from "@/components/NeuralButton";
import { Header } from "@/components/Header";
import { StatCard } from "@/components/ui/StatCard";
import { InfoCard } from "@/components/ui/InfoCard";
import { Quote, TrendingUp, Calendar, FileText, FlaskConical, BarChart3, CheckCircle } from "lucide-react";

import { getPaperById } from "@/lib/research-data";
import { notFound } from 'next/navigation';

interface ResearchPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ResearchPage({ params }: ResearchPageProps) {
  const [paper, setPaper] = React.useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadPaper = async () => {
      const { slug } = await params;
      const paperId = parseInt(slug);
      const paperData = getPaperById(paperId);
      setPaper(paperData);
      setLoading(false);
    };
    loadPaper();
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

  if (!paper) {
    notFound();
  }

  const areaColors = {
    'neurology': 'blue',
    'ai-ml': 'green',
    'healthcare': 'orange',
    'signal-processing': 'pink'
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                {paper.keywords.map((keyword: string) => (
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
              <StatCard
                label="Citations"
                value={String(paper.citations)}
                description="Academic citations"
                icon={Quote}
                color="purple"
              />
              <StatCard
                label="Impact Factor"
                value={String(paper.impact)}
                description="Journal impact factor"
                icon={TrendingUp}
                color="blue"
              />
              <StatCard
                label="Publication Year"
                value={String(paper.year)}
                description="Year of publication"
                icon={Calendar}
                color="green"
              />
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
                <InfoCard
                  icon={FileText}
                  title="Abstract"
                  value="Research Abstract"
                  description={paper.content.fullAbstract}
                  priority="High Priority"
                  category="Research"
                />

                {/* Methodology */}
                <InfoCard
                  icon={FlaskConical}
                  title="Methodology"
                  value="Research Methods"
                  description={paper.content.methodology}
                  priority="High Priority"
                  category="Research"
                />
              </div>

              {/* Results */}
              <div className="mt-8">
                <InfoCard
                  icon={BarChart3}
                  title="Key Results"
                  value="Research Findings"
                  description={`Results: ${paper.content.results.join(', ')}`}
                  priority="High Priority"
                  category="Findings"
                />
              </div>

              {/* Conclusions */}
              <div className="mt-8">
                <InfoCard
                  icon={CheckCircle}
                  title="Conclusions"
                  value="Research Conclusions"
                  description={paper.content.conclusions}
                  priority="High Priority"
                  category="Research"
                />
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
                Let&apos;s discuss potential collaborations or explore related research opportunities.
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