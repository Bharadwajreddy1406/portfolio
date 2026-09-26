'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { SplitText, gsap } from '@/lib/gsap'
import LifeClock from '@/components/effects/LifeClock'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    if (!bioRef.current) return

    let words: SplitText | null = null
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      words = new SplitText(bioRef.current as HTMLElement, { type: 'words' })

      // About copy reveals word by word for an editorial cadence.
      gsap.from(words.words, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.008,
        scrollTrigger: {
          trigger: bioRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

    })

    return () => {
      words?.revert()
      mm.revert()
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-28 md:py-36">
      <span className="section-index">02</span>
      <div className="content-grid relative">
        <div className="col-span-6 md:col-span-8">
          <p className="label-text mb-6">- About</p>
          <p ref={bioRef} className="max-w-[780px] font-display text-[clamp(24px,2.3vw,36px)] font-light leading-[1.4] text-ink">
            <span className="mr-2 text-5xl text-gold">-</span>
            I build <span className="border-b-2 border-gold">backend systems</span> and{' '}
            <span className="border-b-2 border-gold">AI-powered applications</span> that solve real-world problems, with a focus on{' '}
            <span className="border-b-2 border-gold">reliable architecture</span>,{' '}
            <span className="border-b-2 border-gold">scalable software</span>, and{' '}
            <span className="border-b-2 border-gold">production-ready engineering</span>.
          </p>
        </div>

        <aside className="col-span-6 mt-10 md:col-span-4 md:col-start-9 md:mt-0">
          <ul className="space-y-5 text-[15px] text-ink/85">
            <li>
              <p className="label-text">Location</p>
              <p>Hyderabad, Telangana</p>
            </li>
            <li>
              <p className="label-text">Since 14 June 2005</p>
              <LifeClock />
            </li>
            <li>
              <p className="label-text">Availability</p>
              <span className="inline-flex items-center rounded-full border border-forest/30 bg-forest/10 px-3 py-1 text-sm text-forest">Open to collaborations</span>
            </li>
            <li>
              <a
                href="/Bharadwaj%20Reddy%20Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center border border-gold bg-gold/10 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink transition-colors hover:bg-gold hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                data-cursor="interactive"
              >
                Open resume -&gt;
              </a>
            </li>
          </ul>
        </aside>

      </div>
    </section>
  )
}
