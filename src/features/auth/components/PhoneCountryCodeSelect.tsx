"use client";

import * as React from "react";

export type PhoneCountryCodeOption = {
  iso2: "VN";
  label: string;
  callingCode: "+84";
  flag: string;
};

const VN_ONLY: PhoneCountryCodeOption = {
  iso2: "VN",
  label: "Việt Nam",
  callingCode: "+84",
  flag: "🇻🇳",
};

export type PhoneCountryCodeSelectProps = {
  value?: PhoneCountryCodeOption;
  onChange?: (value: PhoneCountryCodeOption) => void;
  className?: string;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export function PhoneCountryCodeSelect({
  value = VN_ONLY,
  onChange,
  className,
}: PhoneCountryCodeSelectProps) {
  return (
    <button
      type="button"
      className={cx(
        "h-10 shrink-0 rounded-lg bg-white px-3",
        "border border-[color-mix(in_srgb,var(--ds-color-text)_18%,transparent)]",
        "text-[14px] font-medium text-near-black",
        "inline-flex items-center gap-2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ds-color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--ds-color-bg)",
        className,
      )}
      aria-label={`Mã vùng: ${value.label} (${value.callingCode})`}
      onClick={() => onChange?.(VN_ONLY)}
    >
      <span className="text-[16px]" aria-hidden="true">
        {value.flag}
      </span>
      <span>{value.callingCode}</span>
    </button>
  );
}

