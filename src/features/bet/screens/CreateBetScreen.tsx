"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Container } from "@/shared/components/ui/Container";
import { Button } from "@/shared/components/ui/Button";
import { FormField } from "@/shared/components/forms/FormField";
import { Input } from "@/shared/components/ui/Input";
import { TextArea } from "@/shared/components/ui/TextArea";
import { ScreenHeader } from "@/shared/components/screen/ScreenHeader";
import { SectionLabel } from "@/shared/components/typography/SectionLabel";
import { LocationSelector } from "@/src/features/home/components/LocationSelector";
import { DualLevelSelector } from "@/shared/components/selectors/DualLevelSelector";
import { Drawer as DrawerPrimitive } from "vaul";
import type { Club } from "@/src/features/home/models/club";
import { PlayerCountStepper } from "@/src/features/bet/components/PlayerCountStepper";
import { MatchTypeSelector, type MatchType } from "@/src/features/bet/components/MatchTypeSelector";
import {
  ClubSelector,
  type ClubSelectorValue,
} from "@/src/features/bet/components/ClubSelector";
import { DateTimeSelectors } from "@/src/features/bet/components/DateTimeSelectors";
import { MatchDetailGroup } from "@/src/features/bet/components/MatchDetailGroup";
import {
  AdvancedSettingsGroup,
  type AdvancedSettingsValue,
} from "@/src/features/bet/components/AdvancedSettingsGroup";
import type { GenderValue } from "@/src/features/bet/components/GenderPickerModalContent";
import type { RepeatValue } from "@/src/features/bet/components/RepeatPickerModalContent";
import { ClubSelectionModalContent } from "@/src/features/bet/components/ClubSelectionModalContent";
import { DatePickerModalContent } from "@/src/features/bet/components/DatePickerModalContent";
import { TimePickerModalContent } from "@/src/features/bet/components/TimePickerModalContent";
import { DurationPickerModalContent } from "@/src/features/bet/components/DurationPickerModalContent";
import {
  VenuePickerModalContent,
  type Venue,
} from "@/src/features/bet/components/VenuePickerModalContent";
import {
  FeePickerModalContent,
  type FeeConfig,
} from "@/src/features/bet/components/FeePickerModalContent";

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

function formatVnd(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

function getFeeLabel(feeConfig: FeeConfig, playerCount: number) {
  if (feeConfig.type === "free") return "Miễn phí";
  if (!feeConfig.amount || feeConfig.amount <= 0) return "—";

  if (feeConfig.type === "per_person") {
    return `${formatVnd(feeConfig.amount)} VNĐ/người`;
  }

  const safePlayerCount = Math.max(1, playerCount);
  const perPerson = Math.round(feeConfig.amount / safePlayerCount);
  return `Chia đều - ${formatVnd(perPerson)} VNĐ/người`;
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
          "fixed bottom-0 left-1/2 z-60 w-[95%] max-w-[500px] -translate-x-1/2 overflow-hidden rounded-t-[20px]",
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

export interface CreateMatchForm {
  clubId: string | null;
  clubName: string;
  matchType: MatchType;
  location: string;
  date: string | null;
  time: string | null;
  duration: string | null;
  venue: string | null;
  playerCount: number;
  privacy: string;
  feeType: "Miễn phí" | "Có phí";
  feeAmountVnd: string;
  minLevel: string;
  maxLevel: string;
  matchName: string;
  description: string;
  gender: GenderValue;
  ageGroup: string;
  repeat: RepeatValue;
  blockLeave: string;
  autoApproval: boolean;
  allowBringFriend: boolean;
}

type Errors = Partial<
  Record<"matchName" | "description" | "date" | "time" | "venue", string>
>;

const DEFAULT_FORM: CreateMatchForm = {
  clubId: null,
  clubName: "",
  matchType: "Giao hữu",
  location: "Hồ Chí Minh",
  date: null,
  time: null,
  duration: null,
  venue: null,
  playerCount: 12,
  privacy: "Công khai",
  feeType: "Miễn phí",
  feeAmountVnd: "",
  minLevel: "Không có",
  maxLevel: "Không có",
  matchName: "",
  description: "",
  gender: "all",
  ageGroup: "Không giới hạn",
  repeat: "none",
  blockLeave: "Không có",
  autoApproval: true,
  allowBringFriend: false,
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

export default function CreateBetScreen() {
  const router = useRouter();
  const [formData, setFormData] = React.useState<CreateMatchForm>(DEFAULT_FORM);
  const [errors, setErrors] = React.useState<Errors>({});
  const [isVenueModalOpen, setIsVenueModalOpen] = React.useState(false);
  const [selectedVenue, setSelectedVenue] = React.useState<Venue | null>(null);
  const [isClubModalOpen, setIsClubModalOpen] = React.useState(false);
  const [selectedClub, setSelectedClub] = React.useState<Club | null>(null);
  const [isDateModalOpen, setIsDateModalOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [isTimeModalOpen, setIsTimeModalOpen] = React.useState(false);
  const [isDurationModalOpen, setIsDurationModalOpen] = React.useState(false);
  const [selectedDuration, setSelectedDuration] = React.useState<number | null>(null);
  const [isFeeModalOpen, setIsFeeModalOpen] = React.useState(false);
  const [feeConfig, setFeeConfig] = React.useState<FeeConfig>({ type: "free" });

  const clubValue: ClubSelectorValue = formData.clubId
    ? { clubId: formData.clubId, clubName: formData.clubName }
    : { clubId: null, clubName: "" };

  const advancedValue: AdvancedSettingsValue = {
    gender: formData.gender,
    ageGroup: formData.ageGroup,
    repeat: formData.repeat,
    blockLeave: formData.blockLeave,
    autoApproval: formData.autoApproval,
    allowBringFriend: formData.allowBringFriend,
  };

  const validate = () => {
    const next: Errors = {};
    if (!formData.matchName.trim()) next.matchName = "Vui lòng nhập tên kèo.";
    if (!formData.description.trim())
      next.description = "Vui lòng nhập mô tả kèo.";
    if (!formData.date) next.date = "Vui lòng chọn ngày.";
    if (!formData.time) next.time = "Vui lòng chọn giờ.";
    if (!formData.venue) next.venue = "Vui lòng chọn sân.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) {
      alert("Vui lòng kiểm tra lại thông tin.");
      return;
    }
    console.log(formData);
  };

  return (
    <div className="min-h-dvh bg-white">
      <ScreenHeader
        title="Tạo kèo"
        onBack={() => {
          console.log("Quay lại");
          router.back();
        }}
      />

      <form
        className="pb-[calc(24px+env(safe-area-inset-bottom))]"
        onSubmit={onSubmit}
      >
        <Container className="pt-6">
          <SectionLabel>CÂU LẠC BỘ</SectionLabel>
          <div className="mt-3">
            <ClubSelector
              value={clubValue}
              onPick={() => setIsClubModalOpen(true)}
              onClear={() => {
                setSelectedClub(null);
                setFormData((p) => ({ ...p, clubId: null, clubName: "" }));
              }}
            />
          </div>

          <div className="mt-6">
            <SectionLabel>LOẠI KÈO</SectionLabel>
            <div className="mt-3">
              <MatchTypeSelector
                value={formData.matchType}
                onChange={(v) => {
                  console.log("Chọn loại kèo:", v);
                  setFormData((p) => ({ ...p, matchType: v }));
                }}
              />
            </div>
          </div>

          <div className="mt-8">
            <SectionLabel>THÔNG TIN CƠ BẢN</SectionLabel>
            <div className="mt-3 rounded-2xl border border-[color-mix(in_srgb,var(--ds-color-text)_10%,transparent)] bg-white px-4">
              <div className="py-3">
                <LocationSelector
                  value={formData.location}
                  onClick={() => console.log("Mở chọn địa điểm")}
                  className="w-full justify-between rounded-2xl px-0 py-0 shadow-none border-0"
                />
              </div>
              <div className="h-px w-full bg-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]" />

              <DateTimeSelectors
                dateLabel={formData.date ?? "Chọn ngày"}
                timeLabel={formData.time ?? "Chọn giờ"}
                durationLabel={
                  selectedDuration != null ? `${selectedDuration} phút` : "Chọn thời lượng"
                }
                onPickDate={() => setIsDateModalOpen(true)}
                onPickTime={() => setIsTimeModalOpen(true)}
                onPickDuration={() => setIsDurationModalOpen(true)}
                onChange={(key, value) => {
                  console.log("Chọn:", value);
                  setFormData((p) => ({
                    ...p,
                    date: key === "date" ? value : p.date,
                    time: key === "time" ? value : p.time,
                    duration: key === "duration" ? value : p.duration,
                  }));
                }}
              />

              <div className="h-px w-full bg-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]" />
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 py-3 text-left"
                onClick={() => {
                  console.log("Mở chọn sân");
                  setIsVenueModalOpen(true);
                }}
              >
                <span className="inline-flex items-center gap-3">
                  <span className="text-[14px] font-medium text-secondary-gray">
                    {selectedVenue?.name ?? "Chọn sân"}
                  </span>
                </span>
                <span className="text-[13px] font-medium text-secondary-gray">
                  Chọn sân
                </span>
              </button>
              {errors.venue ? (
                <div className="pb-3 text-[13px] text-(--ds-color-danger)" role="alert">
                  {errors.venue}
                </div>
              ) : null}
              <div className="h-px w-full bg-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]" />
              <PlayerCountStepper
                value={formData.playerCount}
                onChange={(v) => setFormData((p) => ({ ...p, playerCount: v }))}
              />
            </div>

            <div className="mt-2 space-y-2">
              {errors.date ? (
                <div className="text-[13px] text-(--ds-color-danger)" role="alert">
                  {errors.date}
                </div>
              ) : null}
              {errors.time ? (
                <div className="text-[13px] text-(--ds-color-danger)" role="alert">
                  {errors.time}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-8">
            <SectionLabel>CHI TIẾT KÈO</SectionLabel>
            <div className="mt-3 space-y-3">
              <MatchDetailGroup
                privacy={formData.privacy}
                onPrivacyChange={(v) => setFormData((p) => ({ ...p, privacy: v }))}
                feeLabel={getFeeLabel(feeConfig, formData.playerCount)}
                onFeeClick={() => setIsFeeModalOpen(true)}
              />

              <DualLevelSelector
                minValue={formData.minLevel}
                onMinChange={(v) => setFormData((p) => ({ ...p, minLevel: v }))}
                maxValue={formData.maxLevel}
                onMaxChange={(v) => setFormData((p) => ({ ...p, maxLevel: v }))}
                options={LEVEL_OPTIONS}
              />
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <FormField label="TÊN KÈO" errorMessage={errors.matchName}>
              <Input
                value={formData.matchName}
                onChange={(e) => {
                  const v = e.target.value;
                  setFormData((p) => ({ ...p, matchName: v }));
                  if (errors.matchName)
                    setErrors((p) => ({ ...p, matchName: undefined }));
                }}
                placeholder="Đặt tên cho kèo của bạn"
                error={Boolean(errors.matchName)}
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
                placeholder="Viết gì đó về kèo của bạn"
                error={Boolean(errors.description)}
              />
            </FormField>
          </div>

          <div className="mt-8 rounded-2xl border border-[color-mix(in_srgb,var(--ds-color-text)_10%,transparent)] bg-white px-4">
            <AdvancedSettingsGroup
              value={advancedValue}
              onChange={(v) =>
                setFormData((p) => ({
                  ...p,
                  gender: v.gender,
                  ageGroup: v.ageGroup,
                  repeat: v.repeat,
                  blockLeave: v.blockLeave,
                  autoApproval: v.autoApproval,
                  allowBringFriend: v.allowBringFriend,
                }))
              }
              defaultOpen={false}
            />
          </div>

          <div className="mt-10">
            <Button className="w-full rounded-2xl py-3.5" type="submit">
              Tạo kèo
            </Button>
          </div>
        </Container>

        <DrawerPrimitive.Root
          open={isVenueModalOpen}
          onOpenChange={setIsVenueModalOpen}
          shouldScaleBackground={false}
        >
          <DrawerContent>
            <DrawerPrimitive.Title className="sr-only">Chọn sân</DrawerPrimitive.Title>
            {isVenueModalOpen ? (
              <VenuePickerModalContent
                initialVenueId={selectedVenue?.id ?? null}
                onClose={() => setIsVenueModalOpen(false)}
                onSelectVenue={(venue) => {
                  setSelectedVenue(venue);
                  setFormData((p) => ({ ...p, venue: venue?.name ?? null }));
                  if (errors.venue) setErrors((p) => ({ ...p, venue: undefined }));
                  setIsVenueModalOpen(false);
                }}
              />
            ) : null}
          </DrawerContent>
        </DrawerPrimitive.Root>

        <DrawerPrimitive.Root
          open={isClubModalOpen}
          onOpenChange={setIsClubModalOpen}
          shouldScaleBackground={false}
        >
          <DrawerContent>
            <DrawerPrimitive.Title className="sr-only">
              Chọn câu lạc bộ
            </DrawerPrimitive.Title>
            {isClubModalOpen ? (
              <ClubSelectionModalContent
                initialSelectedClubId={selectedClub?.id ?? null}
                onClose={() => setIsClubModalOpen(false)}
                onSelectClub={(club) => {
                  setSelectedClub(club);
                  setFormData((p) => ({
                    ...p,
                    clubId: club?.id ?? null,
                    clubName: club?.name ?? "",
                  }));
                  setIsClubModalOpen(false);
                }}
              />
            ) : null}
          </DrawerContent>
        </DrawerPrimitive.Root>

        <DrawerPrimitive.Root
          open={isDateModalOpen}
          onOpenChange={setIsDateModalOpen}
          shouldScaleBackground={false}
        >
          <DrawerContent>
            <DrawerPrimitive.Title className="sr-only">Chọn ngày</DrawerPrimitive.Title>
            {isDateModalOpen ? (
              <DatePickerModalContent
                initialDate={selectedDate}
                onClose={() => setIsDateModalOpen(false)}
                onSelectDate={(date) => {
                  setSelectedDate(date);
                  setFormData((p) => ({ ...p, date: format(date, "dd/MM/yyyy") }));
                  if (errors.date) setErrors((p) => ({ ...p, date: undefined }));
                }}
              />
            ) : null}
          </DrawerContent>
        </DrawerPrimitive.Root>

        <DrawerPrimitive.Root
          open={isTimeModalOpen}
          onOpenChange={setIsTimeModalOpen}
          shouldScaleBackground={false}
        >
          <DrawerContent>
            <DrawerPrimitive.Title className="sr-only">Chọn giờ</DrawerPrimitive.Title>
            {isTimeModalOpen ? (
              <TimePickerModalContent
                initialTime={formData.time}
                onClose={() => setIsTimeModalOpen(false)}
                onSelectTime={(time) => {
                  setFormData((p) => ({ ...p, time }));
                  if (errors.time) setErrors((p) => ({ ...p, time: undefined }));
                }}
              />
            ) : null}
          </DrawerContent>
        </DrawerPrimitive.Root>

        <DrawerPrimitive.Root
          open={isDurationModalOpen}
          onOpenChange={setIsDurationModalOpen}
          shouldScaleBackground={false}
        >
          <DrawerContent>
            <DrawerPrimitive.Title className="sr-only">
              Chọn thời lượng
            </DrawerPrimitive.Title>
            {isDurationModalOpen ? (
              <DurationPickerModalContent
                onClose={() => setIsDurationModalOpen(false)}
                onSelectDuration={(durationMinutes) => {
                  setSelectedDuration(durationMinutes);
                  setFormData((p) => ({
                    ...p,
                    duration: `${durationMinutes} phút`,
                  }));
                }}
                initialDurationMinutes={selectedDuration}
                startTime={formData.time}
              />
            ) : null}
          </DrawerContent>
        </DrawerPrimitive.Root>

        <DrawerPrimitive.Root
          open={isFeeModalOpen}
          onOpenChange={setIsFeeModalOpen}
          shouldScaleBackground={false}
        >
          <DrawerContent>
            <DrawerPrimitive.Title className="sr-only">Chọn phí</DrawerPrimitive.Title>
            {isFeeModalOpen ? (
              <FeePickerModalContent
                onClose={() => setIsFeeModalOpen(false)}
                onSelectFee={(next) => {
                  setFeeConfig(next);
                  setIsFeeModalOpen(false);
                }}
                initialFeeConfig={feeConfig}
                playerCount={formData.playerCount}
              />
            ) : null}
          </DrawerContent>
        </DrawerPrimitive.Root>
      </form>
    </div>
  );
}