"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function EducationSection() {
  return (
    <section id="education" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-2">
            Education
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">My Academic Journey</h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="overflow-hidden border border-primary/20 shadow-lg">
            <CardContent className="p-0">
              <div className="bg-primary p-6 flex items-center justify-center">
                <GraduationCap size={40} className="text-primary-foreground" />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold">Bachelor's in Computer Science</h3>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-muted-foreground" />
                    <span>2022 - 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-muted-foreground" />
                    <span>Hyderabad, Telangana</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Keshav Memorial Institute of Technology</span>
                    <span className="font-semibold">CGPA: 8.74</span>
                  </div>
                  <p className="text-muted-foreground">
                    Pursuing a comprehensive curriculum focused on computer science fundamentals, 
                    software development, and emerging technologies. Actively participating in 
                    various technical events and project exhibitions.
                  </p>
                </div>
                
                <div className="pt-4">
                  <h4 className="font-medium mb-2">Key Coursework:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Data Structures & Algorithms</Badge>
                    <Badge variant="secondary">Operating Systems</Badge>
                    <Badge variant="secondary">DBMS</Badge>
                    <Badge variant="secondary">Functional Programming</Badge>
                    <Badge variant="secondary">OOPS Concepts</Badge>
                    <Badge variant="secondary">AI & ML</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}