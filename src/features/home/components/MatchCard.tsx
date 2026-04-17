"use client";

import * as React from "react";
import { MapPin } from "lucide-react";
import { Card } from "@/shared/components/ui/Card";
import type { Match } from "../models/match";

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "?";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase();
}

function avatarColor(seed: string) {
  // Deterministic but simple (no deps).
  const colors = [
    "bg-orange-500",
    "bg-emerald-500",
    "bg-sky-500",
    "bg-violet-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-lime-500",
    "bg-cyan-500",
  ];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return colors[h % colors.length]!;
}

export type MatchCardProps = {
  match: Match;
  onPress: (match: Match) => void;
  className?: string;
};

export function MatchCard({ match, onPress, className }: MatchCardProps) {
  const full = match.status === "full";
  return (
    <button
      type="button"
      className={cx("w-full text-left", className)}
      onClick={() => onPress(match)}
      aria-label={`${match.clubName} ${match.venue}`.trim()}
    >
      <Card
        className={cx(
          "rounded-2xl",
          full ? "opacity-95" : undefined,
          "hover:translate-y-0", // keep cards stable in scroll lists
        )}
      >
        <div className="flex gap-3">
          <div
            className={cx(
              "h-11 w-11 shrink-0 rounded-full text-white",
              "flex items-center justify-center text-[13px] font-bold",
              avatarColor(match.id),
            )}
            aria-hidden="true"
          >
            {initials(match.clubName)}
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold tracking-wide text-secondary-gray">
              {match.clubName}
            </div>

            <div className="mt-1 flex items-baseline gap-2">
              <div className="text-[14px] font-bold text-near-black">
                {match.level}
              </div>
              <div className="text-[14px] font-semibold text-near-black">
                {match.price}
              </div>
            </div>

            <div className="mt-1 text-[12px] font-medium text-secondary-gray">
              {match.venue}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[color-mix(in_srgb,var(--ds-color-text)_6%,transparent)] px-2 py-1 text-[11px] font-semibold text-near-black">
                {match.typeLabel}
              </span>
              <span className="rounded-full bg-[color-mix(in_srgb,var(--ds-color-text)_6%,transparent)] px-2 py-1 text-[11px] font-semibold text-near-black">
                {match.currentPlayers}/{match.maxPlayers}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--ds-color-text)_6%,transparent)] px-2 py-1 text-[11px] font-semibold text-near-black">
                <MapPin className="h-3.5 w-3.5 text-secondary-gray" aria-hidden />
                {match.distance}
              </span>

              {full ? (
                <span className="rounded-full bg-[color-mix(in_srgb,var(--ds-color-text)_10%,transparent)] px-2 py-1 text-[11px] font-bold text-secondary-gray">
                  Hết
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </Card>
    </button>
  );
}

