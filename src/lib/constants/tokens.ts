/** Цветовые токены проекта (зеркалируют :root в globals.css). */
export const COLORS = {
  ink: '#111311',
  ink2: '#191b18',
  ink3: '#262722',
  line: 'rgba(255, 255, 255, 0.12)',
  lineDark: 'rgba(18, 19, 18, 0.16)',
  paper: '#e9e5dd',
  cream: '#f0ece4',
  muted: '#a1a19b',
  accent: '#d9b997',
  accent2: '#b99573',
} as const;

/** Типографические токены. */
export const TYPOGRAPHY = {
  heading: 'Arial, Helvetica, sans-serif',
  body: 'Arial, Helvetica, sans-serif',
} as const;

/** Размеры контейнеров. */
export const CONTAINER = {
  maxWidth: '1460px',
  horizontalPadding: '52px',
} as const;
