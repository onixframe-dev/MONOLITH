'use client';

import { OptimizedImage } from '@/components/shared/OptimizedImage';
import type { RenovationScene } from '@/features/renovation-hero/data/scenes';
import { blurData } from '@/lib/blur-data';
import type { ImageProps } from 'next/image';

export type RenovationFrameProps = {
  /** Registered scene describing the three composition variants. */
  scene: RenovationScene;
  /** Stage index — used for eager loading of the first frame. */
  index: number;
  /** Called when the underlying image completes decoding. */
  onReady: (index: number) => void;
} & Omit<ImageProps, 'src' | 'alt'>;

/**
 * RenovationFrame — адаптивный выбор изображения секвенции ремонта.
 *
 * Для каждого из пяти зарегистрированных этапов рендерятся desktop и tablet
 * варианты. На телефоне используется полный desktop-оригинал: существующий
 * мобильный crop слишком узок и теряет связь кухни с гостиной. Мобильная
 * композиция задаётся Hero CSS, а не очередным сдвигом object-position.
 *
 * Используется <picture> с tablet <source>; на телефоне Next Image подбирает
 * оптимизированную по ширине версию полного desktop-оригинала.
 */
export function RenovationFrame({ scene, index, onReady, ...props }: RenovationFrameProps) {
  return (
    <OptimizedImage
      src={scene.src}
      alt=""
      fill
      loading="eager"
      fetchPriority={index === 0 ? 'high' : 'low'}
      placeholder="empty"
      blurDataUrl={blurData[scene.src]}
      sources={[
        { media: '(max-width: 767px)', src: scene.srcMobile },
        { media: '(min-width: 768px) and (max-width: 1199px)', src: scene.srcTablet },
      ]}
      sizes="100vw"
      className="renov-image"
      onLoad={() => onReady(index)}
      {...props}
    />
  );
}
