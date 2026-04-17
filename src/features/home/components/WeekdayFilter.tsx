"use client";

import * as React from "react";
import type { WeekdayKey, WeekdayOption } from "../models/match";

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export type WeekdayFilterProps = {
  value: WeekdayKey;
  options: WeekdayOption[];
  onChange: (key: WeekdayKey) => void;
  className?: string;
};

export function WeekdayFilter({
  value,
  options,
  onChange,
  className,
}: WeekdayFilterProps) {
  return (
    <div
      className={cx(
        "flex items-center gap-2 overflow-x-auto pb-2",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      role="tablist"
      aria-label="Chọn ngày"
    >
      {options.map((opt) => {
        const active = opt.key === value;
        return (
          <button
            key={opt.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.key)}
            className={cx(
              "shrink-0 rounded-[14px] px-3 py-2 text-center",
              "border transition-colors duration-150 ease-(--ds-ease-standard)",
              active
                ? "bg-(--ds-color-accent) text-white border-transparent"
                : "bg-white text-near-black border-[color-mix(in_srgb,var(--ds-color-text)_14%,transparent)]",
            )}
          >
            <div className={cx("text-[11px] font-semibold leading-none")}>
              {opt.weekdayLabel}
            </div>
            <div className={cx("mt-1 text-[14px] font-bold leading-none")}>
              {opt.dateLabel}
            </div>
          </button>
        );
      })}
    </div>
  );
}

