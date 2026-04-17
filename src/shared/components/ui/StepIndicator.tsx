"use client";

import * as React from "react";

export type StepIndicatorProps = {
  total: number;
  activeIndex: number;
  className?: string;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export function StepIndicator({
  total,
  activeIndex,
  className,
}: StepIndicatorProps) {
  const safeTotal = Number.isFinite(total) ? Math.max(1, total) : 1;
  const safeActive = Number.isFinite(activeIndex)
    ? Math.min(Math.max(0, activeIndex), safeTotal - 1)
    : 0;

  return (
    <div className={cx("flex w-full gap-2", className)} aria-hidden="true">
      {Array.from({ length: safeTotal }).map((_, i) => {
        const active = i <= safeActive;
        return (
          <div
            key={i}
            className={cx(
              "h-[2px] flex-1 rounded-full",
              active ? "bg-(--ds-color-accent)" : "bg-neutral-100",
            )}
          />
        );
      })}
    </div>
  );
}

