import type { Metadata } from 'next';
import './globals.css';

const siteUrl = new URL('https://monolith-chi-three.vercel.app');

export const metadata: Metadata = {
 metadataBase: siteUrl,
 alternates: { canonical: '/' },
 openGraph: {
  type: 'website', locale: 'ru_RU', url: '/', siteName: 'MONOLITH',
  title: 'MONOLITH — дизайн интерьеров квартир',
  description: 'Архитектура ваших привычек. Создаём интерьеры, в которых удобно жить.',
  images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'MONOLITH — дизайн интерьеров квартир' }],
 },
 twitter: {
  card: 'summary_large_image',
  title: 'MONOLITH — дизайн интерьеров квартир',
  description: 'Архитектура ваших привычек. Создаём интерьеры, в которых удобно жить.',
  images: ['/opengraph-image'],
 },
 title: {default:'MONOLITH — дизайн интерьеров квартир',template:'%s | MONOLITH'},
 description:'MONOLITH — концептуальный сайт студии интерьера: проекты квартир, дизайн-проект, ремонт и комплектация.',
 robots: { index: false, follow:false },
 icons: {
  icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  apple: [{ url: '/apple-icon.svg', type: 'image/svg+xml' }],
 },
 manifest: '/manifest.webmanifest',
};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="ru"><body>{children}</body></html>;
}
