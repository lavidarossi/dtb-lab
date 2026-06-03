// Shared motion tokens — use these everywhere for a cohesive feel
export const EASE = {
  lab:      [0.25, 0.46, 0.45, 0.94] as [number,number,number,number],
  bounce:   [0.34, 1.56, 0.64, 1]    as [number,number,number,number],
  sharp:    [0.4,  0,    0.2,  1]     as [number,number,number,number],
  out:      [0,    0,    0.2,  1]     as [number,number,number,number],
  in:       [0.4,  0,    1,    1]     as [number,number,number,number],
}

export const DUR = {
  fast:   0.15,
  normal: 0.3,
  slow:   0.6,
  xslow:  1.0,
}

export const STAGGER = {
  fast:   0.05,
  normal: 0.08,
  slow:   0.12,
}

// Framer Motion variants
export const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DUR.slow, ease: EASE.lab },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.slow, ease: EASE.lab } },
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER.normal } },
}
