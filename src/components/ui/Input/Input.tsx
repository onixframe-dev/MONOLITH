'use client';

import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  hint?: string;
  error?: string;
}

/**
 * Input — переиспользуемое текстовое поле формы.
 *
 * Структура label > input воспроизводит оригинальный паттерн MONOLITH,
 * сохраняя CSS-каскад для необязательных подсказок внутри label.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className, ...rest }, ref) => {
    return (
      <label className={cn(styles.field, className)}>
        {label}
        {hint && <span className={styles.optional}>{hint}</span>}
        <input
          ref={ref}
          className={cn(error && styles.error)}
          aria-invalid={!!error}
          aria-describedby={error ? 'input-error' : undefined}
          {...rest}
        />
        {error && (
          <span className={styles.errorMessage} role="alert">
            {error}
          </span>
        )}
      </label>
    );
  },
);
Input.displayName = 'Input';
