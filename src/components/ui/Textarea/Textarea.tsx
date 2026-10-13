'use client';

import { forwardRef } from 'react';
import type { TextareaHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import styles from './Textarea.module.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  hint?: string;
  error?: string;
}

/**
 * Textarea — переиспользуемое текстовое поле для длинных ответов.
 * Структура и стили идентичны Input.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className, ...rest }, ref) => {
    return (
      <label className={cn(styles.field, className)}>
        {label}
        {hint && <span className={styles.optional}>{hint}</span>}
        <textarea
          ref={ref}
          className={cn(error && styles.error)}
          aria-invalid={!!error}
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
Textarea.displayName = 'Textarea';
