"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Star } from "lucide-react"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

interface AchievementProps {
  title: string;
  organization: string;
  icon?: React.ReactNode;
}

function AchievementCard({ achievement }: { achievement: AchievementProps }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="overflow-hidden border-border hover:border-primary/30 transition-all duration-300 hover:shadow-md">
        <CardContent className="p-6 flex items-start gap-4">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            {achievement.icon || <Award size={24} />}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{achievement.title}</h3>
            <p className="text-muted-foreground text-sm mt-1">{achievement.organization}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function AchievementsSection() {
  const achievements = [
    {
      title: "Finalist in HackXcelerate hackathon",
      organization: "Microsoft at CBIT",
      icon: <Star size={24} />
    },
    {
      title: "Winner at Internal Hackathon",
      organization: "KMIT",
      icon: <Award size={24} />
    },
    {
      title: "Winner at Code Purple Project Expo",
      organization: "IEEE at Muffakham Jah College of Engineering",
      icon: <Award size={24} />
    },
    {
      title: "Contribution to AI tool for malware detection",
      organization: "GitHub Open Source",
      icon: <Star size={24} />
    }
  ]

  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-2">
            Achievements
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Awards & Recognitions</h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.title} achievement={achievement} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}