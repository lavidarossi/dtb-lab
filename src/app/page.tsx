import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { StatusTicker } from '@/components/ui/StatusTicker'
import { BrandIntro } from '@/components/home/BrandIntro'
import { ServicesSection } from '@/components/home/ServicesSection'
import { FeaturedWork } from '@/components/home/FeaturedWork'
import { LabStatus } from '@/components/ui/LabStatus'
import { GLOBAL_PHRASES } from '@/config/statusQuotes'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'DTB LAB — Music Poster & Event Graphic Designer',
  description:
    'DTB LAB creates bold music poster designs, event visuals, motion graphics, and websites for artists and creators. Enter the lab.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatusTicker />
      <BrandIntro />
      <FeaturedWork />
      <ServicesSection />

      {/* ── WE BUILD WEBSITES CTA ── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 bg-base relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="rounded-xl border border-accent/30 bg-surface-2 p-8 sm:p-12 flex flex-col sm:flex-row gap-8 sm:gap-12 items-start sm:items-center shadow-[0_0_60px_rgba(52,243,255,0.06)]">
            <div className="flex-1 space-y-4">
              <LabStatus phrase="New formulas: website edition" />
              <h2 className="font-mono text-display-md text-cream leading-tight">
                Love this site &amp; experience?<br />
                <span className="text-accent">We can build one for you.</span>
              </h2>
              <p className="text-cream/60 leading-relaxed">
                DTB LAB doesn&apos;t just design — we build premium websites. Portfolio sites, business sites, brand experiences, and more. The same futuristic, premium aesthetic, custom-built for your brand.
              </p>
              <ul className="space-y-1 font-mono text-xs text-cream/50">
                {['Portfolio & personal sites', 'Business & brand websites', 'Artist & music promo pages', 'Custom design + development'].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-accent">◈</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
              <Link
                href="/booking"
                data-cursor-hover
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-base font-mono text-sm tracking-widest uppercase rounded hover:bg-accent-dim transition-colors duration-200 shadow-glow-accent whitespace-nowrap"
              >
                Get a website →
              </Link>
              <Link
                href="/portfolio"
                data-cursor-hover
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-cream/20 text-cream/70 font-mono text-xs tracking-widest uppercase rounded hover:border-cream/40 hover:text-cream transition-all duration-200 whitespace-nowrap"
              >
                View portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING CTA STRIP ── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-surface-2 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto space-y-6">
          <LabStatus phrase={GLOBAL_PHRASES[3].text} className="justify-center" />
          <h2 className="font-mono text-display-md text-cream">
            Ready to run a test<span className="text-accent">?</span>
          </h2>
          <p className="text-cream/60 text-lg">
            Book a lab slot, describe your project, and let&apos;s build something worth posting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href="/booking"
              data-cursor-hover
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-base font-mono text-sm tracking-widest uppercase rounded hover:bg-accent-dim transition-colors duration-200 shadow-glow-accent"
            >
              Book a slot →
            </Link>
            <Link
              href="/portfolio"
              data-cursor-hover
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-cream/30 text-cream font-mono text-sm tracking-widest uppercase rounded hover:border-cream/60 transition-colors duration-200"
            >
              View portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
