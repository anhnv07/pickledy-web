"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

export interface TimePickerModalContentProps {
  onClose: () => void;
  onSelectTime: (time: string) => void;
  initialTime?: string | null;
}

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatTime24h(hour: number, minute: number) {
  return `${pad2(hour)}:${pad2(minute)}`;
}

function isValidQuarterHourTime(value: string) {
  return /^([01]\d|2[0-3]):(00|15|30|45)$/.test(value);
}

function buildQuarterHourSlots() {
  const slots: string[] = [];
  for (let h = 0; h <= 23; h += 1) {
    for (const m of [0, 15, 30, 45] as const) {
      slots.push(formatTime24h(h, m));
    }
  }
  return slots;
}

function TimeChip({
  value,
  selected,
  onSelect,
}: {
  value: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cx(
        "rounded-2xl px-4 py-3 text-[14px] font-medium",
        "transition-[transform,background-color,color,box-shadow] duration-150 ease-(--ds-ease-standard)",
        "active:scale-(--ds-focus-scale)",
        selected
          ? "bg-(--ds-color-accent) text-white"
          : "bg-[color-mix(in_srgb,var(--ds-color-text)_4%,transparent)] text-near-black hover:bg-[color-mix(in_srgb,var(--ds-color-text)_7%,transparent)]",
      )}
      aria-pressed={selected}
    >
      {value}
    </button>
  );
}

export function TimePickerModalContent({
  onClose,
  onSelectTime,
  initialTime = null,
}: TimePickerModalContentProps) {
  const slots = React.useMemo(() => buildQuarterHourSlots(), []);

  const initial = React.useMemo(() => {
    if (initialTime && isValidQuarterHourTime(initialTime)) return initialTime;
    return null;
  }, [initialTime]);

  const [tempSelectedTime, setTempSelectedTime] = React.useState<string | null>(
    initial,
  );

  React.useEffect(() => {
    setTempSelectedTime(initial);
  }, [initial]);

  const canConfirm = Boolean(tempSelectedTime);

  return (
    <div className="flex max-h-[80dvh] flex-col">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="text-[16px] font-semibold text-near-black">Chọn giờ</div>
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 rounded-full p-0 text-secondary-gray"
          aria-label="Đóng chọn giờ"
          onClick={onClose}
        >
          <X className="h-5 w-5" aria-hidden />
        </Button>
      </div>

      <div className="px-4">
        <div className="max-h-[52dvh] overflow-y-auto pb-4">
          <div className="grid grid-cols-3 gap-2">
            {slots.map((t) => (
              <TimeChip
                key={t}
                value={t}
                selected={t === tempSelectedTime}
                onSelect={() => setTempSelectedTime(t)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto px-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
        <Button
          className="h-auto w-full rounded-2xl py-3.5 text-[16px] font-semibold"
          disabled={!canConfirm}
          onClick={() => {
            if (!tempSelectedTime) return;
            onSelectTime(tempSelectedTime);
            onClose();
          }}
        >
          Xác nhận
        </Button>
      </div>
    </div>
  );
}

