import { Cta } from '@/components/ui/primitives';

export interface ImageShowcaseCardImage {
  src: string;
  alt: string;
}

export interface ImageShowcaseCardCta {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface ImageShowcaseCardProps {
  image: ImageShowcaseCardImage;
  title: string;
  description: string;
  cta?: ImageShowcaseCardCta;
  className?: string;
}

/**
 * Image-led showcase card (Phase 16E) — a large rounded image frame over a
 * premium dark panel body (title/description/action), for service/portfolio
 * tiles ("Website & Web App Dev", "Android & iOS Apps Dev", "Brand Identity
 * Design"). Deliberately a vertical stack (image on top, panel below) rather
 * than `ImageTextBlock`'s side-by-side layout — this is a grid tile, not a
 * page section.
 *
 * Plain `<img>`, not `next/image`, matching `ImageTextBlock`'s own precedent:
 * media hosts aren't configured for `next/image` domains yet (no schema field
 * to read them from).
 */
export default function ImageShowcaseCard({
  image,
  title,
  description,
  cta,
  className,
}: ImageShowcaseCardProps) {
  const classes = ['d2m-showcase-card', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="d2m-showcase-card__media">
        { }
        <img src={image.src} alt={image.alt} />
      </div>
      <div className="d2m-showcase-card__body">
        <h3 className="d2m-showcase-card__title">{title}</h3>
        <p className="d2m-showcase-card__description">{description}</p>
        {/* `outline` (muted), not `action` (white pill/blue arrow bubble) —
            inside a card, the loud `action` treatment overshadowed the
            card's own title/description. `action` is reserved for
            standalone CTAs (a hero, a promotional panel) where it's meant
            to be the visual focal point; `TechnicalDetailCard` already
            used `outline` here for the same reason. */}
        {cta ? (
          cta.href ? (
            <Cta variant="outline" href={cta.href}>
              {cta.label}
            </Cta>
          ) : (
            <Cta variant="outline" type="button" onClick={cta.onClick}>
              {cta.label}
            </Cta>
          )
        ) : null}
      </div>
    </div>
  );
}
