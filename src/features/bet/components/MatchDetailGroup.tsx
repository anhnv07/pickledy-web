"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { SettingRow } from "@/shared/components/settings/SettingRow";
import {
  PrivacyPickerModalContent,
  type PrivacyValue,
} from "@/shared/components/selectors/PrivacyPickerModalContent";

export type MatchDetailGroupProps = {
  privacy: string;
  onPrivacyChange: (value: string) => void;

  feeLabel: string;
  onFeeClick: () => void;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      className={cx(
        "fixed inset-y-0 left-1/2 z-50 w-full -translate-x-1/2 bg-black/40",
        className,
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        className={cx(
          "fixed bottom-0 left-1/2 z-60 w-full -translate-x-1/2 overflow-hidden rounded-t-[20px]",
          "border border-[color-mix(in_srgb,var(--ds-color-text)_10%,transparent)] bg-white",
          className,
        )}
        {...props}
      >
        <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-[#E5E5E5]" aria-hidden />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
}

function toPrivacyValue(label: string): PrivacyValue {
  return label === "Riêng tư" ? "private" : "public";
}

function toPrivacyLabel(value: PrivacyValue): string {
  return value === "private" ? "Riêng tư" : "Công khai";
}

export function MatchDetailGroup({
  privacy,
  onPrivacyChange,
  feeLabel,
  onFeeClick,
}: MatchDetailGroupProps) {
  const [open, setOpen] = React.useState<"privacy" | null>(null);
  const initialPrivacy = toPrivacyValue(privacy);

  return (
    <>
      <div className="rounded-2xl border border-[color-mix(in_srgb,var(--ds-color-text)_10%,transparent)] bg-white px-4">
        <SettingRow
          label="Quyền riêng tư"
          value={privacy}
          onClick={() => {
            console.log("Chọn:", "privacy");
            setOpen("privacy");
          }}
        />
        <div className="h-px w-full bg-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]" />
        <SettingRow
          label="Phí"
          value={feeLabel}
          onClick={() => {
            console.log("Chọn:", "fee");
            onFeeClick();
          }}
        />
      </div>

      <DrawerPrimitive.Root
        open={open === "privacy"}
        onOpenChange={(v) => setOpen(v ? "privacy" : null)}
        shouldScaleBackground={false}
      >
        <DrawerContent>
          <DrawerPrimitive.Title className="sr-only">Quyền riêng tư</DrawerPrimitive.Title>
          {open === "privacy" ? (
            <PrivacyPickerModalContent
              initialPrivacy={initialPrivacy}
              onClose={() => setOpen(null)}
              onSelectPrivacy={(v) => {
                onPrivacyChange(toPrivacyLabel(v));
                setOpen(null);
              }}
            />
          ) : null}
        </DrawerContent>
      </DrawerPrimitive.Root>
    </>
  );
}

