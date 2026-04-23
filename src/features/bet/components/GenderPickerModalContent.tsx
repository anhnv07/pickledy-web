"use client";

import * as React from "react";
import { Mars, Users, Venus } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

export type GenderValue = "all" | "male" | "female";

export interface GenderPickerModalContentProps {
  onClose: () => void;
  onSelectGender: (gender: GenderValue) => void;
  initialGender: GenderValue;
}

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

const genderOptions: Array<{
  id: GenderValue;
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}> = [
  { id: "all", label: "Không giới hạn", icon: Users },
  { id: "male", label: "Nam", icon: Mars },
  { id: "female", label: "Nữ", icon: Venus },
];

export function GenderPickerModalContent({
  onClose,
  onSelectGender,
  initialGender,
}: GenderPickerModalContentProps) {
  const [tempSelectedGender, setTempSelectedGender] =
    React.useState<GenderValue>(initialGender);

  React.useEffect(() => {
    setTempSelectedGender(initialGender);
  }, [initialGender]);

  return (
    <div className="px-4 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
      <div className="pb-3 text-center text-[20px] font-semibold text-near-black">
        Chọn giới tính
      </div>

      <div className="space-y-0" role="list" aria-label="Chọn giới tính">
        {genderOptions.map((opt) => {
          const Icon = opt.icon;
          const selected = tempSelectedGender === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setTempSelectedGender(opt.id)}
              className={cx(
                "flex w-full items-center gap-3 px-4 py-3 text-left",
                "transition-colors duration-150 ease-(--ds-ease-standard)",
                selected
                  ? "bg-[color-mix(in_srgb,var(--ds-color-accent)_8%,white)]"
                  : "hover:bg-[color-mix(in_srgb,var(--ds-color-text)_3%,transparent)] active:bg-[color-mix(in_srgb,var(--ds-color-text)_5%,transparent)]",
              )}
              aria-pressed={selected}
            >
              <Icon
                className={cx(
                  "h-6 w-6 shrink-0",
                  selected ? "text-(--ds-color-accent)" : "text-[#111827]",
                )}
                aria-hidden
              />
              <span
                className={cx(
                  "text-[16px] font-normal",
                  selected ? "text-(--ds-color-accent)" : "text-[#111827]",
                )}
              >
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        <Button
          className="w-full rounded-2xl py-3.5"
          onClick={() => {
            onSelectGender(tempSelectedGender);
            onClose();
          }}
        >
          Xác nhận
        </Button>
      </div>
    </div>
  );
}

