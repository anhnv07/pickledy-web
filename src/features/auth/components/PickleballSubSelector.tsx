"use client";

import * as React from "react";
import { PICKLEBALL_RATING_STEPS } from "../constants/profileCreate";

export type PickleballSubSelectorProps = {
  value: number;
  onChange: (rating: number) => void;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export function PickleballSubSelector({
  value,
  onChange,
}: PickleballSubSelectorProps) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-[11px] font-medium uppercase tracking-wide text-secondary-gray">
        <span>MỚI BẮT ĐẦU</span>
        <span>CHUYÊN NGHIỆP</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {PICKLEBALL_RATING_STEPS.map((step) => {
          const selected = value === step;
          const label = Number.isInteger(step) ? `${step}.0` : String(step);
          return (
            <button
              key={step}
              type="button"
              onClick={() => onChange(step)}
              className={cx(
                "flex h-11 items-center justify-center rounded-full text-[14px] font-semibold transition-colors",
                selected
                  ? "bg-[var(--ds-color-accent)] text-white"
                  : "border border-[color-mix(in_srgb,var(--ds-color-text)_18%,transparent)] bg-white text-secondary-gray",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-center text-[12px] leading-relaxed text-secondary-gray">
        Chưa chắc? Chọn thấp hơn – host điều chỉnh được sau.
      </p>
    </div>
  );
}
