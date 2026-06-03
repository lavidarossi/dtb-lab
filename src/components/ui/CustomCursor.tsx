'use client'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { isTouchDevice } from '@/lib/utils'

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced || isTouchDevice()) return

    let mx = 0, my = 0
    let rx = 0, ry = 0
    let rafId = 0

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }

    const tick = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 3}px, ${my - 3}px)`
      }
      rafId = requestAnimationFrame(tick)
    }

    const setHover = (on: boolean) => {
      if (!ringRef.current) return
      if (on) {
        ringRef.current.style.width = '56px'
        ringRef.current.style.height = '56px'
        ringRef.current.style.marginLeft = '-28px'
        ringRef.current.style.marginTop = '-28px'
        ringRef.current.style.borderColor = 'rgba(52,243,255,0.9)'
      } else {
        ringRef.current.style.width = '40px'
        ringRef.current.style.height = '40px'
        ringRef.current.style.marginLeft = '-20px'
        ringRef.current.style.marginTop = '-20px'
        ringRef.current.style.borderColor = 'rgba(52,243,255,0.5)'
      }
    }

    const onEnter = () => setHover(true)
    const onLeave = () => setHover(false)

    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(tick)

    const selectors = 'a, button, [role="button"], [data-cursor-hover]'
    document.querySelectorAll<HTMLElement>(selectors).forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    // Hide native cursor
    document.body.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      document.body.style.cursor = ''
      document.querySelectorAll<HTMLElement>(selectors).forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [prefersReduced])

  if (prefersReduced) return null

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] border border-accent/50"
        style={{
          willChange: 'transform',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
        aria-hidden
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent pointer-events-none z-[9999]"
        style={{ willChange: 'transform' }}
        aria-hidden
      />
    </>
  )
}
