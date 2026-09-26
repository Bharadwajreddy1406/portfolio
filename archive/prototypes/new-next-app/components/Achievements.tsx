'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const marqueeText =
  'HackXcelerate Finalist · Internal Hackathon Winner · Code Purple Winner · OSS Contributor · '

const awards = [
  { name: 'Finalist HackXcelerate', org: 'Microsoft@CBIT' },
  { name: 'Winner Internal Hackathon', org: 'KMIT' },
  { name: 'Winner Code Purple', org: 'IEEE@MJ College' },
  { name: 'OSS Contributor', org: 'AI malware detection tool' },
]

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!trackRef.current) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Continuous marquee creates an ambient ribbon of accomplishments.
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 26,
        repeat: -1,
        ease: 'none',
      })

      // Award cards rise into view with short stagger for rhythm.
      gsap.from('[data-award-card]', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="achievements" ref={sectionRef} className="relative overflow-hidden bg-[#13120f] py-16 text-white md:py-24">
      <span className="section-index text-ghost">06</span>
      <div className="overflow-hidden border-y border-gold/20 py-2" data-cursor="marquee">
        <div ref={trackRef} className="flex w-max min-w-full">
          {[0, 1].map((i) => (
            <p key={i} className="whitespace-nowrap px-4 font-display text-[clamp(36px,4vw,48px)] font-extrabold italic text-gold">
              {marqueeText.repeat(4)}
            </p>
          ))}
        </div>
      </div>

      <div className="content-grid mt-10 md:mt-12">
        <div className="col-span-6 md:col-span-12 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {awards.map((award) => (
            <article key={award.name} data-award-card className="border border-[#333] bg-[#1A1A16] p-4">
              {/* REPLACE: Hand-drawn star glyph with imperfect stroke and editorial character */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gold">
                <path d="m12 2 2.4 6.7L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.3L12 2Z" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              <p className="mt-4 text-[16px] text-white">{award.name}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-gold">{award.org}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
