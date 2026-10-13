'use client';

import Image from 'next/image';
import { blurData } from '@/lib/blur-data';
import type { ImageProps } from 'next/image';

export type OptimizedImageProps = Omit<ImageProps, 'placeholder' | 'blurDataURL'> & {
  /** Optional manual blur data URL to override the auto-lookup from the blur-data registry. */
  blurDataUrl?: string;
};

/**
 * OptimizedImage — единый компонент для всех изображений MONOLITH.
 *
 * Автоматически:
 *  — подставляет blur-data preview из lib/blur-data.ts (data:image/webp;base64)
 *  — ставит placeholder="blur" или placeholder="empty"
 *  — использует AVIF/WebP через настройки next.config.mjs (formats)
 *
 * next/image уже ставит loading="lazy" для не-priority изображений,
 * поэтому здесь мы делегируем, добавляя только blur support.
 *
 * Может использоваться в Server и Client компонентах.
 */
export function OptimizedImage({ src, alt, blurDataUrl, ...props }: OptimizedImageProps) {
  const blur = blurDataUrl ?? (typeof src === 'string' ? blurData[src] : undefined);

  return (
    <Image
      src={src}
      alt={alt}
      placeholder={blur ? 'blur' : 'empty'}
      blurDataURL={blur}
      {...props}
    />
  );
}
