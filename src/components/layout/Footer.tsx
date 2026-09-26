'use client'

import Link from 'next/link'
import type { MouseEvent } from 'react'
import { ScrollSmoother } from '@/lib/gsap'

export default function Footer() {
  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    const target = document.getElementById(id)
    if (!target) return

    window.history.replaceState(null, '', `#${id}`)
    const smoother = ScrollSmoother.get()
    if (smoother) {
      smoother.scrollTo(target, true, 'top top')
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className="bg-ink pb-24 pt-12 text-parchment md:pb-10 md:pt-14">
      <div className="content-grid">
        <div className="col-span-6 md:col-span-6">
          <p className="font-display text-[clamp(34px,4vw,56px)] font-extrabold tracking-[-0.04em] text-white">
            Bharadwaj <span className="font-light italic text-gold">Reddy.</span>
          </p>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-parchment/60">
            Backend engineering, AI systems, and software architecture. Building reliable software and sharing what I learn along the way.
          </p>
        </div>

        <div className="col-span-6 mt-10 grid grid-cols-2 gap-8 md:col-span-5 md:col-start-8 md:mt-1 md:grid-cols-3">
          <nav aria-label="Footer navigation">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">Navigate</p>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-parchment/70">
              <Link href="#about" onClick={(event) => handleNavigation(event, 'about')} className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none" data-cursor="interactive">
                About
              </Link>
              <Link href="#projects" onClick={(event) => handleNavigation(event, 'projects')} className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none" data-cursor="interactive">
                Projects
              </Link>
              <Link href="#education" onClick={(event) => handleNavigation(event, 'education')} className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none" data-cursor="interactive">
                Education
              </Link>
              <Link href="#blogs" onClick={(event) => handleNavigation(event, 'blogs')} className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none" data-cursor="interactive">
                Articles
              </Link>
            </div>
          </nav>

          <nav aria-label="Social links">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">Elsewhere</p>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-parchment/70">
              <a href="https://github.com/Bharadwajreddy1406" target="_blank" rel="noreferrer" className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none" data-cursor="interactive">
                GitHub
              </a>
              <a href="https://linkedin.com/in/bharadwajreddy1406" target="_blank" rel="noreferrer" className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none" data-cursor="interactive">
                LinkedIn
              </a>
              <a href="https://bharadwajreddy1406.hashnode.dev/" target="_blank" rel="noreferrer" className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none" data-cursor="interactive">
                Hashnode
              </a>
            </div>
          </nav>

          <div className="col-span-2 md:col-span-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">Return</p>
            <Link
              href="#landing"
              onClick={(event) => handleNavigation(event, 'landing')}
              className="mt-4 inline-flex min-h-11 items-center border-b border-gold/45 text-sm text-parchment/70 transition-colors hover:border-gold hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              data-cursor="interactive"
            >
              Back to top -&gt;
            </Link>
          </div>
        </div>

        <div className="col-span-6 mt-12 border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-ghost md:col-span-12">
          <p>&copy; 2026 Bharadwaj Reddy · Designed &amp; built by Bharadwaj</p>
        </div>
      </div>
    </footer>
  )
}
