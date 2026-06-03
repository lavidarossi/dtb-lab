'use client'
import { useState, useMemo, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Play, Images } from 'lucide-react'
import { CategoryFilter } from './CategoryFilter'
import { Lightbox } from './Lightbox'
import { LabStatus } from '@/components/ui/LabStatus'
import { PORTFOLIO_ITEMS, PORTFOLIO_COUNT } from '@/config/portfolio'
import { PORTFOLIO_PHRASES } from '@/config/statusQuotes'
import { fadeUp, staggerContainer } from '@/config/motion'
import { useTextScramble } from '@/hooks/useTextScramble'
import type { PortfolioCategory, PortfolioItem } from '@/types'

export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('all')
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-10%' })
  const { display: scrambleDisplay, scramble } = useTextScramble('The lab work')

  const filtered = useMemo(() =>
    activeCategory === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter(i => i.category === activeCategory),
    [activeCategory]
  )

  const counts = useMemo(() => ({
    all:     PORTFOLIO_ITEMS.length,
    artist:  PORTFOLIO_ITEMS.filter(i => i.category === 'artist').length,
    event:   PORTFOLIO_ITEMS.filter(i => i.category === 'event').length,
    concept: PORTFOLIO_ITEMS.filter(i => i.category === 'concept').length,
    motion:  PORTFOLIO_ITEMS.filter(i => i.category === 'motion').length,
  }), [])

  const lightboxIndex = lightboxItem ? filtered.findIndex(i => i.id === lightboxItem.id) : -1
  const openLightbox = (item: PortfolioItem) => setLightboxItem(item)
  const closeLightbox = () => setLightboxItem(null)
  const prevItem = () => lightboxIndex > 0 && setLightboxItem(filtered[lightboxIndex - 1])
  const nextItem = () => lightboxIndex < filtered.length - 1 && setLightboxItem(filtered[lightboxIndex + 1])

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-base" aria-label="Portfolio grid">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-4"
        >
          <motion.div variants={fadeUp}>
            <LabStatus phrase={PORTFOLIO_PHRASES[0].text} />
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-mono text-display-lg text-cream cursor-default"
            onMouseEnter={scramble}
          >
            {scrambleDisplay}<span className="text-accent">.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-cream/60 text-lg max-w-xl">
            {PORTFOLIO_COUNT} projects. Browse by category or take it all in.
          </motion.p>
        </motion.div>

        <LabStatus phrase={PORTFOLIO_PHRASES[1].text} variant="accent" />

        {/* Filter */}
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} counts={counts} />

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => openLightbox(item)}
                aria-label={`View ${item.title}`}
                data-cursor-hover
                className="group relative overflow-hidden rounded-lg bg-surface-2 border border-border
                           hover:border-accent/40 transition-all duration-300 aspect-square
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    aria-hidden
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) calc(50vw - 8px), (max-width: 1024px) calc(33vw - 10px), calc(25vw - 12px)"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 transition-opacity opacity-0 [&[data-loaded='true']]:opacity-100"
                    quality={80}
                    loading="lazy"
                    onLoad={e => (e.currentTarget as HTMLImageElement).setAttribute('data-loaded', 'true')}
                  />
                )}

                {/* Bundle / video badge */}
                {(item.slides && item.slides.length > 1) && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-base/80 border border-border rounded px-1.5 py-0.5 backdrop-blur-sm pointer-events-none">
                    <Images size={10} className="text-accent" aria-hidden />
                    <span className="font-mono text-[9px] text-accent">{item.slides.length}</span>
                  </div>
                )}
                {item.type === 'video' && (
                  <div className="absolute top-2 right-2 bg-base/80 border border-border rounded p-1 backdrop-blur-sm pointer-events-none">
                    <Play size={10} className="text-accent" aria-hidden />
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-base/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                  <span className="font-mono text-[10px] text-accent uppercase tracking-widest text-left">{item.category}</span>
                  <span className="font-mono text-xs sm:text-sm text-cream mt-0.5 text-left">{item.title}</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-cream/40 text-sm tracking-widest">NO RESULTS IN THIS CATEGORY</p>
          </div>
        )}
      </div>

      <Lightbox
        item={lightboxItem}
        onClose={closeLightbox}
        onPrev={prevItem}
        onNext={nextItem}
        hasPrev={lightboxIndex > 0}
        hasNext={lightboxIndex < filtered.length - 1}
      />
    </section>
  )
}
