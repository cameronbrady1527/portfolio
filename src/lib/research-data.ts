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
  {
    id: 1,
    title: "Early Detection of Parkinson's Disease Using Voice Analysis and Machine Learning",
    authors: ["Cameron Brady", "Dr. Sarah Chen", "Dr. Michael Rodriguez"],
    abstract: "This study presents a novel approach to early Parkinson's disease detection using voice pattern analysis and machine learning algorithms. Our model achieved 94.9% accuracy in detecting early-stage Parkinson's from voice recordings.",
    journal: "Journal of Medical AI",
    year: 2024,
    doi: "10.1000/example.2024.001",
    area: "neurology",
    featured: true,
    citations: 12,
    impact: "High",
    keywords: ["Parkinson's Disease", "Voice Analysis", "Machine Learning", "Early Detection"],
    content: {
      fullAbstract: "This study presents a novel approach to early Parkinson's disease detection using voice pattern analysis and machine learning algorithms. We collected voice recordings from 500 participants, including 200 with early-stage Parkinson's disease and 300 healthy controls. Our model achieved 94.9% accuracy in detecting early-stage Parkinson's from voice recordings, with 92.3% sensitivity and 96.1% specificity. The system analyzes 15 different voice features including prosodic features, spectral features, and voice quality measures that are known to be affected by Parkinson's disease. This non-invasive screening method could significantly improve early detection rates and enable earlier intervention.",
      methodology: "We employed a multi-stage approach combining traditional signal processing with modern machine learning techniques. Voice recordings were collected using standardized protocols, with participants reading a standardized text passage. Feature extraction focused on prosodic features (pitch, rhythm, stress), spectral features (formant frequencies, spectral centroid), and voice quality measures (jitter, shimmer, harmonics-to-noise ratio). We used ensemble methods combining Random Forest, Support Vector Machine, and Neural Network classifiers, with cross-validation to ensure robust performance.",
      results: [
        "Achieved 94.9% overall accuracy in early detection",
        "92.3% sensitivity and 96.1% specificity",
        "Successfully validated with clinical datasets from three medical centers",
        "Reduced false positive rate by 40% compared to existing methods",
        "Processing time under 30 seconds per recording"
      ],
      conclusions: "Our voice analysis system demonstrates significant potential for early Parkinson's disease detection. The high accuracy and specificity make it suitable for screening applications, while the non-invasive nature makes it highly acceptable to patients. Future work will focus on longitudinal studies and integration with existing clinical workflows."
    }
  },
  {
    id: 2,
    title: "Neural Signal Processing for Brain-Computer Interface Applications",
    authors: ["Cameron Brady", "Dr. Emily Watson"],
    abstract: "Advanced signal processing techniques for neural data analysis in brain-computer interface applications. Includes real-time processing algorithms and feature extraction methods.",
    journal: "IEEE Transactions on Neural Systems",
    year: 2023,
    doi: "10.1000/example.2023.002",
    area: "signal-processing",
    featured: true,
    citations: 8,
    impact: "Medium",
    keywords: ["Brain-Computer Interface", "Signal Processing", "Neural Networks", "Real-time Analysis"],
    content: {
      fullAbstract: "This research explores advanced signal processing techniques for neural data analysis in brain-computer interface (BCI) applications. We developed novel algorithms for real-time processing of neural signals, enabling direct communication between the brain and external devices. Our approach combines traditional signal processing methods with machine learning techniques to achieve robust performance in noisy environments. The system processes over 1000 neural signals with 87.3% classification accuracy and latency under 50ms, making it suitable for real-time BCI applications.",
      methodology: "We implemented a comprehensive signal processing pipeline including noise reduction, feature extraction, and real-time classification. The system uses adaptive filtering techniques to remove artifacts and enhance signal quality. Feature extraction focuses on time-domain and frequency-domain characteristics, while machine learning algorithms provide robust classification. Real-time processing is achieved through optimized algorithms and parallel processing techniques.",
      results: [
        "Processed over 1000 neural signals with 87.3% accuracy",
        "Achieved latency under 50ms for real-time applications",
        "Successfully demonstrated BCI control in laboratory settings",
        "Reduced signal processing time by 60% compared to existing methods",
        "Published findings in top-tier neuroscience journals"
      ],
      conclusions: "Our neural signal processing approach shows significant promise for BCI applications. The combination of robust signal processing with machine learning enables reliable real-time performance. Future work will focus on clinical validation and integration with assistive technology devices."
    }
  },
  {
    id: 3,
    title: "AI-Powered Healthcare Analytics: A Comprehensive Framework",
    authors: ["Cameron Brady", "Dr. James Wilson", "Dr. Lisa Thompson"],
    abstract: "A comprehensive framework for implementing AI-powered analytics in healthcare settings, including data preprocessing, model training, and deployment strategies.",
    journal: "Healthcare Informatics Research",
    year: 2023,
    doi: "10.1000/example.2023.003",
    area: "healthcare",
    featured: false,
    citations: 15,
    impact: "High",
    keywords: ["Healthcare Analytics", "AI Framework", "Data Processing", "Clinical Applications"],
    content: {
      fullAbstract: "This paper presents a comprehensive framework for implementing AI-powered analytics in healthcare settings. The framework addresses the unique challenges of healthcare data, including privacy concerns, data quality issues, and regulatory requirements. We provide detailed guidelines for data preprocessing, model training, validation, and deployment strategies. The framework has been successfully implemented in three healthcare systems, serving over 500 healthcare professionals and processing 2+ million data points with 99.9% uptime.",
      methodology: "Our framework consists of four main components: data preprocessing, model development, validation, and deployment. Data preprocessing includes anonymization, quality checks, and feature engineering. Model development uses ensemble methods and cross-validation. Validation includes clinical testing and regulatory compliance checks. Deployment uses containerized microservices with comprehensive monitoring.",
      results: [
        "Served over 500 healthcare professionals",
        "Processed 2+ million data points with 99.9% uptime",
        "Improved decision-making efficiency by 40%",
        "Reduced data processing time by 70%",
        "Achieved HIPAA compliance throughout the system"
      ],
      conclusions: "The comprehensive framework successfully addresses the challenges of AI implementation in healthcare. The combination of robust data processing, clinical validation, and regulatory compliance makes it suitable for real-world deployment. Future work will focus on expanding to additional healthcare domains."
    }
  },
  {
    id: 4,
    title: "Deep Learning Approaches for Biomedical Data Analysis",
    authors: ["Cameron Brady"],
    abstract: "Exploration of deep learning architectures specifically designed for biomedical data analysis, including convolutional neural networks and recurrent neural networks.",
    journal: "Computational Biology",
    year: 2023,
    doi: "10.1000/example.2023.004",
    area: "ai-ml",
    featured: false,
    citations: 6,
    impact: "Medium",
    keywords: ["Deep Learning", "Biomedical Data", "Neural Networks", "Data Analysis"],
    content: {
      fullAbstract: "This research explores deep learning architectures specifically designed for biomedical data analysis. We investigate the application of convolutional neural networks (CNNs) and recurrent neural networks (RNNs) to various types of biomedical data, including medical images, time-series data, and genomic sequences. Our approach focuses on developing architectures that can handle the unique characteristics of biomedical data, including high dimensionality, noise, and limited training samples.",
      methodology: "We developed custom neural network architectures optimized for biomedical data characteristics. For medical images, we used CNN architectures with attention mechanisms. For time-series data, we employed LSTM and GRU networks. For genomic data, we developed hybrid architectures combining CNN and RNN components. All models were trained using transfer learning and data augmentation techniques.",
      results: [
        "Developed 5 custom neural network architectures",
        "Achieved 15-25% improvement over baseline models",
        "Successfully applied to 3 different biomedical domains",
        "Reduced training time by 40% through optimization",
        "Published code and models as open-source"
      ],
      conclusions: "Custom deep learning architectures show significant promise for biomedical data analysis. The combination of domain-specific design and transfer learning enables robust performance even with limited data. Future work will focus on interpretability and clinical validation."
    }
  },
  {
    id: 5,
    title: "Real-time Neural Data Processing Pipeline",
    authors: ["Cameron Brady", "Dr. Robert Kim"],
    abstract: "Development of a real-time processing pipeline for neural data streams, enabling immediate analysis and response in clinical and research settings.",
    journal: "Neural Engineering",
    year: 2022,
    doi: "10.1000/example.2022.005",
    area: "signal-processing",
    featured: false,
    citations: 10,
    impact: "Medium",
    keywords: ["Real-time Processing", "Neural Data", "Pipeline", "Clinical Applications"],
    content: {
      fullAbstract: "This paper presents the development of a real-time processing pipeline for neural data streams. The pipeline enables immediate analysis and response in clinical and research settings, processing neural signals with minimal latency while maintaining high accuracy. The system has been successfully deployed in laboratory and clinical environments, demonstrating robust performance across different data sources and conditions.",
      methodology: "The pipeline consists of three main stages: data acquisition, real-time processing, and response generation. Data acquisition uses optimized hardware interfaces and buffering strategies. Real-time processing employs parallel algorithms and GPU acceleration. Response generation includes immediate feedback and data logging for later analysis.",
      results: [
        "Achieved processing latency under 10ms",
        "Successfully deployed in 3 clinical environments",
        "Processed 1000+ neural signals in real-time",
        "Maintained 95% accuracy under various conditions",
        "Reduced system complexity by 50%"
      ],
      conclusions: "The real-time neural data processing pipeline successfully addresses the challenges of immediate neural signal analysis. The combination of low latency and high accuracy makes it suitable for clinical applications. Future work will focus on expanding to additional neural signal types and clinical settings."
    }
  }
];

export function getPaperById(id: number): ResearchPaper | undefined {
  return researchPapers.find(paper => paper.id === id);
}

export function getPapersByArea(area: string): ResearchPaper[] {
  if (area === "all") return researchPapers;
  return researchPapers.filter(paper => paper.area === area);
} 