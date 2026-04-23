"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

export type SettingRowProps = {
  label: string;
  value: string;
  onClick?: () => void;
  className?: string;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export function SettingRow({
  label,
  value,
  onClick,
  className,
}: SettingRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "flex w-full items-center justify-between gap-3 py-3",
        "transition-colors duration-150 ease-(--ds-ease-standard)",
        "hover:bg-[color-mix(in_srgb,var(--ds-color-text)_3%,transparent)] active:bg-[color-mix(in_srgb,var(--ds-color-text)_5%,transparent)]",
        className,
      )}
    >
      <span className="text-[14px] font-medium text-near-black">{label}</span>
      <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-secondary-gray">
        {value}
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </span>
    </button>
  );
}

