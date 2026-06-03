# DTB LAB — Portfolio Website

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Required Environment Variables

Open `.env.local` and fill in:

| Variable | What to put |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your number in full international format, no `+` or spaces. E.g. `31612345678` |
| `NEXT_PUBLIC_SITE_URL` | Your live domain, no trailing slash. E.g. `https://dtblab.com` |

---

## How to Add Portfolio Projects

Edit [`src/config/portfolio.ts`](src/config/portfolio.ts):

1. Drop your image/video into `public/portfolio/`
2. Add an entry to `PORTFOLIO_ITEMS`:

```ts
{
  id: 'p36',                          // unique ID
  src: '/portfolio/your-file.jpg',
  alt: 'Music poster design by DTB LAB — describe the piece here (SEO)',
  title: 'Your Title',
  category: 'poster',                 // 'poster' | 'event' | 'motion'
  featured: true,                     // shows on homepage featured grid
  width: 1080,
  height: 1080,
},
```

Set `featured: true` on items you want on the home page featured grid (max ~6).

**Update existing category labels** — all 35 current items default to the most likely category. Open `src/config/portfolio.ts` and set the correct `category` for each piece.

---

## How to Edit Status Quotes

Open [`src/config/statusQuotes.ts`](src/config/statusQuotes.ts) — the `STATUS_PHRASES` array. Add, remove, or reorder entries freely. The `context` field controls where each phrase appears:

- `'global'` — shown in the ticker and scattered across the site
- `'hero'` — the enter screen phrase
- `'portfolio'` — shown only on the portfolio page

---

## How to Edit Services

Open [`src/config/services.ts`](src/config/services.ts). Edit `title`, `description`, and `labNote` for each service.

---

## File Structure

```
src/
├── app/               Next.js App Router pages
│   ├── page.tsx       Home
│   ├── portfolio/     Portfolio grid
│   └── booking/       Booking form + WhatsApp
├── components/
│   ├── home/          Hero, BrandIntro, ServicesSection, FeaturedWork
│   ├── portfolio/     PortfolioGrid, Lightbox, CategoryFilter
│   ├── booking/       BookingForm
│   ├── layout/        Navbar, Footer, SmoothScrollProvider
│   └── ui/            LabStatus, StatusTicker, CustomCursor, FloatingWhatsApp
├── config/            Editable content configs
├── hooks/             useReducedMotion, useTextScramble, useMagneticHover
└── lib/               whatsapp.ts, utils.ts
public/
├── portfolio/         All portfolio images (35 × .jpg)
└── logos/             Brand logos (cream, white, dark blue)
```

---

## What to Fill In / Placeholder Checklist

- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`
- [ ] `NEXT_PUBLIC_SITE_URL` in `.env.local`
- [ ] Update portfolio item categories in `src/config/portfolio.ts`
- [ ] Update portfolio item titles/alt text for better SEO
- [ ] Add location keyword in `src/components/layout/Footer.tsx` (commented line `{/* Based in [YOUR CITY] */}`)
- [ ] Replace Open Graph image (`/logos/Brand logo cream.png`) with a proper OG image (1200×630)

---

## Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Animation**: GSAP (ScrollTrigger hero zoom) + Framer Motion (page components)
- **Smooth scroll**: Lenis
- **Icons**: Lucide React