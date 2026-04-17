"use client";

import * as React from "react";
import type { Club } from "../models/club";
import { ClubCard } from "./ClubCard";

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export type ClubListProps = {
  clubs: Club[];
  onClubPress: (club: Club) => void;
  className?: string;
};

export function ClubList({ clubs, onClubPress, className }: ClubListProps) {
  if (clubs.length === 0) {
    return (
      <p className="py-6 text-center text-[14px] text-secondary-gray">
        Không tìm thấy câu lạc bộ.
      </p>
    );
  }

  return (
    <div className={cx("flex flex-col", className)} role="list">
      {clubs.map((c) => (
        <ClubCard key={c.id} club={c} onPress={onClubPress} />
      ))}
    </div>
  );
}
