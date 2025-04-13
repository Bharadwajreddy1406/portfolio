"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code2, Terminal, Wrench } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

interface SkillItemProps {
  name: string
}

function SkillItem({ name }: SkillItemProps) {
  return (
    <motion.div variants={itemVariants}>
      <div className="relative bg-card rounded-lg p-3 border border-border hover:border-primary/50 transition-all h-full">
        <GlowingEffect
          spread={20}
          glow={true}
          disabled={false}
          proximity={32}
          inactiveZone={0.01}
        />
        <span>{name}</span>
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const programmingLanguages = [
    "Python", "Java", "C", "C++", "Dart", "JavaScript", "TypeScript", "SQL"
  ]

  const technologies = [
    "AWS (EC2, EBS, VPC)", "Docker", "Kubernetes", "CI/CD (GitHub Actions)", 
    "Git", "GitHub", "ReactJS", "NextJS", "ExpressJS", "MongoDB", 
    "PostgreSQL", "FastAPI", "Flask"
  ]

  const tools = [
    "VS Code", "Android Studio", "IntelliJ Idea Ultimate"
  ]

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-2">
            Skills
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Technical Expertise</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="languages" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="languages" className="flex items-center gap-2">
                  <Code2 className="h-4 w-4" /> Languages
                </TabsTrigger>
                <TabsTrigger value="technologies" className="flex items-center gap-2">
                  <Terminal className="h-4 w-4" /> Technologies
                </TabsTrigger>
                <TabsTrigger value="tools" className="flex items-center gap-2">
                  <Wrench className="h-4 w-4" /> Tools
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="languages">
              <Card className="relative overflow-hidden border-slate-800">
                <GlowingEffect
                  spread={60}
                  glow={true}
                  disabled={false}
                  proximity={100}
                  inactiveZone={0.2}
                />
                <CardContent className="p-6">
                  <motion.div 
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {programmingLanguages.map((lang) => (
                      <SkillItem key={lang} name={lang} />
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="technologies">
              <Card className="relative overflow-hidden border-slate-800">
                <GlowingEffect
                  spread={60}
                  glow={true}
                  disabled={false}
                  proximity={100}
                  inactiveZone={0.2}
                />
                <CardContent className="p-6">
                  <motion.div 
                    className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {technologies.map((tech) => (
                      <SkillItem key={tech} name={tech} />
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tools">
              <Card className="relative overflow-hidden border-slate-800">
                <GlowingEffect
                  spread={60}
                  glow={true}
                  disabled={false}
                  proximity={100}
                  inactiveZone={0.2}
                />
                <CardContent className="p-6">
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {tools.map((tool) => (
                      <SkillItem key={tool} name={tool} />
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}