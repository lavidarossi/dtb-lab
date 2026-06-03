import type { Metadata } from 'next'
import { BookingForm } from '@/components/booking/BookingForm'
import { StatusTicker } from '@/components/ui/StatusTicker'

export const metadata: Metadata = {
  title: 'Book a Project — Reserve Your Lab Slot',
  description:
    'Book a music poster, event design, or motion graphics project with DTB LAB. Fill the form and connect instantly via WhatsApp.',
  alternates: { canonical: '/booking' },
  openGraph: {
    title: 'Book DTB LAB — Reserve Your Lab Slot',
    description: 'Book a graphic design or motion project. Music posters, event design, promo videos.',
  },
}

export default function BookingPage() {
  return (
    <>
      {/* Spacer for fixed navbar */}
      <div className="h-28" aria-hidden />
      <StatusTicker />
      <BookingForm />
    </>
  )
}
