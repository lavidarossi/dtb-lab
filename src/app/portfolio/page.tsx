import type { Metadata } from 'next'
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid'
import { StatusTicker } from '@/components/ui/StatusTicker'

export const metadata: Metadata = {
  title: 'Portfolio — Graphic Design Work',
  description:
    'Browse the full DTB LAB portfolio: music poster designs, event visuals, and motion graphics. Real work for real artists.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio — DTB LAB Graphic Design Work',
    description: 'Music poster design, event visuals, and motion graphics. Browse the full lab archive.',
  },
}

export default function PortfolioPage() {
  return (
    <>
      {/* Spacer for fixed navbar */}
      <div className="h-28" aria-hidden />
      <StatusTicker />
      <PortfolioGrid />
    </>
  )
}
