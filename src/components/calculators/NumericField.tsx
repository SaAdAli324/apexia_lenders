"use client";

import React, { useState } from 'react';

interface NumericFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  onErrorChange?: (hasError: boolean) => void;
  prefix?: string;
  suffix?: string;
  helpText?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  required?: boolean;
  className?: string;
  isCurrency?: boolean;
}

export default function NumericField({
  id,
  label,
  value,
  onChange,
  onErrorChange,
  prefix,
  suffix,
  helpText,
  min = 0,
  max,
  step = 1,
  placeholder = '0',
  required = false,
  className = '',
  isCurrency = false,
}: NumericFieldProps) {
  const formatValue = (v: number | undefined | null) => {
    if (v === undefined || v === null || v === 0) return '';
    return isCurrency ? v.toLocaleString('en-AU') : String(v);
  };

  const [displayValue, setDisplayValue] = useState<string>(() => formatValue(value));
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Sync internal display value when external value changes and not actively typing
  const [prevValue, setPrevValue] = useState<number>(value);
  if (value !== prevValue) {
    setPrevValue(value);
    if (!isFocused) {
      setDisplayValue(formatValue(value));
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setDisplayValue(raw);

    // Strip commas, spaces, currency symbols
    const clean = raw.replace(/[,\s$]/g, '');

    if (clean === '') {
      if (required) {
        setError('This field is required');
        onErrorChange?.(true);
      } else {
        setError(null);
        onErrorChange?.(false);
      }
      onChange(0);
      return;
    }

    // Must be valid digits with at most one decimal point
    const isValidPattern = /^\d*\.?\d*$/.test(clean) && !isNaN(Number(clean));
    if (!isValidPattern) {
      setError('Please enter a valid number');
      onErrorChange?.(true);
      onChange(0);
      return;
    }

    const parsed = parseFloat(clean);
    if (isNaN(parsed)) {
      setError('Please enter a valid number');
      onErrorChange?.(true);
      onChange(0);
      return;
    }

    if (min !== undefined && parsed < min) {
      setError(`Minimum value is ${min}`);
      onErrorChange?.(true);
      onChange(0);
      return;
    }

    if (max !== undefined && parsed > max) {
      setError(`Maximum value is ${max}`);
      onErrorChange?.(true);
      onChange(0);
      return;
    }

    setError(null);
    onErrorChange?.(false);
    onChange(parsed);
  };

  const handleBlur = () => {
    setIsFocused(false);
    const clean = displayValue.replace(/[,\s$]/g, '');

    if (clean === '') {
      if (required) {
        setError('This field is required');
        onErrorChange?.(true);
      } else {
        setError(null);
        onErrorChange?.(false);
      }
      setDisplayValue('');
      onChange(0);
      return;
    }

    const isValidPattern = /^\d*\.?\d+$/.test(clean) && !isNaN(Number(clean));
    if (!isValidPattern) {
      setError('Please enter a valid number');
      onErrorChange?.(true);
      onChange(0);
      return;
    }

    const parsed = parseFloat(clean);
    if (isNaN(parsed)) {
      setError('Please enter a valid number');
      onErrorChange?.(true);
      onChange(0);
      return;
    }

    if (min !== undefined && parsed < min) {
      setError(`Minimum value is ${min}`);
      onErrorChange?.(true);
      onChange(0);
      return;
    }

    if (max !== undefined && parsed > max) {
      setError(`Maximum value is ${max}`);
      onErrorChange?.(true);
      onChange(0);
      return;
    }

    setError(null);
    onErrorChange?.(false);
    if (isCurrency) {
      setDisplayValue(parsed.toLocaleString('en-AU'));
    } else {
      setDisplayValue(String(parsed));
    }
    onChange(parsed);
  };

  const handleFocus = () => {
    setIsFocused(true);
    // When focusing, show clean number without grouping commas for easier typing
    const clean = displayValue.replace(/[,\s$]/g, '');
    setDisplayValue(clean === '0' && !required ? '' : clean);
  };

  const helpId = `${id}-help`;
  const errorId = `${id}-error`;

  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-sm font-semibold text-navy select-none"
        >
          {label}
          {required && <span className="text-teal ml-1" aria-hidden="true">*</span>}
        </label>
      </div>

      <div className="relative rounded-lg shadow-xs transition-all">
        {prefix && (
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sm font-medium text-slate"
          >
            {prefix}
          </div>
        )}

        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          step={step}
          placeholder={placeholder}
          aria-required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={`${helpText ? helpId : ''} ${error ? errorId : ''}`.trim() || undefined}
          className={`w-full bg-white text-navy text-base rounded-lg border transition-colors py-2.5 outline-none font-medium
            ${prefix ? 'pl-8' : 'pl-3.5'}
            ${suffix ? 'pr-12' : 'pr-3.5'}
            ${
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                : 'border-border hover:border-teal/60 focus:border-teal focus:ring-2 focus:ring-teal/20'
            }
          `}
        />

        {suffix && (
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-sm font-medium text-slate"
          >
            {suffix}
          </div>
        )}
      </div>

      {helpText && (
        <p id={helpId} className="text-xs text-slate leading-normal mt-0.5">
          {helpText}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-600 font-medium mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}
