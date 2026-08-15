import type { HTMLAttributes, ReactNode } from 'react';
import { DashboardIcon } from '@/components/icons';
import type { IconName } from '@/components/icons';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant;
  title?: ReactNode;
  children?: ReactNode;
}

const VARIANT_ICON: Record<AlertVariant, IconName> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

/**
 * Alert — status banner with icon + title + description. `role` defaults to
 * `"alert"` (assertive live region) for `error`/`warning`, `"status"`
 * (polite) for `info`/`success` — override via the standard `role` prop if a
 * specific usage needs something else (or no live region at all).
 */
export default function Alert({ variant = 'info', title, children, className, role, ...rest }: AlertProps) {
  const classes = ['d2m-alert', `d2m-alert--${variant}`, className].filter(Boolean).join(' ');
  const resolvedRole = role ?? (variant === 'error' || variant === 'warning' ? 'alert' : 'status');

  return (
    <div className={classes} role={resolvedRole} {...rest}>
      <DashboardIcon name={VARIANT_ICON[variant]} variant="plain" className="d2m-alert__icon" />
      <div className="d2m-alert__content">
        {title ? <div className="d2m-alert__title">{title}</div> : null}
        {children ? <div className="d2m-alert__description">{children}</div> : null}
      </div>
    </div>
  );
}
