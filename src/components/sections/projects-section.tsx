"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GlowingEffect } from "@/components/ui/glowing-effect"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

interface ProjectProps {
  title: string
  description: string
  techStack: string[]
  date: string
  githubLink?: string
  liveLink?: string
}

function ProjectCard({ project }: { project: ProjectProps }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="h-full overflow-hidden backdrop-blur-md border border-primary/10 hover:border-primary/20 transition-all duration-300 group relative">
        <GlowingEffect
          spread={50}
          glow={true}
          disabled={false}
          proximity={100}
          inactiveZone={0.01}
        />
        <CardHeader className="bg-primary/5 backdrop-blur-sm relative z-10">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{project.title}</CardTitle>
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{project.date}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="outline" className="bg-background/70 backdrop-blur-md border-primary/10">{tech}</Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="pt-4 relative z-10">
          <CardDescription className="text-foreground/80">
            {project.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between gap-3 pt-2 relative z-10">
          {project.githubLink && (
            <Button variant="outline" size="sm" asChild className="w-full backdrop-blur-sm border-primary/10 hover:border-primary/30 hover:bg-primary/5">
              <Link href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github size={16} />
                <span>Code</span>
              </Link>
            </Button>
          )}
          {project.liveLink && (
            <Button variant="default" size="sm" asChild className="w-full bg-primary/80 backdrop-blur-sm hover:bg-primary/90">
              <Link href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export function ProjectsSection() {
  const projects: ProjectProps[] = [
    {
      title: "Product Review Chat System with AI",
      description: "AI-powered chatbot for Amazon product reviews using NLP and RAG models.",
      techStack: ["MERN Stack", "FASTAPI", "Ollama", "Hugging Face"],
      date: "12/2024",
      githubLink: "https://github.com/Bharadwajreddy1406/ReviewBot"
    },
    {
      title: "Data Scraping Tool for Osmania University",
      description: "Multi-threaded web scraper reducing result retrieval time from days to minutes.",
      techStack: ["Flask", "HTML", "CSS", "JavaScript"],
      date: "09/2023",
      liveLink: "https://ou-ngit-kmit-rywa.onrender.com/"
    },
    {
      title: "Mock Interview System",
      description: "Platform for managing interactive interviews with real-time feedback and AI-generated questions.",
      techStack: ["PERN Stack", "REST API", "AI Question Generation"],
      date: "04/2024"
    },
    {
      title: "Breast Cancer Detection and Segmentation",
      description: "Implementation of deep learning models achieving high accuracy for classification and segmentation using ultrasound images.",
      techStack: ["Python", "PyTorch", "TensorFlow", "MERN Stack"],
      date: "06/2024"
    }
  ]

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 relative"
        >
          <Badge variant="outline" className="mb-2">
            Projects
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">My Recent Work</h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}