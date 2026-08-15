import type { HTMLAttributes, ReactNode } from 'react';
import { DashboardIcon } from '@/components/icons';
import type { IconName } from '@/components/icons';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: ToastVariant;
  title?: ReactNode;
  children?: ReactNode;
  onDismiss?: () => void;
}

const VARIANT_ICON: Record<ToastVariant, IconName> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

/**
 * Toast (shell) — a single, static, presentational toast card, per this
 * phase's "only if simple and safe" scope. Deliberately does **not**
 * include a stacking/queue container, positioning, or an auto-dismiss
 * timer — the consumer owns showing/hiding and placement (nothing renders
 * a `Toast` anywhere yet). A `ToastProvider`-style system is future work
 * once a real usage needs it.
 */
export default function Toast({ variant = 'info', title, children, onDismiss, className, role, ...rest }: ToastProps) {
  const classes = ['d2m-toast', `d2m-toast--${variant}`, className].filter(Boolean).join(' ');
  const resolvedRole = role ?? (variant === 'error' || variant === 'warning' ? 'alert' : 'status');

  return (
    <div className={classes} role={resolvedRole} {...rest}>
      <DashboardIcon name={VARIANT_ICON[variant]} variant="plain" className="d2m-toast__icon" />
      <div className="d2m-toast__content">
        {title ? <div className="d2m-toast__title">{title}</div> : null}
        {children ? <div className="d2m-toast__description">{children}</div> : null}
      </div>
      {onDismiss ? (
        <button type="button" className="d2m-toast__dismiss" onClick={onDismiss} aria-label="Dismiss notification">
          <DashboardIcon name="close" variant="plain" decorative />
        </button>
      ) : null}
    </div>
  );
}
