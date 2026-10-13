import type { Metadata } from 'next';
import { OptimizedImage } from '@/components/shared/OptimizedImage';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { services } from '@/lib/site';
import { ButtonLink } from '@/components/ui/Button';
export const metadata: Metadata = { title: 'Услуги студии интерьера' };
export default function ServicesPage() {
  return (
    <>
      <section className="page-hero page-hero-photo">
        <OptimizedImage
          src="/images/sections/portfolio-intro.webp"
          fill
          alt="Современный интерьер квартиры"
          sizes="100vw"
          priority
          decoding="async"
        />
        <div className="container page-hero-content">
          <div className="section-kicker">ПОДХОД / УСЛУГИ</div>
          <h1>
            ВСЁ ДЛЯ
            <br />
            <em>ВАШЕГО ПРОСТРАНСТВА</em>
          </h1>
          <p>Концепция, документация, материалы и сопровождение реализации.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>
              ПРОДУМАНО
              <br />
              <em>ОТ НАЧАЛА ДО КОНЦА</em>
            </h2>
            <p className="section-intro">
              Работаем системно, чтобы результат соответствовал согласованному проекту.
            </p>
          </div>
          <div className="service-cards">
            {services.map((s) => (
              <article className="service-feature" key={s.number}>
                <span className="service-feature-n">{s.number}</span>
                <div>
                  <h3>{s.name}</h3>
                  <p>{s.text}</p>
                  <Link href="/kontakty#contact-form" className="text-link">
                    Обсудить услугу <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section light-cta">
        <div className="container">
          <h2>
            ВАШ ИНТЕРЬЕР
            <br />
            НАЧИНАЕТСЯ С РАЗГОВОРА
          </h2>
          <ButtonLink href="/kontakty#contact-form" variant="dark">
            Оставить заявку <ArrowRight size={17} />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
