'use client'

import { FormEvent, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

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

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setSent(false)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        setSent(true)
        setName('')
        setEmail('')
        setMessage('')
      } else {
        throw new Error('Unable to send message')
      }
    } catch (error) {
      console.error('Failed to send message', error)
      setError('The message could not be sent. Please email me directly instead.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 md:py-24">
      <span className="section-index">08</span>
      <div className="content-grid">
        <header data-contact-left className="col-span-6 md:col-span-5">
          <p className="label-text">- Contact</p>
          <h2 className="mt-4 font-display text-[clamp(48px,6vw,80px)] leading-[0.95] tracking-[-0.04em] text-ink">
            <span className="font-light italic">Let&apos;s build</span>
            <br />
            <span className="font-extrabold">something</span>
            <br />
            <span className="font-extrabold text-gold">meaningful.</span>
          </h2>
          <p className="mt-7 max-w-[46ch] text-[16px] leading-relaxed text-ink/70">
            Have an opportunity, a collaboration idea, or an interesting engineering challenge? I&apos;d love to hear about it. Tell me what you&apos;re working on.
          </p>

          <div className="mt-10 grid gap-6 border-y border-gold/45 py-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <div>
              <p className="label-text">Write directly</p>
              <a
                href="mailto:bharadwajreddy.vancha@gmail.com"
                className="mt-2 inline-flex break-all text-[15px] text-ink underline decoration-gold/50 underline-offset-4 transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                data-cursor="interactive"
              >
                bharadwajreddy.vancha@gmail.com
              </a>
            </div>
            <div>
              <p className="label-text">Based in</p>
              <p className="mt-2 text-[15px] text-ink">Hyderabad, India</p>
              <p className="mt-1 text-sm text-ink/60">Open to remote collaboration</p>
            </div>
          </div>
        </header>

        <form
          onSubmit={onSubmit}
          className="col-span-6 mt-12 border border-ink/10 bg-mutedsurface p-6 md:col-span-6 md:col-start-7 md:mt-0 md:p-8 lg:p-10"
        >
          <div className="mb-8 border-b border-ink/15 pb-5">
            <div>
              <p className="font-display text-2xl font-extrabold text-ink">Start a conversation</p>
              <p className="mt-1 text-sm text-ink/60">
                Fields marked <span className="font-semibold text-red-700">*</span> are required.
              </p>
            </div>
          </div>

          <div className="grid gap-7 sm:grid-cols-2">
            <div data-contact-row>
              <label htmlFor="contact-name" className="font-mono text-[11px] uppercase tracking-[0.11em] text-ink/65">
                Your name <span className="text-red-700" aria-hidden="true">*</span><span className="sr-only"> required</span>
              </label>
              <input
                id="contact-name"
                required
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 min-h-12 w-full border-0 border-b border-ink/45 bg-transparent py-3 text-base text-ink outline-none transition-colors focus:border-gold"
              />
            </div>
            <div data-contact-row>
              <label htmlFor="contact-email" className="font-mono text-[11px] uppercase tracking-[0.11em] text-ink/65">
                Email address <span className="text-red-700" aria-hidden="true">*</span><span className="sr-only"> required</span>
              </label>
              <input
                id="contact-email"
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 min-h-12 w-full border-0 border-b border-ink/45 bg-transparent py-3 text-base text-ink outline-none transition-colors focus:border-gold"
              />
            </div>
          </div>

          <div data-contact-row className="mt-8">
            <label htmlFor="contact-message" className="font-mono text-[11px] uppercase tracking-[0.11em] text-ink/65">
              What would you like to discuss? <span className="text-red-700" aria-hidden="true">*</span><span className="sr-only"> required</span>
            </label>
            <textarea
              id="contact-message"
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
              className="mt-2 w-full resize-none border-0 border-b border-ink/45 bg-transparent py-3 text-base leading-relaxed text-ink outline-none transition-colors focus:border-gold"
            />
          </div>

          <div data-contact-row className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 items-center justify-center bg-ink px-7 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-gold transition-colors hover:bg-gold hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-50"
              data-cursor="interactive"
            >
              {loading ? 'Sending...' : sent ? 'Message sent' : 'Send message ->'}
            </button>
            <p className="max-w-[30ch] text-sm leading-relaxed text-ink/55">I usually reply as soon as I can.</p>
          </div>

          <p className={`mt-5 text-sm ${error ? 'text-red-800' : 'text-forest'}`} aria-live="polite">
            {error || (sent ? 'Thanks - your message is on its way.' : '')}
          </p>
        </form>
      </div>
    </section>
  )
}
