"use client";

import * as React from "react";
import type { Match, MatchGroup } from "../models/match";
import { MatchCard } from "./MatchCard";
import { TimeHeader } from "./TimeHeader";

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export type MatchListProps = {
  groups: MatchGroup[];
  onMatchPress: (match: Match) => void;
  className?: string;
};

export function MatchList({ groups, onMatchPress, className }: MatchListProps) {
  const [openByTime, setOpenByTime] = React.useState<Record<string, boolean>>(
    () => Object.fromEntries(groups.map((g) => [g.time, true])),
  );

  React.useEffect(() => {
    setOpenByTime((prev) => {
      const next = { ...prev };
      for (const g of groups) {
        if (next[g.time] === undefined) next[g.time] = true;
      }
      return next;
    });
  }, [groups]);

  const toggle = (time: string) => {
    setOpenByTime((prev) => ({
      ...prev,
      [time]: !(prev[time] !== false),
    }));
  };

  return (
    <div className={cx("flex flex-col gap-5", className)}>
      {groups.map((g) => {
        const expanded = openByTime[g.time] !== false;
        return (
          <section key={g.time} className="flex flex-col gap-3">
            <TimeHeader
              timeLabel={g.time}
              countLabel={`${g.matches.length} kèo`}
              expanded={expanded}
              onToggle={() => toggle(g.time)}
            />
            {expanded ? (
              <div className="flex flex-col gap-3">
                {g.matches.map((m) => (
                  <MatchCard key={m.id} match={m} onPress={onMatchPress} />
                ))}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}

