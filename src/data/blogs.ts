export type BlogPost = {
  title: string
  excerpt: string
  topics: readonly string[]
  url: string
}

export const BLOG_ARCHIVE_THRESHOLD = 10

export const blogPosts: readonly BlogPost[] = [
  {
    title: 'Proxy Paradigms: Forward and Reverse Proxies',
    excerpt: 'A practical breakdown of how forward and reverse proxies route, protect, and shape network traffic.',
    topics: ['Networking', 'Architecture'],
    url: 'https://bharadwajreddy1406.hashnode.dev/proxy-paradigms-forward-and-reverse-proxies',
  },
  {
    title: 'Learning GitHub Actions',
    excerpt: 'A hands-on introduction to automating builds, tests, and delivery workflows with GitHub Actions.',
    topics: ['CI/CD', 'GitHub Actions'],
    url: 'https://bharadwajreddy1406.hashnode.dev/learning-github-actions',
  },
  {
    title: 'Ansible: What? Why? How?',
    excerpt: 'An approachable guide to repeatable infrastructure configuration and automation with Ansible.',
    topics: ['Ansible', 'Automation'],
    url: 'https://bharadwajreddy1406.hashnode.dev/ansible-what-why-how',
  },
  {
    title: 'AWS EC2 Explained: Learn About Virtual Cloud Servers',
    excerpt: 'Core EC2 concepts for launching, configuring, and understanding virtual servers on AWS.',
    topics: ['AWS', 'Cloud'],
    url: 'https://bharadwajreddy1406.hashnode.dev/aws-ec2-explained-learn-about-virtual-cloud-servers',
  },
  {
    title: 'Virtualization & DevOps',
    excerpt: 'How virtualization underpins modern DevOps environments, infrastructure, and delivery workflows.',
    topics: ['Virtualization', 'DevOps'],
    url: 'https://bharadwajreddy1406.hashnode.dev/virtualization-devops',
  },
] as const

