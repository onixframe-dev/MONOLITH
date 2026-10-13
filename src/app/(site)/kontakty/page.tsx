import type { Metadata } from 'next';
import { LeadForm } from '@/features/contact';
import { brand } from '@/lib/site';
export const metadata: Metadata = { title: 'Контакты и консультация' };
export default function ContactsPage() {
  return (
    <>
      <section className="page-hero page-hero-simple">
        <div className="container">
          <span className="section-kicker">СВЯЗАТЬСЯ / НОВЫЙ ПРОЕКТ</span>
          <h1>
            ДАВАЙТЕ
            <br />
            <em>ЗНАКОМИТЬСЯ.</em>
          </h1>
          <p>
            Расскажите о своей квартире. Начнём с вашего представления об идеальном пространстве.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container contact-page-grid">
          <div>
            <div className="section-kicker">КОНТАКТЫ</div>
            <h2>
              ВСЁ НАЧИНАЕТСЯ
              <br />
              <em>С ОБЩЕНИЯ</em>
            </h2>
            <p className="contact-description">
              Контактные данные, график работы и адрес офиса появятся после согласования с настоящей
              студией.
            </p>
            {brand.email ? (
              <a href={'mailto:' + brand.email} className="text-link">
                {brand.email}
              </a>
            ) : (
              <p className="empty-contacts">Email ещё не указан</p>
            )}
            {brand.phone && <a href={'tel:' + brand.phone}>{brand.phone}</a>}
          </div>
          <div className="contact-card" id="contact-form">
            <h3>Расскажите о задаче</h3>
            <LeadForm kind="GENERAL" />
          </div>
        </div>
      </section>
    </>
  );
}
