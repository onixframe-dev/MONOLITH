export type HeroSceneData = {
  label: string; room: string; line1: string; line2: string; body: string; src: string; position: string;
  /** Per-room 2.5D camera path; values are percentage pan and scale. */
  camera: { start: { zoom: number; panX: number; panY: number }; end: { zoom: number; panX: number; panY: number } };
};

export const heroScenes: HeroSceneData[] = [
  { label: '01 / ПЕРВОЕ ВПЕЧАТЛЕНИЕ', room: 'Прихожая', line1: 'ПРОСТРАНСТВО', line2: 'НАЧИНАЕТСЯ С ИДЕИ', body: 'Дизайн интерьера, в котором каждый метр работает на ваш комфорт.', src: '/images/projects/apartment-01/hallway.webp', position: 'center', camera: { start: { zoom: 1.02, panX: 0, panY: 1 }, end: { zoom: 1.09, panX: 1.8, panY: -1 } } },
  { label: '02 / МЕСТО ПРИТЯЖЕНИЯ', room: 'Гостиная', line1: 'ИНТЕРЬЕРЫ,', line2: 'В КОТОРЫХ ЖИВУТ', body: 'Создаём атмосферу, к которой хочется возвращаться каждый день.', src: '/images/projects/apartment-01/living.webp', position: 'center', camera: { start: { zoom: 1.04, panX: -1.5, panY: 0 }, end: { zoom: 1.11, panX: -3.2, panY: 1.2 } } },
  { label: '03 / ВАЖНЫЕ ДЕТАЛИ', room: 'Кухня', line1: 'КРАСОТА', line2: 'В КАЖДОЙ ДЕТАЛИ', body: 'Материалы, свет, пропорции и логика пространства работают вместе.', src: '/images/projects/apartment-01/kitchen.webp', position: 'center', camera: { start: { zoom: 1.03, panX: 2.2, panY: 0 }, end: { zoom: 1.09, panX: 4, panY: -1.1 } } },
  { label: '04 / ЛИЧНОЕ ПРОСТРАНСТВО', room: 'Спальня', line1: 'КОМФОРТ', line2: 'БЕЗ КОМПРОМИССОВ', body: 'Лаконичная эстетика и индивидуальные решения для спокойной жизни.', src: '/images/projects/apartment-01/bedroom.webp', position: 'center', camera: { start: { zoom: 1.03, panX: 1.2, panY: 0 }, end: { zoom: 1.1, panX: -2.4, panY: 1.8 } } },
  { label: '05 / ПРОДУМАНО ДО МЕЛОЧЕЙ', room: 'Ванная', line1: 'ОТ ЭСКИЗА', line2: 'ДО РЕАЛИЗАЦИИ', body: 'Единая концепция, которая становится настоящим интерьером.', src: '/images/projects/apartment-01/bathroom.webp', position: 'center', camera: { start: { zoom: 1.02, panX: -1, panY: 0 }, end: { zoom: 1.065, panX: 1.2, panY: -1.4 } } },
];
