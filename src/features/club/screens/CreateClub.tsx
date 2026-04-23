"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/shared/components/ui/Container";
import { FormField } from "@/shared/components/forms/FormField";
import { Input } from "@/shared/components/ui/Input";
import { TextArea } from "@/shared/components/ui/TextArea";
import { Button } from "@/shared/components/ui/Button";
import { LocationSelector } from "@/src/features/home/components/LocationSelector";
import { ScreenHeader } from "@/shared/components/screen/ScreenHeader";
import { SectionLabel } from "@/shared/components/typography/SectionLabel";
import { ClubAvatarUpload } from "@/src/features/club/components/ClubAvatarUpload";
import { DualLevelSelector } from "@/shared/components/selectors/DualLevelSelector";
import { SettingsGroup } from "@/src/features/club/components/SettingsGroup";
import { OptionDrawer } from "@/shared/components/overlays/OptionDrawer";
import { Drawer as DrawerPrimitive } from "vaul";
import {
  PrivacyPickerModalContent,
  type PrivacyValue,
} from "@/shared/components/selectors/PrivacyPickerModalContent";

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
          "fixed bottom-0 left-1/2 z-60 w-full -translate-x-1/2 overflow-hidden rounded-t-[20px]",
          "border border-[color-mix(in_srgb,var(--ds-color-text)_10%,transparent)] bg-white",
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

function toPrivacyValue(label: string): PrivacyValue {
  return label === "Riêng tư" ? "private" : "public";
}

function toPrivacyLabel(value: PrivacyValue): string {
  return value === "private" ? "Riêng tư" : "Công khai";
}

export interface CreateClubForm {
  avatar: File | null;
  location: string;
  clubName: string;
  description: string;
  minLevel: string;
  maxLevel: string;
  privacy: string;
  memberApproval: string;
  hotline: string;
}

type FormErrors = Partial<Record<"clubName" | "description", string>>;

const PRIVACY_OPTIONS = [
  { value: "Công khai", label: "Công khai" },
  { value: "Riêng tư", label: "Riêng tư" },
];

const APPROVAL_OPTIONS = [
  { value: "Tự động", label: "Tự động" },
  { value: "Duyệt thủ công", label: "Duyệt thủ công" },
];

const DEFAULT_FORM: CreateClubForm = {
  avatar: null,
  location: "Hồ Chí Minh",
  clubName: "",
  description: "",
  minLevel: "Không có",
  maxLevel: "Không có",
  privacy: "Công khai",
  memberApproval: "Tự động",
  hotline: "",
};

const LEVEL_OPTIONS = [
  { value: "2.0", label: "2.0" },
  { value: "2.25", label: "2.25" },
  { value: "2.5", label: "2.5" },
  { value: "2.75", label: "2.75" },
  { value: "3.0", label: "3.0" },
  { value: "3.25", label: "3.25" },
  { value: "3.5", label: "3.5" },
  { value: "3.75", label: "3.75" },
  { value: "4.0", label: "4.0" },
  { value: "4.25", label: "4.25" },
  { value: "4.5", label: "4.5" },
  { value: "4.75", label: "4.75" },
  { value: "5.0+", label: "5.0+" },
];

export default function CreateClubScreen() {
  const router = useRouter();
  const [formData, setFormData] = React.useState<CreateClubForm>(DEFAULT_FORM);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [drawer, setDrawer] = React.useState<"privacy" | "approval" | null>(
    null,
  );
  const initialPrivacy = toPrivacyValue(formData.privacy);

  const validate = () => {
    const next: FormErrors = {};
    if (!formData.clubName.trim()) next.clubName = "Vui lòng nhập tên câu lạc bộ.";
    if (!formData.description.trim())
      next.description = "Vui lòng nhập mô tả câu lạc bộ.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) {
      alert("Vui lòng kiểm tra lại thông tin.");
      return;
    }
    // eslint-disable-next-line no-console
    console.log(formData);
  };

  return (
    <div className="min-h-dvh bg-white">
      <ScreenHeader
        title="Tạo câu lạc bộ"
        onBack={() => {
          console.log("Quay lại trang trước");
          router.back();
        }}
      />

      <form
        className="pb-[calc(24px+env(safe-area-inset-bottom))]"
        onSubmit={onSubmit}
      >
        <Container className="pt-6">
          <SectionLabel>THÔNG TIN CƠ BẢN</SectionLabel>

          <div className="mt-4 rounded-2xl border border-[color-mix(in_srgb,var(--ds-color-text)_10%,transparent)] bg-white px-4 py-4">
            <ClubAvatarUpload
              id="club-avatar"
              value={formData.avatar}
              onChange={(file) =>
                setFormData((p) => ({
                  ...p,
                  avatar: file,
                }))
              }
            />
          </div>

          <div className="mt-4">
            <LocationSelector
              value={formData.location}
              onClick={() => console.log("Mở chọn địa điểm")}
              className="w-full justify-between rounded-2xl px-4 py-3"
            />
          </div>

          <div className="mt-6 space-y-5">
            <FormField label="TÊN CÂU LẠC BỘ" errorMessage={errors.clubName}>
              <Input
                value={formData.clubName}
                onChange={(e) => {
                  const v = e.target.value;
                  setFormData((p) => ({ ...p, clubName: v }));
                  if (errors.clubName) setErrors((p) => ({ ...p, clubName: undefined }));
                }}
                placeholder="Đặt tên cho câu lạc bộ của bạn"
                error={Boolean(errors.clubName)}
                autoComplete="off"
                enterKeyHint="done"
              />
            </FormField>

            <FormField label="MÔ TẢ" errorMessage={errors.description}>
              <TextArea
                value={formData.description}
                onChange={(e) => {
                  const v = e.target.value;
                  setFormData((p) => ({ ...p, description: v }));
                  if (errors.description)
                    setErrors((p) => ({ ...p, description: undefined }));
                }}
                placeholder="Viết gì đó về câu lạc bộ của bạn"
                error={Boolean(errors.description)}
              />
            </FormField>
          </div>

          <div className="mt-8">
            <SectionLabel>TRÌNH ĐỘ</SectionLabel>
            <div className="mt-3">
              <DualLevelSelector
                minValue={formData.minLevel}
                onMinChange={(v) => setFormData((p) => ({ ...p, minLevel: v }))}
                maxValue={formData.maxLevel}
                onMaxChange={(v) => setFormData((p) => ({ ...p, maxLevel: v }))}
                options={LEVEL_OPTIONS}
              />
            </div>
          </div>

          <div className="mt-8">
            <SectionLabel>CÀI ĐẶT</SectionLabel>
            <div className="mt-3">
              <SettingsGroup
                privacy={formData.privacy}
                onPrivacyClick={() => {
                  console.log("Mở chọn quyền riêng tư");
                  setDrawer("privacy");
                }}
                memberApproval={formData.memberApproval}
                onMemberApprovalClick={() => {
                  console.log("Mở chọn duyệt thành viên");
                  setDrawer("approval");
                }}
                hotline={formData.hotline}
                onHotlineChange={(v) => setFormData((p) => ({ ...p, hotline: v }))}
              />
            </div>
          </div>

          <div className="mt-10">
            <Button className="w-full rounded-2xl py-3.5" type="submit">
              Tạo câu lạc bộ
            </Button>
          </div>
        </Container>

        <DrawerPrimitive.Root
          open={drawer === "privacy"}
          onOpenChange={(v) => setDrawer(v ? "privacy" : null)}
          shouldScaleBackground={false}
        >
          <DrawerContent>
            <DrawerPrimitive.Title className="sr-only">
              Quyền riêng tư
            </DrawerPrimitive.Title>
            {drawer === "privacy" ? (
              <PrivacyPickerModalContent
                initialPrivacy={initialPrivacy}
                onClose={() => setDrawer(null)}
                onSelectPrivacy={(v) => {
                  setFormData((p) => ({ ...p, privacy: toPrivacyLabel(v) }));
                  setDrawer(null);
                }}
              />
            ) : null}
          </DrawerContent>
        </DrawerPrimitive.Root>

        <OptionDrawer
          open={drawer === "approval"}
          onOpenChange={(v) => setDrawer(v ? "approval" : null)}
          title="Duyệt thành viên"
          options={APPROVAL_OPTIONS}
          value={formData.memberApproval}
          onChange={(v) => setFormData((p) => ({ ...p, memberApproval: v }))}
        />
      </form>
    </div>
  );
}