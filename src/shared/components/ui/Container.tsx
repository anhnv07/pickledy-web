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
        "w-full px-4",
        accentBorder
          ? "border-l-2 border-[var(--ds-color-accent)] pl-[calc(1rem-2px)]"
          : undefined,
        className,
      )}
      {...props}
    />
  );
}

