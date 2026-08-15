import type { AnchorHTMLAttributes, ReactNode } from 'react';

export interface LinkRowProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
  href: string;
  title: ReactNode;
  description?: ReactNode;
}

/**
 * Link row — title + optional description + trailing hover-shift arrow (reference
 * `.d2m-submenu`/`.d2m-icon`/`.d2m-text`/`.d2m-hover-arrow`, minus the icon slot — this
 * primitive doesn't have one by design, not because the icon system doesn't exist; an
 * icon-led variant is Phase 16B's job, see docs/DESIGN-SYSTEM.md §6). Arrow is a plain
 * character, not an SVG/icon dependency.
 */
export default function LinkRow({
  href,
  title,
  description,
  className,
  ...rest
}: LinkRowProps) {
  return (
    <a href={href} className={['d2m-link-row', className].filter(Boolean).join(' ')} {...rest}>
      <span className="d2m-link-row__content">
        <span className="d2m-link-row__title">{title}</span>
        {description ? <span className="d2m-link-row__description">{description}</span> : null}
      </span>
      <span className="d2m-link-row__arrow" aria-hidden="true">
        &rarr;
      </span>
    </a>
  );
}
