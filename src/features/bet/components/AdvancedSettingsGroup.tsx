"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { OptionDrawer } from "@/shared/components/overlays/OptionDrawer";
import { SettingRow } from "@/shared/components/settings/SettingRow";
import { BottomModal } from "@/shared/components/overlays/BottomModal";
import { Drawer as DrawerPrimitive } from "vaul";
import {
  GenderPickerModalContent,
  type GenderValue,
} from "@/src/features/bet/components/GenderPickerModalContent";
import {
  RepeatPickerModalContent,
  type RepeatValue,
} from "@/src/features/bet/components/RepeatPickerModalContent";
import {
  AgePickerModalContent,
  type AgeValue,
} from "@/src/features/bet/components/AgePickerModalContent";

export type AdvancedSettingsValue = {
  gender: GenderValue;
  ageGroup: string;
  repeat: RepeatValue;
  blockLeave: string;
  autoApproval: boolean;
  allowBringFriend: boolean;
};

export type AdvancedSettingsGroupProps = {
  value: AdvancedSettingsValue;
  onChange: (value: AdvancedSettingsValue) => void;
  defaultOpen?: boolean;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

const GENDER_OPTIONS = [
  { value: "all", label: "Không giới hạn" },
  { value: "male", label: "Nam" },
  { value: "female", label: "Nữ" },
];

const AGE_LABEL_BY_ID: Record<AgeValue, string> = {
  all: "Không giới hạn",
  teen: "Thiếu niên",
  adult: "Người trưởng thành",
  senior: "Người cao tuổi",
};

const AGE_ID_BY_LABEL: Partial<Record<string, AgeValue>> = {
  "Không giới hạn": "all",
  "Thiếu niên": "teen",
  "Người trưởng thành": "adult",
  "Người cao tuổi": "senior",
  // Backwards-compat with existing stored labels
  "Trưởng thành": "adult",
  "Cao tuổi": "senior",
};

const REPEAT_LABELS: Record<RepeatValue, string> = {
  none: "Không lặp lại",
  daily: "Mỗi ngày",
  weekly: "Mỗi tuần",
  monthly: "Mỗi tháng",
};

const GENDER_LABELS: Record<GenderValue, string> = {
  all: "Không giới hạn",
  male: "Nam",
  female: "Nữ",
};

const BLOCK_LEAVE_OPTIONS = [
  { value: "Không có", label: "Không có" },
  { value: "Có", label: "Có" },
];

function ToggleRow({
  label,
  valueLabel,
  checked,
  onToggle,
}: {
  label: string;
  valueLabel: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex w-full items-center justify-between gap-3 py-3">
      <div>
        <div className="text-[14px] font-medium text-near-black">{label}</div>
        <div className="mt-0.5 text-[12px] text-secondary-gray">{valueLabel}</div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={cx(
          "relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-150 ease-(--ds-ease-standard)",
          checked
            ? "bg-(--ds-color-accent)"
            : "bg-[color-mix(in_srgb,var(--ds-color-text)_18%,transparent)]",
        )}
        aria-pressed={checked}
        aria-label={label}
      >
        <span
          className={cx(
            "absolute left-1 h-5 w-5 rounded-full bg-white shadow",
            "transition-transform duration-150 ease-(--ds-ease-standard)",
            checked ? "translate-x-5" : "translate-x-0",
          )}
        />
      </button>
    </div>
  );
}

export function AdvancedSettingsGroup({
  value,
  onChange,
  defaultOpen = false,
}: AdvancedSettingsGroupProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [drawer, setDrawer] = React.useState<
    "gender" | "age" | "repeat" | "blockLeave" | null
  >(null);

  const initialAge: AgeValue = AGE_ID_BY_LABEL[value.ageGroup] ?? "all";

  return (
    <>
      <button
        type="button"
        onClick={() => {
          console.log("Mở rộng/Thu gọn");
          setOpen((p) => !p);
        }}
        className={cx(
          "flex w-full items-center justify-between gap-3 py-3",
          "text-left",
        )}
        aria-expanded={open}
      >
        <div className="text-[14px] font-semibold text-near-black">
          Cài đặt nâng cao
        </div>
        <ChevronDown
          className={cx(
            "h-5 w-5 text-secondary-gray transition-transform duration-150 ease-(--ds-ease-standard)",
            open ? "rotate-180" : "rotate-0",
          )}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div className="pb-2">
          <SettingRow
            label="Giới tính"
            value={GENDER_LABELS[value.gender]}
            onClick={() => setDrawer("gender")}
          />
          <div className="h-px w-full bg-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]" />
          <SettingRow
            label="Độ tuổi"
            value={value.ageGroup}
            onClick={() => setDrawer("age")}
          />
          <div className="h-px w-full bg-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]" />
          <SettingRow
            label="Lặp lại"
            value={REPEAT_LABELS[value.repeat]}
            onClick={() => setDrawer("repeat")}
          />
          <div className="h-px w-full bg-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]" />
          <SettingRow
            label="Chặn rời kèo"
            value={value.blockLeave}
            onClick={() => setDrawer("blockLeave")}
          />
          <div className="h-px w-full bg-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]" />
          <ToggleRow
            label="Duyệt tự động"
            valueLabel="Cho phép người chơi đi thêm bạn"
            checked={value.autoApproval}
            onToggle={() => {
              const next = { ...value, autoApproval: !value.autoApproval };
              console.log("Chọn:", "autoApproval", next.autoApproval);
              onChange(next);
            }}
          />
          <div className="h-px w-full bg-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]" />
          <ToggleRow
            label="Cho phép người chơi đi thêm bạn"
            valueLabel={value.allowBringFriend ? "Bật" : "Tắt"}
            checked={value.allowBringFriend}
            onToggle={() => {
              const next = { ...value, allowBringFriend: !value.allowBringFriend };
              console.log("Chọn:", "allowBringFriend", next.allowBringFriend);
              onChange(next);
            }}
          />
        </div>
      ) : null}

      <BottomModal
        open={drawer === "gender"}
        onOpenChange={(v) => setDrawer(v ? "gender" : null)}
      >
        <DrawerPrimitive.Title className="sr-only">
          Chọn giới tính
        </DrawerPrimitive.Title>
        {drawer === "gender" ? (
          <GenderPickerModalContent
            initialGender={value.gender}
            onClose={() => setDrawer(null)}
            onSelectGender={(gender) => onChange({ ...value, gender })}
          />
        ) : null}
      </BottomModal>

      <BottomModal open={drawer === "age"} onOpenChange={(v) => setDrawer(v ? "age" : null)}>
        <DrawerPrimitive.Title className="sr-only">Chọn độ tuổi</DrawerPrimitive.Title>
        {drawer === "age" ? (
          <AgePickerModalContent
            initialAge={initialAge}
            onClose={() => setDrawer(null)}
            onSelectAge={(age) => onChange({ ...value, ageGroup: AGE_LABEL_BY_ID[age] })}
          />
        ) : null}
      </BottomModal>

      <BottomModal
        open={drawer === "repeat"}
        onOpenChange={(v) => setDrawer(v ? "repeat" : null)}
      >
        <DrawerPrimitive.Title className="sr-only">Chọn lặp lại</DrawerPrimitive.Title>
        {drawer === "repeat" ? (
          <RepeatPickerModalContent
            initialRepeat={value.repeat}
            onClose={() => setDrawer(null)}
            onSelectRepeat={(repeat) => onChange({ ...value, repeat })}
          />
        ) : null}
      </BottomModal>

      <OptionDrawer
        open={drawer === "blockLeave"}
        onOpenChange={(v) => setDrawer(v ? "blockLeave" : null)}
        title="Chặn rời kèo"
        options={BLOCK_LEAVE_OPTIONS}
        value={value.blockLeave}
        onChange={(v) => onChange({ ...value, blockLeave: v })}
      />
    </>
  );
}

