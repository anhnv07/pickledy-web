"use client";

import * as React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Globe, Lock } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

export type PrivacyValue = "public" | "private";

export interface PrivacyPickerModalContentProps {
  onClose: () => void;
  onSelectPrivacy: (privacy: PrivacyValue) => void;
  initialPrivacy: PrivacyValue;
}

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

const privacyOptions: Array<{
  id: PrivacyValue;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  description: string;
}> = [
  {
    id: "public",
    icon: Globe,
    title: "Công khai",
    description: "Ai cũng có thể tìm và tham gia",
  },
  {
    id: "private",
    icon: Lock,
    title: "Riêng tư",
    description: "Chỉ người có link invite mới vào được",
  },
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

export function PrivacyPickerModalContent({
  onClose,
  onSelectPrivacy,
  initialPrivacy,
}: PrivacyPickerModalContentProps) {
  const [tempPrivacy, setTempPrivacy] = React.useState<PrivacyValue>(initialPrivacy);

  React.useEffect(() => {
    setTempPrivacy(initialPrivacy);
  }, [initialPrivacy]);

  return (
    <div className="px-4 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
      <div className="pb-3 text-center text-[20px] font-semibold text-near-black">
        Quyền riêng tư
      </div>

      <RadioGroup.Root
        value={tempPrivacy}
        onValueChange={(v) => setTempPrivacy(v as PrivacyValue)}
        className="space-y-0"
        aria-label="Quyền riêng tư"
      >
        {privacyOptions.map((opt, idx) => {
          const Icon = opt.icon;
          const checked = tempPrivacy === opt.id;

          return (
            <label
              key={opt.id}
              className={cx(
                "flex w-full cursor-pointer items-center justify-between gap-3",
                "px-4 py-3",
                "transition-colors duration-150 ease-(--ds-ease-standard)",
                "hover:bg-[color-mix(in_srgb,var(--ds-color-text)_3%,transparent)] active:bg-[color-mix(in_srgb,var(--ds-color-text)_5%,transparent)]",
                idx === 0
                  ? "rounded-t-2xl"
                  : idx === privacyOptions.length - 1
                    ? "rounded-b-2xl"
                    : null,
              )}
            >
              <span className="inline-flex min-w-0 items-center gap-3">
                <Icon className="h-5 w-5 text-near-black" aria-hidden />
                <span className="min-w-0">
                  <div className="text-[16px] font-semibold text-[#111827]">
                    {opt.title}
                  </div>
                  <div className="mt-1 text-[13px] text-[#6B7280]">
                    {opt.description}
                  </div>
                </span>
              </span>

              <RadioGroup.Item value={opt.id} className="shrink-0">
                <RadioCircle checked={checked} />
              </RadioGroup.Item>
            </label>
          );
        })}
      </RadioGroup.Root>

      <div className="mt-5">
        <Button
          className="w-full rounded-2xl py-3.5"
          onClick={() => {
            onSelectPrivacy(tempPrivacy);
            onClose();
          }}
        >
          Xác nhận
        </Button>
      </div>
    </div>
  );
}

