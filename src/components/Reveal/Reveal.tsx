'use client';

import { useLayoutEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';

type RevealKind = 'rise' | 'headline' | 'card' | 'quiet' | 'image' | 'line' | 'form' | 'stagger';

/** Small, independent reveals. Native content remains visible without JS or reduced motion. */
export function Reveal({
  children,
  className = '',
  variant = 'rise',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealKind;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (noMotion || !('IntersectionObserver' in window)) return;

    const rect = node.getBoundingClientRect();
    // If content is already visible on navigation/scroll restoration, do not hide it.
    if (rect.top < window.innerHeight * 0.87 && rect.bottom > 0) return;
    node.classList.add('reveal-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        node.classList.add('is-visible');
        observer.unobserve(node);
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -6% 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      data-motion={variant}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
