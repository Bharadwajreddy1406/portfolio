'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { SplitText, gsap } from '@/lib/gsap'

let isPreloaderComplete = false

export default function Landing() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const firstLineRef = useRef<HTMLHeadingElement>(null)
  const secondLineRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const ruleRef = useRef<HTMLSpanElement>(null)
  const artRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const first = firstLineRef.current
    const second = secondLineRef.current
    const role = roleRef.current
    const label = labelRef.current
    const rule = ruleRef.current
    const art = artRef.current

    if (!first || !second || !role || !label || !rule || !art) return

    let firstSplit: SplitText | null = null
    let secondSplit: SplitText | null = null

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      firstSplit = new SplitText(first, { type: 'chars' })
      secondSplit = new SplitText(second, { type: 'chars' })

      gsap.set(rule, { width: 0 })
      
      // Hide elements initially while waiting for preloader
      if (!isPreloaderComplete) {
        gsap.set([label, first, second, role, art], { opacity: 0 })
      }

      const playAnimation = () => {
        gsap.set([label, first, second, role, art], { opacity: 1 })
        const tl = gsap.timeline()
        tl.to(rule, { width: 80, duration: 1, ease: 'power3.out' })
          .fromTo(label, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.8')
          .from(firstSplit!.chars, {
            opacity: 0,
            y: 80,
            duration: 0.85,
            stagger: 0.015,
            ease: 'expo.out',
          })
          .from(
            secondSplit!.chars,
            {
              opacity: 0,
              y: 80,
              duration: 0.85,
              stagger: 0.025,
              ease: 'expo.out',
            },
            '+=0.3'
          )
          .fromTo(role, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
          .fromTo(art, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1, ease: 'expo.out' }, '-=0.75')
      }

      if (isPreloaderComplete) {
          playAnimation()
      } else {
          // Listen for the custom event from the Preloader
          const onComplete = () => {
              isPreloaderComplete = true
              playAnimation()
          }
          window.addEventListener('preloaderComplete', onComplete, { once: true })
      }
    })

    return () => {
      firstSplit?.revert()
      secondSplit?.revert()
      mm.revert()
    }
  }, [])

  return (
    <section id="landing" ref={sectionRef} className="relative min-h-screen overflow-hidden py-16">
      <span className="section-index">01</span>
      <div className="content-grid relative h-[calc(100vh-4rem)] items-end pb-12 pt-10 md:items-center md:pb-0">
        <p ref={labelRef} className="label-text col-span-6 self-start">- Portfolio 2026</p>

        <div className="col-span-6 md:col-span-8">
          <h1 ref={firstLineRef} className="display-giant text-ink">Bharadwaj</h1>
          <h2 ref={secondLineRef} className="display-giant italic font-light text-gold">Reddy.</h2>
          <p ref={roleRef} className="mt-6 max-w-2xl text-[18px] text-ink/70">
            Computer Science student at KMIT Hyderabad, full-stack developer, and AI builder.
          </p>
        </div>

        <div ref={artRef} className="col-span-6 col-start-1 mt-10 md:col-span-4 md:col-start-9 md:mt-0 relative flex justify-end">
          <div className="relative h-[58vh] w-full max-w-[280px]">
            <Image 
              src="/hero-section.png" 
              alt="Editorial hero art" 
              fill
              className="object-cover object-center border border-gold/30 p-1"
              priority
            />
            {/* Optional subtle vintage overlay effect */}
            <div className="absolute inset-0 bg-gold/5 mix-blend-multiply pointer-events-none" />
          </div>
        </div>

        <div className="col-span-6 flex items-center gap-3 self-end md:col-span-4 md:self-end">
          <span ref={ruleRef} className="block h-px bg-gold" />
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ghost">scroll to explore</span>
        </div>
      </div>
    </section>
  )
}
