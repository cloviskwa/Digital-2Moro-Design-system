import { ImageShowcaseCard } from '@digital2moro/ui';

// Inline SVG data-URIs stand in for the real mock assets
// (public/assets/images/mock/*.svg) — that path isn't shipped in this
// bundle, so a real /assets/... src would 404 in the design-agent's canvas.
const placeholder = (label: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="#1a1a1a"/><text x="50%" y="50%" fill="#666" font-family="sans-serif" font-size="16" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`,
  )}`;

export const WebDev = () => (
  <ImageShowcaseCard
    image={{ src: placeholder('Web Dev'), alt: 'Abstract browser window graphic' }}
    title="Website & Web App Dev"
    description="Fast, accessible, and SEO-ready builds on Next.js — from marketing sites to full web apps."
    cta={{ label: 'Explore', href: '#' }}
  />
);

export const MobileDev = () => (
  <ImageShowcaseCard
    image={{ src: placeholder('Mobile Dev'), alt: 'Abstract mobile device graphic' }}
    title="Android & iOS Apps Dev"
    description="Native-feeling mobile experiences, shipped for both platforms from one codebase."
    cta={{ label: 'Explore', href: '#' }}
  />
);

export const Branding = () => (
  <ImageShowcaseCard
    image={{ src: placeholder('Branding'), alt: 'Abstract brand mark graphic' }}
    title="Brand Identity Design"
    description="Logo, voice, and visual system — a brand that holds up across every surface."
    cta={{ label: 'Explore', href: '#' }}
  />
);
