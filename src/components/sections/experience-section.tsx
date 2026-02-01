"use client";
import React from "react";
import { motion } from "motion/react";
import { LoaderOne } from "@/components/ui/loader";

interface TimelineItemProps {
  title: string;
  role: string;
  period: string;
  description: string[];
  techStack: string;
  isLast?: boolean;
}

const TimelineItem = ({ title, role, period, description, techStack, isLast }: TimelineItemProps) => {
  return (
    <div className="relative pl-8 md:pl-0">
        {/* Timeline Line */}
       <div className="md:hidden absolute left-0 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800"></div>
       
      <div className="md:flex items-center justify-between md:gap-8 group">
        
        {/* Left Side (Date & Company for Desktop) */}
        <div className="hidden md:block w-5/12 text-right">
             <h3 className="text-xl font-bold dark:text-white text-neutral-800">{role}</h3>
             <p className="text-purple-600 dark:text-purple-400 font-semibold">{title}</p>
             <p className="text-sm text-neutral-500">{period}</p>
        </div>

        {/* Center Dot */}
        <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 mt-1 md:mt-0 w-3 h-3 rounded-full bg-primary border-4 border-background z-10 transition-transform duration-300 group-hover:scale-150"></div>

        {/* Right Side (Content) */}
        <div className="md:w-5/12 mb-10 md:mb-0">
             {/* Mobile Role/Company */}
            <div className="md:hidden mb-2">
                 <h3 className="text-xl font-bold text-foreground">{role}</h3>
                 <p className="text-primary font-semibold">{title}</p>
                 <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">{period}</span>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
               <ul className="space-y-2 mb-4">
                  {description.map((item, idx) => (
                      <li key={idx} className="text-muted-foreground text-sm flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                          {item}
                      </li>
                  ))}
               </ul>
               <div className="flex flex-wrap gap-2">
                   {techStack.split(',').map((tech, idx) => (
                       <span key={idx} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                           {tech.trim()}
                       </span>
                   ))}
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
        >
            <h2 className="text-3xl font-bold mb-4">Work Experience</h2>
            <p className="text-neutral-500 dark:text-neutral-400">
             My professional journey and internships
            </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
            {/* Central Timeline Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800 -translate-x-1/2"></div>
            
            <div className="flex flex-col md:gap-12 gap-8">
                 <TimelineItem 
                    title="AltiusHub"
                    role="Backend Developer Intern"
                    period="2024–2025"
                    description={[
                        "Worked on building and maintaining backend APIs for internal and user-facing applications using Python (FastAPI/Flask) and Node.js",
                        "Developed API-driven workflows for data ingestion, validation, and processing",
                        "Implemented authentication, authorization, and role-based access control (RBAC) to secure application flows",
                        "Integrated and managed databases (PostgreSQL, MongoDB) for efficient data storage and querying",
                        "Collaborated with frontend and product teams to translate requirements into scalable backend logic",
                         "Followed clean architecture practices, proper error handling, logging, and Git-based development workflows"
                    ]}
                    techStack="Python, FastAPI, PostgreSQL, Git, GitHub, Postman"
                 />
            </div>

             {/* Journey Continues */}
             <div className="relative pl-8 md:pl-0 mt-12">
                 <div className="md:flex items-center justify-center md:gap-8">
                      <div className="absolute md:static left-[-5px] md:left-auto mt-1 md:mt-0 w-3 h-3 rounded-full bg-green-500 border-4 border-white dark:border-neutral-900 z-10 animate-pulse"></div>
                      <div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:top-full"></div>
                      
                      <div className="flex flex-col items-center gap-3">
                           <span className="text-neutral-500 dark:text-neutral-400 font-medium italic">The journey continues...</span>
                           <LoaderOne />
                      </div>
                 </div>
             </div>

        </div>
      </div>
    </section>
  );
}
