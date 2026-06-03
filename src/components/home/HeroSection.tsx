'use client'
import { useRef, useLayoutEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// ─── SCREEN_CORNERS ──────────────────────────────────────────────────────────
// Four inner-glass corners as % of the image's INTRINSIC size.
// Use ?calibrate in the URL (dev/staging only) to drag handles and read
// the exact values to paste back here.
const SCREEN_CORNERS = {
  desktop: {
    tl: [35.16, 35.97] as [number, number],
    tr: [65.32, 36.05] as [number, number],
    br: [65.23, 66.59] as [number, number],
    bl: [35.16, 66.36] as [number, number],
  },
  mobile: {
    tl: [15.90, 35.44] as [number, number],
    tr: [84.36, 35.73] as [number, number],
    br: [84.62, 65.93] as [number, number],
    bl: [15.90, 65.93] as [number, number],
  },
}

type CornerSet = {
  tl: [number, number]
  tr: [number, number]
  br: [number, number]
  bl: [number, number]
}

// ─── Pure maths ───────────────────────────────────────────────────────────────

/** Exact object-fit:cover rendered rect for an image inside a container. */
function coverGeometry(cw: number, ch: number, iw: number, ih: number) {
  const scale = Math.max(cw / iw, ch / ih)
  return {
    scale,
    ox: (iw * scale - cw) / 2,   // pixels of image cropped from left edge
    oy: (ih * scale - ch) / 2,   // pixels of image cropped from top  edge
  }
}

/** Convert image-fraction corners → container-relative pixel coords. */
function cornersToVP(c: CornerSet, cw: number, ch: number, iw: number, ih: number) {
  const { scale, ox, oy } = coverGeometry(cw, ch, iw, ih)
  const v = ([px, py]: [number, number]): [number, number] => [
    iw * (px / 100) * scale - ox,
    ih * (py / 100) * scale - oy,
  ]
  return { tl: v(c.tl), tr: v(c.tr), br: v(c.br), bl: v(c.bl) }
}

/** Convert a container-relative drag point → image-fraction % (inverse of above). */
function vpToFraction(
  vpX: number, vpY: number,
  cw: number, ch: number, iw: number, ih: number,
): [number, number] {
  const { scale, ox, oy } = coverGeometry(cw, ch, iw, ih)
  return [
    Math.max(0, Math.min(100, ((vpX + ox) / scale / iw) * 100)),
    Math.max(0, Math.min(100, ((vpY + oy) / scale / ih) * 100)),
  ]
}

/**
 * Projective (4-point homography) matrix3d that maps a W×H rectangle
 * (with transform-origin 0 0) onto the destination quadrilateral.
 * Reduces to a plain translate for a rectangular destination.
 */
function quadToMatrix3d(
  W: number, H: number,
  tl: [number, number], tr: [number, number],
  br: [number, number], bl: [number, number],
): string {
  const [x0, y0] = tl, [x1, y1] = tr, [x2, y2] = br, [x3, y3] = bl
  const dx1 = x1 - x2,  dx2 = x3 - x2
  const dy1 = y1 - y2,  dy2 = y3 - y2
  const sx  = x0 - x1 + x2 - x3
  const sy  = y0 - y1 + y2 - y3
  const det = dx1 * dy2 - dx2 * dy1
  if (Math.abs(det) < 1e-10) return 'none'
  const g = (sx * dy2 - sy * dx2) / det
  const h = (dx1 * sy - dy1 * sx) / det
  const a = x1 - x0 + g * x1,  b = x3 - x0 + h * x3,  c = x0
  const d = y1 - y0 + g * y1,  e = y3 - y0 + h * y3,  f = y0
  // CSS matrix3d — column-major, embedding 3×3 projective in 4×4
  return [
    a / W, d / W, 0, g / W,
    b / H, e / H, 0, h / H,
    0,     0,     1, 0,
    c,     f,     0, 1,
  ].join(',')
}

// ─── Component ────────────────────────────────────────────────────────────────
export function HeroSection() {
  const heroRef   = useRef<HTMLElement>(null)
  const sceneRef  = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const dImgRef        = useRef<HTMLImageElement>(null)
  const mImgRef        = useRef<HTMLImageElement>(null)
  const prefersReduced = useReducedMotion()

  // ── Calibrate state (dev/staging only; entire block tree-shaken in prod) ───
  const calibRef   = useRef<CornerSet | null>(null)      // mutable live corners
  const [showCal, setShowCal] = useState(false)           // triggers re-render once
  const [calDisp, setCalDisp] = useState<CornerSet | null>(null)  // panel display
  const [vpH,     setVpH]     = useState<Record<keyof CornerSet, [number,number]> | null>(null) // handle VP pos

  // ── Core layout — stable (no deps), reads only from refs + DOM ────────────
  const applyLayout = useCallback(() => {
    const el   = screenRef.current
    const hero = heroRef.current
    if (!el || !hero) return

    const { width: cw, height: ch } = hero.getBoundingClientRect()
    if (!cw || !ch) return

    const mobile = cw < 768
    const imgEl  = mobile ? mImgRef.current : dImgRef.current

    // Use naturalWidth so the maths matches the real pixel grid of the photo.
    // Falls back to known intrinsic dimensions if the image isn't loaded yet.
    const iw = imgEl?.naturalWidth  || (mobile ? 1536 : 2752)
    const ih = imgEl?.naturalHeight || (mobile ? 2752 : 1536)

    // Corner fractions: use live calibrate value if dragging, else constants
    const corners = calibRef.current ?? (mobile ? SCREEN_CORNERS.mobile : SCREEN_CORNERS.desktop)
    const { tl, tr, br, bl } = cornersToVP(corners, cw, ch, iw, ih)

    const W = Math.hypot(tr[0] - tl[0], tr[1] - tl[1])
    const H = Math.hypot(bl[0] - tl[0], bl[1] - tl[1])

    el.style.width           = `${W}px`
    el.style.height          = `${H}px`
    el.style.transformOrigin = '0 0'
    el.style.transform       = `matrix3d(${quadToMatrix3d(W, H, tl, tr, br, bl)})`
    // Base font-size: all em units inside scale with the screen width
    el.style.fontSize        = `${Math.max(10, Math.min(20, W / 44))}px`
    el.style.opacity         = '1'

    // Push VP coords to state for calibrate handles (dev only — dead code in prod)
    if (process.env.NODE_ENV !== 'production') {
      setVpH({ tl, tr, br, bl } as Record<keyof CornerSet, [number,number]>)
    }
  }, []) // intentionally empty — all mutable state accessed via refs

  // ── Mount: ResizeObserver + image-load → applyLayout ──────────────────────
  useLayoutEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    // Activate calibrate mode in dev/staging when ?calibrate is in the URL
    if (process.env.NODE_ENV !== 'production') {
      if (window.location.search.includes('calibrate')) {
        const mobile = window.innerWidth < 768
        const def    = mobile ? SCREEN_CORNERS.mobile : SCREEN_CORNERS.desktop
        const copy   = JSON.parse(JSON.stringify(def)) as CornerSet
        calibRef.current = copy
        setCalDisp(copy)
        setShowCal(true)
      }
    }

    // Debounced ResizeObserver — covers orientation changes + layout shifts
    let tid: ReturnType<typeof setTimeout>
    const ro = new ResizeObserver(() => {
      clearTimeout(tid)
      tid = setTimeout(applyLayout, 60)
    })
    ro.observe(hero)

    // Wait for images to have naturalWidth (may arrive after mount)
    const onImgLoad = () => applyLayout()
    const imgs = [dImgRef.current, mImgRef.current].filter(Boolean) as HTMLImageElement[]
    imgs.forEach(img => {
      if (img.complete && img.naturalWidth) {
        applyLayout()
      } else {
        img.addEventListener('load', onImgLoad)
      }
    })

    applyLayout() // initial pass (uses fallback dims if not loaded yet)

    return () => {
      ro.disconnect()
      clearTimeout(tid)
      imgs.forEach(img => img.removeEventListener('load', onImgLoad))
    }
  }, [applyLayout])

  // ── GSAP scroll-linked zoom ───────────────────────────────────────────────
  useLayoutEffect(() => {
    if (prefersReduced || typeof window === 'undefined') return
    // Disable zoom in calibrate mode — you need stable handles to calibrate
    if (process.env.NODE_ENV !== 'production' && showCal) return

    const hero  = heroRef.current
    const scene = sceneRef.current
    if (!hero || !scene) return

    const ctx = gsap.context(() => {
      const { width: cw, height: ch } = hero.getBoundingClientRect()
      const mobile  = cw < 768
      const imgEl   = mobile ? mImgRef.current : dImgRef.current
      const iw      = imgEl?.naturalWidth  || (mobile ? 1536 : 2752)
      const ih      = imgEl?.naturalHeight || (mobile ? 2752 : 1536)
      const corners = mobile ? SCREEN_CORNERS.mobile : SCREEN_CORNERS.desktop
      const { tl, tr, br, bl } = cornersToVP(corners, cw, ch, iw, ih)

      const cx          = (tl[0] + tr[0] + br[0] + bl[0]) / 4
      const cy          = (tl[1] + tr[1] + br[1] + bl[1]) / 4
      const sw          = Math.hypot(tr[0] - tl[0], tr[1] - tl[1])
      const sh          = Math.hypot(bl[0] - tl[0], bl[1] - tl[1])
      const targetScale = Math.max(cw / sw, ch / sh) * 1.02

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger:       hero,
          start:         'top top',
          end:           mobile ? '+=60%' : '+=80%',
          pin:           true,
          scrub:         mobile ? 0.6 : 0.8,
          anticipatePin: 1,
        },
      })

      tl2.to('.hero-enter-text', { opacity: 0, y: -6, duration: 0.15, ease: 'none' }, 0)
      tl2.to(scene, {
        scale:           targetScale,
        transformOrigin: `${cx}px ${cy}px`,
        duration:        1,
        ease:            'none',
        willChange:      'transform',
      }, 0.05)
    })

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [prefersReduced, showCal])

  // ── Calibrate drag factory (dev only — entire function is dead code in prod) ─
  // process.env.NODE_ENV is a compile-time constant; the ternary is folded to
  // `null` by the production bundler so this code never ships to users.
  const makeDragHandler = process.env.NODE_ENV !== 'production'
    ? (corner: keyof CornerSet) =>
        (e: React.MouseEvent | React.TouchEvent) => {
          e.preventDefault()
          e.stopPropagation()

          const hero = heroRef.current
          if (!hero || !calibRef.current) return
          const { left, top, width: cw, height: ch } = hero.getBoundingClientRect()
          const mobile = cw < 768
          const imgEl  = mobile ? mImgRef.current : dImgRef.current
          const iw     = imgEl?.naturalWidth  || (mobile ? 1536 : 2752)
          const ih     = imgEl?.naturalHeight || (mobile ? 2752 : 1536)

          const move = (ev: MouseEvent | TouchEvent) => {
            const cx2 = 'touches' in ev ? ev.touches[0].clientX : ev.clientX
            const cy2 = 'touches' in ev ? ev.touches[0].clientY : ev.clientY
            const pct = vpToFraction(cx2 - left, cy2 - top, cw, ch, iw, ih)
            const next: CornerSet = { ...calibRef.current!, [corner]: pct }
            calibRef.current = next
            setCalDisp({ ...next })
            applyLayout()
          }

          const up = () => {
            document.removeEventListener('mousemove',  move)
            document.removeEventListener('touchmove',  move)
            document.removeEventListener('mouseup',    up)
            document.removeEventListener('touchend',   up)
          }

          document.addEventListener('mousemove', move)
          document.addEventListener('touchmove', move, { passive: false })
          document.addEventListener('mouseup',  up)
          document.addEventListener('touchend', up)
        }
    : null

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{ height: '100svh', minHeight: 480 }}
      className="relative overflow-hidden bg-[#060a12]"
      aria-label="Hero — Enter the Lab"
    >
      {/* ── Scene: background photo + screen overlay ─────────────────────────
          This entire div is what GSAP scales during the scroll-zoom. */}
      <div ref={sceneRef} className="absolute inset-0" style={{ willChange: 'transform' }}>

        {/* Desktop background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={dImgRef}
          src="/backgrounds/Background.png"
          alt="" aria-hidden draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-center select-none hidden sm:block"
        />
        {/* Mobile background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={mImgRef}
          src="/backgrounds/bgmobile.png"
          alt="" aria-hidden draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-center select-none block sm:hidden"
        />

        {/* ── Screen content ─────────────────────────────────────────────────
            outer div: matrix3d positioning only — NO overflow/clip here
            inner div: overflow:hidden, no transform — reliable on all browsers
            Separation is critical on mobile WebKit: overflow clipping stops
            working on matrix3d elements when a parent is being scale-animated. */}
        <div
          ref={screenRef}
          className="absolute top-0 left-0 opacity-0"
          aria-label="Lab monitor screen"
        >
          {/* ── Inner clip wrapper — owns overflow, no transform ── */}
          <div
            className="relative w-full h-full overflow-hidden"
            style={{ background: 'rgb(2,5,12)', borderRadius: '3px' }}
          >
          {/* Scanlines */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-scanlines opacity-25" aria-hidden />
          {/* Vignette */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 82% 78% at 50% 48%, transparent 36%, rgba(0,0,0,0.62) 100%)' }}
            aria-hidden
          />
          {/* Subtle glass reflection */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(130deg, rgba(255,255,255,0.022) 0%, transparent 36%)' }}
            aria-hidden
          />
          {/* Inner edge shadow + phosphor glow */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 50px rgba(0,0,0,0.6), inset 0 0 18px rgba(52,243,255,0.07)' }}
            aria-hidden
          />

          {/* OS UI — em units scale with the container's JS-set fontSize */}
          <div className="relative z-20 h-full flex flex-col justify-center gap-[0.5em] px-[8%] py-[6%]">

            {/* Status bar */}
            <div className="flex items-center justify-between">
              <span className="font-mono tracking-[0.18em] uppercase text-accent/55" style={{ fontSize: '0.62em' }}>
                DTB LAB OS&nbsp;&nbsp;v2.1
              </span>
              <div className="flex items-center gap-[0.4em]">
                <span
                  className="inline-block rounded-full animate-screen-dot"
                  style={{ width: '0.45em', height: '0.45em', background: '#34F3FF' }}
                  aria-hidden
                />
                <span className="font-mono tracking-widest uppercase text-accent/45" style={{ fontSize: '0.58em' }}>
                  ACTIVE
                </span>
              </div>
            </div>

            <div className="h-px bg-accent/12" aria-hidden />

            {/* Boot log */}
            <div className="flex-1 flex flex-col justify-center gap-[0.5em]">
              {([
                ['Creative engine',   'OK'   ],
                ['Lab environment',   'OK'   ],
                ['Test protocols',    'READY'],
                ['Aesthetic matrix',  'READY'],
              ] as [string, string][]).map(([lbl, s]) => (
                <div key={lbl} className="flex items-baseline gap-[0.6em]">
                  <span className="font-mono text-cream/22 shrink-0" style={{ fontSize: '0.58em' }}>&gt;</span>
                  <span className="font-mono text-cream/48 flex-1 tracking-wide" style={{ fontSize: '0.58em' }}>{lbl}</span>
                  <span
                    className={`font-mono tracking-widest shrink-0 ${s === 'OK' ? 'text-accent/55' : 'text-accent/88'}`}
                    style={{ fontSize: '0.55em' }}
                  >
                    {s}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px bg-accent/12" aria-hidden />

            {/* Main prompt */}
            <div className="flex items-center gap-[0.3em]">
              <span
                className="font-mono text-cream tracking-[0.18em] uppercase"
                style={{ fontSize: '1em' }}
              >
                ENTER THE LAB
              </span>
              <span
                className="inline-block bg-cream animate-blink shrink-0"
                style={{ width: '0.1em', height: '1em' }}
                aria-hidden
              />
            </div>
          </div>
          {/* ↑ closes OS UI z-20 div */}
          </div>
          {/* ↑ closes inner clip wrapper (overflow-hidden, no transform) */}
        </div>
        {/* ↑ closes outer screenRef div (matrix3d, no overflow) */}
      </div>

      {/* ── Scroll / swipe hint — OUTSIDE the scene so it never zooms ── */}
      <div
        className="hero-enter-text absolute bottom-8 sm:bottom-10 left-0 right-0
                   flex flex-col items-center gap-3 pointer-events-none select-none"
        aria-hidden
      >
        <p
          className="hidden sm:block font-mono font-bold text-base sm:text-lg tracking-[0.35em] uppercase text-cream neon-text-cream"
        >
          SCROLL TO ENTER
        </p>
        <p className="sm:hidden font-mono font-bold text-base tracking-[0.35em] uppercase text-cream neon-text-cream dvd-bounce">
          SWIPE UP TO ENTER
        </p>
        <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-cream/60 to-transparent animate-pulse neon-line-cream" />
      </div>

      {/* Reduced-motion fallback: show UI correctly embedded, no zoom */}
      {prefersReduced && (
        <div className="absolute inset-0 flex items-end justify-center pb-16 pointer-events-none">
          <p className="font-mono text-sm text-cream/55 tracking-[0.3em] uppercase">
            DTB LAB — Enter the lab
          </p>
        </div>
      )}

      {/* ── CALIBRATE UI ────────────────────────────────────────────────────────
          process.env.NODE_ENV !== 'production' is a compile-time constant.
          The entire subtree is tree-shaken out of the production bundle.     */}
      {process.env.NODE_ENV !== 'production' && showCal && vpH && calDisp && makeDragHandler && (
        <>
          {/* Polygon outline of the screen quad */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 99, overflow: 'visible' }}
            aria-hidden
          >
            <polygon
              points={(['tl', 'tr', 'br', 'bl'] as (keyof CornerSet)[])
                .map(k => vpH[k].join(','))
                .join(' ')}
              fill="none"
              stroke="#34F3FF"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              opacity="0.85"
            />
          </svg>

          {/* Draggable corner handles */}
          {(['tl', 'tr', 'br', 'bl'] as (keyof CornerSet)[]).map(k => (
            <div
              key={k}
              className="absolute"
              style={{
                left:         vpH[k][0] - 10,
                top:          vpH[k][1] - 10,
                width:        20,
                height:       20,
                borderRadius: '50%',
                background:   k === 'tl' || k === 'bl' ? '#34F3FF' : '#ff6b35',
                border:       '2px solid rgba(255,255,255,0.9)',
                boxShadow:    '0 0 8px rgba(0,0,0,0.7)',
                cursor:       'grab',
                touchAction:  'none',
                zIndex:       100,
              }}
              onMouseDown={makeDragHandler(k)}
              onTouchStart={makeDragHandler(k)}
            />
          ))}

          {/* Values panel — copy these into SCREEN_CORNERS */}
          <div
            className="absolute top-4 right-4 bg-base/92 border border-accent/30 rounded p-3 space-y-1 pointer-events-none"
            style={{ zIndex: 100, minWidth: 220 }}
          >
            <p className="font-mono text-[10px] text-accent/70 tracking-widest uppercase mb-2">
              Calibrate — copy to SCREEN_CORNERS
            </p>
            {(['tl', 'tr', 'br', 'bl'] as (keyof CornerSet)[]).map(k => (
              <p key={k} className="font-mono text-xs text-cream/80">
                <span className="text-accent/60">{k}:</span>{' '}
                [{calDisp[k][0].toFixed(2)}, {calDisp[k][1].toFixed(2)}]
              </p>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
