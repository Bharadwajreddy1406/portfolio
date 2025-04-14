"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import ScrollFloat from "@/components/ui/ScrollFloat"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import { useTheme } from "next-themes"

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
  bgImage?: string
}

function ProjectCard({ project }: { project: ProjectProps }) {
  const { theme } = useTheme()
  // Default background image if none is provided
  const bgImage = project.bgImage || "/image.jpg"

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-full w-full relative overflow-hidden rounded-3xl shadow-2xl"
    >
      {/* Glowing Effect positioned with higher z-index and made visible on borders */}
      <div className="absolute inset-0 z-30 rounded-3xl">
        <GlowingEffect
          disabled={false}
          blur={10}
          spread={100}
          movementDuration={1.5}
          proximity={100}
          inactiveZone={0.1}
          glow={true}
          variant={theme === "dark" ? "default" : "white"}
          borderWidth={2}
        />
      </div>
      
      {/* Border for extra highlight */}
      <div className="absolute inset-0 rounded-3xl border border-primary/30 z-20"></div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 border">
        <Image 
          src={bgImage} 
          alt={project.title} 
          fill 
          className="object-cover opacity-50 blur-2xs"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent dark:from-black dark:via-black/70 light:from-slate-900 light:via-slate-800/70" />
      </div>
      
      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="p-6 bg-primary/30 backdrop-blur-sm border-b border-primary/10">
          <div className="flex justify-between items-start">
            <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">{project.title}</CardTitle>
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{project.date}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 flex-grow">
          <p className="text-foreground mb-6 text-sm md:text-base">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech) => (
              <Badge 
                key={tech} 
                variant="outline" 
                className="dark:bg-zinc-800/70 bg-slate-900/90 text-white backdrop-blur-md border-primary/10 px-2 py-1 text-xs font-mono "
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="p-6 pt-0 mt-auto flex justify-between gap-3">
          {project.githubLink && (
            <Button variant="outline" size="sm" asChild className="w-full backdrop-blur-sm border-primary/10 hover:border-primary/50 hover:bg-primary/10 text-foreground dark:text-white light:hover:bg-blue-700/90">
              <Link href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github size={16} />
                <span>Code</span>
              </Link>
            </Button>
          )}
          {project.liveLink && (
            <Button variant="default" size="sm" asChild className="w-full dark:bg-primary light:bg-blue-600/80 backdrop-blur-sm dark:hover:bg-primary/90 light:hover:bg-blue-700/90">
              <Link href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
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
      githubLink: "https://github.com/Bharadwajreddy1406/ReviewBot",
      bgImage: "/rbot.png"
    },
    {
      title: "Data Scraping Tool for Osmania University",
      description: "Multi-threaded web scraper reducing result retrieval time from days to minutes.",
      techStack: ["Flask", "HTML", "CSS", "JavaScript"],
      date: "09/2023",
      liveLink: "https://ou-ngit-kmit-rywa.onrender.com/",
      bgImage: "/osmania.png"
    },
    {
      title: "Mock Interview System",
      description: "Platform for managing interactive interviews with real-time feedback and AI-generated questions.",
      techStack: ["PERN Stack", "REST API", "AI Question Generation"],
      date: "04/2024",
      githubLink: "https://github.com/Bharadwajreddy1406/sksage",
      bgImage: "/mockInterview.png"
    },
    {
      title: "Breast Cancer Detection and Segmentation",
      description: "Implementation of deep learning models achieving high accuracy for classification and segmentation using ultrasound images.",
      techStack: ["Python", "PyTorch", "TensorFlow", "MERN Stack"],
      date: "06/2024",
      githubLink: "https://github.com/Bharadwajreddy1406/Classification-and-Segmentation-of-breast-cancer-tumor-using-vision-transformer",
      bgImage: "/breast-cancer.png"
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
          <ScrollFloat
            containerClassName="text-center"
            textClassName="font-bold"
            scrollStart="center bottom+=60%"
          >
            My Recent Work
          </ScrollFloat>
        </motion.div>

        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="max-w-6xl mx-auto"
        >
          <CarouselContent>
            {projects.map((project) => (
              <CarouselItem key={project.title} className="sm:basis-4/5 md:basis-3/4 lg:basis-2/3 pl-6">
                <div className="h-[500px] md:h-[600px]">
                  <ProjectCard project={project} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex left-0 z-20 bg-slate-950 dark:bg-slate-950 text-white dark:text-white border-slate-800 hover:bg-slate-900 hover:text-white" />
          <CarouselNext className="hidden md:flex right-0 z-20 bg-slate-950 dark:bg-slate-950 text-white dark:text-white border-slate-800 hover:bg-slate-900 hover:text-white" />
        </Carousel>
      </div>
    </section>
  )
}