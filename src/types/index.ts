export type PortfolioCategory = 'all' | 'artist' | 'event' | 'concept' | 'motion'
export type MediaType = 'image' | 'video'

export interface PortfolioItem {
  id: string
  title: string
  category: Exclude<PortfolioCategory, 'all'>
  type: MediaType
  /** Primary display source — image src or video src */
  src: string
  /** All slides for a bundle (includes src as first item) */
  slides?: string[]
  alt: string
  featured?: boolean
  width: number
  height: number
}

export interface Service {
  id: string
  title: string
  description: string
  labNote: string
  icon: string
}

export interface StatusPhrase {
  id: string
  text: string
  context: 'global' | 'hero' | 'portfolio'
}

export interface BookingFormData {
  name: string
  projectType: 'poster' | 'event' | 'motion' | 'website' | 'other'
  timeline: string
  budget: string
  message: string
}
