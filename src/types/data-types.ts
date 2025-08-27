// Global types index
// Re-export types from features as needed

export interface Project {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    category: string;
    image: string;
    github: string;
    live: string | null;
    featured: boolean;
    stats: Record<string, string>;
    content?: {
      overview: string;
      challenges: string[];
      solutions: string[];
      results: string[];
      technicalDetails: string;
      screenshots?: string[];
    };
    date?: string;
}

export interface ResearchPaper {
  id: number;
  title: string;
  authors: string[];
  abstract: string;
  journal: string;
  year: number;
  doi: string;
  area: string;
  featured: boolean;
  citations: number;
  impact: string;
  keywords: string[];
  content?: {
    fullAbstract: string;
    methodology: string;
    results: string[];
    conclusions: string;
    figures?: string[];
    data?: string;
  };
}