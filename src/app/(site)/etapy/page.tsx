import type { Metadata } from 'next';
import { stages } from '@/lib/site';
import { ArrowUpRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
export const metadata: Metadata = { title: 'Этапы работы' };
export default function StagesPage() {
  return (
    <>
      <section className="page-hero page-hero-simple">
        <div className="container">
          <span className="section-kicker">ПРОЦЕСС / ПРОЗРАЧНЫЙ ПОДХОД</span>
          <h1>
            ПО ШАГАМ.
            <br />
            <em>БЕЗ ЛИШНЕГО ШУМА.</em>
          </h1>
          <p>От первой встречи до финальных деталей интерьера.</p>
        </div>
      </section>
      <section className="section stages-detail">
        <div className="container">
          {stages.map((s) => (
            <div className="stage-detail" key={s.n}>
              <span>{s.n} / 05</span>
              <h2>{s.name}</h2>
              <p>{s.text}</p>
            </div>
          ))}
          <ButtonLink variant="primary" href="/kontakty#contact-form">
            Обсудить свой проект <ArrowUpRight size={17} />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
