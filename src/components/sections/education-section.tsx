"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import ShinyText from "@/components/ui/ShinyText"
import ScrollFloat from "@/components/ui/ScrollFloat"

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
          {/* <Badge variant="outline" className="mb-2">
            Education
          </Badge> */}
          <ScrollFloat
            containerClassName="text-center"
            textClassName="font-bold"
            scrollStart="center bottom+=60%"
          >
            My Academic Journey
          </ScrollFloat>
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
                  <div className="flex flex-wrap gap-3">
                    <div className="border border-primary/20 dark:border-gray-700 rounded-xl px-3 py-1 bg-white/30 dark:bg-gray-900/30 shadow-sm">
                      <ShinyText text="Data Structures & Algorithms" speed={7} />
                    </div>
                    <div className="border border-primary/20 dark:border-gray-700 rounded-xl px-3 py-1 bg-white/30 dark:bg-gray-900/30 shadow-sm">
                      <ShinyText text="Operating Systems" speed={7} />
                    </div>
                    <div className="border border-primary/20 dark:border-gray-700 rounded-xl px-3 py-1 bg-white/30 dark:bg-gray-900/30 shadow-sm">
                      <ShinyText text="DBMS" speed={7} />
                    </div>
                    <div className="border border-primary/20 dark:border-gray-700 rounded-xl px-3 py-1 bg-white/30 dark:bg-gray-900/30 shadow-sm">
                      <ShinyText text="Functional Programming" speed={7} />
                    </div>
                    <div className="border border-primary/20 dark:border-gray-700 rounded-xl px-3 py-1 bg-white/30 dark:bg-gray-900/30 shadow-sm">
                      <ShinyText text="OOPS Concepts" speed={7} />
                    </div>
                    <div className="border border-primary/20 dark:border-gray-700 rounded-xl px-3 py-1 bg-white/30 dark:bg-gray-900/30 shadow-sm">
                      <ShinyText text="AI & ML" speed={7} />
                    </div>
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