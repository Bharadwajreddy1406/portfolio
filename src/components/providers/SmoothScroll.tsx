'use client'

import { PropsWithChildren, useEffect } from 'react'
import { ScrollSmoother, ScrollTrigger, gsap } from '@/lib/gsap'

export default function SmoothScroll({ children }: PropsWithChildren) {
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 769px)', () => {
      // ScrollSmoother creates controlled inertia and cleaner editorial pacing on desktop.
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.2,
        effects: true,
      })
      const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh())

      return () => {
        window.cancelAnimationFrame(refreshFrame)
        smoother.kill()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  )
}
