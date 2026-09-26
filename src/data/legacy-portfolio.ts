export const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

export const roles = ['Full Stack Developer', 'AI Engineer', 'Cloud Enthusiast']

export const skillTabs = {
  Languages: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'C++', 'Bash'],
  Technologies: ['React', 'Next.js', 'Node.js', 'FastAPI', 'MERN', 'PERN'],
  Tools: ['Git', 'Docker', 'AWS', 'Postman', 'Linux', 'Figma'],
} as const

export const projects = [
  {
    title: 'ReviewBot',
    stack: 'MERN + FastAPI + Ollama',
    desc: 'An AI-assisted review intelligence platform for extracting actionable feedback from product and service reviews.',
  },
  {
    title: 'Osmania Scraper',
    stack: 'Flask',
    desc: 'A robust academic data scraper and parser for Osmania University records and result workflows.',
  },
  {
    title: 'Mock Interview System',
    stack: 'PERN + AI',
    desc: 'An interview simulation platform with AI-driven question adaptation and structured feedback loops.',
  },
  {
    title: 'Breast Cancer Detection',
    stack: 'PyTorch + TensorFlow + MERN',
    desc: 'A full-stack diagnostic support solution integrating deep learning models for image-based breast cancer detection.',
  },
]

export const achievements = [
  'Finalist HackXcelerate (Microsoft@CBIT)',
  'Winner Internal Hackathon (KMIT)',
  'Winner Code Purple (IEEE@MJ College)',
  'OSS contributor (AI malware detection tool)',
]
