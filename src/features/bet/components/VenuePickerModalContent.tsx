"use client";

import * as React from "react";
import {
  Circle,
  CircleDot,
  HelpCircle,
  MapPin,
  Plus,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

export interface Venue {
  id: number;
  name: string;
  address: string;
}

export interface VenuePickerModalContentProps {
  onClose: () => void;
  onSelectVenue: (venue: Venue | null) => void;
  initialVenueId?: number | null;
}

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

const VENUES: Venue[] = [
  { id: 1, name: "Sân TA Club", address: "123 Nguyễn Văn Linh, Q.7" },
  { id: 2, name: "Sân Phú Thọ", address: "1 Lý Gia, Q.11" },
  { id: 3, name: "Sân Tân Bình", address: "234 Hoàng Văn Thụ, Q.Tân Bình" },
  { id: 4, name: "Sân Bình Thạnh", address: "56 Đinh Tiên Hoàng, Q.Bình Thạnh" },
  { id: 5, name: "Sân Thủ Đức", address: "89 Võ Văn Ngân, TP.Thủ Đức" },
];

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

type VenueItemProps = {
  venue: Venue;
  selected: boolean;
  onSelect: () => void;
};

function VenueItem({ venue, selected, onSelect }: VenueItemProps) {
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
      aria-label={venue.name}
    >
      <div className="pt-0.5">
        <Radio checked={selected} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-[16px] font-semibold text-near-black">
          {venue.name}
        </div>
        <div className="mt-1 text-[13px] leading-[1.35] text-secondary-gray">
          {venue.address}
        </div>
      </div>
    </button>
  );
}

type ActionRowProps = {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  onClick: () => void;
};

function ActionRow({ icon: Icon, label, onClick }: ActionRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left",
        "bg-[#F9FAFB]",
        "transition-colors duration-150 ease-(--ds-ease-standard)",
        "hover:bg-[#F3F4F6] active:bg-[#EEF2F7]",
      )}
    >
      <Icon className="h-5 w-5 shrink-0 text-secondary-gray" aria-hidden />
      <span className="text-[14px] font-medium text-near-black">{label}</span>
    </button>
  );
}

function ActionButtonsGroup({
  onPickOnMap,
  onAddVenue,
  onDecideLater,
}: {
  onPickOnMap: () => void;
  onAddVenue: () => void;
  onDecideLater: () => void;
}) {
  return (
    <div className="px-4 pb-3">
      <div className="space-y-2">
        <ActionRow
          icon={MapPin}
          label="Chọn địa điểm trên bản đồ"
          onClick={onPickOnMap}
        />
        <ActionRow icon={Plus} label="Thêm vị trí" onClick={onAddVenue} />
        <ActionRow
          icon={HelpCircle}
          label="Quyết định sau"
          onClick={onDecideLater}
        />
      </div>
    </div>
  );
}

export function VenuePickerModalContent({
  onClose,
  onSelectVenue,
  initialVenueId = null,
}: VenuePickerModalContentProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [tempSelectedVenueId, setTempSelectedVenueId] = React.useState<
    number | null
  >(initialVenueId);

  const q = searchQuery.trim().toLowerCase();
  const filtered = React.useMemo(() => {
    if (!q) return VENUES;
    return VENUES.filter((v) => {
      return (
        v.name.toLowerCase().includes(q) || v.address.toLowerCase().includes(q)
      );
    });
  }, [q]);

  const selectedVenue = React.useMemo(() => {
    if (tempSelectedVenueId == null) return null;
    return VENUES.find((v) => v.id === tempSelectedVenueId) ?? null;
  }, [tempSelectedVenueId]);

  return (
    <div className="flex max-h-[80dvh] flex-col">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="text-[16px] font-semibold text-near-black">Chọn sân</div>
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 rounded-full p-0 text-secondary-gray"
          aria-label="Đóng chọn sân"
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
            placeholder="Tìm sân..."
            className="pl-9"
          />
        </div>
      </div>

      <ActionButtonsGroup
        onPickOnMap={() => console.log("Mở bản đồ chọn sân")}
        onAddVenue={() => console.log("Mở form thêm sân mới")}
        onDecideLater={() => {
          onSelectVenue(null);
          onClose();
        }}
      />

      <div className="mx-4 h-px bg-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]" />

      <div className="flex-1 overflow-y-auto">
        {filtered.length ? (
          <div className="divide-y divide-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]">
            {filtered.map((venue) => (
              <VenueItem
                key={venue.id}
                venue={venue}
                selected={venue.id === tempSelectedVenueId}
                onSelect={() => setTempSelectedVenueId(venue.id)}
              />
            ))}
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-[13px] text-secondary-gray">
            Không tìm thấy sân phù hợp.
          </div>
        )}
      </div>

      <div className="px-4 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))]">
        <Button
          className="h-12 w-full rounded-2xl"
          disabled={!selectedVenue}
          onClick={() => {
            if (!selectedVenue) return;
            onSelectVenue(selectedVenue);
            onClose();
          }}
        >
          Xác nhận
        </Button>
      </div>
    </div>
  );
}

