"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <motion.button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-primary mb-8 text-primary-foreground hover:scale-110 transition-all"
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
          >
            <ArrowUp size={24} />
          </motion.button>
          
          <div className="flex gap-6 mb-6">
            <motion.a 
              href="https://github.com/Bharadwajreddy1406" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-background text-foreground hover:text-primary hover:bg-background/80 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </motion.a>
            
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-background text-foreground hover:text-primary hover:bg-background/80 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </motion.a>
            
            <motion.a 
              href="mailto:bharadwajreddy1463@gmail.com"
              className="p-2 rounded-full bg-background text-foreground hover:text-primary hover:bg-background/80 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
              <span className="sr-only">Email</span>
            </motion.a>
          </div>
          
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <Link href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link href="#education" className="text-muted-foreground hover:text-primary transition-colors">Education</Link>
              <Link href="#skills" className="text-muted-foreground hover:text-primary transition-colors">Skills</Link>
              <Link href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</Link>
              <Link href="#achievements" className="text-muted-foreground hover:text-primary transition-colors">Achievements</Link>
              <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
            
            <p className="text-muted-foreground text-sm">
              © {currentYear} Bharadwaj Reddy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}