'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Instagram } from 'lucide-react'
import { cn } from '@/lib/utils'
import { quickWhatsApp } from '@/lib/whatsapp'

const NAV_LINKS = [
  { href: '/',          label: 'Home'      },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/booking',   label: 'Book'      },
]

const IG_HREF = 'https://www.instagram.com/dtb.lab?igsh=ZnU3azdzZ3diMGFs&utm_source=qr'

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const waUrl = quickWhatsApp()

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 pt-4">
      <nav
        className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-3 rounded-lg border border-border bg-base/80 backdrop-blur-md"
        aria-label="Main navigation"
      >
        {/* Logo — 2× */}
        <Link href="/" aria-label="DTB LAB — Home" data-cursor-hover>
          <Image
            src="/logos/Brand logo cream.png"
            alt="DTB LAB logo"
            width={160}
            height={64}
            className="h-16 sm:h-20 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                data-cursor-hover
                className={cn(
                  'font-mono text-xs tracking-widest uppercase transition-colors duration-200',
                  pathname === href ? 'text-accent' : 'text-cream/70 hover:text-cream'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={IG_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="DTB LAB on Instagram"
            data-cursor-hover
            className="text-cream/50 hover:text-accent transition-colors duration-200"
          >
            <Instagram size={18} />
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="flex items-center gap-2 px-4 py-2 rounded border border-accent text-accent font-mono text-xs tracking-widest uppercase hover:bg-accent hover:text-base transition-all duration-200"
          >
            Book a slot
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-cream/80 hover:text-cream transition-colors p-1"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden mx-auto max-w-7xl mt-1 rounded-lg border border-border bg-base/95 backdrop-blur-md px-4 py-4">
          <ul className="flex flex-col gap-4" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'font-mono text-sm tracking-widest uppercase block py-1 transition-colors duration-200',
                    pathname === href ? 'text-accent' : 'text-cream/70 hover:text-cream'
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-3 pt-2 border-t border-border">
              <a
                href={IG_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DTB LAB on Instagram"
                className="text-cream/50 hover:text-accent transition-colors duration-200"
              >
                <Instagram size={20} />
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-4 py-2 rounded border border-accent text-accent font-mono text-xs tracking-widest uppercase hover:bg-accent hover:text-base transition-all duration-200"
              >
                Book a slot
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
