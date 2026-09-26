'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

const LABEL_FONT = '10px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
const FALLOFF_STEPS = 8
const SPRING = 320
const DAMPING = 22

type RevealMode = 'area' | 'letter' | 'off'
type LineStyle = 'dashed' | 'solid'
type TextAlign = 'left' | 'center' | 'right'

type TechTextProps = {
  text?: string
  fontFamily?: string
  fontWeight?: number
  fontStyle?: 'normal' | 'italic'
  fontSize?: number
  letterSpacing?: number
  color?: string
  accentColor?: string
  reveal?: RevealMode
  reach?: number
  softness?: number
  dashLength?: number
  dashGap?: number
  lineStyle?: LineStyle
  strokeWidth?: number
  specks?: number
  selection?: boolean
  labels?: boolean
  draggable?: boolean
  sweep?: boolean
  speed?: number
  align?: TextAlign
  className?: string
  style?: CSSProperties
}

type Settings = Required<Omit<TechTextProps, 'className' | 'style'>>

type Bounds = {
  x1: number
  y1: number
  x2: number
  y2: number
}

type Sprite = {
  image: HTMLCanvasElement
  left: number
  top: number
}

type GlyphBase = {
  char: string
  x: number
  box: Bounds
}

type Glyph = GlyphBase & {
  offset: { x: number; y: number }
  velocity: { x: number; y: number }
  outline: number
  index: number
  fill: Sprite
  dashes: Sprite
}

type WordView = {
  size: number
  baseline: number
  left: number
  right: number
  top: number
  bottom: number
}

type SpacedContext = CanvasRenderingContext2D & { letterSpacing?: string }

const approach = (current: number, target: number, dt: number, seconds: number) =>
  current + (target - current) * (1 - Math.exp(-dt / seconds))

const hexToRgb = (hex: string): [number, number, number] => {
  let value = String(hex || '').replace('#', '')
  if (value.length === 3) value = value.replace(/./g, character => character + character)
  const numeric = Number.parseInt(value.slice(0, 6), 16)
  return Number.isNaN(numeric)
    ? [255, 255, 255]
    : [(numeric >> 16) & 255, (numeric >> 8) & 255, numeric & 255]
}

const rgba = (hex: string, alpha: number) => {
  const [red, green, blue] = hexToRgb(hex)
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

const noise = (...values: number[]) => {
  let hash = 2166136261
  for (const value of values) {
    hash = Math.imul(hash ^ (value | 0), 16777619)
    hash ^= hash >>> 13
    hash = Math.imul(hash, 0x5bd1e995)
    hash ^= hash >>> 15
  }
  return (hash >>> 0) / 4294967296
}

const signed = (value: number) => (value > 0 ? `+${value}` : value < 0 ? `-${-value}` : '0')

export default function TechText({
  text = 'React Bits',
  fontFamily = '',
  fontWeight = 600,
  fontStyle = 'normal',
  fontSize = 150,
  letterSpacing = -0.05,
  color = '#ffffff',
  accentColor = '#ffffff',
  reach = 200,
  softness = 0.7,
  dashLength = 4,
  dashGap = 2,
  strokeWidth = 1.5,
  lineStyle = 'dashed',
  reveal = 'letter',
  specks = 15,
  selection = true,
  labels = true,
  draggable = true,
  sweep = true,
  speed = 1,
  align = 'center',
  className = '',
  style,
}: TechTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const settingsRef = useRef<Settings | null>(null)
  const wakeRef = useRef<() => void>(() => undefined)

  useEffect(() => {
    settingsRef.current = {
      text,
      fontFamily,
      fontWeight,
      fontStyle,
      fontSize,
      letterSpacing,
      color,
      accentColor,
      reach,
      softness,
      dashLength,
      dashGap,
      strokeWidth,
      lineStyle,
      reveal,
      specks,
      selection,
      labels,
      draggable,
      sweep,
      speed,
      align,
    }
    wakeRef.current()
  })

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    const scratch = document.createElement('canvas')
    const scratchContext = scratch.getContext('2d')
    if (!container || !canvas || !context || !scratchContext) return undefined

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    let width = 1
    let height = 1
    let dpr = 1
    let animationFrame = 0
    let last = performance.now()
    let visible = true
    let alive = true
    let layoutKey = ''
    let requestedFont = ''
    let word: WordView | null = null
    let glyphs: Glyph[] = []
    let presence = 0
    let clock = 0
    let pulse = 0
    let placed = false
    let dragging = -1
    const pointer = { x: 0, y: 0, inside: false }
    const grab = { x: 0, y: 0 }
    const lens = { x: 0, y: 0 }
    const frame = { x1: 0, y1: 0, x2: 0, y2: 0, alpha: 0, index: -1 }

    const refreshFonts = () => {
      layoutKey = ''
      wakeRef.current()
    }

    const family = (settings: Settings) =>
      settings.fontFamily || getComputedStyle(container).fontFamily || 'sans-serif'

    const fontFor = (settings: Settings, size: number) =>
      `${settings.fontStyle} ${settings.fontWeight} ${size}px ${family(settings)}`

    const setFont = (target: CanvasRenderingContext2D, settings: Settings, size: number) => {
      target.font = fontFor(settings, size)
      ;(target as SpacedContext).letterSpacing = `${settings.letterSpacing * size}px`
      target.textAlign = 'left'
      target.textBaseline = 'alphabetic'
    }

    const sprite = (settings: Settings, view: WordView, glyph: GlyphBase, stroke: boolean): Sprite => {
      const padding = Math.ceil(settings.strokeWidth * 2 + 4)
      const left = glyph.box.x1 - padding
      const top = glyph.box.y1 - padding
      const spriteWidth = glyph.box.x2 - glyph.box.x1 + padding * 2
      const spriteHeight = glyph.box.y2 - glyph.box.y1 + padding * 2
      const image = document.createElement('canvas')
      image.width = Math.max(1, Math.ceil(spriteWidth * dpr))
      image.height = Math.max(1, Math.ceil(spriteHeight * dpr))
      const spriteContext = image.getContext('2d')
      if (!spriteContext) return { image, left, top }

      spriteContext.setTransform(dpr, 0, 0, dpr, -left * dpr, -top * dpr)
      setFont(spriteContext, settings, view.size)
      if (stroke) {
        spriteContext.lineJoin = 'round'
        spriteContext.lineWidth = settings.strokeWidth * 2
        spriteContext.lineCap = 'butt'
        spriteContext.strokeStyle = settings.color
        if (settings.lineStyle !== 'solid') {
          spriteContext.setLineDash([Math.max(1, settings.dashLength), Math.max(1, settings.dashGap)])
        }
        spriteContext.strokeText(glyph.char, glyph.x, view.baseline)
        spriteContext.setLineDash([])
        spriteContext.globalCompositeOperation = 'destination-out'
        spriteContext.fillStyle = '#000000'
        spriteContext.fillText(glyph.char, glyph.x, view.baseline)
        spriteContext.globalCompositeOperation = 'source-over'
      } else {
        spriteContext.fillStyle = settings.color
        spriteContext.fillText(glyph.char, glyph.x, view.baseline)
      }
      return { image, left, top }
    }

    const ensureLayout = (settings: Settings): WordView => {
      const key = [
        settings.text,
        family(settings),
        settings.fontWeight,
        settings.fontStyle,
        settings.fontSize,
        settings.letterSpacing,
        settings.color,
        settings.dashLength,
        settings.dashGap,
        settings.strokeWidth,
        settings.lineStyle,
        settings.align,
        width,
        height,
        dpr,
      ].join('|')
      if (key === layoutKey && word) return word

      layoutKey = key
      const wanted = fontFor(settings, 64)
      if (document.fonts && wanted !== requestedFont) {
        requestedFont = wanted
        document.fonts.load(wanted, settings.text).then(() => refreshFonts(), () => refreshFonts())
      }

      const probe = scratchContext
      setFont(probe, settings, settings.fontSize)
      let measurement = probe.measureText(settings.text)
      const fit = Math.min(
        1,
        (width * 0.9) / Math.max(measurement.actualBoundingBoxLeft + measurement.actualBoundingBoxRight, 1),
        (height * 0.66) / Math.max(measurement.actualBoundingBoxAscent + measurement.actualBoundingBoxDescent, 1),
      )
      const size = settings.fontSize * fit
      setFont(probe, settings, size)
      measurement = probe.measureText(settings.text)
      const inkWidth = measurement.actualBoundingBoxLeft + measurement.actualBoundingBoxRight
      const inkHeight = measurement.actualBoundingBoxAscent + measurement.actualBoundingBoxDescent
      const x =
        settings.align === 'left'
          ? width * 0.05 + measurement.actualBoundingBoxLeft
          : settings.align === 'right'
            ? width * 0.95 - measurement.actualBoundingBoxRight
            : (width - inkWidth) / 2 + measurement.actualBoundingBoxLeft
      const baseline = (height - inkHeight) / 2 + measurement.actualBoundingBoxAscent
      const next: WordView = {
        size,
        baseline,
        left: x - measurement.actualBoundingBoxLeft,
        right: x + measurement.actualBoundingBoxRight,
        top: baseline - measurement.actualBoundingBoxAscent,
        bottom: baseline + measurement.actualBoundingBoxDescent,
      }
      word = next

      const characters = Array.from(settings.text)
      const previous = glyphs
      glyphs = []
      let prefix = ''
      characters.forEach((character, index) => {
        prefix += character
        const own = probe.measureText(character)
        const glyphX = x + probe.measureText(prefix).width - own.width
        if (!character.trim()) return

        const base: GlyphBase = {
          char: character,
          x: glyphX,
          box: {
            x1: glyphX - own.actualBoundingBoxLeft,
            y1: baseline - own.actualBoundingBoxAscent,
            x2: glyphX + own.actualBoundingBoxRight,
            y2: baseline + own.actualBoundingBoxDescent,
          },
        }
        const kept = previous[glyphs.length]
        glyphs.push({
          ...base,
          offset: kept?.char === character ? kept.offset : { x: 0, y: 0 },
          velocity: { x: 0, y: 0 },
          outline: 0,
          index,
          fill: sprite(settings, next, base, false),
          dashes: sprite(settings, next, base, true),
        })
      })
      dragging = -1
      frame.index = -1
      return next
    }

    const glyphAt = (x: number, y: number) => {
      if (!word || y < word.top - 24 || y > word.bottom + 24) return -1
      let best = -1
      let bestDistance = Number.POSITIVE_INFINITY
      glyphs.forEach((glyph, index) => {
        const x1 = glyph.box.x1 + glyph.offset.x
        const x2 = glyph.box.x2 + glyph.offset.x
        const distance = x < x1 ? x1 - x : x > x2 ? x - x2 : 0
        if (distance < bestDistance) {
          bestDistance = distance
          best = index
        }
      })
      return bestDistance < 28 ? best : -1
    }

    const falloff = (
      target: CanvasRenderingContext2D,
      centerX: number,
      centerY: number,
      radius: number,
      strength: number,
      softnessValue: number,
    ) => {
      const inner = Math.min(1, Math.max(0, 1 - softnessValue))
      const gradient = target.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, `rgba(0, 0, 0, ${strength})`)
      if (inner > 0.995) {
        gradient.addColorStop(0.995, `rgba(0, 0, 0, ${strength})`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        return gradient
      }
      for (let index = 0; index <= FALLOFF_STEPS; index += 1) {
        const progress = index / FALLOFF_STEPS
        const eased = progress * progress * (3 - 2 * progress)
        gradient.addColorStop(
          inner + (1 - inner) * progress,
          `rgba(0, 0, 0, ${strength * (1 - eased)})`,
        )
      }
      return gradient
    }

    const blit = (
      target: CanvasRenderingContext2D,
      art: Sprite,
      deltaX: number,
      deltaY: number,
      originX: number,
      originY: number,
    ) => {
      target.drawImage(
        art.image,
        Math.round((art.left + deltaX) * dpr - originX),
        Math.round((art.top + deltaY) * dpr - originY),
      )
    }

    const drawReveal = (settings: Settings) => {
      const radius = settings.reach * dpr
      const centerX = lens.x * dpr
      const centerY = lens.y * dpr
      context.globalCompositeOperation = 'destination-out'
      context.fillStyle = falloff(context, centerX, centerY, radius, presence, settings.softness)
      context.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2)
      context.globalCompositeOperation = 'source-over'

      const x0 = Math.max(0, Math.floor(centerX - radius))
      const y0 = Math.max(0, Math.floor(centerY - radius))
      const x1 = Math.min(canvas.width, Math.ceil(centerX + radius))
      const y1 = Math.min(canvas.height, Math.ceil(centerY + radius))
      if (x1 <= x0 || y1 <= y0) return
      const drawWidth = x1 - x0
      const drawHeight = y1 - y0
      if (scratch.width < drawWidth || scratch.height < drawHeight) {
        scratch.width = Math.max(scratch.width, drawWidth)
        scratch.height = Math.max(scratch.height, drawHeight)
      }
      scratchContext.setTransform(1, 0, 0, 1, 0, 0)
      scratchContext.globalCompositeOperation = 'source-over'
      scratchContext.clearRect(0, 0, drawWidth, drawHeight)
      for (const glyph of glyphs) {
        blit(scratchContext, glyph.dashes, glyph.offset.x, glyph.offset.y, x0, y0)
      }
      scratchContext.globalCompositeOperation = 'destination-in'
      scratchContext.fillStyle = falloff(
        scratchContext,
        centerX - x0,
        centerY - y0,
        radius,
        1,
        settings.softness,
      )
      scratchContext.fillRect(0, 0, drawWidth, drawHeight)
      scratchContext.globalCompositeOperation = 'source-over'
      context.globalAlpha = presence
      context.drawImage(scratch, 0, 0, drawWidth, drawHeight, x0, y0, drawWidth, drawHeight)
      context.globalAlpha = 1
    }

    const crisp = (value: number) => (Math.round(value * dpr) + 0.5) / dpr

    const perimeterPoint = (distance: number, frameWidth: number, frameHeight: number): [number, number, number, number] => {
      let position =
        ((distance % (2 * (frameWidth + frameHeight))) + 2 * (frameWidth + frameHeight)) %
        (2 * (frameWidth + frameHeight))
      if (position < frameWidth) return [frame.x1 + position, frame.y1, 0, -1]
      position -= frameWidth
      if (position < frameHeight) return [frame.x2, frame.y1 + position, 1, 0]
      position -= frameHeight
      if (position < frameWidth) return [frame.x2 - position, frame.y2, 0, 1]
      position -= frameWidth
      return [frame.x1, frame.y2 - position, -1, 0]
    }

    const drawSpecks = (settings: Settings, frameAlpha: number) => {
      const frameWidth = frame.x2 - frame.x1
      const frameHeight = frame.y2 - frame.y1
      if (frameWidth < 2 || frameHeight < 2) return
      const perimeter = 2 * (frameWidth + frameHeight)
      const seed = frame.index + 1
      const grid = 3

      for (let index = 0; index < settings.specks; index += 1) {
        const period = 0.5 + noise(seed, index, 11) * 1.2
        const progress = pulse / period + noise(seed, index, 17)
        const cycle = Math.floor(progress)
        const life = progress - cycle
        if (life > 0.7) continue
        const [pointX, pointY, normalX, normalY] = perimeterPoint(
          noise(seed, index, cycle) * perimeter,
          frameWidth,
          frameHeight,
        )
        const pick = noise(seed, index, cycle, 2)
        const size = pick < 0.46 ? 2 : pick < 0.7 ? 3 : pick < 0.84 ? 5 : pick < 0.94 ? 8 : 11
        const large = size >= 8
        const outward = (large ? 9 : 4) + Math.floor(noise(seed, index, cycle, 1) * 5) * grid
        const x = frame.x1 + Math.round((pointX + normalX * outward - frame.x1) / grid) * grid
        const y = frame.y1 + Math.round((pointY + normalY * outward - frame.y1) / grid) * grid
        const tone = noise(seed, index, cycle, 3)
        const blink = life < 0.06 || (life > 0.32 && life < 0.36) ? 0.35 : 1
        const alpha = frameAlpha * (large ? 0.3 + 0.4 * tone : 0.3 + 0.6 * tone) * blink
        const left = Math.round(x - size / 2)
        const top = Math.round(y - size / 2)
        if (tone < 0.26 || (large && tone < 0.78)) {
          context.strokeStyle = rgba(settings.accentColor, alpha)
          context.strokeRect(left + 0.5, top + 0.5, size, size)
          if (large && tone > 0.5) {
            context.fillStyle = rgba(settings.accentColor, alpha)
            context.fillRect(Math.round(x) - 1, Math.round(y) - 1, 2, 2)
          }
        } else {
          context.fillStyle = rgba(settings.accentColor, alpha)
          context.fillRect(left, top, size, size)
        }
      }

      for (let trail = 0; trail < 2; trail += 1) {
        const head = (pulse * 0.42 * settings.speed + trail * 0.5) * perimeter
        for (let index = 0; index < 4; index += 1) {
          const [x, y] = perimeterPoint(head - index * 6, frameWidth, frameHeight)
          const size = index === 0 ? 3 : 2
          context.fillStyle = rgba(settings.accentColor, frameAlpha * [0.95, 0.55, 0.32, 0.16][index])
          context.fillRect(Math.round(x - size / 2), Math.round(y - size / 2), size, size)
        }
      }
    }

    const drawFrame = (settings: Settings) => {
      const glyph = glyphs[frame.index]
      if (!glyph || frame.alpha < 0.01) return
      const alpha = frame.alpha
      const x1 = crisp(frame.x1)
      const y1 = crisp(frame.y1)
      const x2 = crisp(frame.x2)
      const y2 = crisp(frame.y2)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const moved = Math.hypot(glyph.offset.x, glyph.offset.y)
      if (moved > 1) {
        const homeX = (glyph.box.x1 + glyph.box.x2) / 2
        const homeY = (glyph.box.y1 + glyph.box.y2) / 2
        context.beginPath()
        context.moveTo(homeX, homeY)
        context.lineTo(homeX + glyph.offset.x, homeY + glyph.offset.y)
        context.setLineDash([3, 4])
        context.lineWidth = 1
        context.strokeStyle = rgba(settings.accentColor, 0.45 * alpha)
        context.stroke()
        context.setLineDash([])
        context.beginPath()
        context.rect(Math.round(homeX) - 2, Math.round(homeY) - 2, 4, 4)
        context.fillStyle = rgba(settings.accentColor, 0.7 * alpha)
        context.fill()
      }

      context.beginPath()
      context.rect(x1, y1, x2 - x1, y2 - y1)
      context.lineWidth = 1
      context.strokeStyle = rgba(settings.accentColor, 0.5 * alpha)
      context.stroke()

      context.beginPath()
      ;[
        [x1, y1],
        [x2, y1],
        [x2, y2],
        [x1, y2],
      ].forEach(([cornerX, cornerY]) => {
        context.rect(Math.round(cornerX) - 2, Math.round(cornerY) - 2, 5, 5)
      })
      context.fillStyle = rgba(settings.accentColor, 0.95 * alpha)
      context.fill()

      if (settings.specks > 0) {
        context.lineWidth = 1
        drawSpecks(settings, alpha)
      }

      if (!settings.labels) return
      context.font = LABEL_FONT
      context.textAlign = 'left'
      context.textBaseline = 'bottom'
      context.fillStyle = rgba(settings.accentColor, 0.62 * alpha)
      const label =
        moved > 1
          ? `${signed(Math.round(glyph.offset.x))}, ${signed(Math.round(-glyph.offset.y))}`
          : `${glyph.char}  ${Math.round(glyph.box.x2 - glyph.box.x1)} x ${Math.round(glyph.box.y2 - glyph.box.y1)}`
      context.fillText(label, Math.round(frame.x1), Math.round(frame.y1) - 7)
    }

    const tick = (now: number) => {
      animationFrame = 0
      const settings = settingsRef.current
      if (!settings) return
      const deltaTime = Math.min(0.05, Math.max(0.001, (now - last) / 1000))
      last = now
      const view = ensureLayout(settings)

      const sweeping = settings.sweep && !reducedMotion && !pointer.inside && dragging < 0
      if (sweeping) clock += deltaTime * settings.speed
      pulse += deltaTime
      let targetX = pointer.x
      let targetY = pointer.y
      if (sweeping) {
        targetX = view.left + (view.right - view.left) * (0.5 - 0.5 * Math.cos(clock * 0.45))
        targetY = view.top + (view.bottom - view.top) * (0.45 + 0.1 * Math.sin(clock * 0.8))
      }
      const active = pointer.inside || sweeping || dragging >= 0
      if (active && !placed) {
        lens.x = targetX
        lens.y = targetY
      }
      if (active) {
        const lag = pointer.inside ? 0.05 : 0.22
        lens.x = approach(lens.x, targetX, deltaTime, lag)
        lens.y = approach(lens.y, targetY, deltaTime, lag)
      }
      placed = active
      presence = approach(
        presence,
        settings.reveal === 'area' && active && dragging < 0 ? 1 : 0,
        deltaTime,
        0.16,
      )

      let moving = false
      glyphs.forEach((glyph, index) => {
        if (index === dragging) {
          glyph.offset.x = approach(glyph.offset.x, pointer.x - grab.x, deltaTime, 0.03)
          glyph.offset.y = approach(glyph.offset.y, pointer.y - grab.y, deltaTime, 0.03)
          glyph.velocity.x = 0
          glyph.velocity.y = 0
          moving = true
          return
        }
        const { offset, velocity } = glyph
        if (
          Math.abs(offset.x) < 0.05 &&
          Math.abs(offset.y) < 0.05 &&
          Math.hypot(velocity.x, velocity.y) < 0.5
        ) {
          offset.x = 0
          offset.y = 0
          velocity.x = 0
          velocity.y = 0
          return
        }
        velocity.x += (-SPRING * offset.x - DAMPING * velocity.x) * deltaTime
        velocity.y += (-SPRING * offset.y - DAMPING * velocity.y) * deltaTime
        offset.x += velocity.x * deltaTime
        offset.y += velocity.y * deltaTime
        moving = true
      })

      const focus = dragging >= 0 ? dragging : active ? glyphAt(lens.x, lens.y) : -1
      if (focus >= 0 && settings.selection) {
        const glyph = glyphs[focus]
        const boxX1 = glyph.box.x1 + glyph.offset.x - 6
        const boxY1 = glyph.box.y1 + glyph.offset.y - 6
        const boxX2 = glyph.box.x2 + glyph.offset.x + 6
        const boxY2 = glyph.box.y2 + glyph.offset.y + 6
        if (frame.index < 0 || frame.alpha < 0.02) {
          frame.x1 = boxX1
          frame.y1 = boxY1
          frame.x2 = boxX2
          frame.y2 = boxY2
        }
        const glide = focus === dragging ? 0.02 : 0.08
        frame.x1 = approach(frame.x1, boxX1, deltaTime, glide)
        frame.y1 = approach(frame.y1, boxY1, deltaTime, glide)
        frame.x2 = approach(frame.x2, boxX2, deltaTime, glide)
        frame.y2 = approach(frame.y2, boxY2, deltaTime, glide)
        frame.index = focus
      }
      frame.alpha = approach(frame.alpha, focus >= 0 && settings.selection ? 1 : 0, deltaTime, 0.1)

      glyphs.forEach((glyph, index) => {
        const target = settings.reveal === 'letter' && index === focus && index !== dragging ? 1 : 0
        glyph.outline = approach(glyph.outline, target, deltaTime, 0.09)
        if (Math.abs(glyph.outline - target) > 0.002) moving = true
        else glyph.outline = target
      })

      context.setTransform(1, 0, 0, 1, 0, 0)
      context.globalCompositeOperation = 'source-over'
      context.clearRect(0, 0, canvas.width, canvas.height)
      for (const glyph of glyphs) {
        const moved = Math.hypot(glyph.offset.x, glyph.offset.y)
        if (moved > 1) {
          context.globalAlpha = Math.min(1, moved / 24) * 0.55
          blit(context, glyph.dashes, 0, 0, 0, 0)
          context.globalAlpha = 1
        }
      }
      for (const glyph of glyphs) {
        if (glyph.outline < 0.999) {
          context.globalAlpha = 1 - glyph.outline
          blit(context, glyph.fill, glyph.offset.x, glyph.offset.y, 0, 0)
        }
        if (glyph.outline > 0.001) {
          context.globalAlpha = glyph.outline
          blit(context, glyph.dashes, glyph.offset.x, glyph.offset.y, 0, 0)
        }
        context.globalAlpha = 1
      }
      if (presence > 0.001) drawReveal(settings)
      drawFrame(settings)

      const settling =
        moving ||
        Math.abs(presence - (settings.reveal === 'area' && active && dragging < 0 ? 1 : 0)) > 0.002 ||
        (frame.alpha > 0.01 && frame.alpha < 0.99)
      if ((active || settling) && visible && alive) animationFrame = requestAnimationFrame(tick)
    }

    const wake = () => {
      if (animationFrame || !visible || !alive) return
      last = performance.now()
      animationFrame = requestAnimationFrame(tick)
    }
    wakeRef.current = wake

    const resize = () => {
      width = Math.max(1, container.clientWidth)
      height = Math.max(1, container.clientHeight)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      layoutKey = ''
      wake()
    }

    const locate = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }
    const onMove = (event: PointerEvent) => {
      locate(event)
      pointer.inside = true
      wake()
    }
    const onLeave = () => {
      if (dragging >= 0) return
      pointer.inside = false
      wake()
    }
    const onDown = (event: PointerEvent) => {
      locate(event)
      pointer.inside = true
      const settings = settingsRef.current
      if (settings?.draggable && (event.pointerType !== 'mouse' || event.button === 0)) {
        const index = glyphAt(pointer.x, pointer.y)
        if (index >= 0) {
          dragging = index
          grab.x = pointer.x - glyphs[index].offset.x
          grab.y = pointer.y - glyphs[index].offset.y
          container.setPointerCapture?.(event.pointerId)
        }
      }
      wake()
    }
    const onUp = (event: PointerEvent) => {
      if (dragging >= 0) {
        dragging = -1
        container.releasePointerCapture?.(event.pointerId)
        const rect = container.getBoundingClientRect()
        pointer.inside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
      }
      wake()
    }

    container.addEventListener('pointermove', onMove, { passive: true })
    container.addEventListener('pointerenter', onMove, { passive: true })
    container.addEventListener('pointerdown', onDown, { passive: true })
    container.addEventListener('pointerup', onUp, { passive: true })
    container.addEventListener('pointercancel', onUp, { passive: true })
    container.addEventListener('pointerleave', onLeave, { passive: true })

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting)
      wake()
    })
    intersectionObserver.observe(container)
    if (document.fonts) document.fonts.ready.then(() => refreshFonts(), () => refreshFonts())

    resize()

    return () => {
      alive = false
      cancelAnimationFrame(animationFrame)
      wakeRef.current = () => undefined
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      container.removeEventListener('pointermove', onMove)
      container.removeEventListener('pointerenter', onMove)
      container.removeEventListener('pointerdown', onDown)
      container.removeEventListener('pointerup', onUp)
      container.removeEventListener('pointercancel', onUp)
      container.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <span
      ref={containerRef}
      className={`tech-text ${className}`.trim()}
      style={style}
      role="img"
      aria-label={text}
    >
      <canvas ref={canvasRef} className="tech-text-canvas" />
    </span>
  )
}
