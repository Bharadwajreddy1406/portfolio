import type { BlogPost } from '@/data/blogs'

type BlogCardProps = {
  post: BlogPost
  index: number
  className?: string
  tabIndex?: number
}

export default function BlogCard({ post, index, className = '', tabIndex }: BlogCardProps) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noreferrer"
      tabIndex={tabIndex}
      className={`group flex min-h-[310px] flex-col border border-gold/35 bg-[#191813] p-6 text-parchment transition-colors duration-300 hover:border-gold hover:bg-[#211f19] focus-visible:border-gold focus-visible:outline-none md:p-7 ${className}`}
      data-cursor="interactive"
    >
      <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ghost">
        <span>Article / {String(index + 1).padStart(2, '0')}</span>
        <span aria-hidden="true" className="text-gold transition-transform duration-300 group-hover:translate-x-1">
          -&gt;
        </span>
      </div>

      <h3 className="mt-8 max-w-[18ch] font-display text-[clamp(25px,2.2vw,34px)] font-extrabold leading-[1.08] tracking-[-0.025em] text-white">
        {post.title}
      </h3>
      <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-parchment/70">{post.excerpt}</p>

      <div className="mt-auto flex flex-wrap gap-x-3 gap-y-2 pt-8 font-mono text-[10px] uppercase tracking-[0.11em] text-gold">
        {post.topics.map((topic) => (
          <span key={topic}>{topic}</span>
        ))}
      </div>
    </a>
  )
}
