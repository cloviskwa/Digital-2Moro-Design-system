'use client';

import { useEffect, useId, type ReactNode } from 'react';
import { DashboardIcon } from '@/components/icons';

export interface DialogProps {
  open: boolean;
  /** Called on backdrop click or Escape — the consumer owns the actual open/close state. */
  onClose?: () => void;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Dialog (modal shell) — deliberately minimal, per this phase's "only if
 * simple and safe" scope. Renders in place (no `createPortal`) and does
 * **not** trap focus inside the panel — both are real gaps for a
 * production modal, left for whichever future phase actually wires this
 * into real usage (nothing renders a `Dialog` anywhere yet). What it does
 * do: correct `role="dialog"`/`aria-modal`/`aria-labelledby`, and closes on
 * Escape or backdrop click.
 */
export default function Dialog({ open, onClose, title, children, className }: DialogProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open || !onClose) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="d2m-dialog-backdrop" onClick={onClose}>
      <div
        className={['d2m-dialog', className].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        {title || onClose ? (
          <div className="d2m-dialog__header">
            {title ? (
              <h2 id={titleId} className="d2m-dialog__title">
                {title}
              </h2>
            ) : null}
            {onClose ? (
              <button
                type="button"
                className="d2m-dialog__close"
                onClick={onClose}
                aria-label="Close dialog"
              >
                <DashboardIcon name="close" variant="plain" decorative />
              </button>
            ) : null}
          </div>
        ) : null}
        <div className="d2m-dialog__content">{children}</div>
      </div>
    </div>
  );
}
