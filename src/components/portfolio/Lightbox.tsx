'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { PortfolioItem } from '@/types'

interface LightboxProps {
  item: PortfolioItem | null
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  hasPrev?: boolean
  hasNext?: boolean
}

export function Lightbox({ item, onClose, onPrev, onNext, hasPrev, hasNext }: LightboxProps) {
  const [slideIdx, setSlideIdx] = useState(0)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  useEffect(() => { setSlideIdx(0) }, [item?.id])

  // Keyboard navigation
  useEffect(() => {
    if (!item) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowLeft') {
        if (isBundle && slideIdx > 0) setSlideIdx(i => i - 1)
        else if (hasPrev) onPrev?.()
      }
      if (e.key === 'ArrowRight') {
        if (isBundle && slideIdx < slides.length - 1) setSlideIdx(i => i + 1)
        else if (hasNext) onNext?.()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  useEffect(() => {
    if (item) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [item])

  if (!item) return null

  const slides  = item.slides ?? [item.src]
  const isBundle = slides.length > 1
  const currentSrc = slides[slideIdx]

  const goNext = () => {
    if (isBundle && slideIdx < slides.length - 1) setSlideIdx(i => i + 1)
    else if (hasNext) onNext?.()
  }
  const goPrev = () => {
    if (isBundle && slideIdx > 0) setSlideIdx(i => i - 1)
    else if (hasPrev) onPrev?.()
  }

  // Touch swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current)
    if (Math.abs(dx) > 50 && dy < 80) {
      if (dx < 0) goNext()
      else goPrev()
    }
  }

  const canGoPrev = (isBundle && slideIdx > 0) || (!isBundle && hasPrev)
  const canGoNext = (isBundle && slideIdx < slides.length - 1) || (!isBundle && hasNext)

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-base/96 backdrop-blur-md"
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal
          aria-label={`${item.title}${isBundle ? ` — ${slideIdx + 1}/${slides.length}` : ''}`}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 p-2 text-cream/50 hover:text-cream transition-colors rounded-lg hover:bg-surface/40 z-10"
            onClick={(e) => { e.stopPropagation(); onClose() }}
            aria-label="Close"
          >
            <X size={22} />
          </button>

          {/* Prev */}
          {canGoPrev && (
            <button
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-3 text-cream/60 hover:text-cream transition-colors rounded-lg hover:bg-surface/40 z-10"
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              aria-label="Previous"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Next */}
          {canGoNext && (
            <button
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-3 text-cream/60 hover:text-cream transition-colors rounded-lg hover:bg-surface/40 z-10"
              onClick={(e) => { e.stopPropagation(); goNext() }}
              aria-label="Next"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Content */}
          <motion.div
            key={item.id}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex flex-col items-center gap-4 max-w-3xl w-full px-12 sm:px-16"
            onClick={e => e.stopPropagation()}
          >
            {/* Image */}
            {item.type === 'image' && (
              <div className="relative w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSrc}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Image
                      src={currentSrc}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      className="rounded-lg object-contain max-h-[72vh] w-full"
                      quality={80}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* Video */}
            {item.type === 'video' && (
              <video
                src={item.src}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="rounded-lg max-h-[72vh] w-full object-contain"
              />
            )}

            {/* Caption + dots */}
            <div className="flex items-center justify-between w-full px-1 gap-4">
              <div>
                <p className="font-mono text-[10px] text-accent uppercase tracking-widest">{item.category}</p>
                <p className="font-mono text-xs text-cream/70 mt-0.5">{item.title}</p>
              </div>
              {isBundle && (
                <div className="flex items-center gap-1.5 shrink-0">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setSlideIdx(i) }}
                      aria-label={`Slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-200 ${i === slideIdx ? 'bg-accent w-3' : 'bg-cream/30 w-1.5'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
