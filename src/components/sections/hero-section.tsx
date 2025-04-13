"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowDownIcon, Github, Linkedin, Mail } from "lucide-react"

export function HeroSection() {
  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center pt-16 pb-10"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center md:items-start space-y-8 md:space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block">Hi, I&apos;m</span>
              <span className="block mt-2 text-primary">Bharadwaj Reddy</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-center md:text-left"
          >
            Innovative Software Developer & AI Enthusiast
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <Link href="#contact">
              <Button size="lg" className="rounded-full">
                Get in touch
              </Button>
            </Link>
            <Link href="#projects">
              <Button size="lg" variant="outline" className="rounded-full">
                View my work
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4 mt-6"
          >
            <a 
              href="https://github.com/Bharadwajreddy1406" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a 
              href="mailto:bharadwajreddy1463@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={20} />
              <span className="sr-only">Email</span>
            </a>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.2
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <Link href="#about" className="flex flex-col items-center">
          <span className="text-sm text-muted-foreground mb-2">Scroll down</span>
          <ArrowDownIcon className="h-5 w-5 text-primary" />
        </Link>
      </motion.div>
    </section>
  )
}