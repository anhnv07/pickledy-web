"use client";

import * as React from "react";
import {
  GENDERS,
  GENDER_LABELS,
  type Gender,
} from "../constants/profileCreate";

export type GenderSegmentedControlProps = {
  value: Gender;
  onChange: (value: Gender) => void;
};

const ICON: Record<Gender, string> = {
  male: "♂",
  female: "♀",
  other: "⚧",
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export function GenderSegmentedControl({
  value,
  onChange,
}: GenderSegmentedControlProps) {
  return (
    <div
      className="grid grid-cols-3 gap-2"
      role="radiogroup"
      aria-label="Giới tính"
    >
      {GENDERS.map((g) => {
        const selected = value === g;
        return (
          <button
            key={g}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(g)}
            className={cx(
              "flex items-center justify-center gap-1.5 rounded-full py-2.5 px-2 text-[14px] font-medium transition-colors",
              selected
                ? "bg-[var(--ds-color-accent)] text-white"
                : "border border-[color-mix(in_srgb,var(--ds-color-text)_18%,transparent)] bg-white text-secondary-gray",
            )}
          >
            <span aria-hidden className="text-[15px] leading-none">
              {ICON[g]}
            </span>
            {GENDER_LABELS[g]}
          </button>
        );
      })}
    </div>
  );
}
