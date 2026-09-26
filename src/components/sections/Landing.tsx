'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import TechText from '@/components/effects/TechText'

type LandingProps = {
  preloaderEnabled?: boolean
}

export default function Landing({ preloaderEnabled = false }: LandingProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const firstLineRef = useRef<HTMLSpanElement>(null)
  const secondLineRef = useRef<HTMLSpanElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const ruleRef = useRef<HTMLSpanElement>(null)
  const artRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const first = firstLineRef.current
    const second = secondLineRef.current
    const role = roleRef.current
    const rule = ruleRef.current
    const art = artRef.current

    if (!first || !second || !role || !rule || !art) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(first, { autoAlpha: 0, yPercent: 24 })
      gsap.set(second, { autoAlpha: 0, yPercent: 24 })
      gsap.set(role, { autoAlpha: 0, y: 18 })
      gsap.set(art, { autoAlpha: 0, x: 36 })
      gsap.set(rule, { scaleX: 0, transformOrigin: 'left center' })

      let hasPlayed = false
      const playAnimation = () => {
        if (hasPlayed) return
        hasPlayed = true

        gsap.set([first, second], { autoAlpha: 1 })

        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        tl.to(first, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.72,
          }, 0)
          .to(second, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.72,
            ease: 'expo.out',
          }, 0.18)
          .to(role, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0.72)
          .to(art, { autoAlpha: 1, x: 0, duration: 0.9 }, 0.32)
          .to(rule, { scaleX: 1, duration: 0.75, ease: 'power3.out' }, 0.82)
      }

      if (!preloaderEnabled) {
        playAnimation()
        return
      }

      const onComplete = () => playAnimation()
      window.addEventListener('preloaderComplete', onComplete, { once: true })

      return () => window.removeEventListener('preloaderComplete', onComplete)
    })

    return () => {
      mm.revert()
    }
  }, [preloaderEnabled])

  return (
    <section id="landing" ref={sectionRef} className="relative min-h-screen overflow-hidden py-16">
      <span className="section-index">01</span>
      <div
        className="pointer-events-none absolute bottom-0 right-0 z-10 hidden h-[42%] w-[72px] flex-col items-center justify-end gap-6 md:flex"
        aria-label="Email contact"
      >
        <a
          href="mailto:bharadwajreddy.vancha@gmail.com"
          className="sidebar-email pointer-events-auto font-mono text-[12px] tracking-[0.16em] text-ink transition-colors hover:text-gold focus-visible:text-gold focus-visible:outline-none"
          data-cursor="interactive"
          aria-label="Email Bharadwaj Reddy"
        >
          bharadwajreddy.vancha@gmail.com
        </a>
        <span className="block h-24 w-px bg-ink/40" aria-hidden="true" />
      </div>
      <div className="content-grid relative h-[calc(100vh-4rem)] items-end pb-12 pt-10 md:items-center md:pb-0">
        <div className="col-span-6 md:col-span-8">
          <h1 aria-label="Bharadwaj Reddy">
            <span
              ref={firstLineRef}
              aria-hidden="true"
              className="block h-[clamp(76px,10.5vw,140px)] w-full motion-safe:opacity-0"
            >
              <TechText
                text="Bharadwaj"
                fontWeight={800}
                fontSize={120}
                letterSpacing={-0.04}
                color="#0F0E0C"
                accentColor="#C8A96E"
                reveal="letter"
                dashLength={4}
                dashGap={3}
                strokeWidth={1.25}
                specks={10}
                speed={0.7}
                align="left"
                className="font-display"
              />
            </span>
            <span
              ref={secondLineRef}
              aria-hidden="true"
              className="-mt-3 block h-[clamp(76px,10.5vw,140px)] w-full motion-safe:opacity-0 md:-mt-5"
            >
              <TechText
                text="Reddy."
                fontWeight={400}
                fontStyle="italic"
                fontSize={120}
                letterSpacing={-0.04}
                color="#C8A96E"
                accentColor="#2D5A4F"
                reveal="letter"
                dashLength={4}
                dashGap={3}
                strokeWidth={1.25}
                specks={10}
                sweep={false}
                speed={0.7}
                align="left"
                className="font-display"
              />
            </span>
          </h1>
          <p ref={roleRef} className="mt-6 max-w-2xl text-[18px] text-ink/70 motion-safe:opacity-0">
            Software Engineer (GET) at AltiusHub, building data-intensive backends and production AI systems.
          </p>
        </div>

        <div ref={artRef} className="col-span-6 col-start-1 mt-10 flex justify-end motion-safe:opacity-0 md:col-span-4 md:col-start-9 md:mt-0">
          <div className="relative h-[58vh] w-full max-w-[420px]">
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

        <div className="col-span-6 -translate-y-10 flex items-center gap-3 self-end md:col-span-4 md:self-end">
          <span ref={ruleRef} className="block h-px w-20 bg-gold" />
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ghost">scroll to explore</span>
        </div>
      </div>
    </section>
  )
}
