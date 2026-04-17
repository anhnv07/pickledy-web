"use client";

import * as React from "react";
import { Camera, Plus } from "lucide-react";
import { AVATAR_MAX_BYTES } from "../constants/profileCreate";

export type AvatarUploadProps = {
  id: string;
  value: File | null;
  onChange: (file: File | null) => void;
  errorMessage?: string;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export function AvatarUpload({
  id,
  value,
  onChange,
  errorMessage,
}: AvatarUploadProps) {
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
    const okType =
      file.type === "image/jpeg" || file.type === "image/png";
    if (!okType) {
      e.target.value = "";
      onChange(null);
      return;
    }
    if (file.size > AVATAR_MAX_BYTES) {
      e.target.value = "";
      onChange(null);
      return;
    }
    onChange(file);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/jpeg,image/png"
        className="sr-only"
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={errorMessage ? `${id}-error` : undefined}
        onChange={onFile}
      />
      <button
        type="button"
        onClick={pick}
        className={cx(
          "relative flex h-[120px] w-[120px] shrink-0 items-center justify-center rounded-full",
          "border-2 border-[var(--ds-color-accent)] bg-[var(--ds-color-surface)]",
          "transition-[transform,box-shadow] duration-150 ease-[var(--ds-ease-standard)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-color-accent)] focus-visible:ring-offset-2",
        )}
        aria-label="Tải ảnh đại diện"
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <Camera
            className="h-10 w-10 text-[var(--ds-color-accent)]"
            aria-hidden
          />
        )}
        <span
          className={cx(
            "absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full",
            "bg-[var(--ds-color-accent)] text-white shadow-md",
          )}
          aria-hidden
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
        </span>
      </button>

      <p className="mt-3 text-[14px] font-medium text-near-black">
        Ảnh đại diện
      </p>
      <p className="mt-1 text-center text-[12px] text-secondary-gray">
        Ảnh JPG hoặc PNG - Tối đa 5MB
      </p>
      {errorMessage ? (
        <p id={`${id}-error`} className="mt-2 text-[13px] text-[var(--ds-color-danger)]" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
