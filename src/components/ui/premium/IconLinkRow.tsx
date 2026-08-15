import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { DashboardIcon } from '@/components/icons';
import type { IconName } from '@/components/icons';

export interface IconLinkRowProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
  href: string;
  /** Registry key — see `src/components/icons/dashboard-icons.tsx`. */
  icon: IconName;
  title: ReactNode;
  description?: ReactNode;
}

/**
 * Icon-slot link row (Phase 16B) — `LinkRow` (Phase 14C,
 * `src/components/ui/primitives/LinkRow.tsx`) deliberately has no icon slot
 * ("an icon-led variant is Phase 16B's job", per its own docstring); rather
 * than retrofit that already-used primitive, this is a separate premium
 * variant with a leading icon from the central `DashboardIcon` registry.
 * Trailing arrow stays the same plain `&rarr;` character `LinkRow` itself
 * uses, for visual consistency between the two.
 */
export default function IconLinkRow({
  href,
  icon,
  title,
  description,
  className,
  ...rest
}: IconLinkRowProps) {
  const classes = ['d2m-icon-link-row', className].filter(Boolean).join(' ');

  return (
    <a href={href} className={classes} {...rest}>
      <DashboardIcon name={icon} variant="boxed" size="md" />
      <span className="d2m-icon-link-row__content">
        <span className="d2m-icon-link-row__title">{title}</span>
        {description ? <span className="d2m-icon-link-row__description">{description}</span> : null}
      </span>
      <span className="d2m-icon-link-row__arrow" aria-hidden="true">
        &rarr;
      </span>
    </a>
  );
}
