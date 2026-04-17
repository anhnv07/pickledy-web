"use client";

import * as React from "react";

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

function onlyDigits(v: string) {
  return v.replace(/\D/g, "");
}

export type OtpCodeInputProps = {
  value: string;
  onChange: (next: string) => void;
  length?: number;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
  onComplete?: (code: string) => void;
  className?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

export type OtpCodeInputHandle = {
  focusCell: (index: number) => void;
  focusFirst: () => void;
};

export const OtpCodeInput = React.forwardRef<OtpCodeInputHandle, OtpCodeInputProps>(
  (
    {
      value,
      onChange,
      length = 6,
      disabled = false,
      error = false,
      autoFocus = false,
      onComplete,
      className,
      "aria-invalid": ariaInvalid,
      "aria-describedby": ariaDescribedBy,
    },
    ref,
  ) => {
    const safeLen = Math.max(1, Math.min(12, length));
    const digits = onlyDigits(value).slice(0, safeLen);
    const digitChars = Array.from({ length: safeLen }, (_, i) => digits[i] ?? "");
    const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

    const setCodeFromDigits = React.useCallback(
      (nextDigits: string) => {
        const normalized = onlyDigits(nextDigits).slice(0, safeLen);
        onChange(normalized);
        if (normalized.length === safeLen) {
          onComplete?.(normalized);
        }
      },
      [onChange, onComplete, safeLen],
    );

    React.useImperativeHandle(ref, () => ({
      focusCell: (index: number) => {
        const i = Math.max(0, Math.min(safeLen - 1, index));
        inputRefs.current[i]?.focus();
      },
      focusFirst: () => inputRefs.current[0]?.focus(),
    }));

    const handleChangeAt = (index: number, nextSingle: string) => {
      const all = onlyDigits(nextSingle);
      if (all.length > 1) {
        const merged = onlyDigits(
          digits.slice(0, index) + all + digits.slice(index),
        ).slice(0, safeLen);
        setCodeFromDigits(merged);
        const nextFocus = Math.min(index + all.length, safeLen - 1);
        requestAnimationFrame(() => inputRefs.current[nextFocus]?.focus());
        return;
      }
      const d = all.slice(-1);
      if (d.length === 0) {
        const prev = digits.slice(0, index) + digits.slice(index + 1);
        setCodeFromDigits(prev);
        return;
      }
      const merged = onlyDigits(
        digits.slice(0, index) + d + digits.slice(index + 1),
      ).slice(0, safeLen);
      setCodeFromDigits(merged);
      if (index < safeLen - 1 && merged.length > index) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        if (digitChars[index]) {
          setCodeFromDigits(digits.slice(0, index) + digits.slice(index + 1));
        } else if (index > 0) {
          inputRefs.current[index - 1]?.focus();
          setCodeFromDigits(digits.slice(0, index - 1) + digits.slice(index));
        }
        return;
      }
      if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();
      }
      if (e.key === "ArrowRight" && index < safeLen - 1) {
        e.preventDefault();
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain") ?? "";
      const pasted = onlyDigits(text);
      if (!pasted) return;

      const combined = onlyDigits(digits.slice(0, index) + pasted + digits.slice(index)).slice(
        0,
        safeLen,
      );
      setCodeFromDigits(combined);
      const nextFocus = Math.min(index + pasted.length, safeLen - 1);
      requestAnimationFrame(() => inputRefs.current[nextFocus]?.focus());
    };

    return (
      <div
        className={cx("grid w-full gap-2", className)}
        style={{ gridTemplateColumns: `repeat(${safeLen}, minmax(0, 1fr))` }}
        role="group"
        aria-label="Mã xác nhận"
      >
        {digitChars.map((ch, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            disabled={disabled}
            autoFocus={autoFocus && index === 0}
            value={ch}
            aria-invalid={ariaInvalid}
            aria-describedby={ariaDescribedBy}
            onChange={(e) => handleChangeAt(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={(e) => handlePaste(index, e)}
            onFocus={(e) => e.target.select()}
            className={cx(
              "h-12 w-full min-w-0 bg-transparent text-center text-[22px] font-semibold tabular-nums",
              "text-[var(--ds-color-text)]",
              "border-0 border-b-2 rounded-none",
              "outline-none transition-[border-color,box-shadow] duration-150 ease-[var(--ds-ease-standard)]",
              "disabled:opacity-50 disabled:pointer-events-none",
              error
                ? "border-b-[var(--ds-color-danger)] shadow-[inset_0_-1px_0_0_var(--ds-color-danger)]"
                : cx(
                    "border-b-[color-mix(in_srgb,var(--ds-color-text)_22%,transparent)]",
                    "focus:border-b-[var(--ds-color-accent)] focus:shadow-[inset_0_-2px_0_0_var(--ds-color-accent)]",
                  ),
              !error && "focus-visible:ring-0",
            )}
          />
        ))}
      </div>
    );
  },
);

OtpCodeInput.displayName = "OtpCodeInput";
