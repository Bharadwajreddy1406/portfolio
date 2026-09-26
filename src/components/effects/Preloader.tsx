'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const bRef = useRef<SVGTextElement>(null)
  const hexGroupRef = useRef<SVGGElement>(null)
  const segmentsRef = useRef<(SVGPathElement | null)[]>([])
  
  const [done, setDone] = useState(false)

  const hexPath = "M 100 40 L 48 70 L 48 130 L 100 160 L 152 130 L 152 70 Z"
  const hexRef = useRef<SVGPathElement>(null)

  useGSAP(() => {
    if (!rootRef.current || !bRef.current || !loaderRef.current) return

    // Setup initial state
    gsap.set(bRef.current, { scale: 0.9, opacity: 0, transformOrigin: "50% 50%" })
    
    // Initialize hex invisible
    if (hexRef.current) {
      const length = hexRef.current.getTotalLength()
      gsap.set(hexRef.current, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 })
    }

    const tl = gsap.timeline({ onComplete: () => {
        setDone(true)
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('preloaderComplete'))
        }
    }})

    // 1. Intro sequence
    tl.to(bRef.current, { scale: 1, opacity: 1, duration: 0.6, delay: 0.2, ease: "back.out(1.5)" })

    // 2. Hexagon filling sequence
    if (hexRef.current) {
      tl.set(hexRef.current, { opacity: 1 })
      tl.to(hexRef.current, { strokeDashoffset: 0, duration: 1.5, ease: "none" })
    }

    // 3. Dramatic Shrink to center
    tl.to(loaderRef.current, {
      scale: 0,
      duration: 0.6,
      ease: "power4.in",
      transformOrigin: "50% 50%"
    }, "+=0.3")
    
    // 4. Fade out container to reveal landing
    tl.to(rootRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" }, ">-0.1")

  }, [])

  if (done) return null

  return (
    <div ref={rootRef} className="fixed inset-0 z-[120] grid place-items-center bg-[#0F0E0C] text-parchment">
      <div ref={loaderRef} className="relative flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="overflow-visible">
            <g ref={hexGroupRef} className="origin-center">
                {/* Background faint hexagon */}
                <path d={hexPath} stroke="#F5F0E8" strokeWidth="2" opacity="0.15" />
                
                {/* Active animated hexagon path */}
                <path
                    ref={hexRef}
                    d={hexPath}
                    stroke="#F5F0E8"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
            </g>
            
            {/* Main Center "B" (Solid Beige Fill) */}
            <text
                ref={bRef}
                x="100"
                y="118"
                textAnchor="middle"
                fill="#F5F0E8"
                stroke="none"
                className="font-display font-extrabold text-[55px] tracking-widest"
            >
                B
            </text>
        </svg>
      </div>
    </div>
  )
}
