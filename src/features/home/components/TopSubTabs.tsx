"use client";

import * as React from "react";

export type TopSubTabKey = "clubs" | "matches";

export type TopSubTabsProps = {
  value: TopSubTabKey;
  onChange: (value: TopSubTabKey) => void;
  className?: string;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export function TopSubTabs({ value, onChange, className }: TopSubTabsProps) {
  const items: Array<{ key: TopSubTabKey; label: string }> = [
    { key: "clubs", label: "Câu lạc bộ" },
    { key: "matches", label: "Kèo" },
  ];

  return (
    <div className={cx("flex items-center gap-6", className)} role="tablist">
      {items.map((it) => {
        const active = it.key === value;
        return (
          <button
            key={it.key}
            type="button"
            role="tab"
            aria-selected={active}
            className={cx(
              "relative pb-3 text-[13px] font-semibold",
              active ? "text-(--ds-color-accent)" : "text-secondary-gray",
            )}
            onClick={() => onChange(it.key)}
          >
            {it.label}
            <span
              aria-hidden="true"
              className={cx(
                "pointer-events-none absolute -bottom-px left-0 right-0 mx-auto h-[2px] w-[28px] rounded-full transition-opacity",
                active
                  ? "bg-(--ds-color-accent) opacity-100"
                  : "opacity-0",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

