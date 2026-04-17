"use client";

import * as React from "react";
import { BarChart3, ChevronRight, Users } from "lucide-react";
import type { Club } from "../models/club";

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
  const colors = [
    "bg-orange-500",
    "bg-emerald-500",
    "bg-sky-500",
    "bg-violet-500",
    "bg-neutral-900",
    "bg-rose-500",
    "bg-amber-500",
    "bg-cyan-500",
  ];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return colors[h % colors.length]!;
}

function formatMembers(n: number) {
  return `${n.toLocaleString("vi-VN")} Thành viên`;
}

export type ClubCardProps = {
  club: Club;
  onPress: (club: Club) => void;
  className?: string;
};

export function ClubCard({ club, onPress, className }: ClubCardProps) {
  return (
    <button
      type="button"
      className={cx(
        "flex w-full items-center gap-3 border-b border-[color-mix(in_srgb,var(--ds-color-text)_10%,transparent)] py-4 text-left last:border-b-0",
        className,
      )}
      onClick={() => onPress(club)}
      aria-label={club.name}
    >
      <div
        className={cx(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[14px] font-bold text-white",
          avatarColor(club.id),
        )}
        aria-hidden
      >
        {initials(club.name)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-bold text-near-black">{club.name}</div>
        <div className="mt-1 flex items-center gap-1.5 text-[12px] text-secondary-gray">
          <Users className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>{formatMembers(club.memberCount)}</span>
        </div>
        <div className="mt-0.5 flex items-center gap-1.5 text-[12px] text-secondary-gray">
          <BarChart3 className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>{club.levelRange}</span>
        </div>
      </div>

      <ChevronRight
        className="h-5 w-5 shrink-0 text-secondary-gray"
        aria-hidden
      />
    </button>
  );
}
