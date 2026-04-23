"use client";

import * as React from "react";
import { Circle, CircleDot, X } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

export interface DurationPickerModalContentProps {
  onClose: () => void;
  onSelectDuration: (durationMinutes: number) => void;
  initialDurationMinutes?: number | null;
  startTime?: string | null;
}

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

const DURATION_OPTIONS_MINUTES = [30, 60, 90, 120, 150, 180, 240, 300] as const;

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function parseTime24h(value: string) {
  const m = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value);
  if (!m) return null;
  return { hour: Number(m[1]), minute: Number(m[2]) };
}

function addMinutesToTimeLabel(startTime: string, minutesToAdd: number) {
  const parsed = parseTime24h(startTime);
  if (!parsed) return null;
  const total = parsed.hour * 60 + parsed.minute + minutesToAdd;
  const wrapped = ((total % 1440) + 1440) % 1440;
  const hh = Math.floor(wrapped / 60);
  const mm = wrapped % 60;
  return `${pad2(hh)}:${pad2(mm)}`;
}

function DurationRadio({ checked }: { checked: boolean }) {
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

type DurationItemProps = {
  minutes: number;
  endTimeLabel: string | null;
  selected: boolean;
  onSelect: () => void;
};

function DurationItem({ minutes, endTimeLabel, selected, onSelect }: DurationItemProps) {
  const secondaryText = endTimeLabel
    ? `Kết thúc lúc ${endTimeLabel}`
    : "Chọn giờ trước";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cx(
        "flex w-full items-start justify-between gap-3 px-4 py-3 text-left",
        "transition-colors duration-150 ease-(--ds-ease-standard)",
        selected
          ? "bg-[color-mix(in_srgb,var(--ds-color-accent)_8%,white)]"
          : "hover:bg-[color-mix(in_srgb,var(--ds-color-text)_4%,transparent)]",
      )}
      aria-pressed={selected}
    >
      <div className="min-w-0">
        <div className="text-[16px] font-medium text-near-black">{minutes} phút</div>
        <div className="mt-1 text-[13px] font-normal text-secondary-gray">
          {secondaryText}
        </div>
      </div>

      <div className="pt-0.5">
        <DurationRadio checked={selected} />
      </div>
    </button>
  );
}

export function DurationPickerModalContent({
  onClose,
  onSelectDuration,
  initialDurationMinutes = null,
  startTime = null,
}: DurationPickerModalContentProps) {
  const [tempSelectedDuration, setTempSelectedDuration] = React.useState<number | null>(
    initialDurationMinutes ?? null,
  );

  React.useEffect(() => {
    setTempSelectedDuration(initialDurationMinutes ?? null);
  }, [initialDurationMinutes]);

  const endTimeMap = React.useMemo(() => {
    const map = new Map<number, string | null>();
    for (const minutes of DURATION_OPTIONS_MINUTES) {
      map.set(
        minutes,
        startTime ? addMinutesToTimeLabel(startTime, minutes) : null,
      );
    }
    return map;
  }, [startTime]);

  return (
    <div className="flex max-h-[80dvh] flex-col">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="text-[16px] font-semibold text-near-black">Chọn thời lượng</div>
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 rounded-full p-0 text-secondary-gray"
          aria-label="Đóng chọn thời lượng"
          onClick={onClose}
        >
          <X className="h-5 w-5" aria-hidden />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto pb-[calc(12px+env(safe-area-inset-bottom))]">
        <div className="divide-y divide-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]">
          {DURATION_OPTIONS_MINUTES.map((minutes) => {
            const selected = minutes === tempSelectedDuration;
            return (
              <DurationItem
                key={minutes}
                minutes={minutes}
                endTimeLabel={endTimeMap.get(minutes) ?? null}
                selected={selected}
                onSelect={() => {
                  setTempSelectedDuration(minutes);
                  onSelectDuration(minutes);
                  onClose();
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

