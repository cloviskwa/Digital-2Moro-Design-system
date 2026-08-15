import type { HTMLAttributes } from 'react';

export type DividerProps = HTMLAttributes<HTMLHRElement>;

/** Hairline horizontal rule — `--d2m-border-faint` (reference `.section-divider`). */
export default function Divider({ className, ...rest }: DividerProps) {
  return <hr className={['d2m-divider', className].filter(Boolean).join(' ')} {...rest} />;
}
