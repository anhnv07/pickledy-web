"use client";

import * as React from "react";

export type MatchType = "Giao hữu" | "Đánh vòng tròn" | "Đánh đôi";

export type MatchTypeSelectorProps = {
  value: MatchType;
  onChange: (value: MatchType) => void;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

const TYPES: MatchType[] = ["Giao hữu", "Đánh vòng tròn", "Đánh đôi"];

export function MatchTypeSelector({ value, onChange }: MatchTypeSelectorProps) {
  return (
    <div className="flex gap-2">
      {TYPES.map((t) => {
        const active = t === value;
        return (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            className={cx(
              "h-10 rounded-full px-4 text-[13px] font-semibold",
              "transition-colors duration-150 ease-(--ds-ease-standard)",
              active
                ? "bg-(--ds-color-accent) text-white"
                : "bg-[color-mix(in_srgb,var(--ds-color-text)_6%,transparent)] text-near-black",
            )}
            aria-pressed={active}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

