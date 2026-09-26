'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { SplitText, gsap } from '@/lib/gsap'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<Array<HTMLSpanElement | null>>([])

  useGSAP(() => {
    if (!bioRef.current || !imageRef.current) return

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

      // Portrait frame wipes from top edge to full reveal.
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      const targets = [8.74, 4, 3]
      statsRef.current.forEach((item, index) => {
        if (!item) return

        // Stat figures count upward once section enters view.
        gsap.fromTo(
          item,
          { textContent: 0 },
          {
            textContent: targets[index],
            duration: 1,
            ease: 'power2.out',
            snap: { textContent: index === 0 ? 0.01 : 1 },
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            onUpdate: () => {
              if (index === 0) item.textContent = Number(item.textContent).toFixed(2)
              if (index === 1) item.textContent = `${Math.round(Number(item.textContent))}+`
              if (index === 2) item.textContent = `${Math.round(Number(item.textContent))}`
            },
          }
        )
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
            I engineer <span className="border-b-2 border-gold">AI systems</span> that feel practical, build resilient{' '}
            <span className="border-b-2 border-gold">full-stack</span> software with production discipline, and automate{' '}
            <span className="border-b-2 border-gold">cloud</span> infrastructure for teams that move fast.
          </p>
        </div>

        <aside className="col-span-6 mt-10 md:col-span-4 md:col-start-9 md:mt-0">
          <ul className="space-y-5 text-[15px] text-ink/85">
            <li>
              <p className="label-text">Location</p>
              <p>Hyderabad, Telangana</p>
            </li>
            <li>
              <p className="label-text">CGPA</p>
              <p>8.74 - KMIT B.Tech CSE (2022-2026)</p>
            </li>
            <li>
              <p className="label-text">Availability</p>
              <span className="inline-flex items-center rounded-full border border-forest/30 bg-forest/10 px-3 py-1 text-sm text-forest">Open to collaborations</span>
            </li>
            <li>
              <a href="#contact" className="gold-link inline-flex text-sm" data-cursor="interactive">
                Open resume -&gt;
              </a>
            </li>
          </ul>
        </aside>

        <figure className="col-span-6 mt-10 md:col-span-4 md:col-start-9 md:mt-8">
          <div ref={imageRef} className="aspect-[3/4] overflow-hidden border border-ink/15 bg-mutedsurface">
            {/* REPLACE: Editorial black-and-white portrait with directional studio lighting */}
            <img
              src="https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=bharadwaj&backgroundColor=b6e3f4"
              alt="Bharadwaj Reddy portrait placeholder"
              className="h-full w-full object-cover"
              style={{ filter: 'grayscale(1) contrast(1.1)' }}
              onError={(event) => {
                event.currentTarget.src = 'https://www.gravatar.com/avatar?d=mp&s=400'
              }}
            />
          </div>
          <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ghost">
            -&gt; Bharadwaj Reddy, Hyderabad 2024
          </figcaption>
        </figure>

        <div className="col-span-6 mt-14 grid grid-cols-3 gap-5 border-t border-gold/45 pt-8 md:col-span-12 md:mt-14">
          {[
            ['8.74', 'CGPA'],
            ['4+', 'Projects'],
            ['3', 'Hackathons won'],
          ].map(([value, label], idx) => (
            <div key={label}>
              <p ref={(el) => void (statsRef.current[idx] = el)} className="font-display text-[56px] font-extrabold leading-none text-ink md:text-[72px]">
                {value}
              </p>
              <p className="label-text mt-2">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
