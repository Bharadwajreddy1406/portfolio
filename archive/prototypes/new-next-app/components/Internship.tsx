'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const stack = ['Django', 'PostgreSQL', 'Data-intensive operations', 'Background jobs', 'Performance optimizations', 'AI features']

const aiProducts = [
  {
    name: 'AltiusHub AI',
    href: 'https://altiushub.ai/',
    desc: 'AI-first product surface for intelligent workflows and business automation.',
  },
  {
    name: 'Xplore by AltiusHub',
    href: 'https://xplore.altiushub.com/',
    desc: 'Product exploration experience focused on guided discovery and applied AI utility.',
  },
]

export default function Internship() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-internship-head]', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('[data-internship-pill]', {
        opacity: 0,
        y: 18,
        duration: 0.45,
        ease: 'power2.out',
        stagger: 0.04,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('[data-product-card]', {
        opacity: 0,
        y: 34,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="internship" ref={sectionRef} className="relative py-24 md:py-32">
      <span className="section-index">03</span>
      <div className="content-grid">
        <header className="col-span-6 md:col-span-12" data-internship-head>
          <p className="label-text">- Internship</p>
          <h2 className="font-display text-[clamp(38px,5.4vw,70px)] font-extrabold leading-[0.96] tracking-[-0.03em] text-ink">
            AltiusHub
            <span className="ml-3 font-light italic text-gold">(Jun 2025 - Jun 2026)</span>
          </h2>
          <p className="mt-5 max-w-[72ch] text-[17px] leading-relaxed text-ink/80">
            One-year internship focused on product engineering at scale: high-throughput Django services, PostgreSQL-heavy workflows,
            reliable background processing, and practical AI feature delivery.
          </p>
          <a
            href="https://altiushub.com/"
            target="_blank"
            rel="noreferrer"
            className="gold-link mt-5 inline-flex text-sm"
            data-cursor="interactive"
          >
            Visit organization -&gt;
          </a>
        </header>

        <div className="col-span-6 md:col-span-12 mt-10 flex flex-wrap gap-2">
          {stack.map((item) => (
            <span
              key={item}
              data-internship-pill
              className="rounded-full border border-gold/40 bg-mutedsurface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.09em] text-ink"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="col-span-6 md:col-span-12 mt-10 grid gap-4 md:grid-cols-2">
          {aiProducts.map((product) => (
            <article key={product.name} data-product-card className="border border-ink/15 bg-[#ece4d5] p-5 md:p-6">
              <p className="label-text text-forest">AI Product</p>
              <h3 className="mt-2 font-display text-[28px] font-extrabold leading-tight text-ink">{product.name}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{product.desc}</p>
              <a
                href={product.href}
                target="_blank"
                rel="noreferrer"
                className="gold-link mt-4 inline-flex text-sm"
                data-cursor="interactive"
              >
                Open product -&gt;
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}