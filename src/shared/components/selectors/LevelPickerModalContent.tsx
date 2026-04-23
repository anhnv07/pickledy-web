"use client";

import * as React from "react";
import { Button } from "@/shared/components/ui/Button";

export interface LevelPickerModalContentProps {
  onClose: () => void;
  onSelectLevel: (level: string) => void;
  initialLevel?: string | null;
  title: string; // "Trình độ tối thiểu" hoặc "Trình độ tối đa"
  description: string;
}

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

const LEVELS = [
  "2.0",
  "2.25",
  "2.5",
  "2.75",
  "3.0",
  "3.25",
  "3.5",
  "3.75",
  "4.0",
  "4.25",
  "4.5",
  "4.75",
  "5.0+",
] as const;

export function LevelPickerModalContent({
  onClose,
  onSelectLevel,
  initialLevel = null,
  title,
  description,
}: LevelPickerModalContentProps) {
  const [pendingLevel, setPendingLevel] = React.useState<string | null>(
    initialLevel,
  );

  React.useEffect(() => {
    setPendingLevel(initialLevel ?? null);
  }, [initialLevel]);

  return (
    <div className="px-4 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
      <div className="pb-3 text-center text-[20px] font-semibold text-near-black">
        {title}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {LEVELS.map((level) => {
          const selected = pendingLevel === level;
          const isFivePlus = level === "5.0+";

          return (
            <button
              key={level}
              type="button"
              onClick={() => setPendingLevel(level)}
              className={cx(
                "min-w-[72px] rounded-full border px-4 py-2 text-[14px]",
                "transition-colors duration-150 ease-(--ds-ease-standard)",
                selected
                  ? "border-(--ds-color-accent) bg-[color-mix(in_srgb,var(--ds-color-accent)_10%,white)] text-(--ds-color-accent) font-bold"
                  : "border-[color-mix(in_srgb,var(--ds-color-text)_14%,transparent)] bg-white text-near-black font-medium",
                isFivePlus && !selected ? "font-bold" : null,
              )}
            >
              {level}
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-[13px] text-secondary-gray">{description}</div>

      <div className="mt-5">
        <Button
          className="w-full rounded-2xl py-3.5"
          onClick={() => {
            if (pendingLevel) onSelectLevel(pendingLevel);
            onClose();
          }}
        >
          Xác nhận
        </Button>
      </div>
    </div>
  );
}

