import * as React from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

const base =
  "inline-flex items-center justify-center gap-2 select-none whitespace-nowrap " +
  "font-medium tracking-normal " +
  "transition-[transform,box-shadow,background-color,border-color,color] duration-150 ease-[var(--ds-ease-standard)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ds-color-bg)] " +
  "disabled:pointer-events-none disabled:opacity-50";

const bySize: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[13px] rounded-full",
  md: "h-10 px-5 text-[14px] rounded-full",
  lg: "h-11 px-6 text-[16px] rounded-full",
};

const byVariant: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--ds-color-accent)] text-white shadow-[var(--ds-shadow-card)] " +
    "hover:shadow-[var(--ds-shadow-hover)] hover:bg-[color-mix(in_srgb,var(--ds-color-accent)_92%,black)] " +
    "active:shadow-[var(--ds-shadow-card)] active:bg-[var(--ds-color-accent-pressed)] active:scale-[var(--ds-focus-scale)]",
  outline:
    "bg-transparent text-[var(--ds-color-text)] border border-[color-mix(in_srgb,var(--ds-color-text)_18%,transparent)] " +
    "hover:bg-[color-mix(in_srgb,var(--ds-color-text)_6%,transparent)] " +
    "active:scale-[var(--ds-focus-scale)]",
  ghost:
    "bg-transparent text-[var(--ds-color-text)] " +
    "hover:bg-[color-mix(in_srgb,var(--ds-color-text)_6%,transparent)] " +
    "active:scale-[var(--ds-focus-scale)]",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      leftIcon,
      rightIcon,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cx(base, bySize[size], byVariant[variant], className)}
        {...props}
      >
        {leftIcon ? (
          <span className="inline-flex shrink-0 items-center">{leftIcon}</span>
        ) : null}
        <span className="inline-flex items-center">{children}</span>
        {rightIcon ? (
          <span className="inline-flex shrink-0 items-center">{rightIcon}</span>
        ) : null}
      </button>
    );
  },
);
Button.displayName = "Button";

