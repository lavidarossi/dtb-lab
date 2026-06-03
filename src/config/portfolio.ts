import type { PortfolioItem } from '@/types'

const A = '/portfolio/artist'
const E = '/portfolio/event'
const C = '/portfolio/concept'
const M = '/portfolio/motion'

export const PORTFOLIO_ITEMS: PortfolioItem[] = [

  // ── ARTIST POSTERS — standalones ──────────────────────────────────────────
  { id: 'a01', title: 'ADE - IOSIO',                   category: 'artist', type: 'image', src: `${A}/ADE - IOSIO.png`,                          alt: 'ADE music poster for IOSIO by DTB LAB',                      width: 1080, height: 1350 },
  { id: 'a02', title: 'Baile Hour - IOSIO',             category: 'artist', type: 'image', src: `${A}/Baile Hour - IOSIO.png`,                   alt: 'Baile Hour artist poster for IOSIO by DTB LAB',              width: 1080, height: 1350 },
  { id: 'a03', title: 'Bumpy Ride - LUKA',              category: 'artist', type: 'image', src: `${A}/Bumpy Ride - LUKA.png`,                   alt: 'Bumpy Ride music poster for LUKA by DTB LAB',                width: 1080, height: 1080, featured: true },
  { id: 'a04', title: 'Children - N00M1',               category: 'artist', type: 'image', src: `${A}/Children - N00M1.png`,                    alt: 'Children music poster for N00M1 by DTB LAB',                 width: 1080, height: 1080 },
  { id: 'a05', title: 'Club Basis - Coster',            category: 'artist', type: 'image', src: `${A}/Club Basis - Coster.png`,                 alt: 'Club Basis music poster for Coster by DTB LAB',              width: 1080, height: 1080 },
  { id: 'a06', title: 'Control the Night - Gaya Carmeli', category: 'artist', type: 'image', src: `${A}/Control the Night - Gaya Carmeli.png`, alt: 'Control the Night poster for Gaya Carmeli by DTB LAB',       width: 1080, height: 1350, featured: true },
  { id: 'a07', title: 'Everybody - GEESIX',             category: 'artist', type: 'image', src: `${A}/Everybody - GEESIX.png`,                  alt: 'Everybody music poster for GEESIX by DTB LAB',               width: 1080, height: 1080 },
  { id: 'a08', title: 'Keep on Dancing - GEESIX',       category: 'artist', type: 'image', src: `${A}/Keep on dancing - GEESIX.jpg`,            alt: 'Keep on Dancing music poster for GEESIX by DTB LAB',         width: 1080, height: 1080 },
  { id: 'a09', title: 'Kingsday - GEESIX',              category: 'artist', type: 'image', src: `${A}/Kingsday - GEESIX.png`,                   alt: 'Kingsday music poster for GEESIX by DTB LAB',                width: 1080, height: 1080 },
  { id: 'a10', title: 'Lab Flyer Test - DTB Lab',       category: 'artist', type: 'image', src: `${A}/Lab Flyer Test - DTB Lab.png`,            alt: 'Lab Flyer Test concept poster by DTB LAB',                   width: 1080, height: 1350 },
  { id: 'a11', title: 'Never Forget You - Coster',      category: 'artist', type: 'image', src: `${A}/Never forget you - Coster.png`,           alt: 'Never Forget You music poster for Coster by DTB LAB',        width: 1080, height: 1350 },
  { id: 'a12', title: 'Nostalgia - N00M1',              category: 'artist', type: 'image', src: `${A}/Nostalgia - N00M1.png`,                   alt: 'Nostalgia music poster for N00M1 by DTB LAB',                width: 1080, height: 1080, featured: true },
  { id: 'a13', title: 'Partycrasher - Storm & Area Øne', category: 'artist', type: 'image', src: `${A}/Partycrasher - Storm & Area Øne.png`,   alt: 'Partycrasher music poster for Storm and Area One by DTB LAB', width: 1080, height: 1080 },
  { id: 'a14', title: 'Right Back - IOSIO',             category: 'artist', type: 'image', src: `${A}/Right Back - IOSIO.png`,                  alt: 'Right Back music poster for IOSIO by DTB LAB',               width: 1080, height: 1080 },
  { id: 'a15', title: 'Sexyback - GEESIX',              category: 'artist', type: 'image', src: `${A}/Sexyback - GEESIX.png`,                   alt: 'Sexyback music poster for GEESIX by DTB LAB',                width: 1080, height: 1080 },
  { id: 'a16', title: 'TU TU - IOSIO × LUKA',          category: 'artist', type: 'image', src: `${A}/TU TU - IOSIO x LUKA.jpg`,               alt: 'TU TU music poster for IOSIO x LUKA by DTB LAB',             width: 1080, height: 1080 },
  { id: 'a17', title: 'Tourdates - Floris van Dijk',   category: 'artist', type: 'image', src: `${A}/Tourdates - Floris van Dijk.png`,         alt: 'Tourdates poster for Floris van Dijk by DTB LAB',            width: 1080, height: 1350 },
  { id: 'a18', title: "Tourdates 04 - Gaya Carmeli",   category: 'artist', type: 'image', src: `${A}/Tourdates 04 - Gaya Carmeli.png`,         alt: 'Tourdates 04 poster for Gaya Carmeli by DTB LAB',            width: 1080, height: 1350, featured: true },
  { id: 'a19', title: "You're the Only One - GEESIX",  category: 'artist', type: 'image', src: `${A}/You're the only one - GEESIX.png`,        alt: "You're the Only One music poster for GEESIX by DTB LAB",     width: 1080, height: 1080 },

  // ── ARTIST POSTERS — bundles ──────────────────────────────────────────────
  {
    id: 'a20', title: 'Tourdates 06 - D-sturb', category: 'artist', type: 'image', featured: true,
    src:    `${A}/tourdates-06-d-sturb/D-sturb - tourdates.png`,
    slides: [
      `${A}/tourdates-06-d-sturb/D-sturb - tourdates.png`,
      `${A}/tourdates-06-d-sturb/D-sturb - first frame.png`,
      `${A}/tourdates-06-d-sturb/June.png`,
      `${A}/tourdates-06-d-sturb/July + Aug.png`,
    ],
    alt: 'Tourdates 06 D-sturb bundle by DTB LAB', width: 1080, height: 1080,
  },
  {
    id: 'a21', title: 'Tourdates 05 - IOSIO', category: 'artist', type: 'image', featured: true,
    src:    `${A}/tourdates-05-iosio/Last slide V1.png`,
    slides: [
      `${A}/tourdates-05-iosio/Last slide V1.png`,
      `${A}/tourdates-05-iosio/Start video - V2.png`,
      `${A}/tourdates-05-iosio/MAYE JUNE V2.png`,
      `${A}/tourdates-05-iosio/JULY V2.png`,
    ],
    alt: 'Tourdates 05 IOSIO slide bundle by DTB LAB', width: 1080, height: 1080,
  },
  {
    id: 'a22', title: 'Tourdates 02 - BLNK', category: 'artist', type: 'image', featured: true,
    src:    `${A}/tourdates-02-blnk/insta-slide-1.png`,
    slides: [
      `${A}/tourdates-02-blnk/insta-slide-1.png`,
      `${A}/tourdates-02-blnk/insta-slide-2.png`,
    ],
    alt: 'Tourdates 02 BLNK bundle by DTB LAB', width: 1080, height: 1080,
  },
  {
    id: 'a23', title: 'Tourdates 04 - IOSIO', category: 'artist', type: 'image',
    src:    `${A}/tourdates-04-iosio/April-IOSIO_01.jpg`,
    slides: [
      `${A}/tourdates-04-iosio/April-IOSIO_01.jpg`,
      `${A}/tourdates-04-iosio/April-IOSIO_02.jpg`,
    ],
    alt: 'Tourdates 04 IOSIO bundle by DTB LAB', width: 1080, height: 1350,
  },
  {
    id: 'a24', title: 'Tourdates 02 - IOSIO', category: 'artist', type: 'image',
    src:    `${A}/tourdates-02-iosio/6.1.png`,
    slides: [
      `${A}/tourdates-02-iosio/6.1.png`,
      `${A}/tourdates-02-iosio/6.2.png`,
    ],
    alt: 'Tourdates 02 IOSIO bundle by DTB LAB', width: 1080, height: 1350,
  },
  {
    id: 'a25', title: 'Tourdates 02 - Area Øne', category: 'artist', type: 'image',
    src:    `${A}/tourdates-02-area-one/Slide 1.png`,
    slides: [
      `${A}/tourdates-02-area-one/Slide 1.png`,
      `${A}/tourdates-02-area-one/Slide 2.png`,
    ],
    alt: 'Tourdates 02 Area One bundle by DTB LAB', width: 1080, height: 1080,
  },
  {
    id: 'a26', title: 'Tourdates 08 - IOSIO', category: 'artist', type: 'image',
    src:    `${A}/tourdates-08-iosio/def papi tour voorkant.png`,
    slides: [
      `${A}/tourdates-08-iosio/def papi tour voorkant.png`,
      `${A}/tourdates-08-iosio/def max.png`,
    ],
    alt: 'Tourdates 08 IOSIO bundle by DTB LAB', width: 1080, height: 1350,
  },
  {
    id: 'a27', title: 'Tourdates 12 - IOSIO', category: 'artist', type: 'image',
    src:    `${A}/tourdates-12-iosio/Tekengebied 3.png`,
    slides: [
      `${A}/tourdates-12-iosio/Tekengebied 3.png`,
      `${A}/tourdates-12-iosio/Tekengebied 4.png`,
    ],
    alt: 'Tourdates 12 IOSIO bundle by DTB LAB', width: 1080, height: 1080,
  },

  // ── EVENT POSTERS ─────────────────────────────────────────────────────────
  { id: 'e01', title: 'AMOR - 13 June',              category: 'event', type: 'image', src: `${E}/AMOR - 13 June.png`,              alt: 'AMOR event poster 13 June by DTB LAB',          width: 1080, height: 1350 },
  { id: 'e02', title: 'AMOR - 14 February',          category: 'event', type: 'image', src: `${E}/AMOR - 14 February.png`,          alt: 'AMOR event poster 14 February by DTB LAB',      width: 1080, height: 1350 },
  { id: 'e03', title: 'AMOR - 14 March',             category: 'event', type: 'image', src: `${E}/AMOR - 14 March.png`,             alt: 'AMOR event poster 14 March by DTB LAB',         width: 1080, height: 1350 },
  { id: 'e04', title: 'AMOR - 24 May',               category: 'event', type: 'image', src: `${E}/AMOR - 24 May.png`,               alt: 'AMOR event poster 24 May by DTB LAB',           width: 1080, height: 1350, featured: true },
  { id: 'e05', title: 'AMOR 22 - May',               category: 'event', type: 'image', src: `${E}/AMOR 22 - May.png`,               alt: 'AMOR 22 event poster May by DTB LAB',           width: 1080, height: 1350 },
  { id: 'e06', title: 'House of Revolt - 20 Feb',    category: 'event', type: 'image', src: `${E}/House of Revolt - 20 February.png`, alt: 'House of Revolt event poster by DTB LAB',     width: 1080, height: 1350 },
  { id: 'e07', title: 'Issalini - 29 May',           category: 'event', type: 'image', src: `${E}/Issalini - 29 May.png`,           alt: 'Issalini event poster 29 May by DTB LAB',       width: 1080, height: 1350 },
  { id: 'e08', title: 'Kalknacht - 31 March',        category: 'event', type: 'image', src: `${E}/Kalknacht - 31 March.png`,        alt: 'Kalknacht event poster 31 March by DTB LAB',    width: 1080, height: 1080 },
  { id: 'e09', title: 'Kulosa - 11 April',           category: 'event', type: 'image', src: `${E}/Kulosa - 11 April.png`,           alt: 'Kulosa event poster 11 April by DTB LAB',       width: 1080, height: 1350 },
  { id: 'e10', title: 'Lipstick - 13 June',          category: 'event', type: 'image', src: `${E}/Lipstick - 13 June.png`,          alt: 'Lipstick event poster 13 June by DTB LAB',      width: 1080, height: 1350 },
  { id: 'e11', title: 'More Than Friends - 31 Jan',  category: 'event', type: 'image', src: `${E}/More than friends - 31 January.png`, alt: 'More Than Friends event poster by DTB LAB',  width: 1080, height: 1350 },
  { id: 'e12', title: 'Stiekum - 17 April',          category: 'event', type: 'image', src: `${E}/Stiekum - 17 April.png`,          alt: 'Stiekum event poster 17 April by DTB LAB',      width: 1080, height: 1350 },
  { id: 'e13', title: 'Vies Veesje - 12 February',   category: 'event', type: 'image', src: `${E}/Vies Veesje - 12 February.png`,  alt: 'Vies Veestje event poster 12 February by DTB LAB', width: 1080, height: 1350 },
  {
    id: 'e14', title: 'Dates - More Than Friends', category: 'event', type: 'image',
    src:    `${E}/dates-more-than-friends/More Than Friends Magazine.png`,
    slides: [
      `${E}/dates-more-than-friends/More Than Friends Magazine.png`,
      `${E}/dates-more-than-friends/JP - 1350 2.png`,
      `${E}/dates-more-than-friends/Wessel S - 1350.png`,
      `${E}/dates-more-than-friends/MC SK  1350_.png`,
      `${E}/dates-more-than-friends/Zerodix - 1350.png`,
    ],
    alt: 'Dates More Than Friends event bundle by DTB LAB', width: 1080, height: 1350,
  },

  // ── CONCEPT POSTERS ───────────────────────────────────────────────────────
  { id: 'c01', title: '404 - DTB Lab',              category: 'concept', type: 'image', src: `${C}/404 - DTB Lab.png`,              alt: '404 concept poster by DTB LAB',                 width: 1080, height: 1080, featured: true },
  { id: 'c02', title: 'Balaclava - DTB Lab',        category: 'concept', type: 'image', src: `${C}/Balaclava - DTB Lab.png`,        alt: 'Balaclava concept poster by DTB LAB',           width: 1080, height: 1080, featured: true },
  { id: 'c03', title: 'DTB × JNSN - DTB Lab',      category: 'concept', type: 'image', src: `${C}/DTB x JNSN - DTB Lab.png`,       alt: 'DTB x JNSN collaboration concept poster by DTB LAB', width: 1080, height: 1080 },
  { id: 'c04', title: 'Dissolved - DTB Lab',        category: 'concept', type: 'image', src: `${C}/Dissolved - DTB Lab.png`,        alt: 'Dissolved concept poster by DTB LAB',           width: 1080, height: 1350, featured: true },
  { id: 'c05', title: 'Lab Locked - DTB Lab',       category: 'concept', type: 'image', src: `${C}/Lab Locked - DTB Lab.png`,       alt: 'Lab Locked concept poster by DTB LAB',          width: 1080, height: 1080 },
  {
    id: 'c06', title: 'Link - DTB Lab', category: 'concept', type: 'image', featured: true,
    src:    `${C}/link-dtb-lab/Link.png`,
    slides: [
      `${C}/link-dtb-lab/Link.png`,
      `${C}/link-dtb-lab/Link 2.png`,
      `${C}/link-dtb-lab/Link 3.png`,
    ],
    alt: 'Link concept poster bundle by DTB LAB', width: 1080, height: 1080,
  },

  // ── MOTION ────────────────────────────────────────────────────────────────
  { id: 'm01', title: 'House of Revolt',       category: 'motion', type: 'video', src: `${M}/House of Revolt.mp4`,         alt: 'House of Revolt motion promo by DTB LAB', width: 1080, height: 1920 },
  { id: 'm02', title: 'Tourdates 05 - IOSIO',  category: 'motion', type: 'video', src: `${M}/Tourdates 05 - IOSIO.mp4`,   alt: 'Tourdates 05 IOSIO motion video by DTB LAB', width: 1080, height: 1920 },
  { id: 'm03', title: 'Tourdates 06 - D-sturb', category: 'motion', type: 'video', src: `${M}/Tourdates 06 - D-sturb.mp4`, alt: 'Tourdates 06 D-sturb motion video by DTB LAB', width: 1080, height: 1920 },
]

// Featured items in the exact order requested
export const FEATURED_ITEMS: PortfolioItem[] = [
  // 1  Tourdates 06 - D-sturb
  PORTFOLIO_ITEMS.find(i => i.id === 'a20')!,
  // 2  Tourdates - BLNK
  PORTFOLIO_ITEMS.find(i => i.id === 'a22')!,
  // 3  Tourdates 05 - IOSIO
  PORTFOLIO_ITEMS.find(i => i.id === 'a21')!,
  // 4  Tourdates 04 - Gaya Carmeli
  PORTFOLIO_ITEMS.find(i => i.id === 'a18')!,
  // 5  Nostalgia - N00M1
  PORTFOLIO_ITEMS.find(i => i.id === 'a12')!,
  // 6  Bumpy Ride - LUKA
  PORTFOLIO_ITEMS.find(i => i.id === 'a03')!,
  // 7  Control the Night - Gaya Carmeli
  PORTFOLIO_ITEMS.find(i => i.id === 'a06')!,
  // 8  Link - DTB Lab
  PORTFOLIO_ITEMS.find(i => i.id === 'c06')!,
  // 9  Dissolved - DTB Lab
  PORTFOLIO_ITEMS.find(i => i.id === 'c04')!,
  // 10 404 DTB Lab
  PORTFOLIO_ITEMS.find(i => i.id === 'c01')!,
  // 11 Balaclava DTB Lab
  PORTFOLIO_ITEMS.find(i => i.id === 'c02')!,
  // 12 AMOR - 24 May
  PORTFOLIO_ITEMS.find(i => i.id === 'e04')!,
]

export const PORTFOLIO_COUNT = 50
