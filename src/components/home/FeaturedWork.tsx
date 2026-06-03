'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Play, Images } from 'lucide-react'
import { LabStatus } from '@/components/ui/LabStatus'
import { Lightbox } from '@/components/portfolio/Lightbox'
import { FEATURED_ITEMS } from '@/config/portfolio'
import { PORTFOLIO_PHRASES } from '@/config/statusQuotes'
import { fadeUp, staggerContainer } from '@/config/motion'
import type { PortfolioItem } from '@/types'

export function FeaturedWork() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null)

  const lightboxIndex = lightboxItem ? FEATURED_ITEMS.findIndex(i => i.id === lightboxItem.id) : -1

  return (
    <section
      ref={ref}
      id="featured"
      className="relative py-24 sm:py-32 px-4 sm:px-6 bg-base overflow-hidden"
      aria-label="Featured work"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-3">
              <LabStatus phrase={PORTFOLIO_PHRASES[0].text} />
              <h2 className="font-mono text-display-md text-cream">
                Featured work<span className="text-accent">.</span>
              </h2>
            </div>
            <Link
              href="/portfolio"
              data-cursor-hover
              className="font-mono text-xs text-accent tracking-widest uppercase hover:text-accent-dim transition-colors duration-200 flex items-center gap-2 shrink-0"
            >
              View all →
            </Link>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {FEATURED_ITEMS.map((item) => (
              <motion.button
                key={item.id}
                variants={fadeUp}
                onClick={() => setLightboxItem(item)}
                aria-label={`View ${item.title}`}
                data-cursor-hover
                className="group relative overflow-hidden rounded-lg aspect-square bg-surface-2 border border-border hover:border-accent/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {item.type === 'video' ? (
                  <video src={item.src} muted playsInline preload="auto" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" aria-hidden onLoadedData={e => { const v = e.currentTarget as HTMLVideoElement; v.currentTime = 0.001; void v.play().then(() => v.pause()).catch(() => {}) }} />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) calc(50vw - 8px), (max-width: 1280px) calc(33vw - 10px), calc(25vw - 12px)"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 transition-opacity opacity-0 [&[data-loaded='true']]:opacity-100"
                    quality={80}
                    priority
                    onLoad={e => (e.currentTarget as HTMLImageElement).setAttribute('data-loaded', 'true')}
                  />
                )}

                {/* Badges */}
                {item.slides && item.slides.length > 1 && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-base/80 border border-border rounded px-1.5 py-0.5 pointer-events-none">
                    <Images size={10} className="text-accent" aria-hidden />
                    <span className="font-mono text-[9px] text-accent">{item.slides.length}</span>
                  </div>
                )}
                {item.type === 'video' && (
                  <div className="absolute top-2 right-2 bg-base/80 border border-border rounded p-1 pointer-events-none">
                    <Play size={10} className="text-accent" aria-hidden />
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-base/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="font-mono text-xs text-accent uppercase tracking-widest text-left">{item.category}</p>
                    <p className="font-mono text-sm text-cream mt-1">{item.title}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <Lightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        onPrev={() => lightboxIndex > 0 && setLightboxItem(FEATURED_ITEMS[lightboxIndex - 1])}
        onNext={() => lightboxIndex < FEATURED_ITEMS.length - 1 && setLightboxItem(FEATURED_ITEMS[lightboxIndex + 1])}
        hasPrev={lightboxIndex > 0}
        hasNext={lightboxIndex < FEATURED_ITEMS.length - 1}
      />
    </section>
  )
}
