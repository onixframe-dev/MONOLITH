'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { OptimizedImage } from '@/components/shared/OptimizedImage';
import { cn } from '@/lib/utils';
import styles from './Gallery.module.css';
import type { MediaAsset } from '@/types/content';

/**
 * Gallery — интерактивная галерея с миниатюрами и лайтбоксом.
 *
 * Оптимизации:
 *  — Миниатюры используют cardSrc (850px → ~50 KB) с loading="lazy"
 *  — Featured-изображение: priority только для первого, остальные eager
 *  — Предзагрузка соседних изображений для плавного переключения
 *  — blur-preview для всех изображений через OptimizedImage
 */
export function Gallery({ images }: { images: MediaAsset[] }) {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const preloadRef = useRef<Set<string>>(new Set());

  useEffect(() => setMounted(true), []);

  /** Preload an image by adding a hidden Image element — works with next/image optimizer. */
  function preload(src: string) {
    if (preloadRef.current.has(src)) return;
    preloadRef.current.add(src);
    const img = new Image();
    img.src = src;
  }

  /** Preload current + neighbours on mount / index change. */
  useEffect(() => {
    if (!mounted) return;
    preload(images[index]?.src);
    preload(images[index + 1]?.src);
    preload(images[index - 1]?.src);
  }, [index, mounted, images]);

  const current = images[index];

  function go(n: number) {
    setIndex((n + images.length) % images.length);
  }

  if (!current) return null;

  return (
    <div className="gallery">
      <div className={cn(styles.galleryFeatured, 'gallery-featured')}>
        <OptimizedImage
          src={current.src}
          alt={current.alt}
          fill
          priority={index === 0}
          sizes="(max-width:950px) 100vw, 75vw"
          loading={index === 0 ? 'eager' : 'eager'}
          decoding="async"
        />
        <div className={cn(styles.galleryControls, 'gallery-controls')}>
          <span>
            0{index + 1} / 0{images.length}
          </span>
          <div>
            <button onClick={() => go(index - 1)} aria-label="Предыдущее фото">
              <ChevronLeft size={19} />
            </button>
            <button onClick={() => go(index + 1)} aria-label="Следующее фото">
              <ChevronRight size={19} />
            </button>
            <button onClick={() => setFullscreen(true)} aria-label="Открыть на весь экран">
              <Expand size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="gallery-thumbs">
        {images.map((im, i) => (
          <button
            type="button"
            key={im.src}
            onClick={() => setIndex(i)}
            className={cn(
              styles.galleryThumb,
              'gallery-thumb',
              i === index ? cn(styles.isSelected, 'is-selected') : '',
            )}
            aria-label={'Показать фотографию ' + (i + 1)}
          >
            <OptimizedImage
              src={im.cardSrc || im.src}
              alt={im.alt}
              fill
              sizes="150px"
              loading="lazy"
              fetchPriority="low"
              decoding="async"
            />
          </button>
        ))}
      </div>
      {fullscreen && (
        <div
          className={cn(styles.lightbox, 'lightbox')}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографий"
          onClick={() => setFullscreen(false)}
        >
          <button
            className={cn(styles.lightboxClose, 'lightbox-close')}
            onClick={() => setFullscreen(false)}
            aria-label="Закрыть"
          >
            ✕
          </button>
          <div
            className={cn(styles.lightboxImage, 'lightbox-image')}
            onClick={(e) => e.stopPropagation()}
          >
            <OptimizedImage
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              loading="eager"
              decoding="async"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div
            className={cn(styles.lightboxBottom, 'lightbox-bottom')}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => go(index - 1)} aria-label="Назад">
              <ChevronLeft />
            </button>
            <span>
              {current.alt} · {index + 1}/{images.length}
            </span>
            <button onClick={() => go(index + 1)} aria-label="Вперёд">
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
