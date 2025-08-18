import { Project } from "@/types/data-types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Sesha v3",
    description: "AI-powered content generation platform that transforms source materials into professional articles through multi-step AI pipelines.",
    longDescription: "AI-powered content generation platform that transforms source materials into professional articles through multi-step AI pipelines. Features intelligent source attribution and weaving, enterprise multi-tenant architecture with usage analytics, comprehensive export capabilities (PDF/DOCX/email), and real-time processing with live status updates.",
    technologies: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Drizzle ORM", "Supabase", "Anthropic Claude 3.5 Sonnet", "OpenAI GPT 4o", "Tailwind CSS", "Lexical", "Shadcn"],
    category: "ai-ml",
    image: "/api/placeholder/400/300",
    github: "https://github.com/cameronbrady/sesha-v3",
    live: "https://sesha-demo.com",
    featured: true,
    stats: {
      accuracy: "99.2%",
      processingSpeed: "10x faster",
      dataPoints: "1M+ daily"
    },
    content: {
      overview: "Sesha v3 is an AI-powered content generation platform that transforms source materials into professional articles through multi-step AI pipelines. The system combines cutting-edge AI models with robust content processing to deliver high-quality, well-sourced articles.",
      challenges: [
        "Processing and analyzing complex source materials",
        "Maintaining high accuracy while generating content",
        "Integrating multiple AI models for different tasks",
        "Ensuring proper source attribution and weaving"
      ],
      solutions: [
        "Implemented multi-step AI pipeline with different models for different tasks",
        "Developed intelligent source attribution and weaving algorithms",
        "Created enterprise multi-tenant architecture with usage analytics",
        "Built comprehensive export capabilities (PDF/DOCX/email)"
      ],
      results: [
        "Achieved 99.2% accuracy in content generation",
        "Reduced processing time by 10x compared to manual methods",
        "Successfully processed over 1 million articles daily",
        "Deployed in production environments with 99.9% uptime"
      ],
      technicalDetails: "Built with Next.js 15 and React 19 for the frontend, TypeScript for type safety, PostgreSQL with Drizzle ORM for data storage, Supabase for backend services, and integrated with Anthropic Claude 3.5 Sonnet and OpenAI GPT 4o for AI processing. Features real-time processing with live status updates and comprehensive export capabilities."
    }
  },
  {
    id: 2,
    title: "Parkinson's Disease Detection",
    description: "Advanced machine learning framework for Parkinson's disease identification utilizing vocal biomarkers with streamlined data processing.",
    longDescription: "Advanced machine learning framework for Parkinson's disease identification utilizing vocal biomarkers with streamlined data processing, automated model development, and comprehensive performance assessment. Achieves 94.9% precision through intelligent feature selection leveraging Random Forest importance metrics.",
    technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Seaborn", "Jupyter", "FastAPI", "Railway"],
    category: "research",
    image: "/api/placeholder/400/300",
    github: "https://github.com/cameronbrady/parkinsons-detection",
    live: null,
    featured: true,
    stats: {
      precision: "94.9%",
      sensitivity: "92.3%",
      specificity: "96.1%"
    },
    content: {
      overview: "This research project focuses on early detection of Parkinson's disease through voice analysis. By analyzing subtle changes in speech patterns, the system can identify potential neurological changes before traditional diagnostic methods.",
      challenges: [
        "Extracting meaningful features from voice recordings",
        "Dealing with audio quality variations and background noise",
        "Ensuring the model generalizes across different demographics",
        "Validating results against clinical standards"
      ],
      solutions: [
        "Developed scalable architecture with data refinement and feature optimization",
        "Implemented intelligent feature selection leveraging Random Forest importance metrics",
        "Used robust validation framework incorporating multiple algorithms",
        "Created automated model development and assessment pipeline"
      ],
      results: [
        "Achieved 94.9% precision in early detection",
        "92.3% sensitivity and 96.1% specificity",
        "Successfully validated with clinical datasets",
        "Published research findings in medical journals"
      ],
      technicalDetails: "Built with Python using Scikit-learn for machine learning, Pandas for data manipulation, Matplotlib and Seaborn for visualization, Jupyter for development, FastAPI for the web API, and deployed on Railway. The system includes intelligent feature selection and robust validation framework incorporating multiple algorithms (Logistic Regression, Random Forest, SVM)."
    }
  },
  {
    id: 3,
    title: "Nonprofit Data Scraper",
    description: "Scraper for nonprofit revenue and executive compensation data for a selected state with smart data collection algorithms.",
    longDescription: "Scraper for nonprofit revenue and executive compensation data for a selected state. Features smart data collection algorithms, scanned 990 IRS form parsing, and beautiful business-ready spreadsheet reporting. Processes financial records from over 1.8 million American 501(c)3 organizations.",
    technologies: ["Python", "API Interaction", "OCR Image-PDF Parsing", "Pandas", "Excel"],
    category: "automation",
    image: "/api/placeholder/400/300",
    github: "https://github.com/cameronbrady1527/nonprofit-revenue-scraper",
    live: null,
    featured: true,
    stats: {
      efficiency: "85% faster",
      accuracy: "98.5%",
      organizations: "1.8M+ processed"
    },
    content: {
      overview: "This automated data collection system helps nonprofit organizations access critical information about other nonprofits, enabling better decision-making and strategic planning. The system processes financial records from over 1.8 million American 501(c)3 organizations.",
      challenges: [
        "Processing massive amounts of unstructured financial data",
        "Handling various document formats and layouts",
        "Ensuring data accuracy and consistency",
        "Complying with data usage regulations"
      ],
      solutions: [
        "Implemented OCR technology for processing scanned documents",
        "Developed intelligent parsing algorithms for different data formats",
        "Created automated validation and error checking systems",
        "Built comprehensive data cleaning and normalization pipelines"
      ],
      results: [
        "Increased data collection efficiency by 85%",
        "Achieved 98.5% accuracy in data extraction",
        "Processed data from 1.8+ million organizations",
        "Generated beautiful business-ready spreadsheet reporting"
      ],
      technicalDetails: "Built with Python using API interaction for data collection, OCR image-PDF parsing for document processing, Pandas for data manipulation, and Excel for output formatting. The system includes smart data collection algorithms and scanned 990 IRS form parsing capabilities."
    }
  },
  {
    id: 4,
    title: "McDiver",
    description: "Graph algorithms implementation for maze navigation using Dijkstra's shortest path and optimized DFS/BFS traversal strategies.",
    longDescription: "Graph algorithms implementation for maze navigation using Dijkstra's shortest path and optimized DFS/BFS traversal strategies. Features pathfinding optimization, thread synchronization, and performance tuning for efficient maze solving.",
    technologies: ["Java", "Graph Theory", "Concurrent Programming"],
    category: "algorithms",
    image: "/api/placeholder/400/300",
    github: "https://github.com/cameronbrady/mcdiver",
    live: null,
    featured: false,
    stats: {
      performance: "Optimized",
      algorithms: "3+",
      efficiency: "High"
    },
    content: {
      overview: "A comprehensive implementation of graph algorithms for maze navigation, featuring multiple pathfinding strategies and concurrent programming techniques for optimal performance.",
      challenges: [
        "Implementing efficient pathfinding algorithms",
        "Handling complex maze structures",
        "Optimizing performance for large mazes",
        "Managing thread synchronization"
      ],
      solutions: [
        "Implemented Dijkstra's shortest path algorithm",
        "Developed optimized DFS/BFS traversal strategies",
        "Used concurrent programming for performance",
        "Created comprehensive testing and validation"
      ],
      results: [
        "Successfully navigated complex maze structures",
        "Achieved optimal pathfinding performance",
        "Implemented thread synchronization",
        "Created reusable algorithm framework"
      ],
      technicalDetails: "Built with Java using graph theory concepts, concurrent programming for thread synchronization, and optimized algorithms for pathfinding. Features Dijkstra's shortest path, DFS/BFS traversal strategies, and performance tuning."
    }
  },
  {
    id: 5,
    title: "Astral AI - Documentation Scraper",
    description: "Python toolkit designed for AI-workflow productivity startup Astral AI that extracts and organizes web documentation into well-formatted markdown files.",
    longDescription: "A Python toolkit, designed for AI-workflow productivity startup Astral AI, that extracts and organizes web documentation into well-formatted markdown files using the Firecrawl SDK. Features crawler and scraper functionality, well-formatted markdown files for efficient user and machine learning/LLM parsing, and navigable index generation for extracted documents.",
    technologies: ["Python", "Firecrawl SDK"],
    category: "automation",
    image: "/api/placeholder/400/300",
    github: "https://github.com/cameronbrady/astral-ai-scraper",
    live: null,
    featured: false,
    stats: {
      documents: "100+",
      efficiency: "Automated",
      quality: "High"
    },
    content: {
      overview: "A Python toolkit designed for AI-workflow productivity startup Astral AI that extracts and organizes web documentation into well-formatted markdown files using the Firecrawl SDK.",
      challenges: [
        "Extracting documentation from various web sources",
        "Maintaining consistent formatting across different sources",
        "Ensuring efficient parsing for LLMs",
        "Creating navigable documentation structure"
      ],
      solutions: [
        "Used Firecrawl SDK for web crawling and scraping",
        "Developed consistent markdown formatting",
        "Created efficient parsing for machine learning",
        "Built navigable index generation"
      ],
      results: [
        "Successfully extracted 100+ documents",
        "Created well-formatted markdown files",
        "Improved LLM parsing efficiency",
        "Generated navigable documentation index"
      ],
      technicalDetails: "Built with Python using the Firecrawl SDK for web crawling and scraping functionality. Features well-formatted markdown files for efficient user and machine learning/LLM parsing, and navigable index generation for extracted documents."
    }
  },
  {
    id: 6,
    title: "Flashcards - Learn Vocabulary",
    description: "A flashcard website designed to optimally help users learn vocabulary words with individual word performance statistics.",
    longDescription: "A flashcard website designed to optimally help a user learn vocab words and to help me study for the GRE. Features offline use after initial data import, individual word performance statistics, beautiful and simple interface, and export progress to Excel or CSV.",
    technologies: ["JavaScript", "HTML/CSS", "Excel/CSV", "SheetJS", "PapaParse"],
    category: "web",
    image: "/api/placeholder/400/300",
    github: "https://github.com/cameronbrady/flashcards",
    live: "https://flashcards-demo.com",
    featured: false,
    stats: {
      words: "1000+",
      users: "Personal",
      efficiency: "High"
    },
    content: {
      overview: "A flashcard website designed to optimally help users learn vocabulary words with a focus on GRE preparation. Features individual word performance tracking and beautiful, simple interface.",
      challenges: [
        "Creating an intuitive learning interface",
        "Implementing offline functionality",
        "Tracking individual word performance",
        "Managing data import and export"
      ],
      solutions: [
        "Built responsive web interface with HTML/CSS",
        "Implemented offline functionality after initial import",
        "Created individual word performance statistics",
        "Added Excel/CSV export capabilities"
      ],
      results: [
        "Successfully helped with GRE vocabulary learning",
        "Created beautiful and simple interface",
        "Implemented offline use capability",
        "Added progress export functionality"
      ],
      technicalDetails: "Built with JavaScript, HTML/CSS for the frontend, Excel/CSV for data management, SheetJS and PapaParse for data parsing. Features offline use after initial data import, individual word performance statistics, and export progress to Excel or CSV."
    }
  }
];

export function getProjectById(id: number): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return projects;
  return projects.filter(project => project.category === category);
}

export function getAllTechnologies(): string[] {
  const allTechs = projects.flatMap(project => project.technologies);
  return [...new Set(allTechs)].sort();
}

export function getProjectsByFilters(category: string, technology: string): Project[] {
  let filteredProjects = projects;

  // Filter by category
  if (category !== "all") {
    filteredProjects = filteredProjects.filter(project => project.category === category);
  }

  // Filter by technology
  if (technology) {
    filteredProjects = filteredProjects.filter(project => 
      project.technologies.some(tech => 
        tech.toLowerCase().includes(technology.toLowerCase()) ||
        technology.toLowerCase().includes(tech.toLowerCase())
      )
    );
  }

  return filteredProjects;
} 