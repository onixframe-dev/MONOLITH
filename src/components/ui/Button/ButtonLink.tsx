'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { type ButtonVariant, type ButtonSize } from './Button';
import styles from './Button.module.css';

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href: string;
  children: ReactNode;
}

const variantMap: Record<ButtonVariant, string> = {
  primary: 'button-primary',
  secondary: 'button-ghost',
  outline: 'button-outline',
  ghost: 'button-ghost',
  light: 'button-light',
  dark: 'button-dark',
};

/**
 * ButtonLink — кнопка-ссылка для навигации между страницами.
 * Использует <Link> Next.js, визуально идентичен Button.
 * Глобальные классы (.button, .button-primary) сохранены для контекстных CSS-переопределений.
 */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ variant = 'primary', size = 'default', href, children, className = '', ...rest }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          'button',
          variantMap[variant],
          className,
        )}
        {...rest}
      >
        {children}
      </Link>
    );
  },
);
ButtonLink.displayName = 'ButtonLink';
