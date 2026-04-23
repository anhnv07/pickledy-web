"use client";

import * as React from "react";
import { Activity, Compass, Plus, User, Users } from "lucide-react";
import { Drawer as DrawerPrimitive } from "vaul";
import { CreateModalContent } from "@/features/home/components/CreateModalContent";

export type MainTabKey = "discover" | "clubs" | "activity" | "profile";

export type BottomNavigationProps = {
  value: MainTabKey;
  onChange: (value: MainTabKey) => void;
  className?: string;
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
          "fixed bottom-0 left-1/2 z-60 w-full -translate-x-1/2 rounded-t-[20px] border border-[color-mix(in_srgb,var(--ds-color-text)_10%,transparent)] bg-white",
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

const tabs: Array<{
  key: MainTabKey;
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}> = [
    { key: "discover", label: "Khám phá", icon: Compass },
    { key: "clubs", label: "Câu lạc bộ", icon: Users },
    { key: "activity", label: "Hoạt động", icon: Activity },
    { key: "profile", label: "Hồ sơ", icon: User },
  ];

export function BottomNavigation({
  value,
  onChange,
  className,
}: BottomNavigationProps) {
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);

  const renderTabItem = (t: (typeof tabs)[number]) => {
    const active = t.key === value;
    const Icon = t.icon;
    return (
      <button
        key={t.key}
        type="button"
        className={cx(
          "flex flex-col items-center justify-center gap-1 rounded-xl py-2",
          "transition-colors duration-150 ease-(--ds-ease-standard)",
          active ? "text-(--ds-color-accent)" : "text-secondary-gray",
        )}
        onClick={() => onChange(t.key)}
        aria-current={active ? "page" : undefined}
      >
        <Icon className="h-5 w-5" aria-hidden />
        <span className="text-[10px] font-semibold">{t.label}</span>
      </button>
    );
  };

  return (
    <DrawerPrimitive.Root
      open={isCreateOpen}
      onOpenChange={setIsCreateOpen}
      shouldScaleBackground={false}
    >
      <nav
        className={cx(
          "sticky bottom-0 z-20",
          "border-t border-[color-mix(in_srgb,var(--ds-color-text)_12%,transparent)]",
          "bg-white/95 backdrop-blur",
          className,
        )}
        aria-label="Main navigation"
      >
        <div className="grid grid-cols-5 px-2 pt-2 pb-[calc(10px+env(safe-area-inset-bottom))]">
          {tabs.slice(0, 2).map(renderTabItem)}
          <div className="flex items-center justify-center">
            <DrawerPrimitive.Trigger asChild>
              <button
                type="button"
                aria-label="Tạo"
                className={cx(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                  "bg-(--ds-color-accent) text-white shadow-md",
                  "transition-opacity duration-150 ease-(--ds-ease-standard)",
                  "hover:opacity-95 active:opacity-90",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ds-color-accent)",
                  "-mt-2",
                )}
              >
                <Plus className="h-6 w-6" aria-hidden strokeWidth={2.5} />
              </button>
            </DrawerPrimitive.Trigger>
          </div>
          {tabs.slice(2).map(renderTabItem)}
        </div>
      </nav>

      <DrawerContent className="pb-[calc(16px+env(safe-area-inset-bottom))]">
        <DrawerPrimitive.Title className="sr-only">Tạo mới</DrawerPrimitive.Title>
        <CreateModalContent onClose={() => setIsCreateOpen(false)} />
      </DrawerContent>
    </DrawerPrimitive.Root>
  );
}
