import type { BookingFormData } from '@/types'

export function buildWhatsAppUrl(data: BookingFormData): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
  const message = buildMessage(data)
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

function buildMessage(data: BookingFormData): string {
  const lines = [
    'Hello DTB LAB!',
    '',
    `Name: ${data.name}`,
    `Project Type: ${data.projectType}`,
    `Timeline: ${data.timeline}`,
    data.budget ? `Budget: ${data.budget}` : null,
    '',
    `Message: ${data.message}`,
  ]
  return lines.filter(l => l !== null).join('\n')
}

export function quickWhatsApp(text?: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
  const msg = text ?? 'Hello DTB LAB! I would like to book a project.'
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`
}
