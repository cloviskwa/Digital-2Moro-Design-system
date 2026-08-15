import type { InputHTMLAttributes, ReactNode } from 'react';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
}

/**
 * Toggle switch — a real native `<input type="checkbox">` (full keyboard/
 * screen-reader semantics for free) visually hidden and replaced by a
 * track/thumb driven purely by CSS `:checked` sibling selectors — no JS
 * state, no custom ARIA needed beyond what the native checkbox already has.
 */
export default function Switch({ label, className, id, ...rest }: SwitchProps) {
  return (
    <label className={['d2m-switch', className].filter(Boolean).join(' ')} htmlFor={id}>
      <input type="checkbox" role="switch" id={id} className="d2m-switch__input" {...rest} />
      <span className="d2m-switch__track">
        <span className="d2m-switch__thumb" />
      </span>
      {label ? <span className="d2m-switch__label">{label}</span> : null}
    </label>
  );
}
