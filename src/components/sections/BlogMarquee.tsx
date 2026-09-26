'use client'

import Link from 'next/link'
import { FocusEvent, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import BlogCard from '@/components/blogs/BlogCard'
import { BLOG_ARCHIVE_THRESHOLD, blogPosts } from '@/data/blogs'
import { gsap } from '@/lib/gsap'

export default function BlogMarquee() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const marqueeTween = useRef<gsap.core.Tween | null>(null)
  const showArchiveLink = blogPosts.length > BLOG_ARCHIVE_THRESHOLD
  const marqueePosts = blogPosts.slice(0, BLOG_ARCHIVE_THRESHOLD)

  useGSAP(() => {
    if (!trackRef.current) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      marqueeTween.current = gsap.to(trackRef.current, {
        xPercent: -50,
        duration: Math.max(48, marqueePosts.length * 9.5),
        repeat: -1,
        ease: 'none',
      })

      gsap.from('[data-blog-marquee-card]', {
        y: 36,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('[data-blog-heading]', {
        y: 28,
        autoAlpha: 0,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 86%',
          toggleActions: 'play none none reverse',
        },
      })

      return () => {
        marqueeTween.current = null
      }
    })

    return () => mm.revert()
  }, [])

  const pauseMarquee = () => marqueeTween.current?.pause()
  const resumeMarquee = () => marqueeTween.current?.play()
  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) resumeMarquee()
  }

  return (
    <section id="blogs" ref={sectionRef} className="relative overflow-hidden bg-ink py-24 text-parchment md:py-32">
      <span className="section-index text-ghost">07</span>

      <div className="content-grid">
        <header data-blog-heading className="col-span-6 mb-12 md:col-span-12 md:flex md:items-end md:justify-between">
          <div>
            <p className="label-text text-ghost">- Writing</p>
            <h2 className="mt-2 font-display text-[clamp(42px,6vw,74px)] font-extrabold leading-[0.96] tracking-[-0.035em] text-white">
              Articles by me
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-parchment/65">
              Practical essays on infrastructure, automation, cloud systems, and the engineering ideas behind them.
            </p>
          </div>

          {showArchiveLink && (
            <Link
              href="/blogs"
              className="mt-7 inline-flex border border-gold px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-gold transition-colors hover:bg-gold hover:text-ink md:mt-0"
              data-cursor="interactive"
            >
              View all {blogPosts.length} posts -&gt;
            </Link>
          )}
        </header>
      </div>

      <div
        className="overflow-hidden motion-reduce:overflow-x-auto"
        aria-label="Latest blog posts"
        onMouseEnter={pauseMarquee}
        onMouseLeave={resumeMarquee}
        onFocus={pauseMarquee}
        onBlur={handleBlur}
      >
        <div ref={trackRef} className="flex w-max will-change-transform motion-reduce:transform-none">
          {[0, 1].map((setIndex) => (
            <div
              key={setIndex}
              className={`flex shrink-0 gap-4 pr-4 ${setIndex === 1 ? 'motion-reduce:hidden' : ''}`}
              aria-hidden={setIndex === 1}
            >
              {marqueePosts.map((post, index) => (
                <BlogCard
                  key={`${setIndex}-${post.url}`}
                  post={post}
                  index={index}
                  tabIndex={setIndex === 1 ? -1 : undefined}
                  className="w-[min(82vw,390px)] shrink-0 md:w-[390px]"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
