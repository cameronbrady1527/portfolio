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

export const researchPapers: ResearchPaper[] = [
  // Research papers will be added here as they are published
  // Currently in early stages of research career, focusing on:
  // - Parkinson's Disease Detection Project
  // - Machine Learning for Healthcare Applications
  // - Building research skills and knowledge
];

export function getPaperById(id: number): ResearchPaper | undefined {
  return researchPapers.find(paper => paper.id === id);
}

export function getPapersByArea(area: string): ResearchPaper[] {
  if (area === "all") return researchPapers;
  return researchPapers.filter(paper => paper.area === area);
} 