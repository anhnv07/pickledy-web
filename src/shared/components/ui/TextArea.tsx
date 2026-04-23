import * as React from "react";

export type TextAreaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "color"
> & {
  error?: boolean;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error = false, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cx(
          "min-h-[96px] w-full resize-none rounded-lg bg-(--ds-color-surface) px-3 py-2.5",
          "text-[14px] font-normal text-(--ds-color-text) placeholder:text-[color-mix(in_srgb,var(--ds-color-text)_40%,transparent)]",
          "border border-[color-mix(in_srgb,var(--ds-color-text)_18%,transparent)]",
          "shadow-none transition-[border-color,box-shadow,background-color] duration-150 ease-(--ds-ease-standard)",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ds-color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--ds-color-bg)",
          error
            ? "border-(--ds-color-danger) focus-visible:ring-(--ds-color-danger)"
            : undefined,
          "disabled:opacity-50 disabled:pointer-events-none",
          className,
        )}
        {...props}
      />
    );
  },
);
TextArea.displayName = "TextArea";

