"use client";

import * as React from "react";
import {
  AGE_GROUP_OPTIONS,
  type AgeGroup,
} from "../constants/profileCreate";

export type AgeGroupSelectorProps = {
  value: AgeGroup;
  onChange: (value: AgeGroup) => void;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export function AgeGroupSelector({ value, onChange }: AgeGroupSelectorProps) {
  return (
    <div className="flex flex-col gap-3" role="radiogroup" aria-label="Độ tuổi">
      {AGE_GROUP_OPTIONS.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.value)}
            className={cx(
              "w-full rounded-2xl border px-4 py-3 text-left transition-colors",
              selected
                ? "border-[var(--ds-color-accent)] bg-[color-mix(in_srgb,var(--ds-color-accent)_8%,white)]"
                : "border-[color-mix(in_srgb,var(--ds-color-text)_14%,transparent)] bg-white",
            )}
          >
            <div className="text-[15px] font-semibold text-near-black">
              {opt.title}
            </div>
            <div className="mt-0.5 text-[13px] text-secondary-gray">
              {opt.subtitle}
            </div>
          </button>
        );
      })}
    </div>
  );
}
