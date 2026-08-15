import type { SelectHTMLAttributes } from 'react';
import type { FieldSize } from './Input';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: FieldSize;
  invalid?: boolean;
}

/** Native `<select>` — same field styling as `Input`, pair with `FormField`. Options are children (`<option>`), same as native usage. */
export default function Select({ size = 'md', invalid = false, className, children, ...rest }: SelectProps) {
  const classes = [
    'd2m-field-control',
    'd2m-field-control--select',
    `d2m-field-control--${size}`,
    invalid && 'd2m-field-control--invalid',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <select className={classes} aria-invalid={invalid || undefined} {...rest}>
      {children}
    </select>
  );
}
