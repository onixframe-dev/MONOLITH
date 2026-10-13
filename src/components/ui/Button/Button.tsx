import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'light' | 'dark';
export type ButtonSize = 'sm' | 'default' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

/**
 * Button — единый компонент для всех кнопок в проекте.
 *
 * Визуальные варианты: primary, secondary(ghost), outline, light, dark.
 * Поддерживает размеры, состояние загрузки и иконки.
 *
 * Компонент рендерит <button> с CSS Module стилями и дополнительно
 * добавляет глобальные классы (.button, .button-primary) для обратной
 * совместимости с контекстными CSS-переопределениями в глобальном каскаде.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'default',
      loading,
      disabled,
      icon,
      children,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const variantMap: Record<ButtonVariant, string> = {
      primary: 'button-primary',
      secondary: 'button-ghost',
      outline: 'button-outline',
      ghost: 'button-ghost',
      light: 'button-light',
      dark: 'button-dark',
    };

    const variantClass = variantMap[variant];
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[styles.button, styles[variant], styles[size], 'button', variantClass, className]
          .filter(Boolean)
          .join(' ')}
        aria-busy={loading || undefined}
        {...rest}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
