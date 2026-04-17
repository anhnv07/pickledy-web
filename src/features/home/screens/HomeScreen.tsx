"use client";

import * as React from "react";
import { Container } from "@/shared/components/ui/Container";
import { AppHeader } from "../components/AppHeader";
import { BottomNavigation, type MainTabKey } from "../components/BottomNavigation";
import { LocationSelector } from "../components/LocationSelector";
import { ClubList } from "../components/ClubList";
import { MatchList } from "../components/MatchList";
import { SearchBar } from "../components/SearchBar";
import { SectionHeader } from "../components/SectionHeader";
import { TopSubTabs, type TopSubTabKey } from "../components/TopSubTabs";
import { WeekdayFilter } from "../components/WeekdayFilter";
import type { Club } from "../models/club";
import type { MatchGroup, WeekdayKey } from "../models/match";
import { mockClubs } from "../mocks/mockClubs";
import { mockMatchGroups, weekdayOptions } from "../mocks/mockMatches";

function filterGroups(groups: MatchGroup[], query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return groups;

  return groups
    .map((g) => ({
      ...g,
      matches: g.matches.filter((m) => {
        const hay = `${m.clubName} ${m.venue}`.toLowerCase();
        return hay.includes(q);
      }),
    }))
    .filter((g) => g.matches.length > 0);
}

function filterClubs(clubs: Club[], query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return clubs;
  return clubs.filter((c) => c.name.toLowerCase().includes(q));
}

export default function HomeScreen() {
  const [activeMainTab, setActiveMainTab] =
    React.useState<MainTabKey>("discover");
  const [activeTopSubTab, setActiveTopSubTab] =
    React.useState<TopSubTabKey>("matches");
  const [selectedWeekday, setSelectedWeekday] =
    React.useState<WeekdayKey>("T4 8");
  const [searchMatches, setSearchMatches] = React.useState("");
  const [searchClubs, setSearchClubs] = React.useState("");

  const groups = React.useMemo(
    () => filterGroups(mockMatchGroups, searchMatches),
    [searchMatches],
  );

  const filteredClubs = React.useMemo(
    () => filterClubs(mockClubs, searchClubs),
    [searchClubs],
  );

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <div className="flex-1 overflow-y-auto">
        <Container className="pt-[calc(12px+env(safe-area-inset-top))] pb-6">
          <div className="flex flex-col gap-4">
            <AppHeader title="PickleDy" />

            <div className="flex items-center justify-between gap-3">
              <SectionHeader label="Khám phá" />
              <LocationSelector
                value="Hồ Chí Minh"
                onClick={() => console.log("location: Hồ Chí Minh")}
              />
            </div>

            <div className="border-b border-[color-mix(in_srgb,var(--ds-color-text)_10%,transparent)]">
              <TopSubTabs
                value={activeTopSubTab}
                onChange={(v) => {
                  setActiveTopSubTab(v);
                  console.log("topSubTab", v);
                }}
              />
            </div>

            {activeTopSubTab === "matches" ? (
              <>
                <WeekdayFilter
                  value={selectedWeekday}
                  options={weekdayOptions}
                  onChange={(k) => {
                    setSelectedWeekday(k);
                    console.log("selectedWeekday", k);
                  }}
                />

                <SearchBar
                  value={searchMatches}
                  onChange={setSearchMatches}
                  placeholder="Tìm kèo..."
                />

                <MatchList
                  groups={groups}
                  onMatchPress={(match) => console.log("matchPress", match)}
                />
              </>
            ) : (
              <>
                <SearchBar
                  value={searchClubs}
                  onChange={setSearchClubs}
                  placeholder="Tìm câu lạc bộ..."
                />

                <ClubList
                  clubs={filteredClubs}
                  onClubPress={(club) => console.log("clubPress", club)}
                />
              </>
            )}

            <div className="h-[88px]" aria-hidden="true" />
          </div>
        </Container>
      </div>

      <BottomNavigation
        value={activeMainTab}
        onChange={(t) => {
          setActiveMainTab(t);
          console.log("mainTab", t);
        }}
      />
    </div>
  );
}
