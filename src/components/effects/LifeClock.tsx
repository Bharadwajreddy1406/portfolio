'use client'

import { useEffect, useRef } from 'react'

const BIRTH_DATE = new Date(2005, 5, 14, 0, 0, 0)
const DAY_MS = 24 * 60 * 60 * 1000

function getLifeDuration(now: Date) {
  let years = now.getFullYear() - BIRTH_DATE.getFullYear()
  let cursor = new Date(BIRTH_DATE)
  cursor.setFullYear(BIRTH_DATE.getFullYear() + years)

  if (cursor > now) {
    years -= 1
    cursor = new Date(BIRTH_DATE)
    cursor.setFullYear(BIRTH_DATE.getFullYear() + years)
  }

  let months = now.getMonth() - cursor.getMonth()
  if (months < 0) months += 12

  let monthCursor = new Date(cursor)
  monthCursor.setMonth(cursor.getMonth() + months)
  if (monthCursor > now) {
    months -= 1
    monthCursor = new Date(cursor)
    monthCursor.setMonth(cursor.getMonth() + months)
  }

  const calendarDay = (date: Date) => Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  const days = Math.floor((calendarDay(now) - calendarDay(monthCursor)) / DAY_MS)
  const dayCursor = new Date(monthCursor)
  dayCursor.setDate(monthCursor.getDate() + days)

  const remaining = Math.max(0, now.getTime() - dayCursor.getTime())
  const hours = Math.floor(remaining / (60 * 60 * 1000))
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000))
  const seconds = Math.floor((remaining % (60 * 1000)) / 1000)
  const milliseconds = remaining % 1000

  return { years, months, days, hours, minutes, seconds, milliseconds }
}

function formatLifeDuration(now: Date) {
  const duration = getLifeDuration(now)
  const pad = (value: number) => String(value).padStart(2, '0')
  const milliseconds = String(duration.milliseconds).padStart(3, '0')

  return `On Earth for ${duration.years} years, ${duration.months} months, ${duration.days} days, ${pad(duration.hours)} hours, ${pad(duration.minutes)} minutes and ${pad(duration.seconds)}.${milliseconds} seconds.`
}

export default function LifeClock() {
  const valueRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const update = () => {
      if (valueRef.current) valueRef.current.textContent = formatLifeDuration(new Date())
    }

    let animationFrame = 0
    const tick = () => {
      update()
      animationFrame = window.requestAnimationFrame(tick)
    }

    tick()
    return () => window.cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <span
      ref={valueRef}
      className="mt-1 block font-mono text-[11px] leading-[1.7] tracking-[0.02em] text-ink/70"
      aria-label="Time since 14 June 2005"
    />
  )
}
