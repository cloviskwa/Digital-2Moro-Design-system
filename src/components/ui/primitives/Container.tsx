import type { HTMLAttributes } from 'react';

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

/** Max-width content wrapper — `--d2m-container-width`, mobile-first inline padding. */
export default function Container({ className, children, ...rest }: ContainerProps) {
  return (
    <div className={['d2m-container', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
}
