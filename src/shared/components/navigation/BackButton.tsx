"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

export type BackButtonProps = {
  onClick?: () => void;
  "aria-label"?: string;
  className?: string;
};

export function BackButton({
  onClick,
  className,
  "aria-label": ariaLabel = "Quay lại",
}: BackButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={
        "h-10 w-10 rounded-full p-0 text-near-black hover:bg-[color-mix(in_srgb,var(--ds-color-text)_6%,transparent)] " +
        (className ?? "")
      }
      aria-label={ariaLabel}
      onClick={() => {
        if (onClick) return onClick();
        window.history.back();
      }}
    >
      <ArrowLeft className="h-5 w-5" aria-hidden="true" />
    </Button>
  );
}

