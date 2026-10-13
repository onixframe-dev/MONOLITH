import Link from 'next/link';
import { ArrowUpRight, MoveUpRight } from 'lucide-react';
import { brand } from '@/lib/site';
import { Reveal } from '@/components/Reveal';
import { SiteNavLinks } from '@/components/navigation/SiteNavLinks';

export function SiteFooter() {
  return <footer className="site-footer"><div className="container">
    <Reveal className="footer-top" variant="stagger">
      <div><Link className="footer-brand" href="/">MONOLITH<span>™</span></Link><p>Продуманные пространства.<br />Созданы для жизни.</p></div>
      <SiteNavLinks className="footer-nav" />
      <div className="footer-contact"><span>ЕСТЬ ИДЕЯ ДЛЯ ПРОЕКТА?</span><Link href="/kontakty#contact-form">Давайте обсудим <MoveUpRight size={19} /></Link>{brand.email ? <a href={`mailto:${brand.email}`}>{brand.email}</a> : <small>Контактные реквизиты добавим перед запуском</small>}</div>
    </Reveal>
    <Reveal className="footer-bottom" variant="line"><span>© {new Date().getFullYear()} MONOLITH · Демонстрационная концепция студии интерьера</span><div><Link href="/politika-konfidencialnosti">Конфиденциальность</Link><Link href="/soglasie-na-obrabotku">Обработка данных</Link><Link href="/cookies">Cookies</Link></div><Link href="#top" aria-label="Наверх"><ArrowUpRight size={18} /></Link></Reveal>
  </div></footer>;
}
