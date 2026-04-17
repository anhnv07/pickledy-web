"use client";

import * as React from "react";
import { Input } from "@/shared/components/ui/Input";

export type VnPhoneInputProps = {
  value: string;
  onChange: (nextDigits: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: boolean;
  autoFocus?: boolean;
  className?: string;
  inputClassName?: string;
  name?: string;
  id?: string;
};

function onlyDigits(v: string) {
  return v.replace(/\D/g, "");
}

function formatVnDigits(digits: string) {
  const d = onlyDigits(digits);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 10)}`;
}

export function VnPhoneInput({
  value,
  onChange,
  onBlur,
  placeholder = "Số điện thoại",
  error = false,
  autoFocus,
  className,
  inputClassName,
  name,
  id,
}: VnPhoneInputProps) {
  const displayValue = React.useMemo(() => formatVnDigits(value), [value]);

  return (
    <div className={className}>
      <Input
        id={id}
        name={name}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder={placeholder}
        value={displayValue}
        error={error}
        autoFocus={autoFocus}
        className={inputClassName}
        onBlur={onBlur}
        onChange={(e) => {
          const nextDigits = onlyDigits(e.target.value).slice(0, 10);
          onChange(nextDigits);
        }}
      />
    </div>
  );
}

