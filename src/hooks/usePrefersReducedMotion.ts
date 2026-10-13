import { useEffect, useState } from 'react';

/**
 * Хук для отслеживания предпочтения пользователя — уменьшенная анимация.
 * SSR-safe: всегда начинает с `false` на сервере и синхронизируется на клиенте.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
}
