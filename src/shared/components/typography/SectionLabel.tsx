"use client";

import * as React from "react";

export type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div
      className={cx(
        "text-[11px] font-semibold uppercase tracking-wide text-secondary-gray",
        className,
      )}
    >
      {children}
    </div>
  );
}

