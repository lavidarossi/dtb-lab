'use client'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

interface LabStatusProps {
  phrase: string
  className?: string
  variant?: 'default' | 'accent'
}

export function LabStatus({ phrase, className, variant = 'default' }: LabStatusProps) {
  const prefersReduced = useReducedMotion()
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (prefersReduced) return
    const id = setInterval(() => setFrame(f => (f + 1) % SPINNER_FRAMES.length), 80)
    return () => clearInterval(id)
  }, [prefersReduced])

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase',
        variant === 'default' && 'text-status',
        variant === 'accent' && 'text-accent',
        className
      )}
      aria-label={`Status: ${phrase}`}
    >
      <span aria-hidden className="text-base leading-none text-cream/70">
        {prefersReduced ? '●' : SPINNER_FRAMES[frame]}
      </span>
      <span>{phrase}</span>
    </div>
  )
}
