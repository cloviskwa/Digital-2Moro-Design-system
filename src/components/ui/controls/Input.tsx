import type { InputHTMLAttributes } from 'react';

export type FieldSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: FieldSize;
  /** Marks the field visually invalid (red border) — pair with `FormField`'s `errorText` for the message. */
  invalid?: boolean;
}

/** Text input — pair with `FormField` for label/helper/error wiring. */
export default function Input({ size = 'md', invalid = false, className, ...rest }: InputProps) {
  const classes = [
    'd2m-field-control',
    `d2m-field-control--${size}`,
    invalid && 'd2m-field-control--invalid',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return <input className={classes} aria-invalid={invalid || undefined} {...rest} />;
}
