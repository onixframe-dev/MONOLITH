import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
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
