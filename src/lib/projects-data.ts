import { Project } from "@/types/data-types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Sesha v3",
    description: "AI-powered article generation platform that aggregates and processes multiple sources to produce structured articles with customizable presets and export capabilities.",
    longDescription: "AI-powered article generation platform that aggregates and transforms source materials into professional articles through well-crafted, multi-step AI pipelines. Features intelligent source attribution and weaving, reliable plagiarism handling, rich text content styling, enterprise multi-tenant architecture with usage analytics, comprehensive export capabilities (PDF/DOCX/email), and real-time processing with live status updates in a modern dashboard.",
    technologies: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Drizzle ORM", "Supabase", "Anthropic Claude 3.5 Sonnet", "OpenAI GPT 4o", "Tailwind CSS", "Lexical", "Shadcn"],
    category: "ai-ml",
    image: "/seshalogowithtext.svg",
    github: "https://github.com/cameronbrady1527/sesha-v3",
    live: "https://sesha-v3.vercel.app/",
    featured: true,
    date: "2025",
    stats: {
      "Article Generation": "5 minutes",
      "Plagiarism Allowed": "0%",
      "Source Verified": "100%",
      "Source Attribution": "Every Line"
    },
    content: {
      overview: "Sesha v3 is an AI-powered content generation platform that transforms source materials into professional articles through multi-step, well-crafted prompt engineered AI pipelines. The system combines cutting-edge large-language models (LLM) with robust content processing to deliver high-quality, well-sourced articles.",
      challenges: [
        "Processing and analyzing diverse source materials (raw text content, article links)",
        "Maintaining high accuracy while generating content",
        "Avoiding plagiarism while maintaining accuracy",
        "Integrating multiple AI models for different tasks",
        "Ensuring proper source attribution and weaving"
      ],
      solutions: [
        "Implemented multi-step AI pipeline with different models for different tasks",
        "Developed intelligent source attribution and weaving algorithms",
        "Supplemented article creation pipelines with plagiarism checks and handling",
        "Created enterprise multi-tenant architecture with usage analytics",
        "Built comprehensive export capabilities (pdf, docx, email)"
      ],
      results: [
        "Achieved 5 minute article generation from up to 6 sources, significantly reducing time until first draft creation",
        "Successfully mimicked professional formatting and organization management for newsroom integration",
        "Optimized performance with support for parallel article generation",
        "Maintains high journalism standards with zero tolerance for plagiarism and ensuring every line is source referenced"
      ],
      technicalDetails: "Built with Next.js 15 and React 19 for the frontend, TypeScript for type safety, PostgreSQL with Drizzle ORM for data storage, Supabase for backend services, and integrated with Anthropic Claude 3.5 Sonnet and OpenAI GPT 4o for AI processing. Features real-time processing with live status updates and comprehensive export capabilities."
    }
  },
  {
    id: 2,
    title: "Astral Aggregator",
    description: "A news source aggregator that detects and reports changes to particular website sitemaps.",
    longDescription: "A comprehensive web content discovery and monitoring system that automatically discovers, processes, and tracks URLs from various websites using multiple detection methods including sitemaps, AI-powered analysis, and intelligent crawling.",
    technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Seaborn", "Jupyter", "FastAPI", "Railway"],
    category: "research",
    // image: "/web-crawler.png",
    image: "",
    github: "https://github.com/cameronbrady1527/astral-aggregator-v2",
    live: null,
    featured: true,
    date: "2025",
    stats: {
      "Content Discovery": "100,000+ per site",
      "Sites Supported": "Unlimited & Any",
      "Pagination Support": "6000+ pages",
      "Resolved URL Removal": "95%",
    },
    content: {
      overview: "The URL Aggregator is designed to solve the challenge of discovering and monitoring content across websites, notably news sources, that may not have comprehensive sitemaps, may not immediately update their sitemaps, or may have content spread across multiple pages that go undetected by sitemap and page crawlers. It combines traditional web crawling techniques (using our own sitemap crawler and Firecrawl's /map and /crawl methods) with LLM-powered analysis to identify the most valuable content discovery hubs on any website. These content discovery hubs are crawled frequently to detect changes to content based on computed baselines. It looks for new or deleted pages and updated content on a page.",
      challenges: [
        "Discovering comprehensive content across websites with limited or no sitemaps",
        "Handling massive pagination systems with thousands of pages efficiently",
        "Eliminating duplicate URLs across multiple discovery methods",
        "Identifying the most valuable content discovery hubs from large URL sets",
        "Managing memory and performance when processing sites with 10,000+ URLs",
        "Ensuring respectful web crawling with proper rate limiting and concurrency control"
      ],
      solutions: [
        "Implemented multi-source discovery combining sitemaps, Firecrawl mapping, and intelligent crawling",
        "Developed intelligent pagination detection with multiple strategies and configurable batch processing",
        "Created advanced URL deduplication with normalization, resolution, and cross-method duplicate elimination",
        "Built AI-powered analysis pipeline using OpenAI GPT-5 with well-engineered prompts to identify content discovery hubs",
        "Designed asynchronous architecture with configurable batch sizes and memory management",
        "Implemented sophisticated rate limiting with concurrent batch processing and respectful crawling policies"
      ],
      results: [
        "Achieved comprehensive content discovery with 2,000-100,000+ URLs per site",
        "Successfully processed paginated sites with up to 6000+ pages while maintaining performance",
        "Eliminated 95%+ duplicate URLs through intelligent deduplication algorithms",
        "Identified top 5 content discovery hubs with 90%+ accuracy using AI analysis",
        "Reduced memory usage by 60% through intelligent batching and async processing",
        "Maintained 2-5x processing speed improvement with pagination support enabled"
      ],
      technicalDetails: `Built with Python using FastAPI for the RESTful API backend, OpenAI GPT-5 for AI-powered URL analysis and content discovery, 
              Firecrawl SDK for intelligent web crawling and site mapping, Pydantic for robust data validation and serialization, and asynchronous 
              HTTP processing with aiohttp and httpx for high-performance web scraping. The system features intelligent pagination detection with multiple crawling strategies, 
              advanced URL deduplication algorithms, comprehensive content extraction capabilities, and flexible export options including JSON and Excel formats. 
              Core architecture includes a modular service layer with intelligent orchestration, AI-powered content discovery hubs identification, and sophisticated 
              pagination handling that can process sites with hundrededs of thousands of pages while maintaining respectful rate limiting and memory management.`
    }
  },
  {
    id: 3,
    title: "Parkinson's Disease Detection",
    description: "Advanced machine learning framework for Parkinson's disease identification utilizing vocal biomarkers with streamlined data processing.",
    longDescription: "Advanced machine learning framework for Parkinson's disease identification utilizing vocal biomarkers with streamlined data processing, automated model development, and comprehensive performance assessment. Achieves 94.9% precision through intelligent feature selection leveraging Random Forest importance metrics.",
    technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Seaborn", "Jupyter", "FastAPI", "Railway"],
    category: "research",
    image: "",
    github: "https://github.com/cameronbrady1527/parkinsons-detection",
    live: null,
    featured: true,
    date: "2024-2025",
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
    id: 4,
    title: "Nonprofit Data Scraper",
    description: "Scraper for nonprofit revenue and executive compensation data for a selected state with smart data collection algorithms.",
    longDescription: "Scraper for nonprofit revenue and executive compensation data for a selected state. Features smart data collection algorithms, scanned 990 IRS form parsing, and beautiful business-ready spreadsheet reporting. Processes financial records from over 1.8 million American 501(c)3 organizations.",
    technologies: ["Python", "API Interaction", "OCR Image-PDF Parsing", "Pandas", "Excel"],
    category: "automation",
    image: "",
    github: "https://github.com/cameronbrady1527/nonprofit-revenue-scraper",
    live: null,
    featured: true,
    date: "2025",
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
    id: 5,
    title: "Documentation Scraper",
    description: "Python toolkit designed for AI-workflow productivity startup Astral AI that extracts and organizes web documentation into well-formatted markdown files.",
    longDescription: "A Python toolkit, designed for AI-workflow productivity startup Astral AI, that extracts and organizes web documentation into well-formatted markdown files using the Firecrawl SDK. Features crawler and scraper functionality, well-formatted markdown files for efficient user and machine learning/LLM parsing, and navigable index generation for extracted documents.",
    technologies: ["Python", "Firecrawl SDK"],
    category: "automation",
    // image: "/file.svg",
    image: "",
    github: "https://github.com/cameronbrady1527/documentation-scraper",
    live: null,
    featured: false,
    date: "2025",
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
    title: "Vocab Flashcards",
    description: "A flashcard website designed to optimally help users learn vocabulary words with individual word performance statistics.",
    longDescription: "A flashcard website designed to optimally help a user learn vocab words and to help me study for the GRE. Features offline use after initial data import, individual word performance statistics, beautiful and simple interface, and export progress to Excel or CSV.",
    technologies: ["JavaScript", "HTML/CSS", "Excel/CSV", "SheetJS", "PapaParse"],
    category: "web",
    image: "",
    github: "https://github.com/cameronbrady1527/learn-vocab-v1",
    live: "https://flashcards-demo.com",
    featured: false,
    date: "2025",
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
  },
  {
    id: 7,
    title: "McDiver Graph Challenge",
    description: "Graph algorithms implementation for maze navigation using Dijkstra's shortest path and optimized DFS/BFS traversal strategies.",
    longDescription: "Graph algorithms implementation for maze navigation using Dijkstra's shortest path and optimized DFS/BFS traversal strategies. Features pathfinding optimization, thread synchronization, and performance tuning for efficient maze solving.",
    technologies: ["Java", "Graph Theory", "Concurrent Programming"],
    category: "algorithms",
    image: "",
    github: "https://github.com/cameronbrady1527/mcdiver-graph-navigation",
    live: null,
    featured: false,
    date: "2023",
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
    id: 8,
    title: "Portfolio Website",
    description: "Modern, responsive portfolio website built with Next.js featuring neural network animations, glass morphism design, and dynamic project showcases.",
    longDescription: "A sophisticated portfolio website showcasing technical projects and research with cutting-edge web technologies. Features neural network background animations, glass morphism UI components, dynamic project filtering, and responsive design optimized for all devices. Built with modern React patterns and TypeScript for maintainability.",
    technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Canvas API", "CSS Grid", "Responsive Design"],
    category: "web",
    // image: "/globe.svg",
    image: "",
    github: "https://github.com/cameronbrady1527/portfolio",
    live: "https://cameronbrady.dev",
    featured: true,
    date: "2025",
    stats: {
      "Performance Score": "95+",
      "Accessibility": "100%",
      "SEO Score": "95+",
      "Mobile Responsive": "100%"
    },
    content: {
      overview: "A modern portfolio website that demonstrates both technical skills and design aesthetic. The site features an interactive neural network background animation, glass morphism UI components, and a comprehensive project showcase system with advanced filtering capabilities.",
      challenges: [
        "Creating smooth neural network animations without performance impact",
        "Implementing glass morphism effects across different browsers",
        "Building responsive design that works on all device sizes",
        "Optimizing animations for smooth 60fps performance",
        "Creating an intuitive project filtering and search system"
      ],
      solutions: [
        "Developed custom neural network animation using Canvas API with optimized rendering",
        "Implemented CSS-based glass morphism with fallbacks for older browsers",
        "Used CSS Grid and Flexbox for responsive layouts with mobile-first approach",
        "Created performance-optimized animation loops with requestAnimationFrame",
        "Built dynamic filtering system with real-time search and category selection"
      ],
      results: [
        "Achieved 95+ performance score on Lighthouse with optimized animations",
        "Created 100% accessible interface following WCAG guidelines",
        "Implemented responsive design that works seamlessly across all devices",
        "Built intuitive project showcase with advanced filtering capabilities",
        "Developed reusable component library for future projects"
      ],
      technicalDetails: "Built with Next.js 15 and React 19 for optimal performance and modern React patterns, TypeScript for type safety and maintainability, Tailwind CSS for utility-first styling, and custom Canvas API animations for the neural network background. Features glass morphism UI components, responsive design with CSS Grid, and dynamic project filtering with real-time search capabilities."
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