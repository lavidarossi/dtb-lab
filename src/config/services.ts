import type { Service } from '@/types'

export const SERVICES: Service[] = [
  {
    id:          'music-posters',
    title:       'Music Posters',
    description: 'High-impact visual identities for artists, singles, albums, and tours. Designed to stop the scroll and own the wall.',
    labNote:     'Formula: bold type + raw energy + your aesthetic = a poster that becomes a statement.',
    icon:        'music',
  },
  {
    id:          'event-design',
    title:       'Event Design',
    description: 'Full visual systems for shows, festivals, club nights, and activations — from flyer to stage backdrop.',
    labNote:     'Every event deserves a look that builds hype before the first note drops.',
    icon:        'calendar',
  },
  {
    id:          'motion-promos',
    title:       'Motion & Promo Videos',
    description: 'Short animated promos and motion graphics that punch through the feed. Built for Reels, Stories, and digital screens.',
    labNote:     'Static is dead. Motion makes the message move — and move people.',
    icon:        'film',
  },
  {
    id:          'websites',
    title:       'Website Building',
    description: 'Premium custom websites for artists, brands, and businesses. Portfolio sites, event pages, booking experiences — any type, built to match your identity.',
    labNote:     'This very site was built in the lab. We can build yours too.',
    icon:        'globe',
  },
]
