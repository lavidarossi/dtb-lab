'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { LabStatus } from '@/components/ui/LabStatus'
import { GLOBAL_PHRASES } from '@/config/statusQuotes'
import { buildWhatsAppUrl, quickWhatsApp } from '@/lib/whatsapp'
import { fadeUp, staggerContainer } from '@/config/motion'
import type { BookingFormData } from '@/types'

const PROJECT_TYPES = [
  { value: 'poster',  label: 'Music Poster'                         },
  { value: 'event',   label: 'Event Design'                          },
  { value: 'motion',  label: 'Motion / Promo Video'                  },
  { value: 'website', label: 'Website — portfolio, business & more'  },
  { value: 'other',   label: 'Other / Not sure yet'                  },
]

const BUDGET_RANGES = [
  { value: '', label: 'Prefer not to say' },
  { value: 'Under €100', label: 'Under €100' },
  { value: '€100 – €300', label: '€100 – €300' },
  { value: '€300 – €600', label: '€300 – €600' },
  { value: '€600+', label: '€600+' },
]

const INITIAL: BookingFormData = {
  name: '', projectType: 'poster', timeline: '', budget: '', message: '',
}

export function BookingForm() {
  const [form, setForm] = useState<BookingFormData>(INITIAL)
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({})

  const set = (key: keyof BookingFormData, value: string) => {
    setForm(f => ({ ...f, [key]: value }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }))
  }

  const validate = (): boolean => {
    const e: typeof errors = {}
    if (!form.name.trim())      e.name = 'Name is required'
    if (!form.timeline.trim())  e.timeline = 'Timeline is required'
    if (!form.message.trim())   e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const url = buildWhatsAppUrl(form)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const inputClass = (field: keyof BookingFormData) => [
    'w-full bg-surface-2 border rounded px-4 py-3 font-mono text-sm text-cream placeholder-cream/30',
    'focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200',
    errors[field] ? 'border-red-500/60' : 'border-border hover:border-cream/20',
  ].join(' ')

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-base" aria-label="Book a project">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left — info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="space-y-8"
          >
            <motion.div variants={fadeUp} className="space-y-4">
              <LabStatus phrase={GLOBAL_PHRASES[2].text} />
              <h1 className="font-mono text-display-lg text-cream">
                Reserve a lab slot<span className="text-accent">.</span>
              </h1>
              <p className="text-cream/60 text-lg leading-relaxed max-w-md">
                Fill the form and it opens directly in WhatsApp with your project brief pre-loaded. No emails, no waiting — just a conversation.
              </p>
            </motion.div>

            {/* Direct WA button */}
            <motion.div variants={fadeUp}>
              <a
                href={quickWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="inline-flex items-center gap-3 px-6 py-4 bg-[#25D366] text-white font-mono text-sm tracking-widest uppercase rounded hover:bg-[#1ebe5c] transition-colors duration-200 shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.522 5.845L.053 23.947a.5.5 0 0 0 .601.601l6.102-1.469A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.373l-.36-.213-3.727.978.979-3.727-.213-.36A9.818 9.818 0 0 1 2.182 12C2.182 6.565 6.565 2.182 12 2.182S21.818 6.565 21.818 12 17.435 21.818 12 21.818z"/>
                </svg>
                Message me directly
              </a>
            </motion.div>

            {/* Info terminal */}
            <motion.div variants={fadeUp} className="rounded-lg border border-border bg-surface-2 p-6 font-mono text-xs space-y-2">
              {[
                ['RESPONSE_TIME',  '&lt; 24 hours'],
                ['SERVICES',       'Design · Motion · Website'],
                ['WEBSITES',       'Portfolio · Business · Any type'],
                ['REVISIONS',      'Discussed per project'],
                ['SLOT_STATUS',    'OPEN'],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <span className="text-status/50 w-28 shrink-0">{k}</span>
                  <span
                    className={k === 'SLOT_STATUS' ? 'text-accent' : 'text-cream/70'}
                    dangerouslySetInnerHTML={{ __html: v }}
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-lg border border-border bg-surface-2 p-6 sm:p-8 space-y-6"
              aria-label="Project enquiry form"
            >
              {/* Terminal bar */}
              <div className="flex items-center gap-2 pb-4 border-b border-border">
                <div className="w-2 h-2 rounded-full bg-red-500/60" aria-hidden />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" aria-hidden />
                <div className="w-2 h-2 rounded-full bg-green-500/60" aria-hidden />
                <span className="font-mono text-xs text-cream/30 ml-2">new_project.lab</span>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block font-mono text-xs font-bold text-cream tracking-widest uppercase">
                  Your name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="e.g. Alex Torres"
                  autoComplete="name"
                  className={inputClass('name')}
                />
                {errors.name && <p className="text-red-400 font-mono text-xs">{errors.name}</p>}
              </div>

              {/* Project type */}
              <div className="space-y-2">
                <label htmlFor="projectType" className="block font-mono text-xs font-bold text-cream tracking-widest uppercase">
                  Project type *
                </label>
                <select
                  id="projectType"
                  value={form.projectType}
                  onChange={e => set('projectType', e.target.value)}
                  className={inputClass('projectType')}
                >
                  {PROJECT_TYPES.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <label htmlFor="timeline" className="block font-mono text-xs font-bold text-cream tracking-widest uppercase">
                  Timeline / Preferred date *
                </label>
                <input
                  id="timeline"
                  type="text"
                  value={form.timeline}
                  onChange={e => set('timeline', e.target.value)}
                  placeholder="e.g. ASAP, within 2 weeks, by July 15"
                  className={inputClass('timeline')}
                />
                {errors.timeline && <p className="text-red-400 font-mono text-xs">{errors.timeline}</p>}
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label htmlFor="budget" className="block font-mono text-xs font-bold text-cream tracking-widest uppercase">
                  Budget range (optional)
                </label>
                <select
                  id="budget"
                  value={form.budget}
                  onChange={e => set('budget', e.target.value)}
                  className={inputClass('budget')}
                >
                  {BUDGET_RANGES.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="block font-mono text-xs font-bold text-cream tracking-widest uppercase">
                  Describe your project *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={e => set('message', e.target.value)}
                  placeholder="Tell me about the project — artist, event, vibe, references, goals..."
                  className={inputClass('message')}
                />
                {errors.message && <p className="text-red-400 font-mono text-xs">{errors.message}</p>}
              </div>

              <button
                type="submit"
                data-cursor-hover
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-accent text-base font-mono text-sm tracking-widest uppercase rounded hover:bg-accent-dim transition-colors duration-200 shadow-glow-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2"
              >
                <Send size={16} aria-hidden />
                Send on WhatsApp
              </button>

              <p className="font-mono text-xs text-cream/30 text-center">
                Clicking will open WhatsApp with your brief pre-filled.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
