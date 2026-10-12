'use client';

import { useEffect } from 'react';

/** Quiet scroll-linked depth for two editorial images; avoids heavy filters. */
export function HomepageMotion() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: no-preference) and (min-width: 960px)');
    if (!mq.matches) return;
    let mounted = true;
    let context: { revert: () => void } | undefined;
    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'), import('gsap/ScrollTrigger'),
      ]);
      if (!mounted) return;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        document.querySelectorAll<HTMLElement>('.editorial-img img,.cal-image img').forEach(node => {
          gsap.fromTo(node,
            { '--parallax-y': '-12px' },
            {
              '--parallax-y': '12px', ease: 'none',
              scrollTrigger: { trigger: node.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.1 },
            },
          );
        });
      });
    })();
    return () => { mounted = false; context?.revert(); };
  }, []);
  return null;
}
