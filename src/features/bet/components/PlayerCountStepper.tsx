"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";

export type PlayerCountStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export function PlayerCountStepper({
  value,
  onChange,
  min = 2,
  max = 100,
}: PlayerCountStepperProps) {
  const decDisabled = value <= min;
  const incDisabled = value >= max;

  return (
    <div className="flex w-full items-center justify-between gap-3 py-3">
      <span className="text-[14px] font-medium text-near-black">
        Số người chơi
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={cx(
            "inline-flex h-9 w-9 items-center justify-center rounded-full",
            "border border-[color-mix(in_srgb,var(--ds-color-text)_14%,transparent)] bg-white",
            "text-near-black",
            decDisabled ? "opacity-40" : "active:scale-[0.98]",
          )}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={decDisabled}
          aria-label="Giảm số người chơi"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="min-w-[32px] text-center text-[14px] font-semibold text-near-black">
          {value}
        </div>

        <button
          type="button"
          className={cx(
            "inline-flex h-9 w-9 items-center justify-center rounded-full",
            "border border-[color-mix(in_srgb,var(--ds-color-text)_14%,transparent)] bg-white",
            "text-near-black",
            incDisabled ? "opacity-40" : "active:scale-[0.98]",
          )}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={incDisabled}
          aria-label="Tăng số người chơi"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

