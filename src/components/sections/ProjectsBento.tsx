'use client'

import { MouseEvent, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { projects } from '@/data/portfolio'

function cardClasses(index: number) {
  // Pattern: Large Lead, 2 Small side, 1 Large, Multi-grid flow
  if (index === 0) return 'col-span-12 md:col-span-8 md:row-span-2'
  if (index === 1) return 'col-span-12 sm:col-span-6 md:col-span-4'
  if (index === 2) return 'col-span-12 sm:col-span-6 md:col-span-4'
  if (index === 3) return 'col-span-12 md:col-span-7 md:row-span-2'
  if (index === 4) return 'col-span-12 md:col-span-5'
  if (index === 5) return 'col-span-12 md:col-span-5'
  if (index === 6) return 'col-span-12 sm:col-span-6 md:col-span-4'
  return 'col-span-12 sm:col-span-6 md:col-span-4'
}

export default function ProjectsBento() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Cards stage in from lower depth with staggered editorial reveal.
      gsap.from('[data-project-card]', {
        y: 60,
        opacity: 0,
        scale: 0.97,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => mm.revert()
  }, [])

  const onMove = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const xRatio = (event.clientX - rect.left) / rect.width - 0.5
    const yRatio = (event.clientY - rect.top) / rect.height - 0.5

    // Mouse tilt uses limited 3D rotation to add depth without gimmick.
    gsap.to(card, {
      rotateY: xRatio * 6,
      rotateX: -yRatio * 6,
      transformPerspective: 1000,
      duration: 0.25,
      ease: 'power2.out',
    })
  }

  const onLeave = (event: MouseEvent<HTMLElement>) => {
    gsap.to(event.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' })
  }

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 md:py-32">
      <span className="section-index">06</span>
      <div className="content-grid">
        <header className="col-span-6 mb-10 md:col-span-8">
          <p className="label-text">- Projects</p>
          <h2 className="font-display text-[clamp(42px,6vw,74px)] font-extrabold tracking-[-0.03em]">My Projects</h2>
        </header>

        <div className="col-span-6 md:col-span-12 grid auto-rows-[minmax(300px,auto)] gap-4 md:grid-cols-12 md:gap-6">
          {projects.map((project, index) => (
            <article
              key={project.name}
              data-project-card
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              className={`relative overflow-hidden bg-mutedsurface p-5 md:p-7 ${cardClasses(index)}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex h-full flex-col">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-gold">{project.tag}</p>
              <h3 className={`mt-2 font-display ${project.large ? 'text-[28px]' : 'text-[20px]'} font-extrabold leading-tight text-ink`}>
                {project.name}
              </h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.09em] text-ghost">{project.date}</p>
              <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-ink/80">{project.description}</p>
              <p className="mt-3 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-forest">
                {project.tech.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </p>

              <div className="mt-4 flex gap-5 text-sm">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="gold-link" data-cursor="interactive">
                    View code -&gt;
                  </a>
                )}
              </div>

              <div className={`mt-6 flex flex-col gap-3 overflow-hidden border border-ink/10 bg-[#e5decd] ${project.large ? 'md:mt-auto' : ''}`}>
                {/* Primary Image */}
                <img
                  src={project.image}
                  alt={`${project.name} project visual`}
                  className={
                    ('imageClassName' in project && project.imageClassName) 
                    ? (project.imageClassName as string)
                    : `w-full object-contain p-3 transition duration-500 ${project.large ? 'h-52 md:h-64' : 'h-40 md:h-44'}`
                  }
                  style={{ filter: 'grayscale(1)', transition: 'filter 0.3s ease-in-out' }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.filter = 'grayscale(0)'
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.filter = 'grayscale(1)'
                  }}
                  onError={(event) => {
                    event.currentTarget.src = project.fallback
                  }}
                />
                
                {/* Secondary Image (if exists) */}
                {'secondaryImage' in project && project.secondaryImage && (
                  <img
                    src={project.secondaryImage as string}
                    alt={`${project.name} secondary visual`}
                    className={
                      ('imageClassName' in project && project.imageClassName) 
                      ? (project.imageClassName as string)
                      : `w-full object-contain p-3 transition duration-500 ${project.large ? 'h-52 md:h-64' : 'h-40 md:h-44'}`
                    }
                    style={{ filter: 'grayscale(1)', transition: 'filter 0.3s ease-in-out' }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.filter = 'grayscale(0)'
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.filter = 'grayscale(1)'
                    }}
                    onError={(event) => {
                      event.currentTarget.src = project.fallback
                    }}
                  />
                )}
              </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
