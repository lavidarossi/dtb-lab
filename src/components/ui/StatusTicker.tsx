'use client'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { GLOBAL_PHRASES } from '@/config/statusQuotes'
import { cn } from '@/lib/utils'

interface StatusTickerProps {
  className?: string
}

export function StatusTicker({ className }: StatusTickerProps) {
  const prefersReduced = useReducedMotion()

  // Duplicate for seamless loop
  const phrases = [...GLOBAL_PHRASES, ...GLOBAL_PHRASES]

  if (prefersReduced) {
    return (
      <div className={cn('overflow-hidden border-y border-border py-1.5', className)}>
        <p className="font-mono text-xs text-status/70 text-center tracking-widest uppercase px-4">
          {GLOBAL_PHRASES[0].text}
        </p>
      </div>
    )
  }

  return (
    <div
      className={cn('overflow-hidden border-y border-border py-1.5 bg-base/50', className)}
      aria-hidden
    >
      <div className="flex w-max animate-ticker whitespace-nowrap">
        {phrases.map((p, i) => (
          <span
            key={`${p.id}-${i}`}
            className="font-mono text-xs text-status/70 tracking-widest uppercase px-8"
          >
            ◈ {p.text}
          </span>
        ))}
      </div>
    </div>
  )
}
