"use client";

import * as React from "react";
import { FormField } from "@/shared/components/forms/FormField";
import { Input } from "@/shared/components/ui/Input";
import { SettingRow } from "@/shared/components/settings/SettingRow";

export type SettingsGroupProps = {
  privacy: string;
  onPrivacyClick: () => void;
  memberApproval: string;
  onMemberApprovalClick: () => void;
  hotline: string;
  onHotlineChange: (value: string) => void;
};

export function SettingsGroup({
  privacy,
  onPrivacyClick,
  memberApproval,
  onMemberApprovalClick,
  hotline,
  onHotlineChange,
}: SettingsGroupProps) {
  return (
    <div className="rounded-2xl border border-[color-mix(in_srgb,var(--ds-color-text)_10%,transparent)] bg-white px-4">
      <SettingRow label="Quyền riêng tư" value={privacy} onClick={onPrivacyClick} />
      <div className="h-px w-full bg-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]" />
      <SettingRow
        label="Duyệt thành viên"
        value={memberApproval}
        onClick={onMemberApprovalClick}
      />
      <div className="h-px w-full bg-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]" />
      <div className="py-3">
        <FormField label="Số điện thoại hotline (tùy chọn)">
          <Input
            value={hotline}
            onChange={(e) => onHotlineChange(e.target.value)}
            inputMode="tel"
            placeholder="Nhập số điện thoại"
          />
        </FormField>
      </div>
    </div>
  );
}

