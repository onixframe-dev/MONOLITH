import Link from 'next/link';
import { ArrowUpRight, MoveUpRight } from 'lucide-react';
import { brand } from '@/lib/site';
import { Reveal } from '@/components/shared/Reveal';
import { SiteNavLinks } from '@/components/layout/Navigation/SiteNavLinks';
import { cn } from '@/lib/utils';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  return (
    <footer className={cn(styles.siteFooter, 'site-footer')}>
      <div className="container">
        <Reveal className={cn(styles.footerTop, 'footer-top')} variant="stagger">
          <div>
            <Link className={cn(styles.footerBrand, 'footer-brand')} href="/">
              MONOLITH<span>™</span>
            </Link>
            <p>
              Продуманные пространства.
              <br />
              Созданы для жизни.
            </p>
          </div>
          <SiteNavLinks className={cn(styles.footerNav, 'footer-nav')} />
          <div className={cn(styles.footerContact, 'footer-contact')}>
            <span>ЕСТЬ ИДЕЯ ДЛЯ ПРОЕКТА?</span>
            <Link href="/kontakty#contact-form">
              Давайте обсудим <MoveUpRight size={19} />
            </Link>
            {brand.email ? (
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            ) : (
              <small>Контактные реквизиты добавим перед запуском</small>
            )}
          </div>
        </Reveal>
        <Reveal className={cn(styles.footerBottom, 'footer-bottom')} variant="line">
          <span>
            © {new Date().getFullYear()} MONOLITH · Демонстрационная концепция студии интерьера
          </span>
          <div>
            <Link href="/politika-konfidencialnosti">Конфиденциальность</Link>
            <Link href="/soglasie-na-obrabotku">Обработка данных</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
          <Link href="#top" aria-label="Наверх">
            <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </div>
    </footer>
  );
}
