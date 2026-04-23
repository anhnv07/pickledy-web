"use client";

import * as React from "react";
import { Upload } from "lucide-react";

const MAX_BYTES = 5 * 1024 * 1024;

export type ClubAvatarUploadProps = {
  id: string;
  value: File | null;
  onChange: (file: File | null) => void;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export function ClubAvatarUpload({ id, value, onChange }: ClubAvatarUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const pick = () => inputRef.current?.click();

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      onChange(null);
      return;
    }

    const okType = file.type === "image/jpeg" || file.type === "image/png";
    if (!okType || file.size > MAX_BYTES) {
      e.target.value = "";
      onChange(null);
      return;
    }

    console.log(file.name);
    onChange(file);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <div className="text-[14px] font-semibold text-near-black">
          Ảnh đại diện CLB
        </div>
        <div className="mt-1 text-[12px] text-secondary-gray">
          Nhấn để tải lên (JPG/PNG, tối đa 5MB)
        </div>
      </div>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/jpeg,image/png"
        className="sr-only"
        onChange={onFile}
      />

      <button
        type="button"
        onClick={pick}
        className={cx(
          "relative flex h-[88px] w-[88px] shrink-0 items-center justify-center overflow-hidden rounded-full",
          "border border-[color-mix(in_srgb,var(--ds-color-text)_14%,transparent)] bg-white shadow-[var(--ds-shadow-card)]",
          "transition-[transform,box-shadow] duration-150 ease-[var(--ds-ease-standard)]",
          "hover:shadow-[var(--ds-shadow-hover)] active:scale-[0.99]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-color-accent)] focus-visible:ring-offset-2",
        )}
        aria-label="Tải ảnh đại diện CLB"
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1">
            <Upload
              className="h-6 w-6 text-(--ds-color-accent)"
              aria-hidden="true"
            />
            <span className="text-[11px] font-semibold text-secondary-gray">
              Tải lên
            </span>
          </div>
        )}
      </button>
    </div>
  );
}

