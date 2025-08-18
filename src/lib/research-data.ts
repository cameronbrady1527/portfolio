import { ResearchPaper } from "@/types/data-types";

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