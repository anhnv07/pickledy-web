"use client";

import * as React from "react";
import {
  BarChart3,
  Circle,
  CircleDot,
  Search,
  Users,
  X,
} from "lucide-react";
import type { Club } from "@/src/features/home/models/club";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

export interface ClubSelectionModalContentProps {
  onClose: () => void;
  onSelectClub: (club: Club | null) => void;
  initialSelectedClubId?: string | null;
}

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

const CLUBS: Club[] = [
  { id: "1", name: "TA Club", memberCount: 487, levelRange: "Tất cả trình độ" },
  {
    id: "2",
    name: "Passion Pickleball Club",
    memberCount: 1046,
    levelRange: "Tất cả trình độ",
  },
  {
    id: "3",
    name: "Dinkin'Park Pickleball",
    memberCount: 323,
    levelRange: "Tất cả trình độ",
  },
  {
    id: "4",
    name: "VietClub Social",
    memberCount: 2938,
    levelRange: "Tất cả trình độ",
  },
  {
    id: "5",
    name: "Elite Sport Pickleball",
    memberCount: 215,
    levelRange: "2.5 – 4.0",
  },
];

function formatMembers(n: number) {
  return `${n.toLocaleString("vi-VN")} Thành viên`;
}

type RadioProps = {
  checked: boolean;
};

function Radio({ checked }: RadioProps) {
  const Icon = checked ? CircleDot : Circle;
  return (
    <Icon
      className={cx(
        "h-5 w-5 shrink-0",
        checked ? "text-(--ds-color-accent)" : "text-secondary-gray",
      )}
      aria-hidden
    />
  );
}

type ClubItemProps = {
  club: Club;
  selected: boolean;
  onSelect: () => void;
};

function ClubItem({ club, selected, onSelect }: ClubItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cx(
        "flex w-full items-start gap-3 px-4 py-3 text-left",
        "transition-colors duration-150 ease-(--ds-ease-standard)",
        selected
          ? "bg-[color-mix(in_srgb,var(--ds-color-accent)_8%,white)]"
          : "hover:bg-[color-mix(in_srgb,var(--ds-color-text)_4%,transparent)]",
      )}
      aria-label={club.name}
    >
      <div className="pt-0.5">
        <Radio checked={selected} />
      </div>

      <div className="min-w-0">
        <div className="truncate text-[16px] font-semibold text-near-black">
          {club.name}
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-[13px] text-secondary-gray">
          <Users className="h-4 w-4 shrink-0" aria-hidden />
          <span>{formatMembers(club.memberCount)}</span>
        </div>
        <div className="mt-0.5 flex items-center gap-1.5 text-[13px] text-secondary-gray">
          <BarChart3 className="h-4 w-4 shrink-0" aria-hidden />
          <span>{club.levelRange}</span>
        </div>
      </div>
    </button>
  );
}

type NoClubOptionProps = {
  selected: boolean;
  onSelect: () => void;
};

function NoClubOption({ selected, onSelect }: NoClubOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cx(
        "flex w-full items-center gap-3 px-4 py-3 text-left",
        "transition-colors duration-150 ease-(--ds-ease-standard)",
        selected
          ? "bg-[color-mix(in_srgb,var(--ds-color-accent)_8%,white)]"
          : "hover:bg-[color-mix(in_srgb,var(--ds-color-text)_4%,transparent)]",
      )}
      aria-label="Không gắn với câu lạc bộ nào"
    >
      <Radio checked={selected} />
      <span className="text-[14px] font-medium text-near-black">
        Không gắn với câu lạc bộ nào
      </span>
    </button>
  );
}

export function ClubSelectionModalContent({
  onClose,
  onSelectClub,
  initialSelectedClubId = null,
}: ClubSelectionModalContentProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedClubId, setSelectedClubId] = React.useState<string | null>(
    initialSelectedClubId,
  );

  const q = searchQuery.trim().toLowerCase();
  const filtered = React.useMemo(() => {
    if (!q) return CLUBS;
    return CLUBS.filter((c) => c.name.toLowerCase().includes(q));
  }, [q]);

  const selectNone = () => {
    setSelectedClubId(null);
    onSelectClub(null);
    onClose();
  };

  const selectClub = (club: Club) => {
    setSelectedClubId(club.id);
    onSelectClub(club);
    onClose();
  };

  return (
    <div className="flex max-h-[80dvh] flex-col">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="text-[16px] font-semibold text-near-black">
          Chọn câu lạc bộ
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 rounded-full p-0 text-secondary-gray"
          aria-label="Đóng chọn câu lạc bộ"
          onClick={onClose}
        >
          <X className="h-5 w-5" aria-hidden />
        </Button>
      </div>

      <div className="px-4 pb-3">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-gray"
            aria-hidden
          />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm câu lạc bộ..."
            className="pl-9"
          />
        </div>
      </div>

      <NoClubOption selected={selectedClubId === null} onSelect={selectNone} />
      <div className="mx-4 h-px bg-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]" />

      <div className="flex-1 overflow-y-auto pb-[calc(12px+env(safe-area-inset-bottom))]">
        {filtered.length ? (
          <div className="divide-y divide-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]">
            {filtered.map((club) => (
              <ClubItem
                key={club.id}
                club={club}
                selected={club.id === selectedClubId}
                onSelect={() => selectClub(club)}
              />
            ))}
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-[13px] text-secondary-gray">
            Không tìm thấy câu lạc bộ phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}

