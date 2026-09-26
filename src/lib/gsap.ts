'use client'

import gsap from 'gsap'
import { ScrollSmoother, ScrollTrigger, SplitText, TextPlugin } from 'gsap/all'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin, ScrollSmoother)
}

export { gsap, ScrollTrigger, SplitText, TextPlugin, ScrollSmoother }

export const sectionTriggerDefaults = {
  start: 'top 85%',
  toggleActions: 'play none none reverse',
}
