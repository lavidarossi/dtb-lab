'use client'
import { useEffect, useState } from 'react'

export function GlitchIntro() {
  const [phase, setPhase] = useState<'glitch' | 'fadeout' | 'done'>('glitch')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fadeout'), 1400)
    const t2 = setTimeout(() => setPhase('done'),    1900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#060a12] flex items-center justify-center pointer-events-none
                  transition-opacity duration-500 ${phase === 'fadeout' ? 'opacity-0' : 'opacity-100'}`}
      aria-hidden
    >
      {/* Glitch text stack */}
      <div className="relative text-center select-none">
        {/* Main layer */}
        <p className="font-mono text-accent text-2xl sm:text-4xl tracking-[0.45em] uppercase animate-glitch-main">
          DTB LAB
        </p>
        {/* Red channel */}
        <p className="font-mono text-red-500/60 text-2xl sm:text-4xl tracking-[0.45em] uppercase absolute inset-0 animate-glitch-r">
          DTB LAB
        </p>
        {/* Cyan channel */}
        <p className="font-mono text-cyan-200/50 text-2xl sm:text-4xl tracking-[0.45em] uppercase absolute inset-0 animate-glitch-b">
          DTB LAB
        </p>
        <p className="font-mono text-[10px] text-accent/35 tracking-[0.4em] uppercase mt-4 animate-pulse">
          INITIALIZING...
        </p>
      </div>

      {/* Scanlines */}
      <div className="absolute inset-0 bg-scanlines opacity-20" />
      {/* Glitch bars */}
      <div className="absolute inset-0 animate-glitch-bars" />
    </div>
  )
}
