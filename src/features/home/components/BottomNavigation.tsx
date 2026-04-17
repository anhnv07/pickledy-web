"use client";

import * as React from "react";
import { Activity, Compass, User, Users } from "lucide-react";

export type MainTabKey = "discover" | "clubs" | "activity" | "profile";

export type BottomNavigationProps = {
  value: MainTabKey;
  onChange: (value: MainTabKey) => void;
  className?: string;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
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
  return (
    <nav
      className={cx(
        "sticky bottom-0 z-20",
        "border-t border-[color-mix(in_srgb,var(--ds-color-text)_12%,transparent)]",
        "bg-white/95 backdrop-blur",
        className,
      )}
      aria-label="Main navigation"
    >
      <div className="grid grid-cols-4 px-2 pt-2 pb-[calc(10px+env(safe-area-inset-bottom))]">
        {tabs.map((t) => {
          const active = t.key === value;
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              type="button"
              className={cx(
                "flex flex-col items-center justify-center gap-1 rounded-xl py-2",
                "transition-colors duration-150 ease-(--ds-ease-standard)",
                active
                  ? "text-(--ds-color-accent)"
                  : "text-secondary-gray",
              )}
              onClick={() => onChange(t.key)}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-5 w-5" aria-hidden />
              <span className="text-[10px] font-semibold">{t.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

