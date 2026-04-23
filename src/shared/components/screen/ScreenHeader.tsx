"use client";

import * as React from "react";
import { BackButton } from "@/shared/components/navigation/BackButton";
import { Container } from "@/shared/components/ui/Container";

export type ScreenHeaderProps = {
  title: string;
  onBack?: () => void;
};

export function ScreenHeader({ title, onBack }: ScreenHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white/95 backdrop-blur">
      <Container className="relative flex h-14 items-center">
        <div className="absolute left-4">
          <BackButton onClick={onBack} />
        </div>
        <div className="mx-auto text-[18px] font-semibold text-near-black">
          {title}
        </div>
      </Container>
      <div className="h-px w-full bg-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]" />
    </div>
  );
}

