"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ScrollFloat from "@/components/ui/ScrollFloat"
import Threads from "@/components/ui/Threads"
import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-150">
        <Threads 
          color={[0.4, 0.6, 1]} 
          amplitude={0.8} 
          distance={0.3} 
          enableMouseInteraction={true} 
        />
      </div>
      
      <div className="container mx-auto px-4  relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* <Badge variant="outline" className="mb-2">
            About Me
          </Badge> */}
          <ScrollFloat
            containerClassName="text-center"
            textClassName="font-bold"
            scrollStart="center bottom+=60%"
          >
            Get to know me
          </ScrollFloat>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-transparent backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="p-0 relative">
              {/* <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 pointer-events-none rounded-2xl"></div> */}
              <div className="flex flex-col md:flex-row relative">
                <div className="md:w-1/3 p-6 flex items-center justify-center">
                  <div className="relative w-48 h-48 md:w-80 md:h-80 overflow-hidden rounded-2xl border-2 border-white/20 shadow-lg">
                    <Image 
                      src="/image.jpg" 
                      alt="Profile image" 
                      fill 
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-6 md:p-8 space-y-4">
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
                  <div className="pt-4 border-t border-white/10">
                    <h3 className="font-medium mb-2">Contact Information:</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>Location: Hyderabad, Telangana</li>
                      <li>Phone: +91 9390428814</li>
                      <li>Email: bharadwajreddy1463@gmail.com</li>
                    </ul>
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