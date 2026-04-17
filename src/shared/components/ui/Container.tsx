import * as React from "react";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  accentBorder?: boolean;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export function Container({
  className,
  accentBorder = false,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cx(
        "mx-auto w-full max-w-screen-2xl",
        "px-4 sm:px-6 lg:px-8",
        accentBorder
          ? "border-l-2 border-[var(--ds-color-accent)] pl-[calc(1rem-2px)] sm:pl-[calc(1.5rem-2px)] lg:pl-[calc(2rem-2px)]"
          : undefined,
        className,
      )}
      {...props}
    />
  );
}

