"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { USAPA_BANDS } from "../constants/profileCreate";

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export function PickleballSkillSelector() {
  const [open, setOpen] = React.useState(true);

  return (
    <div
      className={cx(
        "overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--ds-color-text)_14%,transparent)]",
        "bg-[var(--ds-color-surface)]",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span className="text-[15px] font-semibold text-near-black">
          Thang điểm USAPA
        </span>
        {open ? (
          <ChevronUp className="h-5 w-5 shrink-0 text-secondary-gray" aria-hidden />
        ) : (
          <ChevronDown className="h-5 w-5 shrink-0 text-secondary-gray" aria-hidden />
        )}
      </button>
      {open ? (
        <ul className="space-y-3 border-t border-[color-mix(in_srgb,var(--ds-color-text)_10%,transparent)] px-4 py-3">
          {USAPA_BANDS.map((band) => (
            <li key={band.range}>
              <div className="text-[14px] font-semibold text-near-black">
                {band.range}
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-secondary-gray">
                {band.description}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
