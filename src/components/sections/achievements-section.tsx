"use client"

import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import ScrollFloat from "@/components/ui/ScrollFloat"
import MagicBento from "@/components/MagicBento"

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 relative w-full overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* <Badge variant="outline" className="mb-2">
            Achievements
          </Badge> */}
          <ScrollFloat
            containerClassName="text-center"
            textClassName="font-bold"
            scrollStart="center bottom+=60%"
          >
            Awards & Recognitions
          </ScrollFloat>
        </motion.div>

        <div className="w-full max-w-4xl mx-auto h-[600px]">
           <MagicBento 
              enableStars={true}
              enableSpotlight={true}
              spotlightRadius={300}
           />
        </div>
      </div>
    </section>
  )
}