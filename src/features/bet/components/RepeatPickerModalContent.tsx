"use client";

import * as React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Button } from "@/shared/components/ui/Button";

export type RepeatValue = "none" | "daily" | "weekly" | "monthly";

export interface RepeatPickerModalContentProps {
  onClose: () => void;
  onSelectRepeat: (repeat: RepeatValue) => void;
  initialRepeat: RepeatValue;
}

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

const repeatOptions: Array<{
  id: RepeatValue;
  title: string;
  description: string | null;
}> = [
  { id: "none", title: "Không lặp lại", description: null },
  { id: "daily", title: "Mỗi ngày", description: "Tạo lại kèo mỗi ngày" },
  { id: "weekly", title: "Mỗi tuần", description: "Tạo lại kèo mỗi tuần" },
  { id: "monthly", title: "Mỗi tháng", description: "Tạo lại kèo mỗi tháng" },
];

function RadioCircle({ checked }: { checked: boolean }) {
  return (
    <span
      className={cx(
        "inline-flex h-5 w-5 items-center justify-center rounded-full border",
        checked
          ? "border-(--ds-color-accent)"
          : "border-[color-mix(in_srgb,var(--ds-color-text)_18%,transparent)]",
      )}
      aria-hidden="true"
    >
      {checked ? (
        <span className="h-2.5 w-2.5 rounded-full bg-(--ds-color-accent)" />
      ) : null}
    </span>
  );
}

export function RepeatPickerModalContent({
  onClose,
  onSelectRepeat,
  initialRepeat,
}: RepeatPickerModalContentProps) {
  const [tempSelectedRepeat, setTempSelectedRepeat] =
    React.useState<RepeatValue>(initialRepeat);

  React.useEffect(() => {
    setTempSelectedRepeat(initialRepeat);
  }, [initialRepeat]);

  return (
    <div className="px-4 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
      <div className="pb-3 text-center text-[20px] font-semibold text-near-black">
        Chọn lặp lại
      </div>

      <RadioGroup.Root
        value={tempSelectedRepeat}
        onValueChange={(v) => setTempSelectedRepeat(v as RepeatValue)}
        className="space-y-2"
        aria-label="Chọn lặp lại"
      >
        {repeatOptions.map((opt) => {
          const checked = tempSelectedRepeat === opt.id;

          return (
            <label
              key={opt.id}
              className={cx(
                "flex w-full cursor-pointer items-start gap-3",
                "px-4 py-3",
                "transition-colors duration-150 ease-(--ds-ease-standard)",
                "hover:bg-[color-mix(in_srgb,var(--ds-color-text)_3%,transparent)] active:bg-[color-mix(in_srgb,var(--ds-color-text)_5%,transparent)]",
                "rounded-2xl",
              )}
            >
              <RadioGroup.Item value={opt.id} className="mt-0.5 shrink-0">
                <RadioCircle checked={checked} />
              </RadioGroup.Item>

              <span className="min-w-0">
                <div className="text-[16px] font-semibold text-[#111827]">
                  {opt.title}
                </div>
                {opt.description ? (
                  <div className="mt-1 text-[13px] font-normal text-[#6B7280]">
                    {opt.description}
                  </div>
                ) : null}
              </span>
            </label>
          );
        })}
      </RadioGroup.Root>

      <div className="mt-5">
        <Button
          className="w-full rounded-2xl py-3.5"
          onClick={() => {
            onSelectRepeat(tempSelectedRepeat);
            onClose();
          }}
        >
          Xác nhận
        </Button>
      </div>
    </div>
  );
}

