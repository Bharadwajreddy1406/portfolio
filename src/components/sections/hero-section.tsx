"use client";

import ClickSpark from "@/components/ui/ClickSpark";
import Noise from "@/components/ui/Noise";
import { Button } from "@/components/ui/button";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { motion } from "framer-motion";
import { ArrowDownIcon, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SplitText from "./../ui/SplitText";

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-16 pb-10 relative overflow-hidden">
      {/* Background animations */}
      <Noise
        patternSize={150}
        patternScaleX={1}
        patternScaleY={1}
        patternRefreshInterval={2}
        patternAlpha={10}
      />

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col mt-20 items-center md:items-start space-y-8 md:space-y-10 md:max-w-[55%]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block">Hey, I'm</span>

                <SplitText
                  text="Bharadwaj Reddy"
                  className=" block mt-2 text-primary "
                  delay={150}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,50px,0)",
                  }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  easing={(t: number) => 1 - Math.pow(1 - t, 3)}
                  threshold={0.2}
                  rootMargin="-50px"
                  onLetterAnimationComplete={() => {}}
                />
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-center md:text-left"
            >
              I engineer intelligent systems, automate infrastructure, and build full-stack applications with AI at the core.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl text-center md:text-left"
            >
              I'm a <ContainerTextFlip
                words={["Full Stack Developer", "DevOps Engineer", "AI/ML Engineer","K8s Practitioner"]}
                className="text-primary font-medium"
                interval={2500}
              />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <Link href="#contact">
              <Button size="lg" className="rounded-full shadow-lg shadow-blue-500/40 hover:shadow-blue-400/70 hover:shadow-md transition-all duration-300 ease-in-out ">
              Get in touch
                </Button>
              </Link>
              <Link href="#projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full shadow-md shadow-blue-500/40 hover:shadow-blue-400/70 hover:shadow-lg transition-all duration-300 ease-in-out text-slate-950 hover:text-slate-950 dark:text-white group overflow-hidden relative hover:bg-transparent dark:hover:bg-transparent"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-blue-200/30 dark:from-blue-900/30 dark:to-blue-900/30 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 2,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.span
                    whileHover={{
                      scale: 1.05
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }}
                  >
                    View my work
                  </motion.span>
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

          {/* Hero SVG on right side */}
          <motion.div 
            className="hidden md:block md:w-[40%]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Image
              src="/hero.svg"
              alt="Hero Illustration"
              width={500}
              height={500}
              className="w-full h-auto"
              priority
            />
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
          repeatDelay: 0.2,
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <Link href="#about" className="flex flex-col items-center">
          <span className="text-sm text-muted-foreground mb-2">
            Scroll down
          </span>
          <ArrowDownIcon className="h-5 w-5 text-primary" />
        </Link>
      </motion.div>
    </section>
  );
}
