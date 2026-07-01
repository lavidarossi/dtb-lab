import Link from 'next/link'
import Image from 'next/image'
import { Instagram } from 'lucide-react'
import { LabStatus } from '@/components/ui/LabStatus'
import { GLOBAL_PHRASES } from '@/config/statusQuotes'
import { quickWhatsApp } from '@/lib/whatsapp'

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME ?? 'DTB LAB'
const IG_HREF = 'https://www.instagram.com/dtb.lab?igsh=ZnU3azdzZ3diMGFs&utm_source=qr'

export function Footer() {
  const waUrl = quickWhatsApp()

  return (
    <footer className="border-t border-border bg-surface-2 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="space-y-5">
            <Image
              src="/logos/Brand logo cream.png"
              alt="DTB LAB logo"
              width={200}
              height={80}
              className="h-20 sm:h-24 w-auto object-contain"
            />
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
              Graphic design lab specialising in music posters, event visuals, and motion graphics. Based in the lab, delivered worldwide.
            </p>
            <LabStatus phrase={GLOBAL_PHRASES[4].text} />
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="font-mono text-xs text-cream/40 tracking-widest uppercase mb-4">Navigation</p>
            <ul className="space-y-2" role="list">
              {[
                { href: '/',          label: 'Home'        },
                { href: '/portfolio', label: 'Portfolio'   },
                { href: '/booking',   label: 'Book a slot' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-cream/60 hover:text-accent transition-colors duration-200 text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://dtb-web.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent/70 hover:text-accent transition-colors duration-200 text-sm flex items-center gap-1.5"
                >
                  DTB WEB — Website Portfolio
                  <svg viewBox="0 0 12 12" className="w-3 h-3 fill-none stroke-current shrink-0" strokeWidth="1.5" aria-hidden><path d="M2 10L10 2M10 2H5M10 2v5"/></svg>
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="space-y-4">
            <p className="font-mono text-xs text-cream/40 tracking-widest uppercase">Contact</p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-200 text-sm"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.522 5.845L.053 23.947a.5.5 0 0 0 .601.601l6.102-1.469A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
              </svg>
              Message on WhatsApp
            </a>

            <a
              href={IG_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DTB LAB on Instagram"
              className="flex items-center gap-2 text-cream/60 hover:text-accent transition-colors duration-200 text-sm"
            >
              <Instagram size={16} className="shrink-0" aria-hidden />
              Instagram
            </a>

            <p className="text-cream/40 text-xs font-mono">
              {/* LOCATION KEYWORD — add your city here, e.g. "Based in Amsterdam" */}
              {/* Based in [YOUR CITY] */}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-cream/30 tracking-widest">
            &copy; {new Date().getFullYear()} {BRAND}. ALL RIGHTS RESERVED.
          </p>
          <LabStatus phrase={GLOBAL_PHRASES[1].text} className="opacity-50" />
        </div>
      </div>
    </footer>
  )
}
