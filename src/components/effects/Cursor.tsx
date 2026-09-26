'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current

    if (!dot || !ring || !label) return
    if (window.matchMedia('(max-width: 768px)').matches) return

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.02, ease: 'none' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.02, ease: 'none' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.15, ease: 'power2.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.15, ease: 'power2.out' })
    const labelX = gsap.quickTo(label, 'x', { duration: 0.12, ease: 'power2.out' })
    const labelY = gsap.quickTo(label, 'y', { duration: 0.12, ease: 'power2.out' })

    const move = (event: MouseEvent) => {
      dotX(event.clientX - 3)
      dotY(event.clientY - 3)
      ringX(event.clientX - 16)
      ringY(event.clientY - 16)
      labelX(event.clientX + 18)
      labelY(event.clientY + 16)
    }

    const activate = () => {
      // Interactive targets enlarge and tint the cursor ring.
      ring.classList.add('cursor-active')
      gsap.to(ring, { scale: 2.5, duration: 0.2, ease: 'power2.out' })
    }

    const deactivate = () => {
      ring.classList.remove('cursor-active')
      gsap.to(ring, { scale: 1, duration: 0.2, ease: 'power2.out' })
      gsap.to(label, { opacity: 0, duration: 0.2 })
    }

    const showDrag = () => {
      label.textContent = 'drag'
      gsap.to(label, { opacity: 1, duration: 0.18 })
      activate()
    }

    document.addEventListener('mousemove', move)

    const interactive = Array.from(document.querySelectorAll('[data-cursor="interactive"]'))
    const marquee = Array.from(document.querySelectorAll('[data-cursor="marquee"]'))

    interactive.forEach((el) => {
      el.addEventListener('mouseenter', activate)
      el.addEventListener('mouseleave', deactivate)
    })

    marquee.forEach((el) => {
      el.addEventListener('mouseenter', showDrag)
      el.addEventListener('mouseleave', deactivate)
    })

    return () => {
      document.removeEventListener('mousemove', move)
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', activate)
        el.removeEventListener('mouseleave', deactivate)
      })
      marquee.forEach((el) => {
        el.removeEventListener('mouseenter', showDrag)
        el.removeEventListener('mouseleave', deactivate)
      })
    }
  }, [])

  return (
    <div className="cursor-layer" aria-hidden>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
      <div id="cursor-label" ref={labelRef} />
    </div>
  )
}
