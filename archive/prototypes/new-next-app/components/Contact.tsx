'use client'

import { FormEvent, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [sent, setSent] = useState(false)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Contact halves settle in from opposite sides to frame CTA and form.
      gsap.from('[data-contact-left]', {
        x: -40,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('[data-contact-row]', {
        y: 24,
        opacity: 0,
        stagger: 0.1,
        duration: 0.45,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => mm.revert()
  }, [])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-32">
      <span className="section-index">07</span>
      <div className="content-grid border-t border-gold pt-10">
        <div data-contact-left className="col-span-6 md:col-span-6">
          <h2 className="font-display text-[clamp(42px,5vw,68px)] leading-[1.02] text-ink">
            <span className="italic font-light">Let&apos;s build</span>
            <br />
            <span className="font-extrabold">something</span>
            <br />
            <span className="font-extrabold text-gold">great.</span>
          </h2>

          <a
            href="mailto:bharadwajreddy1463@gmail.com"
            className="mt-8 inline-block border-b border-ink pb-1 text-[clamp(20px,2.6vw,34px)] text-ink transition hover:border-gold hover:text-gold"
            data-cursor="interactive"
          >
            bharadwajreddy1463@gmail.com
          </a>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.1em] text-ghost">Hyderabad, India · Open to remote</p>
        </div>

        <form onSubmit={onSubmit} className="col-span-6 mt-14 md:col-span-5 md:col-start-8 md:mt-0">
          <div data-contact-row className="mb-6">
            <input
              required
              placeholder="Name"
              className="w-full border-0 border-b border-ink/60 bg-transparent pb-3 text-base outline-none placeholder:text-ghost focus:border-gold"
            />
          </div>
          <div data-contact-row className="mb-6">
            <input
              required
              type="email"
              placeholder="Email"
              className="w-full border-0 border-b border-ink/60 bg-transparent pb-3 text-base outline-none placeholder:text-ghost focus:border-gold"
            />
          </div>
          <div data-contact-row className="mb-8">
            <textarea
              required
              placeholder="Message"
              rows={4}
              className="w-full resize-none border-0 border-b border-ink/60 bg-transparent pb-3 text-base outline-none placeholder:text-ghost focus:border-gold"
            />
          </div>

          <button
            type="submit"
            className="bg-ink px-6 py-3 text-sm tracking-[0.08em] text-gold transition hover:bg-gold hover:text-ink"
            data-cursor="interactive"
          >
            {sent ? 'Sent ✓' : 'Send message ->'}
          </button>
        </form>
      </div>
    </section>
  )
}
