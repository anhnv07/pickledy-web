"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export type TimeHeaderProps = {
  timeLabel: string;
  countLabel: string;
  className?: string;
  right?: React.ReactNode;
  /** Khi có `onToggle`, header + chevron là nút (mở/đóng section). */
  expanded?: boolean;
  onToggle?: () => void;
};

export function TimeHeader({
  timeLabel,
  countLabel,
  className,
  right,
  expanded = true,
  onToggle,
}: TimeHeaderProps) {
  const chevron = (
    <ChevronDown
      className={cx(
        "h-4 w-4 shrink-0 text-secondary-gray transition-transform duration-200 ease-(--ds-ease-standard)",
        onToggle && !expanded && "-rotate-90",
      )}
      aria-hidden
    />
  );

  const inner = (
    <>
      <div className="flex min-w-0 flex-1 items-baseline gap-2">
        <div className="text-[16px] font-bold text-near-black">{timeLabel}</div>
        <div className="text-[12px] font-medium text-secondary-gray">
          {countLabel}
        </div>
      </div>
      {right ?? chevron}
    </>
  );

  if (onToggle) {
    return (
      <button
        type="button"
        className={cx(
          "flex w-full items-center justify-between gap-3 text-left",
          className,
        )}
        onClick={onToggle}
        aria-expanded={expanded}
      >
        {inner}
      </button>
    );
  }

  return (
    <div className={cx("flex items-center justify-between gap-3", className)}>
      {inner}
    </div>
  );
}

