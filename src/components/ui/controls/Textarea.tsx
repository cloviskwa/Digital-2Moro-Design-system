import type { TextareaHTMLAttributes } from 'react';
import type { FieldSize } from './Input';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: FieldSize;
  invalid?: boolean;
}

/** Multi-line text input — same field styling as `Input`, pair with `FormField`. */
export default function Textarea({
  size = 'md',
  invalid = false,
  className,
  rows = 4,
  ...rest
}: TextareaProps) {
  const classes = [
    'd2m-field-control',
    'd2m-field-control--textarea',
    `d2m-field-control--${size}`,
    invalid && 'd2m-field-control--invalid',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return <textarea className={classes} rows={rows} aria-invalid={invalid || undefined} {...rest} />;
}
