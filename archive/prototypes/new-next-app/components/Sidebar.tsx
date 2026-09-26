'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger, gsap } from '@/lib/gsap'
import { sectionItems } from '@/lib/editorialData'

export default function Sidebar() {
  const navRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState('landing')

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      sectionItems.forEach((item) => {
        ScrollTrigger.create({
          trigger: `#${item.id}`,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) setActive(item.id)
          },
        })
      })
    })

    return () => {
      mm.revert()
    }
  }, [])

  const iconClass = 'h-[18px] w-[18px] stroke-current'

  return (
    <>
      <aside
        ref={navRef}
        className="fixed left-0 top-0 z-40 hidden h-screen w-[72px] flex-col items-center justify-between bg-ink py-5 md:flex"
      >
        <div className="font-display rotate-[-90deg] text-3xl font-extrabold tracking-[0.08em] text-gold">BR</div>

        <nav className="flex flex-col items-center gap-4">
          {sectionItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="group relative block h-3 w-3 rounded-full border border-gold/70"
              data-cursor="interactive"
              aria-label={item.label}
            >
              <span
                className="absolute inset-0 rounded-full transition"
                style={{ background: active === item.id ? '#C8A96E' : 'transparent' }}
              />
              <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-[#25231d] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ghost opacity-0 transition group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-ghost">
          <a href="https://github.com/Bharadwajreddy1406" target="_blank" rel="noreferrer" data-cursor="interactive" aria-label="GitHub">
            {/* REPLACE: Minimal bespoke GitHub line icon with slightly irregular stroke */}
            <svg className={iconClass} viewBox="0 0 24 24" fill="none">
              <path d="M9 19c-4 1-4-2-6-2m12 4v-3.2a2.8 2.8 0 0 0-.8-2.2c2.6-.3 5.3-1.2 5.3-5.4A4.2 4.2 0 0 0 18.4 7a3.9 3.9 0 0 0-.1-3s-1-.3-3.3 1.2a11.4 11.4 0 0 0-6 0C6.7 3.7 5.7 4 5.7 4a3.9 3.9 0 0 0-.1 3 4.2 4.2 0 0 0-1.1 3.2c0 4.2 2.7 5.1 5.3 5.4a2.8 2.8 0 0 0-.8 2.2V21" strokeWidth="1.5" />
            </svg>
          </a>
          <a href="https://linkedin.com/in/bharadwajreddy1406" target="_blank" rel="noreferrer" data-cursor="interactive" aria-label="LinkedIn">
            {/* REPLACE: Minimal LinkedIn icon monoline mark matching brand geometry */}
            <svg className={iconClass} viewBox="0 0 24 24" fill="none">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Zm-11 1h4v12H5zM7 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" strokeWidth="1.5" />
            </svg>
          </a>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 z-50 flex h-14 w-full items-center justify-around border-t border-gold/30 bg-ink md:hidden">
        {sectionItems.slice(0, 5).map((item) => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ border: `1px solid ${active === item.id ? '#C8A96E' : 'rgba(184,176,160,0.35)'}` }}
            data-cursor="interactive"
            aria-label={item.label}
          >
            {/* REPLACE: Handcrafted mobile glyph set with monoline icon language */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: active === item.id ? '#C8A96E' : '#B8B0A0' }}>
              <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </Link>
        ))}
      </nav>
    </>
  )
}
