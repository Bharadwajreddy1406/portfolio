export const sectionItems = [
  { id: 'landing', label: 'Landing', index: '01' },
  { id: 'about', label: 'About', index: '02' },
  { id: 'education', label: 'Education', index: '03' },
  { id: 'internship', label: 'Internship', index: '04' },
  { id: 'skills', label: 'Skills', index: '05' },
  { id: 'projects', label: 'Projects', index: '06' },
  { id: 'blogs', label: 'Writing', index: '07' },
  { id: 'contact', label: 'Contact', index: '08' },
] as const;

export const radarAxes = [
  { label: 'Python', value: 95 },
  { label: 'AI Agents', value: 94 },
  { label: 'AWS Agent Core', value: 93 },
  { label: 'TypeScript', value: 76 },
  { label: 'Go', value: 72 },
  { label: 'Django', value: 74 },
  { label: 'PostgreSQL', value: 94 },
];

export const technicalSkillGroups = [
  {
    label: 'Programming Languages',
    skills: ['Python', 'TypeScript', 'Go'],
  },
  {
    label: 'Web Technologies',
    skills: ['React.js', 'Django', 'Django REST Framework', 'FastAPI', 'Flask', 'Node.js', 'REST APIs'],
  },
  {
    label: 'AI & LLM Tooling',
    skills: ['OpenAI Agents SDK', 'RAG', 'Multi-Agent Orchestration', 'Vector Databases'],
  },
  {
    label: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL'],
  },
  {
    label: 'Cloud & DevOps',
    skills: ['AWS (EC2, EBS, VPC)', 'Docker', 'Kubernetes', 'Helm', 'GitHub Actions', 'Git'],
  },
] as const;

export const publications = [
  {
    label: 'IEEE publication',
    url: 'https://ieeexplore.ieee.org/document/11364629/authors#authors',
  },
] as const;

export const education = {
  institution: 'Keshav Memorial Institute of Technology',
  degree: 'Bachelor of Technology in Computer Science, specialized in AI/ML',
  period: '2022 - 2026',
  location: 'Hyderabad, Telangana',
  cgpa: '8.74',
} as const;

export const academicAchievements = [
  { name: 'Finalist – HackXcelerate (2023)', org: 'Microsoft x Byte-XL @CBIT' },
  { name: 'Winner – Prakalp Hackathon (2023)', org: 'Prakalp Hackathon KMIT' },
  { name: 'Winner – Code Purple (2024)', org: 'IEEE @MJCET' },
] as const;

export const projects = [
  {
    name: 'Vasudev-GPT',
    tag: 'AI · Spiritual Companion · Personalized',
    date: '2025',
    description: 'A mindful digital companion inspired by timeless wisdom, providing clarity and grounding through conversational AI.',
    tech: ['Next.js', 'OpenAI', 'Tailwind','MongoDB'],
    image: '/vasudev-gpt.png',
    fallback: '/vasudev-gpt.png',
    secondaryImage: '/vasudev 2.png',
    large: true,
    githubUrl: 'https://github.com/Bharadwajreddy1406/Vasudev-GPT',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  },
  {
    name: 'ReviewBot',
    tag: 'AI · NLP · RAG · MERN Stack',
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
    name: 'Breast Cancer Detection & Segmentation',
    tag: 'Healthcare · Vision Transformer · Image Segmentation',
    date: '2024',
    description: 'Classifies BUSI ultrasound images with a Vision Transformer and segments tumor regions with UNetR, integrated into a MERN application for real-time evaluation.',
    tech: ['ViT', 'UNetR', 'PyTorch', 'Tensorflow', 'MERN'],
    image: '/breast-cancer.png',
    fallback: '/breast-cancer.png',
    large: false,
    githubUrl: 'https://github.com/Bharadwajreddy1406/Classification-and-Segmentation-of-breast-cancer-tumor-using-vision-transformer',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  },
  {
    name: 'Skill Sage - A Mock Interviewing Platform',
    tag: 'AI · Voice-Based · Student Evaluation & Training Platform',
    date: '2025',
    description: 'Full-stack AI-powered interview platform used by 150+ students across multiple colleges, featuring resume-aware text and voice interviews, AI-generated questions, personalized performance evaluations and improvement plans, centralized multi-college admin management, real-time LG webOS monitoring, and a Dockerized architecture handling 200 requests per second, with a planned AWS EKS deployment.',
    tech: ['PERN Stack', 'OpenAI', 'AWS s3'],
    image: '/mock_interview_logo.png',
    fallback: '/mock_interview_logo.png',
    large: true,
    githubUrl: 'https://github.com/Bharadwajreddy1406/sksage',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  },
  {
    name: 'LG webOS Dashboard system',
    tag: 'LG WebOS · Real-time · WebSockets',
    date: '2024',
    description: 'Central administration system requested by KMIT faculty for assigning and pushing content to multiple LG webOS TVs over WebSockets. Tested on a live LG TV cluster and with up to 40 concurrent device simulators.',
    tech: ['React', 'WebSockets', 'LG webOS', 'Node.js'],
    image: 'https://opengraph.githubassets.com/portfolio/Bharadwajreddy1406/LG-WebOS-skillsage',
    fallback: '/mockInterview.png',
    large: false,
    githubUrl: 'https://github.com/Bharadwajreddy1406/LG-WebOS-skillsage',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  },
  {
    name: 'Osmania Student Results Scraper',
    tag: 'Data Scraping · Automation · Multi-threading',
    date: '2024',
    description: 'Flask-powered data extraction and normalization pipeline for Osmania portals with resilient retry logic.',
    tech: ['Flask', 'Python', 'Pandas'],
    image: '/osmania.png',
    fallback: '/osmania.png',
    large: false,
    githubUrl: 'https://github.com/Bharadwajreddy1406/OU-results',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  },
  {
    name: 'LC-NET',
    tag: 'Network · Real-time Communication · WebSockets',
    date: '2024',
    description: 'Lightweight local network chat platform for instant messaging and team collaboration without internet.',
    tech: ['Node.js', 'Socket.IO', 'Express', 'HTML'],
    image: '/LC net.png',
    fallback: '/LC net.png',
    large: false,
    githubUrl: 'https://github.com/Bharadwajreddy1406/LC-NET',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  },
  {
    name: 'Manim Video Workspace',
    tag: 'Developer tools · Video Generator · Manim',
    date: '2026',
    description: 'Structured workspace for mathematical and technical explainers, taking each video from narration script and storyboard to Manim scene, voiceover-synchronized animation, subtitles, and multi-resolution exports.',
    tech: ['Python', 'Manim', 'Manim-Voiceover', 'FFmpeg'],
    image: '/manim.png',
    fallback: '/github-logo.png',
    large: false,
    githubUrl: 'https://github.com/Bharadwajreddy1406/Manim-Video-Generator',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  },
  {
    name: 'Web Terminal',
    tag: 'DevTools · Remote server access · WebSockets',
    date: '2025',
    description: 'Lightweight browser terminal for controlled server and local-network sharing. An Express and WebSocket server bridges browser commands to a spawned host shell and streams output back in real time.',
    tech: ['Node.js', 'Express', 'WebSockets', 'Shell'],
    image: '/web-terminal.png',
    fallback: '/web-terminal.png',
    large: false,
    githubUrl: 'https://github.com/Bharadwajreddy1406/web-terminal',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  },
  {
    name: 'Git-MCP',
    tag: 'DevTools · Git · MCP',
    date: '2025',
    description: 'Model Context Protocol server for Git integration, enabling LLMs to interact with repositories directly.',
    tech: ['MCP', 'Git', 'TypeScript'],
    image: '/gitmcp.png',
    fallback: '/gitmcp.png',
    large: false,
    githubUrl: 'https://github.com/Bharadwajreddy1406/Git-MCP',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  },
  {
    name: 'YT Shorts Blocker',
    tag: 'Browser Extension · Content Filtering',
    date: '2024',
    description: 'Browser extension that completely removes YouTube Shorts from feeds and redirects direct links to home.',
    tech: ['JavaScript', 'DOM API',],
    image: '/yt-shorts-blocker.png',
    fallback: '/yt-shorts-blocker.png',
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
    image: '/rawurl.png',
    fallback: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400',
    large: false,
    githubUrl: 'https://github.com/Bharadwajreddy1406/Github-Raw_userContent_URL_maker',
    imageClassName: 'object-cover w-full h-full p-0 flex-1 rounded-sm'
  }
];
