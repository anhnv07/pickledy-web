"use client";

import * as React from "react";
import { ChevronDown, MapPin } from "lucide-react";

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export type LocationSelectorProps = {
  value: string;
  onClick?: () => void;
  className?: string;
};

export function LocationSelector({
  value,
  onClick,
  className,
}: LocationSelectorProps) {
  return (
    <button
      type="button"
      className={cx(
        "inline-flex items-center gap-2 rounded-full px-3 py-2",
        "bg-white shadow-(--ds-shadow-card)",
        "border border-[color-mix(in_srgb,var(--ds-color-text)_10%,transparent)]",
        "text-[13px] font-medium text-near-black",
        "active:scale-[0.99] transition-[transform,box-shadow] duration-150 ease-(--ds-ease-standard)",
        className,
      )}
      onClick={onClick}
      aria-label={`Chọn vị trí: ${value}`}
    >
      <MapPin className="h-4 w-4 text-secondary-gray" aria-hidden="true" />
      <span className="max-w-[160px] truncate">{value}</span>
      <ChevronDown className="h-4 w-4 text-secondary-gray" aria-hidden="true" />
    </button>
  );
}

