'use client'
import { cn } from '@/lib/utils'
import type { PortfolioCategory } from '@/types'

const FILTERS: { value: PortfolioCategory; label: string }[] = [
  { value: 'all',     label: 'All work'        },
  { value: 'artist',  label: 'Artist Posters'  },
  { value: 'event',   label: 'Event Posters'   },
  { value: 'concept', label: 'Concept Posters' },
  { value: 'motion',  label: 'Motion'          },
]

interface CategoryFilterProps {
  active: PortfolioCategory
  onChange: (cat: PortfolioCategory) => void
  counts: Record<PortfolioCategory, number>
}

export function CategoryFilter({ active, onChange, counts }: CategoryFilterProps) {
  return (
    <div role="group" aria-label="Filter portfolio by category" className="flex flex-wrap gap-2">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          aria-pressed={active === value}
          data-cursor-hover
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded border font-mono text-xs tracking-widest uppercase transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
            active === value
              ? 'bg-accent text-base border-accent shadow-glow-accent'
              : 'bg-transparent text-cream/60 border-border hover:text-cream hover:border-cream/30'
          )}
        >
          {label}
          <span className={cn('font-mono text-[10px]', active === value ? 'text-base/70' : 'text-cream/30')}>
            {counts[value]}
          </span>
        </button>
      ))}
    </div>
  )
}
