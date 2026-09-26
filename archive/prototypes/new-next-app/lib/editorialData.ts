export const sectionItems = [
  { id: 'landing', label: 'Landing', index: '01' },
  { id: 'about', label: 'About', index: '02' },
  { id: 'internship', label: 'Internship', index: '03' },
  { id: 'skills', label: 'Skills', index: '04' },
  { id: 'projects', label: 'Projects', index: '05' },
  { id: 'achievements', label: 'Achievements', index: '06' },
  { id: 'contact', label: 'Contact', index: '07' },
] as const

export const radarAxes = [
  { label: 'Python', value: 92 },
  { label: 'JavaScript', value: 88 },
  { label: 'TypeScript', value: 84 },
  { label: 'React/Next', value: 89 },
  { label: 'Cloud', value: 78 },
  { label: 'AI/ML', value: 90 },
]

export const projects = [
  {
    name: 'ReviewBot',
    tag: 'AI · NLP',
    date: '2025',
    description:
      'MERN plus FastAPI with Ollama-driven summarization and classification, built to transform unstructured customer feedback into actionable product insight.',
    tech: ['MERN', 'FastAPI', 'Ollama'],
    image: 'https://undraw.co/api/illustrations/undraw_chatting_re_j55r.svg',
    fallback: 'https://source.unsplash.com/800x600/?ai,chat',
    large: true,
  },
  {
    name: 'Osmania Scraper',
    tag: 'Data · Automation',
    date: '2024',
    description: 'Flask-powered data extraction and normalization pipeline for Osmania portals with resilient retry logic.',
    tech: ['Flask', 'Python', 'Automation'],
    image: 'https://undraw.co/api/illustrations/undraw_web_scraper_re_90jv.svg',
    fallback: 'https://source.unsplash.com/800x600/?scraper,code',
    large: false,
  },
  {
    name: 'Mock Interview System',
    tag: 'AI · Voice',
    date: '2025',
    description: 'PERN interview simulator with adaptive prompts and scoring loops for realistic practice and measurable improvement.',
    tech: ['PERN', 'AI', 'PostgreSQL'],
    image: 'https://undraw.co/api/illustrations/undraw_interview_re_e5jn.svg',
    fallback: 'https://source.unsplash.com/800x600/?interview,technology',
    large: false,
  },
  {
    name: 'Breast Cancer Detection',
    tag: 'Healthcare · CV',
    date: '2024',
    description:
      'Integrated deep-learning diagnosis flow combining PyTorch and TensorFlow models with a MERN delivery layer for evaluation and reporting.',
    tech: ['PyTorch', 'TensorFlow', 'MERN'],
    image: 'https://undraw.co/api/illustrations/undraw_medical_research_qg4d.svg',
    fallback: 'https://source.unsplash.com/1200x600/?medical,technology',
    large: true,
  },
]
