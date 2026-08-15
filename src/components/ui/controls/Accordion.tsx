'use client';

import { useId, type ReactNode } from 'react';
import { DashboardIcon } from '@/components/icons';

export interface AccordionItem {
  value: string;
  title: ReactNode;
  content: ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** When `false` (default), opening one item closes the others (native `<details name>` exclusivity — modern evergreen browsers; older browsers just allow all open, a safe fallback). */
  allowMultiple?: boolean;
  className?: string;
}

/**
 * Accordion — built on native `<details>`/`<summary>` rather than custom
 * ARIA + JS: the browser already provides toggle behavior, keyboard support
 * (Enter/Space on the summary), and correct semantics for free. Exclusive
 * ("only one open") mode uses the native `<details name="...">` grouping
 * attribute — no JS state needed for that either.
 */
export default function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const groupName = useId();

  return (
    <div className={['d2m-accordion', className].filter(Boolean).join(' ')}>
      {items.map((item) => (
        <details
          key={item.value}
          className="d2m-accordion__item"
          name={allowMultiple ? undefined : groupName}
          open={item.defaultOpen}
        >
          <summary className="d2m-accordion__trigger">
            <span className="d2m-accordion__title">{item.title}</span>
            <DashboardIcon name="chevronRight" variant="plain" className="d2m-accordion__chevron" />
          </summary>
          <div className="d2m-accordion__content">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
