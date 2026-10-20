'use client';

import Image from 'next/image';
import { blurData } from '@/lib/blur-data';
import type { ImageProps } from 'next/image';

export type ImageSource = {
  /** Media query for the source, e.g. "(max-width: 767px)". */
  media: string;
  /** Source image path (served as WebP, with AVIF fallback via next.config.mjs formats). */
  src: string;
  /** Optional type attribute, defaults to image/webp. */
  type?: string;
};

export type OptimizedImageProps = Omit<ImageProps, 'placeholder' | 'blurDataURL'> & {
  /** Optional manual blur data URL to override the auto-lookup from the blur-data registry. */
  blurDataUrl?: string;
  /**
   * Responsive `<source>` variants. When provided, the component renders a
   * `<picture>` element: the browser selects the first matching `<source>`
   * by media query and falls back to the `src` Image. This prevents the
   * browser from downloading a desktop-sized image on mobile.
   */
  sources?: ImageSource[];
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
export function OptimizedImage({ src, alt, blurDataUrl, sources, ...props }: OptimizedImageProps) {
  const blur = blurDataUrl ?? (typeof src === 'string' ? blurData[src] : undefined);

  const image = (
    <Image
      src={src}
      alt={alt}
      placeholder={blur ? 'blur' : 'empty'}
      blurDataURL={blur}
      {...props}
    />
  );

  // Without sources, render a plain next/image (backward compatible).
  if (!sources || sources.length === 0) {
    return image;
  }

  return (
    <picture>
      {sources.map((source) => (
        <source
          key={source.src}
          media={source.media}
          srcSet={source.src}
          type={source.type ?? 'image/webp'}
        />
      ))}
      {image}
    </picture>
  );
}
