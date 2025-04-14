"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <motion.button
      whileHover={{ 
        scale: 1.05,
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full p-2 hover:bg-slate-950/10 dark:hover:bg-slate-100/10 transition-colors duration-300"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-5 h-5"
      >
        <motion.div
          initial={false}
          animate={{ 
            scale: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : -45,
            opacity: theme === "light" ? 1 : 0
          }}
          transition={{ 
            duration: 0.5,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        >
          <Sun className="h-5 w-5 text-slate-950" />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{ 
            scale: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : 45,
            opacity: theme === "dark" ? 1 : 0
          }}
          transition={{ 
            duration: 0.5,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        >
          <Moon className="h-5 w-5 text-blue-300" />
        </motion.div>
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  )
}