'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null)
  const strokeRef = useRef<SVGPathElement>(null)
  const [done, setDone] = useState(false)

  useGSAP(() => {
    if (!rootRef.current || !strokeRef.current) return

    const length = strokeRef.current.getTotalLength()
    gsap.set(strokeRef.current, { strokeDasharray: length, strokeDashoffset: length })

    // Preloader draws BR mark and exits in a 1.6s sequence.
    gsap
      .timeline({ onComplete: () => setDone(true) })
      .to(strokeRef.current, { strokeDashoffset: 0, duration: 1, ease: 'power2.out' })
      .to(rootRef.current, { opacity: 0, duration: 0.6, ease: 'power2.out' })
      .set(rootRef.current, { display: 'none' })
  }, [])

  if (done) return null

  return (
    <div ref={rootRef} className="fixed inset-0 z-[120] grid place-items-center bg-parchment">
      {/* REPLACE: Signature BR monogram stroke animation with calligraphic letterform */}
      <svg width="170" height="80" viewBox="0 0 170 80" fill="none">
        <path
          ref={strokeRef}
          d="M18 10h38c12 0 20 7 20 16 0 8-5 13-12 15 9 2 16 8 16 17 0 14-11 22-28 22H18V10Zm22 16v13h13c5 0 8-2 8-7 0-4-3-6-8-6H40Zm0 29v14h15c6 0 9-3 9-7 0-5-4-7-10-7H40Zm58-45h24c13 0 22 8 22 21 0 13-9 21-22 21h-9v28H98V10Zm15 16v18h8c5 0 8-3 8-9 0-6-3-9-9-9h-7Z"
          stroke="#0F0E0C"
          strokeWidth="3"
        />
      </svg>
    </div>
  )
}
