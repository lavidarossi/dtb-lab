import type { StatusPhrase } from '@/types'

// Edit this array freely — add/remove/reorder entries
export const STATUS_PHRASES: StatusPhrase[] = [
  { id: 'hero',      text: 'Enter the lab',                              context: 'hero'      },
  { id: 'run-test',  text: 'Running test in the lab',                    context: 'global'    },
  { id: 'protocol',  text: 'Protocol: run all tests',                    context: 'global'    },
  { id: 'deliver',   text: 'Tests are getting delivered in the lab',     context: 'global'    },
  { id: 'cycle',     text: 'The cycle is active',                        context: 'global'    },
  { id: 'test-mode', text: 'Test mode: ON',                              context: 'global'    },
  { id: 'activity',  text: 'Lab activity: high',                         context: 'portfolio' },
  { id: 'formulas',  text: 'New formulas are getting tested here',       context: 'portfolio' },
]

export const GLOBAL_PHRASES = STATUS_PHRASES.filter(p => p.context === 'global')
export const PORTFOLIO_PHRASES = STATUS_PHRASES.filter(p => p.context === 'portfolio')
export const HERO_PHRASE = STATUS_PHRASES.find(p => p.context === 'hero')!
