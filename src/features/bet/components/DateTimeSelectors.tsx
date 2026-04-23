"use client";

import * as React from "react";
import { Calendar, Clock, Timer } from "lucide-react";

type RowKey = "date" | "time" | "duration";

export type DateTimeSelectorsProps = {
  dateLabel: string;
  timeLabel: string;
  durationLabel: string;
  onPickDate: () => void;
  onPickTime: () => void;
  onPickDuration: () => void;
  onChange: (key: RowKey, value: string) => void;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

function SelectorRow({
  icon: Icon,
  label,
  value,
  onClick,
  className,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
  onClick: () => void;
  className?: string;
}) {
  const isPlaceholder = value === "Chọn ngày" || value === "Chọn giờ" || value === "Chọn thời lượng";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "flex w-full items-center justify-between gap-3 py-3",
        "transition-colors duration-150 ease-(--ds-ease-standard)",
        "hover:bg-[color-mix(in_srgb,var(--ds-color-text)_3%,transparent)] active:bg-[color-mix(in_srgb,var(--ds-color-text)_5%,transparent)]",
        className,
      )}
    >
      <span className="inline-flex items-center gap-3">
        <Icon className="h-5 w-5 text-secondary-gray" aria-hidden />
        <span
          className={cx(
            "text-[14px] font-medium",
            isPlaceholder ? "text-secondary-gray" : "text-near-black",
          )}
        >
          {value}
        </span>
      </span>
      <span className="text-[13px] font-medium text-secondary-gray">{label}</span>
    </button>
  );
}

export function DateTimeSelectors({
  dateLabel,
  timeLabel,
  durationLabel,
  onPickDate,
  onPickTime,
  onPickDuration,
  onChange,
}: DateTimeSelectorsProps) {
  return (
    <>
      <SelectorRow
        icon={Calendar}
        label="Chọn ngày"
        value={dateLabel}
        onClick={() => {
          console.log("Chọn:", "ngày");
          onPickDate();
        }}
      />
      <div className="h-px w-full bg-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]" />
      <SelectorRow
        icon={Clock}
        label="Chọn giờ"
        value={timeLabel}
        onClick={() => {
          console.log("Chọn:", "giờ");
          onPickTime();
        }}
      />
      <div className="h-px w-full bg-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]" />
      <SelectorRow
        icon={Timer}
        label="Chọn thời lượng"
        value={durationLabel}
        onClick={() => {
          console.log("Chọn:", "thời lượng");
          onPickDuration();
        }}
      />
    </>
  );
}

