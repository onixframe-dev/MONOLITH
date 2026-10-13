import type { LucideIcon } from 'lucide-react';
import { FolderOpen, Images, Inbox, LayoutDashboard, MessageSquare, Settings } from 'lucide-react';

export type AdminNavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

/** Single source of truth for admin/CRM modules and sidebar navigation. */
export const adminNavigation: AdminNavigationItem[] = [
  { href: '/admin', label: 'Обзор', icon: LayoutDashboard },
  { href: '/admin/proekty', label: 'Проекты', icon: FolderOpen },
  { href: '/admin/zayavki', label: 'Заявки', icon: Inbox },
  { href: '/admin/otzyvy', label: 'Отзывы', icon: MessageSquare },
  { href: '/admin/media', label: 'Медиатека', icon: Images },
  { href: '/admin/nastroyki', label: 'Настройки', icon: Settings },
];
