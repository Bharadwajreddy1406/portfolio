'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const stack = [
  'AWS Bedrock AgentCore',
  'Strands Agents SDK',
  'FastAPI',
  'Django',
  'PostgreSQL',
  'OpenAI Agents SDK',
  'RAG Pipelines',
  'SFTP integrations',
]

const impact = [
  {
    metric: '3-4s to 1s',
    title: 'Faster navigation',
    detail: 'Built full-text navigation shortcuts for Helix, the internal multi-agent AI harness.',
  },
  {
    metric: '5-6GB to 1-2GB',
    title: 'Lower memory usage',
    detail: 'Refactored file generation around chunked database reads and indexed query caching.',
  },
  {
    metric: 'Concurrent',
    title: 'Reliable job execution',
    detail: 'Redesigned sequential background processing with non-overlapping, database-level locks.',
  },
]

const aiProducts = [
  {
    name: 'AltiusHub AI',
    href: 'https://altiushub.ai/',
    desc: 'RAG-based compliance assistant covering nine regulatory bodies, built with FastAPI, React, MongoDB, and OpenAI.',
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

      gsap.from('[data-impact-card]', {
        opacity: 0,
        y: 24,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 74%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="internship" ref={sectionRef} className="relative py-24 md:py-32">
      <span className="section-index">04</span>
      <div className="content-grid">
        <header className="col-span-6 md:col-span-12" data-internship-head>
          <p className="label-text">- Experience</p>
          <div className="mt-2 flex flex-wrap items-end gap-x-5 gap-y-3">
            <h2 className="font-display text-[clamp(42px,5.4vw,70px)] font-extrabold leading-[0.96] tracking-[-0.03em] text-ink">
              AltiusHub
            </h2>
            <span className="rounded-full border border-forest/30 bg-forest/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.09em] text-forest">
              Current - Software Engineer (GET)
            </span>
          </div>
          <div className="mt-6 grid max-w-4xl gap-3 sm:grid-cols-2">
            <div className="border-l-2 border-gold pl-4">
              <p className="label-text">Current role</p>
              <p className="mt-1 text-[16px] text-ink">Software Engineer (GET)</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ghost">Jun 2026 - Present</p>
            </div>
            <div className="border-l border-ink/20 pl-4">
              <p className="label-text">Previous role</p>
              <p className="mt-1 text-[16px] text-ink">Software Engineering Intern</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ghost">Jun 2025 - Jun 2026</p>
            </div>
          </div>
          <p className="mt-5 max-w-[72ch] text-[17px] leading-relaxed text-ink/80">
            Backend developer working on data-intensive traceability systems and multi-variant XML ingestion/generation pipelines with SFTP integrations. Building an AI harness for traceability that gives the platform real-time visibility into supply-chain movements.
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

        <div className="col-span-6 mt-10 grid gap-px bg-ink/15 md:col-span-12 md:grid-cols-3">
          {impact.map((item) => (
            <article key={item.title} data-impact-card className="bg-parchment p-5 md:p-6">
              <p className="font-display text-[26px] font-extrabold leading-tight text-gold">{item.metric}</p>
              <h3 className="mt-3 text-[17px] font-medium text-ink">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink/70">{item.detail}</p>
            </article>
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
