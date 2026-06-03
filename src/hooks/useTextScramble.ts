'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?/\\|{}[]'

export function useTextScramble(text: string) {
  const prefersReduced = useReducedMotion()
  const [display, setDisplay] = useState(text)
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const scramble = useCallback(() => {
    if (prefersReduced) {
      setDisplay(text)
      return
    }

    let iteration = 0
    const totalFrames = text.length * 4

    if (frameRef.current) clearInterval(frameRef.current)

    frameRef.current = setInterval(() => {
      const progress = iteration / totalFrames
      const revealCount = Math.floor(progress * text.length)

      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < revealCount) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      iteration += 1

      if (iteration >= totalFrames) {
        setDisplay(text)
        if (frameRef.current) clearInterval(frameRef.current)
      }
    }, 30)
  }, [text, prefersReduced])

  useEffect(() => () => { if (frameRef.current) clearInterval(frameRef.current) }, [])

  return { display, scramble }
}
