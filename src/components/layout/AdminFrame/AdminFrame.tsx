'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, LockKeyhole } from 'lucide-react';
import { adminNavigation } from '@/features/admin/navigation';

/** Shared shell for the present admin panel and future CRM modules. */
export function AdminFrame({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="admin-root">
      <aside className="admin-side">
        <Link href="/admin" className="admin-logo">
          M /{' '}
          <span>
            MONOLITH<small>КОНТЕНТ И УПРАВЛЕНИЕ</small>
          </span>
        </Link>
        <div className="admin-caption">ДЕМО / ТОЛЬКО ПРОСМОТР</div>
        <nav>
          {adminNavigation.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                href={link.href}
                key={link.href}
                className={path === link.href ? 'is-active' : ''}
              >
                <Icon size={17} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="admin-side-bottom">
          <LockKeyhole size={15} />
          Нет доступа к реальным данным
          <Link href="/">
            <ArrowLeft size={16} />
            На сайт
          </Link>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-top">
          <span>MONOLITH / ПАНЕЛЬ УПРАВЛЕНИЯ</span>
          <span className="admin-pill">Preview</span>
        </header>
        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}
