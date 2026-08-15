import type { ButtonHTMLAttributes } from 'react';
import Spinner from './Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner and disables interaction, without changing the button's width/label. */
  loading?: boolean;
}

/**
 * General-purpose form/UI button — a native `<button>` only (unlike `Cta`,
 * which is the marketing pill button and can render as a link). Use `Cta`
 * for hero/section calls-to-action; use `Button` for form actions, toolbars,
 * and in-app controls.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    'd2m-btn',
    `d2m-btn--${variant}`,
    `d2m-btn--${size}`,
    loading && 'd2m-btn--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={disabled || loading} aria-busy={loading} {...rest}>
      {loading ? <Spinner size="sm" className="d2m-btn__spinner" /> : null}
      <span className="d2m-btn__label">{children}</span>
    </button>
  );
}
