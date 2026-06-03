'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { LabStatus } from '@/components/ui/LabStatus'
import { GLOBAL_PHRASES } from '@/config/statusQuotes'
import { useTextScramble } from '@/hooks/useTextScramble'
import { fadeUp, staggerContainer } from '@/config/motion'

export function BrandIntro() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const { display, scramble } = useTextScramble('DTB LAB')

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden bg-base"
      aria-label="About DTB LAB"
    >
      {/* Dot grid texture */}
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — heading + text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <LabStatus phrase={GLOBAL_PHRASES[0].text} />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-mono text-display-lg text-cream"
              onMouseEnter={scramble}
            >
              {display}
            </motion.h2>

            <motion.p variants={fadeUp} className="text-lg text-cream/70 leading-relaxed max-w-lg">
              A one-person creative laboratory operating at the intersection of music, graphic design, and motion. Every project is a test — pushing aesthetics, breaking formats, building something that lasts.
            </motion.p>

            <motion.p variants={fadeUp} className="text-base text-cream/50 leading-relaxed max-w-lg">
              Specialising in music poster design, event visuals, and short promo videos for artists and creators who want their work to look as bold as it sounds.
            </motion.p>

            {/* Lab stats — enlarged */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
              {[
                { value: '50',  label: 'Projects' },
                { value: '4',   label: 'Services'  },
                { value: '∞',   label: 'Test mode'  },
              ].map(({ value, label }) => (
                <div key={label} className="space-y-2">
                  <p className="font-mono text-4xl sm:text-5xl lg:text-6xl text-accent leading-none">{value}</p>
                  <p className="font-mono text-xs text-cream/40 tracking-widest uppercase">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — terminal block */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="rounded-lg border border-border bg-surface-2 overflow-hidden"
          >
            {/* Terminal bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface/50">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" aria-hidden />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" aria-hidden />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" aria-hidden />
              <span className="font-mono text-xs text-cream/30 ml-2 tracking-wider">lab_profile.txt</span>
            </div>

            {/* Terminal content */}
            <div className="p-6 space-y-3 font-mono text-xs sm:text-sm">
              {[
                { key: 'SUBJECT',   val: 'DTB LAB'                                    },
                { key: 'TYPE',      val: 'Creative Design Laboratory'                  },
                { key: 'FIELD',     val: 'Music · Events · Motion'                     },
                { key: 'AESTHETIC', val: 'Y2K Poster × Retro-Futurist Research Lab'    },
                { key: 'DELIVERY',  val: 'Digital — worldwide'                         },
                { key: 'STATUS',    val: 'ACCEPTING PROJECTS'                          },
              ].map(({ key, val }) => (
                <div key={key} className="flex gap-3">
                  <span className="text-status/50 shrink-0 w-24">{key}</span>
                  <span className="text-cream/80">{val}</span>
                </div>
              ))}
              <div className="pt-3 flex items-center gap-1">
                <span className="text-accent/70">&gt;</span>
                <span className="text-cream/60 animate-blink">_</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
