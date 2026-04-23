"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { Check } from "lucide-react";

export type DrawerOption = {
  value: string;
  label: string;
};

export type OptionDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  options: DrawerOption[];
  value: string;
  onChange: (value: string) => void;
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
          "fixed bottom-0 left-1/2 z-60 w-full -translate-x-1/2 rounded-t-[20px]",
          "border border-[color-mix(in_srgb,var(--ds-color-text)_10%,transparent)] bg-white",
          className,
        )}
        {...props}
      >
        <div
          className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-[#E5E5E5]"
          aria-hidden
        />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
}

export function OptionDrawer({
  open,
  onOpenChange,
  title,
  options,
  value,
  onChange,
}: OptionDrawerProps) {
  return (
    <DrawerPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      shouldScaleBackground={false}
    >
      <DrawerContent>
        <DrawerPrimitive.Title className="sr-only">
          {title}
        </DrawerPrimitive.Title>

        <div className="px-4 pt-4 pb-2">
          <div className="text-[16px] font-semibold text-near-black">
            {title}
          </div>
        </div>

        <div className="px-2 pb-[calc(16px+env(safe-area-inset-bottom))]">
          {options.map((opt) => {
            const selected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  onOpenChange(false);
                }}
                className={cx(
                  "flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-3 text-left",
                  "transition-colors duration-150 ease-(--ds-ease-standard)",
                  selected
                    ? "bg-[color-mix(in_srgb,var(--ds-color-accent)_8%,white)]"
                    : "hover:bg-[color-mix(in_srgb,var(--ds-color-text)_4%,transparent)]",
                )}
              >
                <span className="text-[14px] font-medium text-near-black">
                  {opt.label}
                </span>
                {selected ? (
                  <Check
                    className="h-5 w-5 text-(--ds-color-accent)"
                    aria-hidden="true"
                  />
                ) : (
                  <span className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      </DrawerContent>
    </DrawerPrimitive.Root>
  );
}

