"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export type BottomModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  contentClassName?: string;
  overlayClassName?: string;
  /**
   * `full`: full width (matches OptionDrawer)
   * `screen`: slightly inset with max width (matches CreateBetScreen)
   */
  widthVariant?: "full" | "screen";
};

function BottomModalOverlay({
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

function BottomModalContent({
  className,
  children,
  widthVariant = "full",
  overlayClassName,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
  widthVariant?: BottomModalProps["widthVariant"];
  overlayClassName?: string;
}) {
  return (
    <DrawerPrimitive.Portal>
      <BottomModalOverlay className={overlayClassName} />
      <DrawerPrimitive.Content
        className={cx(
          "fixed bottom-0 left-1/2 z-60 -translate-x-1/2 overflow-hidden rounded-t-[20px]",
          "border border-[color-mix(in_srgb,var(--ds-color-text)_10%,transparent)] bg-white",
          widthVariant === "screen" ? "w-[95%] max-w-[500px]" : "w-full",
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

export function BottomModal({
  open,
  onOpenChange,
  children,
  contentClassName,
  overlayClassName,
  widthVariant = "full",
}: BottomModalProps) {
  return (
    <DrawerPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      shouldScaleBackground={false}
    >
      <BottomModalContent
        className={contentClassName}
        overlayClassName={overlayClassName}
        widthVariant={widthVariant}
      >
        {children}
      </BottomModalContent>
    </DrawerPrimitive.Root>
  );
}

