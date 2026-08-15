import type { InputHTMLAttributes, ReactNode } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: CheckboxSize;
  label?: ReactNode;
}

/**
 * Checkbox — a real native `<input type="checkbox">` styled via the CSS
 * `accent-color` property (not a custom-built box) so keyboard/screen-reader
 * behavior stays exactly native, for free.
 */
export default function Checkbox({ size = 'md', label, className, id, ...rest }: CheckboxProps) {
  const inputClasses = ['d2m-checkbox__input', `d2m-checkbox__input--${size}`];

  if (!label) {
    return <input type="checkbox" id={id} className={[...inputClasses, className].filter(Boolean).join(' ')} {...rest} />;
  }

  return (
    <label className={['d2m-checkbox', className].filter(Boolean).join(' ')} htmlFor={id}>
      <input type="checkbox" id={id} className={inputClasses.join(' ')} {...rest} />
      <span className="d2m-checkbox__label">{label}</span>
    </label>
  );
}
