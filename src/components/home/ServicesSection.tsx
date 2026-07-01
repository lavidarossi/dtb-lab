'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Music, CalendarDays, Film, Globe } from 'lucide-react'
import { LabStatus } from '@/components/ui/LabStatus'
import { SERVICES } from '@/config/services'
import { GLOBAL_PHRASES } from '@/config/statusQuotes'
import { fadeUp, staggerContainer } from '@/config/motion'
import { quickWhatsApp } from '@/lib/whatsapp'

const ICONS = { music: Music, calendar: CalendarDays, film: Film, globe: Globe } as const

export function ServicesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const waUrl = quickWhatsApp()

  return (
    <section
      ref={ref}
      id="services"
      className="relative py-24 sm:py-32 px-4 sm:px-6 bg-surface-2 overflow-hidden"
      aria-label="Services"
    >
      <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="space-y-4">
            <LabStatus phrase={GLOBAL_PHRASES[1].text} />
            <h2 className="font-mono text-display-md text-cream">
              Services<span className="text-accent">.</span>
            </h2>
            <p className="text-cream/60 max-w-xl text-lg">
              Four specialisations. One lab. All tested for maximum impact.
            </p>
          </motion.div>

          {/* Service cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((svc, i) => {
              const Icon = ICONS[svc.icon as keyof typeof ICONS] ?? Film
              return (
                <motion.div
                  key={svc.id}
                  variants={fadeUp}
                  className="group relative rounded-lg border border-border bg-base p-6 sm:p-8 flex flex-col gap-4
                             hover:border-accent/40 transition-colors duration-300 cursor-pointer"
                  data-cursor-hover
                >
                  {/* Index */}
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-cream/20 tracking-widest">
                      TEST_0{i + 1}
                    </span>
                    <Icon
                      className="w-5 h-5 text-accent/60 group-hover:text-accent transition-colors duration-200"
                      aria-hidden
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-mono text-xl text-cream group-hover:text-accent transition-colors duration-300">
                    {svc.title}
                  </h3>

                  {/* Description */}
                  <p className="text-cream/60 text-sm leading-relaxed flex-1">
                    {svc.description}
                  </p>

                  {/* Lab note */}
                  <div className="border-t border-border pt-4">
                    <p className="font-mono text-xs text-status/60 leading-relaxed">
                      <span className="text-status/40">&gt; </span>
                      {svc.labNote}
                    </p>
                    {svc.id === 'websites' && (
                      <a
                        href="https://dtb-web.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-accent/80 hover:text-accent tracking-widest uppercase transition-colors duration-200"
                        onClick={e => e.stopPropagation()}
                      >
                        View dtb-web.com →
                      </a>
                    )}
                  </div>

                  {/* Hover accent line */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-500" aria-hidden />
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-t border-border pt-8">
            <p className="font-mono text-sm text-cream/50 max-w-md">
              Not sure which test to run? Let&apos;s talk. Describe your project and DTB LAB will figure out the formula.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="shrink-0 inline-flex items-center gap-3 px-6 py-3 bg-accent text-base font-mono text-sm tracking-widest uppercase rounded hover:bg-accent-dim transition-colors duration-200 shadow-glow-accent"
            >
              Start your project
              <span aria-hidden>→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
