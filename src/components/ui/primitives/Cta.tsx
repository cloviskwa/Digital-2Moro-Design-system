import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { DashboardIcon } from '@/components/icons';

export type CtaVariant = 'primary' | 'outline' | 'action';

type CtaAsLink = { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
type CtaAsButton = { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;

export type CtaProps = (CtaAsLink | CtaAsButton) & {
  variant?: CtaVariant;
};

/**
 * CTA base — pill shape, `primary` (solid blue) / `outline` / `action` variants.
 *
 * `action` (Phase 16E) is the premium SaaS "white pill, blue label, trailing
 * blue arrow bubble" treatment — brand-invariant on purpose (white body/blue
 * accents stay identical in dark and light, the same reasoning `DashboardIcon`'s
 * hover bubble already uses: a floating action pill should read the same
 * regardless of the page's theme, not invert and lose its "premium button"
 * identity). The label renders twice (`.d2m-cta__label-text--default`/
 * `--hover`) so hover can slide the second copy up over the first — the
 * bubble itself never moves or recolors on hover, only the arrow glyph
 * rotates from diagonal to horizontal. The arrow is decorative — the label
 * text is what actually names the action, so the icon stays `aria-hidden`.
 */
export default function Cta({ variant = 'primary', className, children, ...rest }: CtaProps) {
  const classes = ['d2m-cta', `d2m-cta--${variant}`, className].filter(Boolean).join(' ');

  const content =
    variant === 'action' ? (
      <>
        <span className="d2m-cta__label-wrap">
          <span className="d2m-cta__label-text d2m-cta__label-text--default">{children}</span>
          <span className="d2m-cta__label-text d2m-cta__label-text--hover" aria-hidden="true">
            {children}
          </span>
        </span>
        <span className="d2m-cta__bubble" aria-hidden="true">
          <DashboardIcon name="arrowUpRight" variant="plain" size="sm" />
        </span>
      </>
    ) : (
      children
    );

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as CtaAsLink;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {content}
      </a>
    );
  }

  const { type = 'button', ...buttonRest } = rest as CtaAsButton;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
