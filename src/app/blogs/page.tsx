import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArchiveGrid from '@/components/blogs/BlogArchiveGrid'
import Cursor from '@/components/effects/Cursor'
import { blogPosts } from '@/data/blogs'

export const metadata: Metadata = {
  title: 'Writing | Bharadwaj Reddy',
  description: 'Technical writing by Bharadwaj Reddy on cloud infrastructure, DevOps, automation, and software engineering.',
}

export default function BlogsPage() {
  return (
    <>
      <Cursor />

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[72px] flex-col items-center justify-between bg-ink py-5 md:flex">
        <Link
          href="/"
          className="font-display rotate-[-90deg] text-3xl font-extrabold tracking-[0.08em] text-gold"
          data-cursor="interactive"
          aria-label="Return to portfolio"
        >
          BR
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ghost [writing-mode:vertical-rl]">Writing archive</span>
        <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
      </aside>

      <main className="min-h-screen bg-[#13120f] pb-20 text-parchment md:ml-[72px]">
        <header className="border-b border-gold/25 px-[18px] pb-14 pt-10 md:px-12 md:pb-20 md:pt-14">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-10">
            <nav className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-ghost">
              <Link href="/" className="transition-colors hover:text-gold" data-cursor="interactive">
                &lt;- Back to portfolio
              </Link>
              <span>{String(blogPosts.length).padStart(2, '0')} essays</span>
            </nav>

            <div>
              <p className="label-text text-ghost">- Complete archive</p>
              <h1 className="mt-3 max-w-5xl font-display text-[clamp(58px,10vw,132px)] font-extrabold leading-[0.86] tracking-[-0.055em] text-white">
                Writing on systems
                <span className="block font-light italic text-gold">that actually run.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-parchment/68">
                Notes on cloud infrastructure, automation, networking, and the practical engineering decisions behind reliable software.
              </p>
            </div>
          </div>
        </header>

        <section className="px-[18px] py-14 md:px-12 md:py-20" aria-labelledby="archive-heading">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="mb-8 flex items-end justify-between border-b border-gold/25 pb-5">
              <h2 id="archive-heading" className="font-display text-3xl font-extrabold text-white md:text-4xl">
                All articles
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ghost">Newest additions first</span>
            </div>
            <BlogArchiveGrid />
          </div>
        </section>

        <footer className="px-[18px] pt-8 md:px-12">
          <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between border-t border-gold/20 pt-7 font-mono text-[10px] uppercase tracking-[0.12em] text-ghost">
            <span>Bharadwaj Reddy</span>
            <a
              href="https://bharadwajreddy1406.hashnode.dev/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-gold"
              data-cursor="interactive"
            >
              Hashnode profile -&gt;
            </a>
          </div>
        </footer>
      </main>
    </>
  )
}

