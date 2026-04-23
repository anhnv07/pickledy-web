"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { type DrawerOption } from "@/shared/components/overlays/OptionDrawer";
import { BottomModal } from "@/shared/components/overlays/BottomModal";
import { SettingRow } from "@/shared/components/settings/SettingRow";
import { LevelPickerModalContent } from "@/shared/components/selectors/LevelPickerModalContent";

export type DualLevelSelectorProps = {
  minValue: string;
  maxValue: string;
  options: DrawerOption[];
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  minLabel?: string;
  maxLabel?: string;
  minTitle?: string;
  maxTitle?: string;
};

export function DualLevelSelector({
  minValue,
  maxValue,
  options,
  onMinChange,
  onMaxChange,
  minLabel = "Trình độ tối thiểu",
  maxLabel = "Trình độ tối đa",
  minTitle = "Trình độ tối thiểu",
  maxTitle = "Trình độ tối đa",
}: DualLevelSelectorProps) {
  const [open, setOpen] = React.useState<"min" | "max" | null>(null);

  const levelSet = React.useMemo(() => new Set(options.map((o) => o.value)), [options]);
  const minInitial = levelSet.has(minValue) ? minValue : null;
  const maxInitial = levelSet.has(maxValue) ? maxValue : null;

  const levelsOnlyDescription = "Chỉ người chơi đạt trình độ này mới có thể tham gia";

  return (
    <>
      <div className="rounded-2xl border border-[color-mix(in_srgb,var(--ds-color-text)_10%,transparent)] bg-white px-4">
        <SettingRow
          label={minLabel}
          value={minValue}
          onClick={() => {
            console.log(`Mở chọn: ${minLabel}`);
            setOpen("min");
          }}
        />
        <div className="h-px w-full bg-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]" />
        <SettingRow
          label={maxLabel}
          value={maxValue}
          onClick={() => {
            console.log(`Mở chọn: ${maxLabel}`);
            setOpen("max");
          }}
        />
      </div>

      <BottomModal open={open === "min"} onOpenChange={(v) => setOpen(v ? "min" : null)}>
        <DrawerPrimitive.Title className="sr-only">{minTitle}</DrawerPrimitive.Title>
        {open === "min" ? (
          <LevelPickerModalContent
            title={minTitle}
            description={levelsOnlyDescription}
            initialLevel={minInitial}
            onClose={() => setOpen(null)}
            onSelectLevel={(level) => onMinChange(level)}
          />
        ) : null}
      </BottomModal>

      <BottomModal open={open === "max"} onOpenChange={(v) => setOpen(v ? "max" : null)}>
        <DrawerPrimitive.Title className="sr-only">{maxTitle}</DrawerPrimitive.Title>
        {open === "max" ? (
          <LevelPickerModalContent
            title={maxTitle}
            description={levelsOnlyDescription}
            initialLevel={maxInitial}
            onClose={() => setOpen(null)}
            onSelectLevel={(level) => onMaxChange(level)}
          />
        ) : null}
      </BottomModal>
    </>
  );
}

