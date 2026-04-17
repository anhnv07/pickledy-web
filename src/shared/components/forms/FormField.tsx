import * as React from "react";

type FormFieldProps = {
  label?: string;
  hint?: string;
  errorMessage?: string;
  errorId?: string;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export function FormField({
  label,
  hint,
  errorMessage,
  errorId,
  children,
  className,
  labelClassName,
}: FormFieldProps) {
  return (
    <div className={cx("w-full", className)}>
      {label ? (
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <label
            className={cx(
              "text-[14px] font-medium text-(--ds-color-text)",
              labelClassName,
            )}
          >
            {label}
          </label>
          {hint ? (
            <span className="text-[12px] text-(--ds-color-text-muted)">
              {hint}
            </span>
          ) : null}
        </div>
      ) : null}

      {children}

      {errorMessage ? (
        <p
          id={errorId}
          className="mt-2 text-[13px] text-(--ds-color-danger)"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}

