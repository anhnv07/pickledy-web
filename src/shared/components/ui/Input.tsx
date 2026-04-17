import * as React from "react";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "color"
> & {
  error?: boolean;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cx(
          "h-10 w-full rounded-lg bg-[var(--ds-color-surface)] px-3",
          "text-[14px] font-normal text-[var(--ds-color-text)] placeholder:text-[color-mix(in_srgb,var(--ds-color-text)_40%,transparent)]",
          "border border-[color-mix(in_srgb,var(--ds-color-text)_18%,transparent)]",
          "shadow-none transition-[border-color,box-shadow,background-color] duration-150 ease-[var(--ds-ease-standard)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ds-color-bg)]",
          error
            ? "border-[var(--ds-color-danger)] focus-visible:ring-[var(--ds-color-danger)]"
            : undefined,
          "disabled:opacity-50 disabled:pointer-events-none",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

