"use client";

import * as React from "react";
import {
  addDays,
  addMonths,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

export interface DatePickerModalContentProps {
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  initialDate?: Date | null;
}

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"] as const;

function monthLabel(d: Date) {
  const m = d.getMonth() + 1;
  const y = d.getFullYear();
  return `Tháng ${m}, ${y}`;
}

function buildCalendarDays(currentMonth: Date) {
  const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}

function DayCell({
  day,
  inMonth,
  selected,
  today,
  onPick,
}: {
  day: Date;
  inMonth: boolean;
  selected: boolean;
  today: boolean;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPick}
      className={cx(
        "h-11 w-11 rounded-full text-[14px] font-medium",
        "transition-[transform,background-color,color,box-shadow] duration-150 ease-(--ds-ease-standard)",
        "active:scale-(--ds-focus-scale)",
        selected
          ? "bg-(--ds-color-accent) text-white"
          : "bg-transparent text-near-black hover:bg-[color-mix(in_srgb,var(--ds-color-text)_4%,transparent)]",
        !inMonth ? "opacity-35" : null,
        today && !selected
          ? "ring-1 ring-[color-mix(in_srgb,var(--ds-color-text)_22%,transparent)]"
          : null,
      )}
      aria-label={format(day, "dd/MM/yyyy")}
      aria-pressed={selected}
    >
      {day.getDate()}
    </button>
  );
}

export function DatePickerModalContent({
  onClose,
  onSelectDate,
  initialDate = null,
}: DatePickerModalContentProps) {
  const initialMonth = React.useMemo(
    () => startOfMonth(initialDate ?? new Date()),
    [initialDate],
  );

  const [currentMonth, setCurrentMonth] = React.useState<Date>(initialMonth);
  const [tempSelectedDate, setTempSelectedDate] = React.useState<Date | null>(
    initialDate,
  );

  const days = React.useMemo(() => buildCalendarDays(currentMonth), [currentMonth]);

  const goPrevMonth = () => {
    setCurrentMonth((p) => startOfMonth(addMonths(p, -1)));
    setTempSelectedDate(null);
  };

  const goNextMonth = () => {
    setCurrentMonth((p) => startOfMonth(addMonths(p, 1)));
    setTempSelectedDate(null);
  };

  const pickDay = (day: Date) => {
    if (!isSameMonth(day, currentMonth)) {
      setCurrentMonth(startOfMonth(day));
    }
    setTempSelectedDate(day);
  };

  const canConfirm = Boolean(tempSelectedDate);

  return (
    <div className="flex max-h-[80dvh] flex-col">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="text-[16px] font-semibold text-near-black">Chọn ngày</div>
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 rounded-full p-0 text-secondary-gray"
          aria-label="Đóng chọn ngày"
          onClick={onClose}
        >
          <X className="h-5 w-5" aria-hidden />
        </Button>
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between py-2">
          <button
            type="button"
            onClick={goPrevMonth}
            className={cx(
              "inline-flex h-10 w-10 items-center justify-center rounded-full",
              "text-secondary-gray hover:bg-[color-mix(in_srgb,var(--ds-color-text)_6%,transparent)]",
              "active:scale-(--ds-focus-scale)",
            )}
            aria-label="Tháng trước"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <div className="text-[18px] font-medium text-near-black">
            {monthLabel(currentMonth)}
          </div>

          <button
            type="button"
            onClick={goNextMonth}
            className={cx(
              "inline-flex h-10 w-10 items-center justify-center rounded-full",
              "text-secondary-gray hover:bg-[color-mix(in_srgb,var(--ds-color-text)_6%,transparent)]",
              "active:scale-(--ds-focus-scale)",
            )}
            aria-label="Tháng sau"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="mt-2 grid grid-cols-7">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className="py-3 text-center text-[14px] font-medium text-secondary-gray"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1 pb-4">
          {days.map((day) => {
            const inMonth = isSameMonth(day, currentMonth);
            const selected =
              tempSelectedDate != null && isSameDay(day, tempSelectedDate);
            const today = isToday(day);
            return (
              <div key={day.toISOString()} className="flex justify-center">
                <DayCell
                  day={day}
                  inMonth={inMonth}
                  selected={selected}
                  today={today}
                  onPick={() => pickDay(day)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-auto px-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
        <Button
          className="h-auto w-full rounded-2xl py-3.5 text-[16px] font-semibold"
          disabled={!canConfirm}
          onClick={() => {
            if (!tempSelectedDate) return;
            onSelectDate(tempSelectedDate);
            onClose();
          }}
        >
          Xác nhận
        </Button>
      </div>
    </div>
  );
}

