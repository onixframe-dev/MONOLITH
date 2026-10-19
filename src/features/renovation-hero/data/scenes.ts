/** The images are registered to the final architectural frame (see data/renovation-alignment.json).
 *  Each stage is a complete rendered photograph, not a transparent product cut-out.
 *
 *  Adaptive composition: the five stages share a single camera axis, so every
 *  breakpoint uses the SAME registered crop (full-height, no vertical scaling) and
 *  therefore never drifts between transitions. See scripts/_align.cjs for the crop
 *  parameters that keep the glazing window and furniture mass in-frame.
 */
export type RenovationScene = {
  id: string;
  name: string;
  label: string;
  title: string;
  accent: string;
  description: string;
  /** Desktop (16:9) — original wide frame. */
  src: string;
  /** Tablet (4:5) — registered right-aligned portrait crop. */
  srcTablet: string;
  /** Mobile (3:4) — registered right-aligned portrait crop. */
  srcMobile: string;
};

export const renovationScenes: RenovationScene[] = [
  {
    id: 'shell',
    name: 'Основа',
    label: '01 / ТОЧКА ОТСЧЁТА',
    title: 'ВСЁ НАЧИНАЕТСЯ',
    accent: 'С ИДЕИ',
    description: 'Пока здесь только стены. Мы уже видим пространство, в котором захочется жить.',
    src: '/images/hero-renovation/01-raw-shell.webp',
    srcTablet: '/images/hero-renovation/tablet/01-raw-shell-tablet.webp',
    srcMobile: '/images/hero-renovation/mobile/01-raw-shell-mobile.webp',
  },
  {
    id: 'finishes',
    name: 'Отделка',
    label: '02 / ГЕОМЕТРИЯ И МАТЕРИАЛЫ',
    title: 'ПРОСТРАНСТВО',
    accent: 'ОБРЕТАЕТ ФОРМУ',
    description: 'Продуманные поверхности, натуральные фактуры и точность каждого решения.',
    src: '/images/hero-renovation/02-finished-shell.webp',
    srcTablet: '/images/hero-renovation/tablet/02-finished-shell-tablet.webp',
    srcMobile: '/images/hero-renovation/mobile/02-finished-shell-mobile.webp',
  },
  {
    id: 'lighting',
    name: 'Свет',
    label: '03 / АТМОСФЕРА',
    title: 'СВЕТ МЕНЯЕТ',
    accent: 'ВСЁ',
    description: 'Освещение раскрывает архитектуру и превращает пространство в настроение.',
    src: '/images/hero-renovation/03-lighting.webp',
    srcTablet: '/images/hero-renovation/tablet/03-lighting-tablet.webp',
    srcMobile: '/images/hero-renovation/mobile/03-lighting-mobile.webp',
  },
  {
    id: 'kitchen',
    name: 'Кухня',
    label: '04 / ФУНКЦИОНАЛЬНОСТЬ',
    title: 'КАЖДАЯ ДЕТАЛЬ',
    accent: 'НА СВОЁМ МЕСТЕ',
    description: 'Кухня, материалы и мебель создают единую, удобную для жизни композицию.',
    src: '/images/hero-renovation/04-kitchen.webp',
    srcTablet: '/images/hero-renovation/tablet/04-kitchen-tablet.webp',
    srcMobile: '/images/hero-renovation/mobile/04-kitchen-mobile.webp',
  },
  {
    id: 'complete',
    name: 'Интерьер',
    label: '05 / РЕЗУЛЬТАТ',
    title: 'ИНТЕРЬЕР,',
    accent: 'В КОТОРОМ ХОЧЕТСЯ ЖИТЬ',
    description:
      'MONOLITH. От первой идеи до последнего акцента. Создадим пространство, которое будет вашим.',
    src: '/images/hero-renovation/05-finished-interior.webp',
    srcTablet: '/images/hero-renovation/tablet/05-finished-interior-tablet.webp',
    srcMobile: '/images/hero-renovation/mobile/05-finished-interior-mobile.webp',
  },
];

/** Scroll progress ranges: four transformations plus a final pause for CTA. */
export const renovationTransitions = [
  { start: 0.1, end: 0.28 },
  { start: 0.32, end: 0.5 },
  { start: 0.54, end: 0.7 },
  { start: 0.74, end: 0.9 },
] as const;
