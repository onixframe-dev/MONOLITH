'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { renovationBlur } from '@/lib/renovation-blur';
import { renovationScenes, renovationTransitions } from '@/lib/renovation-scenes';

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

const lastIndex = renovationScenes.length - 1;

export function HeroTour() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<(HTMLDivElement | null)[]>([]);
  const copyRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressValueRef = useRef(0);
  const syncRef = useRef<((progress: number) => void) | null>(null);
  const preloadedRef = useRef(new Set([0, 1]));
  const decodedRef = useRef(new Set<number>());
  const [preloaded, setPreloaded] = useState<number[]>([0, 1]);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  const ready = useCallback((index: number) => {
    decodedRef.current.add(index);
    syncRef.current?.(progressValueRef.current);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    // iPhone Safari can drop a composited sticky layer while its browser chrome
    // changes the visual viewport. Keep the desktop/Android masked reveal intact,
    // but use an opacity-only crossfade on iPhone.
    const isIPhone = /iPhone|iPod/.test(window.navigator.userAgent);
    let mounted = true;
    let context: { revert: () => void } | undefined;
    let scrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger | undefined;
    const onMotionChange = () => {
      setReduced(media.matches);
      if (media.matches) {
        setPreloaded(renovationScenes.map((_, index) => index));
        // Do not trap reduced-motion visitors in a multi-viewport scroll tour.
        syncRef.current = null;
        setActive(lastIndex);
      }
    };
    onMotionChange();
    media.addEventListener('change', onMotionChange);

    if (!media.matches) {
      void (async () => {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'), import('gsap/ScrollTrigger'),
        ]);
        if (!mounted || !sectionRef.current) return;
        scrollTrigger = ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        context = gsap.context(() => {
          const sync = (progress: number) => {
            progressValueRef.current = clamp(progress);
            const p = progressValueRef.current;
            const values = renovationTransitions.map((range, index) => {
              // Do not reveal a blurred placeholder if a user scrolls faster than the network.
              return decodedRef.current.has(index + 1)
                ? ease(range.start, range.end, p)
                : 0;
            });

            framesRef.current.forEach((layer, index) => {
              if (!layer || index === 0) return;
              const fraction = values[index - 1];
              if (isIPhone) {
                layer.style.opacity = String(fraction);
                layer.style.maskImage = 'none';
                layer.style.webkitMaskImage = 'none';
                return;
              }
              if (fraction <= 0) {
                layer.style.opacity = '0';
                layer.style.maskImage = 'linear-gradient(90deg,transparent,transparent)';
                layer.style.webkitMaskImage = layer.style.maskImage;
              } else if (fraction >= 1) {
                layer.style.opacity = '1';
                layer.style.maskImage = 'none';
                layer.style.webkitMaskImage = 'none';
              } else {
                // Soft-edged architectural reveal. Never double-exposes an entire room.
                const edge = fraction * 110 - 5;
                const mask = `linear-gradient(90deg,#000 ${edge - 8}%,transparent ${edge + 8}%)`;
                layer.style.opacity = '1';
                layer.style.maskImage = mask;
                layer.style.webkitMaskImage = mask;
              }
            });

            let current = 0;
            values.forEach((fraction, index) => { if (fraction >= 0.54) current = index + 1; });
            setActive(previous => previous === current ? previous : current);
            copyRef.current.forEach((node, index) => {
              if (!node) return;
              const entering = index === 0 ? 1 : ease(0.54, 0.91, values[index - 1]);
              const leaving = index === lastIndex ? 1 : 1 - ease(0.08, 0.45, values[index]);
              const alpha = entering * leaving;
              node.style.opacity = String(alpha);
              node.style.transform = `translate3d(0,${(1 - entering) * 19 - (1 - leaving) * 13}px,0)`;
              node.style.visibility = alpha < 0.01 ? 'hidden' : 'visible';
            });

            if (sceneRef.current && window.innerWidth > 700) {
              // Camera motion applies to the full registered image stack, so the room cannot drift.
              sceneRef.current.style.transform = `scale(${1.025 + p * 0.027}) translate3d(0,${p * -0.35}%,0)`;
            }
            if (ctaRef.current) {
              const opacity = ease(0.89, 0.97, p) * values[3];
              ctaRef.current.style.opacity = String(opacity);
              ctaRef.current.style.visibility = opacity < 0.01 ? 'hidden' : 'visible';
              ctaRef.current.style.pointerEvents = opacity > 0.95 ? 'auto' : 'none';
              ctaRef.current.style.transform = `translate3d(0,${(1 - opacity) * 14}px,0)`;
            }
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
            // Mount incoming image well before its transition, but not all images on initial load.
            const upcoming = renovationTransitions.findIndex((range, index) => !preloadedRef.current.has(index + 1) && p > range.start - 0.10);
            if (upcoming >= 0) {
              preloadedRef.current.add(upcoming + 1);
              setPreloaded(Array.from(preloadedRef.current));
            }
          };
          syncRef.current = sync;
          const trigger = ScrollTrigger.create({
            trigger: sectionRef.current, start: 'top top', end: 'bottom bottom',
            invalidateOnRefresh: true, onUpdate: self => sync(self.progress),
          });
          sync(trigger.progress);
        }, sectionRef);
      })();
    }

    const refresh = () => scrollTrigger?.refresh();
    window.addEventListener('resize', refresh, { passive: true });
    // Address-bar expansion/collapse on iPhone changes the usable height without
    // reliably emitting window.resize, which otherwise shifts the pinned range.
    if (isIPhone) window.visualViewport?.addEventListener('resize', refresh, { passive: true });
    return () => {
      mounted = false;
      syncRef.current = null;
      context?.revert();
      window.removeEventListener('resize', refresh);
      if (isIPhone) window.visualViewport?.removeEventListener('resize', refresh);
      media.removeEventListener('change', onMotionChange);
    };
  }, []);

  const goTo = (index: number) => {
    const root = sectionRef.current;
    if (!root) return;
    const distance = root.offsetHeight - window.innerHeight;
    const progress = index === lastIndex ? 0.985 : index === 0 ? 0 : renovationTransitions[index - 1].end;
    window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY + distance * progress, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section ref={sectionRef} className={`renov-hero ${reduced ? 'renov-hero--reduced' : ''}`} id="top" aria-label="Как MONOLITH превращает пустую квартиру в интерьер">
      <div className="renov-sticky">
        <div ref={sceneRef} className="renov-scene-stack" aria-hidden="true">
          {renovationScenes.map((scene, index) => (
            <div
              key={scene.id}
              ref={node => { framesRef.current[index] = node; }}
              className={`renov-frame ${index === 0 ? 'renov-frame--base' : ''}`}
              style={{ zIndex: index, opacity: index === 0 ? 1 : 0 }}
            >
              {preloaded.includes(index) ? (
                <OptimizedImage
                  src={scene.src} alt="" fill sizes="100vw" className="renov-image"
                  priority={index === 0} loading="eager"
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  blurDataUrl={renovationBlur[scene.src]}
                  onLoad={() => ready(index)}
                />
              ) : <div className="renov-image-placeholder" />}
            </div>
          ))}
        </div>
        <div className="renov-tint" aria-hidden="true" />
        <div className="container renov-content">
          <div className="renov-left">
            <div className="eyebrow renov-brand"><span className="eyebrow-line" /> MONOLITH / ДИЗАЙН ИНТЕРЬЕРОВ</div>
            <div className="renov-copy-wrap">
              {renovationScenes.map((scene, index) => (
                <div
                  className={`renov-copy ${index === 0 ? 'renov-copy--initial' : ''}`}
                  key={scene.id}
                  ref={node => { copyRef.current[index] = node; }}
                  aria-hidden={index !== active}
                >
                  <span className="renov-overline">{scene.label}</span>
                  {index === 0 ? <h1>{scene.title}<br /><em>{scene.accent}</em></h1> : <h2>{scene.title}<br /><em>{scene.accent}</em></h2>}
                  <p>{scene.description}</p>
                </div>
              ))}
            </div>
            <div className="renov-cta" ref={ctaRef} aria-hidden={!reduced && active !== lastIndex}>
              <Link className="button button-primary" href="/kontakty#contact-form">Обсудить проект <ArrowUpRight size={17} /></Link>
              <Link className="button button-ghost" href="/proekty">Смотреть проекты <ArrowUpRight size={17} /></Link>
            </div>
          </div>
          <div className="renov-side" aria-label="Этапы преображения">
            <div className="renov-side-caption">ПРЕОБРАЖЕНИЕ / 0{active + 1}–0{renovationScenes.length}</div>
            {renovationScenes.map((scene, index) => (
              <button
                key={scene.id} type="button"
                onClick={() => goTo(index)}
                className={`renov-step ${active === index ? 'renov-step--active' : ''}`}
                aria-current={active === index ? 'step' : undefined}
              >
                <span>0{index + 1}</span>{scene.name}<i aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
        <div className="container renov-footer">
          <span className="renov-hint"><ArrowDown size={15} /> ЛИСТАЙТЕ, ЧТОБЫ УВИДЕТЬ ПРЕОБРАЖЕНИЕ</span>
          <div className="renov-track" aria-hidden="true"><div ref={progressRef} /></div>
          <span className="renov-count">0{active + 1} / 0{renovationScenes.length}</span>
        </div>
        <noscript><style>{'.renov-cta{opacity:1!important;visibility:visible!important;pointer-events:auto!important}.renov-hero{height:100svh!important}.renov-copy--initial{opacity:1!important;visibility:visible!important}'}</style></noscript>
      </div>
    </section>
  );
}
