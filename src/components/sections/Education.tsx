'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { academicAchievements, education, publications } from '@/data/portfolio'
import { gsap } from '@/lib/gsap'

const academicMetrics = [
  { value: education.cgpa, label: 'CGPA' },
  { value: '# 2', label: 'IEEE Research Papers', href: publications[0].url },
  { value: '# 1', label: 'Indian Patent Published' },
] as const

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-education-item]', {
        y: 34,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="education" ref={sectionRef} className="relative bg-mutedsurface py-24 md:py-32">
      <span className="section-index">03</span>

      <div className="content-grid">
        <header data-education-item className="col-span-6 md:col-span-4">
          <p className="label-text">- Education &amp; Research</p>
          <h2 className="mt-3 font-display text-[clamp(48px,6vw,76px)] font-extrabold leading-[0.94] tracking-[-0.04em] text-ink">
            Education
            <span className="block font-light italic text-gold">&amp; Research.</span>
          </h2>
          <p className="mt-7 max-w-[38ch] text-[16px] leading-relaxed text-ink/70">
            Four years of computer science, research, and experimentation that shaped my approach to building software.
          </p>
        </header>

        <div className="col-span-6 mt-12 md:col-span-8 md:col-start-5 md:mt-0">
          <article data-education-item className="border-y border-gold/55 py-7 md:py-9">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-display text-[clamp(25px,3vw,38px)] font-extrabold leading-tight text-ink">
                  {education.institution}
                </p>
                <p className="mt-3 text-[17px] text-ink/75">{education.degree}</p>
              </div>
              <div className="shrink-0 font-mono text-[11px] uppercase tracking-[0.1em] text-ghost sm:text-right">
                <p>{education.period}</p>
                <p className="mt-2">{education.location}</p>
              </div>
            </div>
          </article>

          <div data-education-item className="grid grid-cols-1 border-b border-gold/55 sm:grid-cols-3">
            {academicMetrics.map((metric, index) => (
              <div
                key={metric.label}
                className={`py-7 sm:px-6 ${index > 0 ? 'border-t border-gold/30 sm:border-l sm:border-t-0' : ''}`}
              >
                <p className="font-display text-[48px] font-extrabold leading-none text-ink md:text-[58px]">
                  {metric.value}
                </p>
                <p className="label-text mt-3">{metric.label}</p>
                {'href' in metric && metric.href && (
                  <a
                    href={metric.href}
                    target="_blank"
                    rel="noreferrer"
                    className="gold-link mt-3 inline-flex text-sm"
                    data-cursor="interactive"
                  >
                    View publications -&gt;
                  </a>
                )}
              </div>
            ))}
          </div>

          <div data-education-item className="mt-10">
            <div className="mb-5 flex items-end justify-between border-b border-ink/15 pb-4">
              <h3 className="font-display text-2xl font-extrabold text-ink md:text-3xl">Achievements</h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ghost">Beyond the Classroom</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {academicAchievements.map((achievement, index) => (
                <article key={achievement.name} className="flex min-h-[170px] flex-col border border-ink/10 bg-parchment p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold">
                    Achievement / {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-6 font-display text-xl font-extrabold leading-tight text-ink">{achievement.name}</p>
                  <p className="mt-auto pt-5 font-mono text-[11px] uppercase tracking-[0.1em] text-forest">{achievement.org}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
