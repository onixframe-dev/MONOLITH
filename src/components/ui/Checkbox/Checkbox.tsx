'use client';

import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: string;
  children?: ReactNode;
}

/**
 * Checkbox — переиспользуемый чекбокс с подписью.
 * Используется в формах согласия и фильтровах.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, children, ...rest }, ref) => {
    return (
      <label className={cn(styles.field, className)}>
        <input
          ref={ref}
          type="checkbox"
          className={cn(error && styles.error)}
          aria-invalid={!!error}
          {...rest}
        />
        {label && <span className={styles.label}>{label}</span>}
        {error && (
          <span className={styles.errorMessage} role="alert">
            {error}
          </span>
        )}
        {children && <span className={styles.label}>{children}</span>}
      </label>
    );
  },
);
Checkbox.displayName = 'Checkbox';
