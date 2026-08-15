import type { HTMLAttributes, ReactNode } from 'react';
import { DashboardIcon } from '@/components/icons';
import type { IconName } from '@/components/icons';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: IconName;
  title: ReactNode;
  description?: ReactNode;
  /** A `Button`/`Cta` (or any node) rendered below the description — e.g. "Create your first page". */
  action?: ReactNode;
}

/** Centered placeholder for empty lists/collections — icon + title + description + optional action. */
export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <div className={['d2m-empty-state', className].filter(Boolean).join(' ')} {...rest}>
      {icon ? (
        <DashboardIcon name={icon} size="lg" variant="plain" className="d2m-empty-state__icon" />
      ) : null}
      <div className="d2m-empty-state__title">{title}</div>
      {description ? <div className="d2m-empty-state__description">{description}</div> : null}
      {action ? <div className="d2m-empty-state__action">{action}</div> : null}
    </div>
  );
}
