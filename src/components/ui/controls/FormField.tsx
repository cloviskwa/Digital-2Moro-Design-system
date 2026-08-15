'use client';

import { cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from 'react';

export interface FormFieldProps {
  label?: ReactNode;
  helperText?: ReactNode;
  /** Presence implies the field is invalid — shown instead of `helperText`, and sets `aria-invalid`/`invalid` on the child control. */
  errorText?: ReactNode;
  required?: boolean;
  status?: 'required' | 'optional';
  className?: string;
  /** A single control element (`Input`/`Textarea`/`Select`/etc.) — `id`/`aria-describedby`/`aria-invalid`/`invalid` are injected onto it automatically. */
  children: ReactElement<{ id?: string; 'aria-describedby'?: string; 'aria-invalid'?: boolean; invalid?: boolean }>;
}

export default function FormField({
  label,
  helperText,
  errorText,
  required = false,
  status,
  className,
  children,
}: FormFieldProps) {
  const generatedId = useId();
  const controlId = children.props.id ?? generatedId;
  const describedById = errorText || helperText ? `${controlId}-description` : undefined;
  const invalid = Boolean(errorText);

  const control = isValidElement(children)
    ? cloneElement(children, {
        id: controlId,
        'aria-describedby': describedById,
        'aria-invalid': invalid || undefined,
        invalid,
      })
    : children;

  const effectiveStatus = status ?? (required ? 'required' : undefined);

  return (
    <div className={['d2m-form-field', invalid ? 'has-error' : '', className].filter(Boolean).join(' ')}>
      {label || effectiveStatus ? (
        <div className="d2m-form-field__header">
          {label ? (
            <label className="d2m-form-field__label" htmlFor={controlId}>
              {label}
            </label>
          ) : (
            <div />
          )}

          {effectiveStatus ? (
            <span
              className={`d2m-form-field__status ${
                effectiveStatus === 'required' ? 'is-required' : 'is-optional'
              }`}
            >
              {effectiveStatus === 'required' ? 'Required' : 'Optional'}
            </span>
          ) : null}
        </div>
      ) : null}

      {helperText ? (
        <p id={describedById} className="d2m-form-field__helper">
          {helperText}
        </p>
      ) : null}

      <div className="d2m-form-field__control">{control}</div>

      {errorText ? (
        <p id={describedById} className="d2m-form-field__error">
          {errorText}
        </p>
      ) : null}
    </div>
  );
}
