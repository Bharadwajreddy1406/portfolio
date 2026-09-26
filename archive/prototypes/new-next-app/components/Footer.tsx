import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="h-12 bg-ink text-ghost">
      <div className="content-grid h-full items-center">
        <p className="col-span-2 font-display text-lg font-extrabold text-gold">BR</p>
        <nav className="col-span-2 col-start-6 flex items-center justify-center gap-5 font-mono text-[12px] uppercase tracking-[0.1em] md:col-span-4 md:col-start-5">
          <Link href="#about" className="hover:text-gold" data-cursor="interactive">
            About
          </Link>
          <Link href="#projects" className="hover:text-gold" data-cursor="interactive">
            Projects
          </Link>
          <Link href="#contact" className="hover:text-gold" data-cursor="interactive">
            Contact
          </Link>
        </nav>
        <p className="col-span-2 col-start-11 text-right font-mono text-[12px] tracking-[0.08em]">© 2026</p>
      </div>
    </footer>
  )
}
