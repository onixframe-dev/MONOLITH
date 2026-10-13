import type { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import styles from './SectionHeading.module.css';

export type SectionHeadingTheme = 'dark' | 'light';
export type SectionHeadingTag = 'h1' | 'h2' | 'h3';

export interface SectionHeadingProps {
  /** Короткая метка над заголовком, напр. «02 · ПОРТФОЛИО» */
  eyebrow?: ReactNode;
  /** Основной заголовок. accent — выделенная часть. */
  title: ReactNode;
  accent?: string;
  /** Описание под заголовком */
  description?: ReactNode;
  /** Ссылка-действие в правой части шапки */
  actionHref?: string;
  actionLabel?: ReactNode;
  /** Тема оформления */
  theme?: SectionHeadingTheme;
  /** HTML-тег заголовка для семантической иерархии */
  as?: SectionHeadingTag;
  className?: string;
  children?: ReactNode;
}

/**
 * SectionHeading — переиспользуемый заголовок секции.
 *
 * Единый паттерн для section-head / page-hero: eyebrow + title + description
 * + необязательная ссылка. Сохраняет семантическую иерархию заголовков.
 * Визуальные стили наследуются из глобального каскада (section-kicker, .section h2).
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  actionHref,
  actionLabel,
  theme = 'dark',
  as: Tag = 'h2',
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn(styles.wrap, styles[theme], className)}>
      {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
      {actionHref ? (
        <div className={styles.head}>
          <div>
            <Tag>
              {title}
              {accent && <em>{accent}</em>}
            </Tag>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          {actionLabel && (
            <Link href={actionHref} className="text-link">
              {actionLabel}
            </Link>
          )}
        </div>
      ) : (
        <>
          <Tag>
            {title}
            {accent && <em>{accent}</em>}
          </Tag>
          {description && <p className={styles.description}>{description}</p>}
        </>
      )}
      {children}
    </div>
  );
}
SectionHeading.displayName = 'SectionHeading';
