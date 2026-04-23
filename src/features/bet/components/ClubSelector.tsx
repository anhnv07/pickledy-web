"use client";

import * as React from "react";
import { Plus, X } from "lucide-react";

export type ClubSelectorValue =
  | { clubId: null; clubName: "" }
  | { clubId: string; clubName: string };

export type ClubSelectorProps = {
  value: ClubSelectorValue;
  onPick: () => void;
  onClear: () => void;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "C";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

export function ClubSelector({ value, onPick, onClear }: ClubSelectorProps) {
  const selected = Boolean(value.clubId);

  if (!selected) {
    return (
      <button
        type="button"
        onClick={onPick}
        className={cx(
          "flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left",
          "border border-[color-mix(in_srgb,var(--ds-color-text)_10%,transparent)] bg-white",
          "shadow-[var(--ds-shadow-card)]",
          "transition-[transform,box-shadow] duration-150 ease-(--ds-ease-standard)",
          "hover:shadow-[var(--ds-shadow-hover)] active:scale-[0.99]",
        )}
      >
        <Plus className="h-5 w-5 text-secondary-gray" aria-hidden="true" />
        <span className="text-[14px] font-medium text-secondary-gray">
          Gắn với câu lạc bộ
        </span>
      </button>
    );
  }

  return (
    <div
      className={cx(
        "flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3",
        "border border-[color-mix(in_srgb,var(--ds-color-text)_10%,transparent)] bg-white",
        "shadow-[var(--ds-shadow-card)]",
      )}
    >
      <button
        type="button"
        onClick={onPick}
        className="flex min-w-0 items-center gap-3 text-left"
        aria-label={`Câu lạc bộ: ${value.clubName}`}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--ds-color-accent)_18%,white)] text-(--ds-color-accent)">
          <span className="text-[12px] font-bold">{initials(value.clubName)}</span>
        </div>
        <div className="min-w-0">
          <div className="truncate text-[14px] font-semibold text-near-black">
            {value.clubName}
          </div>
        </div>
      </button>

      <button
        type="button"
        onClick={onClear}
        className={cx(
          "inline-flex h-9 w-9 items-center justify-center rounded-full",
          "text-secondary-gray hover:bg-[color-mix(in_srgb,var(--ds-color-text)_6%,transparent)]",
        )}
        aria-label="Bỏ gắn câu lạc bộ"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}

