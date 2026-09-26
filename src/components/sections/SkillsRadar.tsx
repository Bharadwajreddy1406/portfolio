'use client'

import { useMemo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { radarAxes, technicalSkillGroups } from '@/data/portfolio'

const size = 380
const center = size / 2
const radius = 132

function radialPoint(index: number, total: number, value: number) {
  const angle = (-Math.PI / 2) + (index / total) * (Math.PI * 2)
  const scaled = (value / 100) * radius
  return {
    x: center + Math.cos(angle) * scaled,
    y: center + Math.sin(angle) * scaled,
  }
}

export default function SkillsRadar() {
  const sectionRef = useRef<HTMLElement>(null)
  const polygonRef = useRef<SVGPolygonElement>(null)

  const fullPoints = useMemo(
    () => radarAxes.map((axis, idx) => radialPoint(idx, radarAxes.length, axis.value)),
    []
  )

  const axisPoints = useMemo(
    () => radarAxes.map((_, idx) => radialPoint(idx, radarAxes.length, 100)),
    []
  )

  const labelPoints = useMemo(
    () => radarAxes.map((_, idx) => radialPoint(idx, radarAxes.length, 118)),
    []
  )

  useGSAP(() => {
    if (!polygonRef.current) return

    const targetPoints = fullPoints.map((point) => `${point.x},${point.y}`).join(' ')
    polygonRef.current.setAttribute('points', targetPoints)

    const progress = { value: 1 }
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Radar polygon interpolates from center to target skill values.
      gsap.fromTo(progress, { value: 0 }, {
        value: 1,
        duration: 1.3,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        onUpdate: () => {
          const points = fullPoints
            .map((point) => {
              const x = center + (point.x - center) * progress.value
              const y = center + (point.y - center) * progress.value
              return `${x},${y}`
            })
            .join(' ')
          polygonRef.current?.setAttribute('points', points)
        },
      })

      // Category rows appear in sequence under the chart.
      gsap.fromTo(sectionRef.current?.querySelectorAll('[data-skill-line]') ?? [], { opacity: 0, y: 20 }, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => mm.revert()
  }, [fullPoints])

  return (
    <section id="skills" ref={sectionRef} className="relative overflow-hidden bg-ink py-24 text-parchment md:py-32">
      <span className="section-index text-ghost">05</span>
      <div className="content-grid">
        <div className="col-span-6 mb-10 md:col-span-7">
          <p className="label-text text-ghost">- Skills</p>
          <h2 className="font-display text-[clamp(42px,6vw,72px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-white">
            Capability Map
          </h2>
        </div>

        <div className="col-span-6 md:col-span-6 md:col-start-4">
          {/* REPLACE: Bespoke radar diagram with custom geometric axis styling and editorial grid marks */}
          <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[430px]">
            <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(255,255,255,0.16)" />
            <circle cx={center} cy={center} r={radius * 0.66} fill="none" stroke="rgba(255,255,255,0.12)" />
            <circle cx={center} cy={center} r={radius * 0.33} fill="none" stroke="rgba(255,255,255,0.1)" />

            {axisPoints.map((point, idx) => (
              <g key={radarAxes[idx].label}>
                <line x1={center} y1={center} x2={point.x} y2={point.y} stroke="rgba(255,255,255,0.2)" />
                <text
                  x={labelPoints[idx].x > center ? size - 8 : labelPoints[idx].x < center ? 8 : labelPoints[idx].x}
                  y={labelPoints[idx].y}
                  fill="rgba(255,255,255,0.72)"
                  fontSize="12"
                  textAnchor={labelPoints[idx].x > center ? 'end' : labelPoints[idx].x < center ? 'start' : 'middle'}
                  className="font-mono"
                  dy={labelPoints[idx].y > center ? 14 : -8}
                >
                  {radarAxes[idx].label}
                </text>
              </g>
            ))}

            <polygon ref={polygonRef} points={Array.from({ length: radarAxes.length }, () => `${center},${center}`).join(' ')} fill="#2D5A4F" fillOpacity="0.4" stroke="#C8A96E" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="col-span-6 mt-12 space-y-5 text-base text-white/90 md:col-span-10 md:col-start-2">
          {technicalSkillGroups.map((group) => (
            <p key={group.label} data-skill-line className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-ghost">{group.label} - </span>
              {group.skills.map((skill, index) => (
                <span key={skill} className="inline-flex items-baseline gap-4">
                  {index > 0 && <span className="text-gold">&middot;</span>}
                  {skill}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
