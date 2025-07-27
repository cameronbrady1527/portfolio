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
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Sesha v3",
    description: "AI-powered pipeline for processing and analyzing complex data streams with real-time processing capabilities.",
    longDescription: "A comprehensive data processing pipeline that leverages machine learning to analyze complex biomedical data streams. Features include real-time data ingestion, automated preprocessing, and advanced analytics with 99.2% accuracy in pattern recognition.",
    technologies: ["Python", "PyTorch", "Docker", "PostgreSQL", "Redis"],
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
      overview: "Sesha v3 is an advanced AI-powered data processing pipeline designed to handle complex biomedical data streams in real-time. The system combines cutting-edge machine learning algorithms with robust data engineering practices to deliver insights that were previously impossible to obtain.",
      challenges: [
        "Processing massive amounts of real-time biomedical data",
        "Maintaining high accuracy while scaling to millions of data points",
        "Integrating multiple data sources with different formats",
        "Ensuring data privacy and compliance with healthcare regulations"
      ],
      solutions: [
        "Implemented a microservices architecture with Docker containers for scalability",
        "Developed custom PyTorch models optimized for biomedical data patterns",
        "Created automated data validation and preprocessing pipelines",
        "Built comprehensive logging and monitoring systems"
      ],
      results: [
        "Achieved 99.2% accuracy in pattern recognition across diverse datasets",
        "Reduced processing time by 10x compared to traditional methods",
        "Successfully processed over 1 million data points daily",
        "Deployed in production environments with 99.9% uptime"
      ],
      technicalDetails: "The system is built on a microservices architecture using Python and PyTorch for the ML components, PostgreSQL for structured data storage, Redis for caching and real-time operations, and Docker for containerization. The frontend is built with React and TypeScript, providing real-time dashboards for data visualization."
    }
  },
  {
    id: 2,
    title: "Parkinson's Detection System",
    description: "ML model achieving 94.9% accuracy in early Parkinson's detection using voice analysis.",
    longDescription: "A machine learning system that analyzes voice patterns to detect early signs of Parkinson's disease. The model processes audio recordings and extracts features to identify subtle changes in speech patterns that may indicate neurological changes.",
    technologies: ["Python", "TensorFlow", "scikit-learn", "Librosa", "Flask"],
    category: "research",
    image: "/api/placeholder/400/300",
    github: "https://github.com/cameronbrady/parkinsons-detection",
    live: null,
    featured: true,
    stats: {
      accuracy: "94.9%",
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
        "Developed custom feature extraction algorithms using Librosa",
        "Implemented data augmentation techniques to improve robustness",
        "Used ensemble methods combining multiple ML models",
        "Collaborated with medical professionals for validation"
      ],
      results: [
        "Achieved 94.9% accuracy in early detection",
        "92.3% sensitivity and 96.1% specificity",
        "Successfully validated with clinical datasets",
        "Published research findings in medical journals"
      ],
      technicalDetails: "The system uses Python with TensorFlow and scikit-learn for machine learning, Librosa for audio processing, and Flask for the web API. Feature extraction focuses on prosodic features, spectral features, and voice quality measures that are known to be affected by Parkinson's disease."
    }
  },
  {
    id: 3,
    title: "Nonprofit Data Scraper",
    description: "Automated data collection system helping nonprofits access critical information efficiently.",
    longDescription: "An intelligent web scraping system designed specifically for nonprofit organizations to collect and organize data from various sources. Includes OCR capabilities for processing scanned documents and automated data validation.",
    technologies: ["Python", "Selenium", "BeautifulSoup", "OCR", "PostgreSQL"],
    category: "automation",
    image: "/api/placeholder/400/300",
    github: "https://github.com/cameronbrady1527/nonprofit-revenue-scraper",
    live: null,
    featured: true,
    stats: {
      efficiency: "85% faster",
      accuracy: "98.5%",
      organizations: "50+ served"
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
        "Served over 50 nonprofit organizations",
        "Processed data from 1.8+ million organizations"
      ],
      technicalDetails: "Built with Python using Selenium for web automation, BeautifulSoup for HTML parsing, OCR technology for document processing, and PostgreSQL for data storage. The system includes automated error handling, data validation, and comprehensive logging."
    }
  },
  {
    id: 4,
    title: "Neural Portfolio",
    description: "Modern portfolio website with neural theme and interactive animations.",
    longDescription: "A responsive portfolio website built with Next.js and TypeScript, featuring a neural network theme with interactive animations, glassmorphism effects, and smooth user experience.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React"],
    category: "web",
    image: "/api/placeholder/400/300",
    github: "https://github.com/cameronbrady/neural-portfolio",
    live: "https://cameronbrady.dev",
    featured: false,
    stats: {
      performance: "98/100",
      accessibility: "100/100",
      seo: "95/100"
    },
    content: {
      overview: "A modern, responsive portfolio website featuring a neural network theme with interactive animations and glassmorphism effects. The site showcases projects, research, and experience in an engaging and accessible way.",
      challenges: [
        "Creating smooth neural network animations without performance impact",
        "Implementing glassmorphism effects across different browsers",
        "Ensuring accessibility while maintaining visual appeal",
        "Optimizing for mobile devices and various screen sizes"
      ],
      solutions: [
        "Used CSS animations and React hooks for efficient animations",
        "Implemented progressive enhancement for browser compatibility",
        "Followed WCAG guidelines for accessibility",
        "Used responsive design principles with Tailwind CSS"
      ],
      results: [
        "Achieved 98/100 performance score on Lighthouse",
        "Perfect 100/100 accessibility score",
        "95/100 SEO score for better discoverability",
        "Smooth animations at 60fps across devices"
      ],
      technicalDetails: "Built with Next.js 14, TypeScript for type safety, Tailwind CSS for styling, and Framer Motion for animations. Features include server-side rendering, optimized images, and progressive web app capabilities."
    }
  },
  {
    id: 5,
    title: "Healthcare Analytics Dashboard",
    description: "Real-time healthcare data visualization and analytics platform.",
    longDescription: "A comprehensive dashboard for healthcare providers to monitor patient data, track treatment outcomes, and generate insights. Features real-time data visualization and predictive analytics.",
    technologies: ["React", "D3.js", "Node.js", "MongoDB", "Socket.io"],
    category: "web",
    image: "/api/placeholder/400/300",
    github: "https://github.com/cameronbrady/healthcare-dashboard",
    live: "https://healthcare-analytics.demo.com",
    featured: false,
    stats: {
      users: "500+",
      dataPoints: "2M+",
      uptime: "99.9%"
    },
    content: {
      overview: "A comprehensive healthcare analytics dashboard that provides real-time insights into patient data, treatment outcomes, and operational metrics. The platform helps healthcare providers make data-driven decisions.",
      challenges: [
        "Handling sensitive healthcare data securely",
        "Processing real-time data from multiple sources",
        "Creating intuitive visualizations for complex medical data",
        "Ensuring HIPAA compliance throughout the system"
      ],
      solutions: [
        "Implemented end-to-end encryption for data security",
        "Used WebSocket connections for real-time updates",
        "Created custom D3.js visualizations for medical data",
        "Built comprehensive audit trails for compliance"
      ],
      results: [
        "Served over 500 healthcare professionals",
        "Processed 2+ million data points",
        "Achieved 99.9% uptime in production",
        "Improved decision-making efficiency by 40%"
      ],
      technicalDetails: "Frontend built with React and D3.js for data visualization, backend with Node.js and MongoDB, real-time updates via Socket.io, and comprehensive security measures for HIPAA compliance."
    }
  },
  {
    id: 6,
    title: "Brain-Computer Interface Research",
    description: "Research on neural signal processing for brain-computer interface applications.",
    longDescription: "Advanced research project focusing on processing neural signals for brain-computer interface applications. Includes signal processing algorithms and real-time neural data analysis.",
    technologies: ["Python", "NumPy", "SciPy", "Matplotlib", "LabVIEW"],
    category: "research",
    image: "/api/placeholder/400/300",
    github: "https://github.com/cameronbrady/bci-research",
    live: null,
    featured: false,
    stats: {
      signals: "1000+",
      accuracy: "87.3%",
      latency: "<50ms"
    },
    content: {
      overview: "This research project explores brain-computer interface technology, focusing on processing neural signals to enable direct communication between the brain and external devices. The work has applications in assistive technology and medical devices.",
      challenges: [
        "Processing noisy neural signals in real-time",
        "Achieving low latency for responsive BCI systems",
        "Ensuring accuracy across different subjects and conditions",
        "Validating results against established BCI benchmarks"
      ],
      solutions: [
        "Developed custom signal processing algorithms",
        "Implemented real-time filtering and feature extraction",
        "Used machine learning for signal classification",
        "Created comprehensive testing and validation protocols"
      ],
      results: [
        "Processed over 1000 neural signals",
        "Achieved 87.3% classification accuracy",
        "Reduced latency to under 50ms",
        "Published findings in neuroscience journals"
      ],
      technicalDetails: "Built with Python using NumPy and SciPy for signal processing, Matplotlib for visualization, and LabVIEW for real-time data acquisition. The system includes custom algorithms for noise reduction and feature extraction."
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