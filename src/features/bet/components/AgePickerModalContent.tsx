"use client";

import * as React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Button } from "@/shared/components/ui/Button";

export type AgeValue = "all" | "teen" | "adult" | "senior";

export interface AgePickerModalContentProps {
  onClose: () => void;
  onSelectAge: (age: AgeValue) => void;
  initialAge: AgeValue;
}

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

const ageOptions: Array<{
  id: AgeValue;
  title: string;
  description: string | null;
}> = [
  { id: "all", title: "Không giới hạn", description: null },
  { id: "teen", title: "Thiếu niên", description: "Dưới 18 tuổi" },
  { id: "adult", title: "Người trưởng thành", description: "18 - 55 tuổi" },
  { id: "senior", title: "Người cao tuổi", description: "Trên 55 tuổi" },
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

export function AgePickerModalContent({
  onClose,
  onSelectAge,
  initialAge,
}: AgePickerModalContentProps) {
  const [tempSelectedAge, setTempSelectedAge] =
    React.useState<AgeValue>(initialAge);

  React.useEffect(() => {
    setTempSelectedAge(initialAge);
  }, [initialAge]);

  return (
    <div className="px-4 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
      <div className="pb-3 text-center text-[20px] font-semibold text-near-black">
        Chọn độ tuổi
      </div>

      <RadioGroup.Root
        value={tempSelectedAge}
        onValueChange={(v) => setTempSelectedAge(v as AgeValue)}
        className="space-y-2"
        aria-label="Chọn độ tuổi"
      >
        {ageOptions.map((opt) => {
          const checked = tempSelectedAge === opt.id;

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
            onSelectAge(tempSelectedAge);
            onClose();
          }}
        >
          Xác nhận
        </Button>
      </div>
    </div>
  );
}

