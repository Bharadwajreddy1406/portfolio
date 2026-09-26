export const sectionItems = [
  { id: 'landing', label: 'Landing', index: '01' },
  { id: 'about', label: 'About', index: '02' },
  { id: 'internship', label: 'Internship', index: '03' },
  { id: 'skills', label: 'Skills', index: '04' },
  { id: 'projects', label: 'Projects', index: '05' },
  { id: 'achievements', label: 'Achievements', index: '06' },
  { id: 'contact', label: 'Contact', index: '07' },
] as const;

export const radarAxes = [
  { label: 'Python', value: 92 },
  { label: 'JavaScript', value: 88 },
  { label: 'TypeScript', value: 84 },
  { label: 'React/Next', value: 89 },
  { label: 'Cloud', value: 78 },
  { label: 'AI/ML', value: 90 },
];

export const projects = [
  {
    name: 'Vasudev-GPT',
    tag: 'AI · Spiritual',
    date: '2025',
    description: 'A mindful digital companion inspired by timeless wisdom, providing clarity and grounding through conversational AI.',
    tech: ['Next.js', 'LLM', 'Tailwind'],
    image: '/vasudev-gpt.png',
    fallback: '/vasudev-gpt.png',
    secondaryImage: '/vasudev 2.png',
    large: true,
    githubUrl: 'https://github.com/Bharadwajreddy1406/Vasudev-GPT',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  },
  {
    name: 'ReviewBot',
    tag: 'AI · NLP',
    date: '2025',
    description: 'MERN plus FastAPI with Ollama-driven summarization and classification for unstructured customer feedback.',
    tech: ['MERN', 'FastAPI', 'Ollama'],
    image: '/rbot.png',
    fallback: '/rbot.png',
    large: false,
    githubUrl: 'https://github.com/Bharadwajreddy1406/ReviewBot',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  },
  {
    name: 'Breast Cancer Detection',
    tag: 'Healthcare · CV',
    date: '2024',
    description: 'Diagnosis flow combining Vision Transformers (ViT) with a MERN delivery layer for evaluation and reporting.',
    tech: ['ViT', 'PyTorch', 'MERN'],
    image: '/breast-cancer.png',
    fallback: '/breast-cancer.png',
    large: false,
    githubUrl: 'https://github.com/Bharadwajreddy1406/Classification-and-Segmentation-of-breast-cancer-tumor-using-vision-transformer',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  },
  {
    name: 'Mock Interview System',
    tag: 'AI · Voice',
    date: '2025',
    description: 'A comprehensive PERN-based interview platform leveraging AI-driven prompt generation and intelligent scoring mechanisms to simulate authentic technical interviews. Features adaptive difficulty progression, real-time feedback loops, detailed performance analytics, multi-language code support, and mock interviewer voice interactions. Engineered for coding preparation with question banks covering algorithms, system design, behavioral patterns, and domain-specific technical depth. Includes resume parsing, interview history tracking, and personalized improvement recommendations powered by PostgreSQL backend and Express API layers.',
    tech: ['PERN', 'AI', 'PostgreSQL'],
    image: '/mock_interview_logo.png',
    fallback: '/mock_interview_logo.png',
    large: true,
    githubUrl: 'https://github.com/Bharadwajreddy1406/sksage',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  },
  {
    name: 'Osmania Scraper',
    tag: 'Data · Automation',
    date: '2024',
    description: 'Flask-powered data extraction and normalization pipeline for Osmania portals with resilient retry logic.',
    tech: ['Flask', 'Python', 'Automation'],
    image: '/osmania.png',
    fallback: '/osmania.png',
    large: false,
    githubUrl: 'https://github.com/Bharadwajreddy1406/OU-results',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  },
  {
    name: 'LC-NET',
    tag: 'Network · Real-time',
    date: '2024',
    description: 'Lightweight local network chat platform for instant messaging and team collaboration without internet.',
    tech: ['Node.js', 'Socket.IO', 'Express'],
    image: '/LC net.png',
    fallback: '/LC net.png',
    large: false,
    githubUrl: 'https://github.com/Bharadwajreddy1406/LC-NET',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  },
  {
    name: 'Git-MCP',
    tag: 'DevTools · Git',
    date: '2025',
    description: 'Model Context Protocol server for Git integration, enabling LLMs to interact with repositories directly.',
    tech: ['MCP', 'Git', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400',
    large: false,
    githubUrl: 'https://github.com/Bharadwajreddy1406/Git-MCP',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  },
  {
    name: 'YT Shorts Blocker',
    tag: 'Extension · Privacy',
    date: '2024',
    description: 'Browser extension that completely removes YouTube Shorts from feeds and redirects direct links to home.',
    tech: ['JavaScript', 'DOM API', 'Manifest V3'],
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=400',
    large: false,
    githubUrl: 'https://github.com/Bharadwajreddy1406/YT_shorts-blocker',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  },
  {
    name: 'Raw URL Maker',
    tag: 'Utility · Web',
    date: '2024',
    description: 'Web tool to quickly generate raw.githubusercontent.com links by entering repository details.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400',
    large: false,
    githubUrl: 'https://github.com/Bharadwajreddy1406/Github-Raw_userContent_URL_maker',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  }
];
