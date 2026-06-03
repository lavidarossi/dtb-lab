import type { Metadata } from 'next'
import { Space_Mono, DM_Sans } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp'

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dtblab.com'
const BRAND    = process.env.NEXT_PUBLIC_BRAND_NAME ?? 'DTB LAB'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
  },
  title: {
    default: `${BRAND} — Music Poster & Event Graphic Designer`,
    template: `%s | ${BRAND}`,
  },
  description:
    'DTB LAB is a graphic design studio specialising in music poster design, event visuals, and short promo motion graphics for artists and brands. Book your project today.',
  keywords: [
    'graphic designer',
    'music poster designer',
    'event design',
    'motion graphics',
    'promo video designer',
    'Y2K poster design',
    'DTB LAB',
  ],
  authors: [{ name: BRAND }],
  creator: BRAND,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: BRAND,
    title: `${BRAND} — Music Poster & Event Graphic Designer`,
    description:
      'Graphic design lab for music poster design, event visuals, and motion graphics.',
    images: [{ url: '/logos/Brand logo cream.png', width: 600, height: 240, alt: `${BRAND} logo` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND} — Music Poster & Event Graphic Designer`,
    description: 'Graphic design lab for music poster design, event visuals, and motion graphics.',
    images: ['/logos/Brand logo cream.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preload hero backgrounds — largest LCP assets */}
        <link rel="preload" as="image" href="/backgrounds/Background.png" media="(min-width: 640px)" />
        <link rel="preload" as="image" href="/backgrounds/bgmobile.png"   media="(max-width: 639px)" />
      </head>
      <body className="bg-base text-cream antialiased">
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
