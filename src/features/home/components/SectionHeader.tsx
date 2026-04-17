"use client";

import * as React from "react";

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export type SectionHeaderProps = {
  label: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function SectionHeader({
  label,
  actionLabel,
  onAction,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cx("flex items-center justify-between gap-3", className)}>
      <div className="text-[28px] font-bold tracking-tight text-near-black">
        {label}
      </div>
      {actionLabel ? (
        <button
          type="button"
          className="text-[13px] font-semibold text-(--ds-color-accent)"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

