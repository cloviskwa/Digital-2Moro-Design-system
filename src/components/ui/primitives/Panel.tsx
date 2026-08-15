import type { HTMLAttributes } from 'react';

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Solid panel background (`--d2m-bg-panel-solid`) instead of the default translucent one. */
  solid?: boolean;
}

/** Bordered, radiused surface — the base for hero/form panels (reference `.d2m-intake-*-panel`). */
export default function Panel({ solid = false, className, children, ...rest }: PanelProps) {
  const classes = ['d2m-panel', solid && 'd2m-panel--solid', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
