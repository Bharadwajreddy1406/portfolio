"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-2">
            About Me
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Get to know me</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="md:col-span-1 flex flex-col items-center justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-48 h-48 md:w-60 md:h-60 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <User size={80} className="text-primary" />
            </div>
          </motion.div>

          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-4">
                  <p className="text-lg">
                    I am a passionate software developer and AI enthusiast currently pursuing my Bachelor's in Computer Science at Keshav Memorial Institute of Technology, Hyderabad.
                  </p>
                  <p>
                    My interest in technology extends across various domains including web development, 
                    artificial intelligence, and cloud computing. I enjoy building innovative solutions that 
                    address real-world challenges using modern technologies and frameworks.
                  </p>
                  <p>
                    With a strong foundation in computer science fundamentals and hands-on experience with 
                    various programming languages and frameworks, I strive to create clean, efficient, and 
                    impactful software solutions.
                  </p>
                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Contact Information:</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>Location: Hyderabad, Telangana</li>
                      <li>Phone: +91 9390428814</li>
                      <li>Email: bharadwajreddy1463@gmail.com</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}