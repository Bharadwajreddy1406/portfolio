'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import BlogCard from '@/components/blogs/BlogCard'
import { blogPosts } from '@/data/blogs'
import { gsap } from '@/lib/gsap'

export default function BlogArchiveGrid() {
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-archive-card]', {
        y: 42,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={gridRef} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {blogPosts.map((post, index) => (
        <div key={post.url} data-archive-card>
          <BlogCard post={post} index={index} className="h-full" />
        </div>
      ))}
    </div>
  )
}

