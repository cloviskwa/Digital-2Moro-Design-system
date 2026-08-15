import type { InputHTMLAttributes, ReactNode } from 'react';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: RadioSize;
  label?: ReactNode;
}

/** Radio button — native `<input type="radio">` styled via `accent-color`, same reasoning as `Checkbox`. */
export default function Radio({ size = 'md', label, className, id, ...rest }: RadioProps) {
  const inputClasses = ['d2m-radio__input', `d2m-radio__input--${size}`];

  if (!label) {
    return <input type="radio" id={id} className={[...inputClasses, className].filter(Boolean).join(' ')} {...rest} />;
  }

  return (
    <label className={['d2m-radio', className].filter(Boolean).join(' ')} htmlFor={id}>
      <input type="radio" id={id} className={inputClasses.join(' ')} {...rest} />
      <span className="d2m-radio__label">{label}</span>
    </label>
  );
}
