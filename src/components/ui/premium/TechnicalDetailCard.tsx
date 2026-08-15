import type { ReactNode } from 'react';
import { Cta } from '@/components/ui/primitives';
import { Badge } from '@/components/ui/primitives';

export interface TechnicalDetailCardCta {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface TechnicalDetailCardProps {
  title: string;
  description: string;
  /** Small metadata label, e.g. "Live", "Beta", "New" — rendered via the existing `Badge` primitive. */
  badge?: string;
  /**
   * The "large technical/mock UI visual area" — a log stream, a stat
   * readout, a mini chart mockup, etc. Left as a slot rather than a fixed
   * shape so this stays reusable across very different card contents
   * ("Track key metrics", "Stream your logs", "Traffic insights", ...).
   */
  visual?: ReactNode;
  cta?: TechnicalDetailCardCta;
  className?: string;
}

/**
 * Atmospheric technical detail card (Phase 16E) — dark, grainy/atmospheric
 * background (a real Digital 2Moro-owned texture asset, copied out of
 * `src/styles/reference-styles/d2m-bg-card` into
 * `public/assets/images/backgrounds/technical-card-grain.png`; production
 * code never imports the reference-styles folder itself), a soft technical
 * blue corner glow, and a bordered slot for a mock UI/log/metric visual.
 * Inspired by the NestJS/Mau reference's dark product-dashboard cards — no
 * NestJS/Mau names, copy, or screenshots are used as production content here.
 *
 * Forces `data-theme="dark"` on its own root so it always renders with
 * dark-theme token values (background/text/borders), regardless of the
 * surrounding page's active theme — the same reasoning a code/terminal panel
 * stays dark even on an otherwise light documentation site. This also means
 * `Badge`/`Cta` composed inside it automatically resolve to legible dark-theme
 * colors instead of inheriting the page's own (possibly light) theme.
 */
export default function TechnicalDetailCard({
  title,
  description,
  badge,
  visual,
  cta,
  className,
}: TechnicalDetailCardProps) {
  const classes = ['d2m-tech-card', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-theme="dark">
      <div className="d2m-tech-card__header">
        <h3 className="d2m-tech-card__title">{title}</h3>
        {badge ? <Badge>{badge}</Badge> : null}
      </div>
      <p className="d2m-tech-card__description">{description}</p>
      {visual ? <div className="d2m-tech-card__visual">{visual}</div> : null}
      {cta ? (
        <div className="d2m-tech-card__footer">
          {cta.href ? (
            <Cta variant="outline" href={cta.href}>
              {cta.label}
            </Cta>
          ) : (
            <Cta variant="outline" type="button" onClick={cta.onClick}>
              {cta.label}
            </Cta>
          )}
        </div>
      ) : null}
    </div>
  );
}
