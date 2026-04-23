"use client";

import * as React from "react";
import { Circle, CircleDot, X } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

export interface FeeConfig {
  type: "free" | "shared" | "per_person";
  amount?: number;
}

export interface FeePickerModalContentProps {
  onClose: () => void;
  onSelectFee: (feeConfig: FeeConfig) => void;
  initialFeeConfig?: FeeConfig;
  playerCount: number;
}

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

const feeTypes = [
  {
    id: "free",
    title: "Miễn phí",
    description: "Không thu phí người tham gia",
  },
  {
    id: "shared",
    title: "Chia đều",
    description: "Tổng chi phí chia đều cho tất cả người chơi",
  },
  {
    id: "per_person",
    title: "Phí mỗi người",
    description: "Mỗi người chơi trả một khoản phí cố định",
  },
] as const satisfies Array<{
  id: FeeConfig["type"];
  title: string;
  description: string;
}>;

function formatVnd(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

function parsePositiveInt(raw: string) {
  const digitsOnly = raw.replace(/[^\d]/g, "");
  if (!digitsOnly) return undefined;
  const n = Number(digitsOnly);
  if (!Number.isFinite(n)) return undefined;
  if (n <= 0) return undefined;
  return Math.floor(n);
}

function ModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 pt-4 pb-3">
      <div className="text-[16px] font-semibold text-near-black">Phí</div>
      <Button
        variant="ghost"
        size="sm"
        className="h-10 w-10 rounded-full p-0 text-secondary-gray"
        aria-label="Đóng chọn phí"
        onClick={onClose}
      >
        <X className="h-5 w-5" aria-hidden />
      </Button>
    </div>
  );
}

function FeeTypeOption({
  title,
  description,
  selected,
  onSelect,
}: {
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = selected ? CircleDot : Circle;
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cx(
        "flex w-full items-start gap-3 px-4 py-3 text-left",
        "transition-colors duration-150 ease-(--ds-ease-standard)",
        selected
          ? "bg-[color-mix(in_srgb,var(--ds-color-accent)_8%,white)]"
          : "hover:bg-[color-mix(in_srgb,var(--ds-color-text)_4%,transparent)]",
      )}
    >
      <div className="pt-0.5">
        <Icon
          className={cx(
            "h-5 w-5 shrink-0",
            selected ? "text-(--ds-color-accent)" : "text-secondary-gray",
          )}
          aria-hidden
        />
      </div>

      <div className="min-w-0">
        <div className="text-[16px] font-medium text-[#111827]">{title}</div>
        <div className="mt-1 text-[13px] leading-[1.35] text-[#6B7280]">
          {description}
        </div>
      </div>
    </button>
  );
}

function MoneyInputRow({
  label,
  placeholder,
  value,
  onChange,
  helperText,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: React.ReactNode;
}) {
  return (
    <div className="px-4 pb-2">
      <div className="text-[13px] font-semibold text-secondary-gray">
        {label}
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-lg bg-(--ds-color-surface) px-3 py-2.5">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          inputMode="numeric"
          placeholder={placeholder}
          className="h-auto border-0 bg-transparent px-0 py-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <span className="shrink-0 text-[13px] font-medium text-secondary-gray">
          VNĐ
        </span>
      </div>
      {helperText ? (
        <div className="mt-2 text-[13px] text-secondary-gray">{helperText}</div>
      ) : null}
    </div>
  );
}

function SharedCostInput({
  rawValue,
  onChangeRawValue,
  total,
  playerCount,
}: {
  rawValue: string;
  onChangeRawValue: (v: string) => void;
  total?: number;
  playerCount: number;
}) {
  const safePlayerCount = Math.max(1, playerCount);
  const perPerson =
    total != null ? Math.round(total / safePlayerCount) : undefined;

  return (
    <div className="pt-1">
      <MoneyInputRow
        label="Nhập tổng chi phí"
        placeholder="0"
        value={rawValue}
        onChange={onChangeRawValue}
        helperText={
          total != null ? (
            <>
              <div>{`Số tiền sẽ được chia đều cho ${safePlayerCount} người chơi`}</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[14px] font-medium text-near-black">
                  Mỗi người đóng
                </span>
                <span className="text-[14px] font-semibold text-near-black">
                  {perPerson != null ? `${formatVnd(perPerson)} VNĐ` : "— VNĐ"}
                </span>
              </div>
            </>
          ) : (
            `Số tiền sẽ được chia đều cho ${safePlayerCount} người chơi`
          )
        }
      />
    </div>
  );
}

function PerPersonFeeInput({
  rawValue,
  onChangeRawValue,
}: {
  rawValue: string;
  onChangeRawValue: (v: string) => void;
}) {
  return (
    <div className="pt-1">
      <MoneyInputRow
        label="Nhập phí mỗi người"
        placeholder="0"
        value={rawValue}
        onChange={onChangeRawValue}
        helperText="Mỗi người chơi sẽ đóng số tiền này khi tham gia"
      />
    </div>
  );
}

export function FeePickerModalContent({
  onClose,
  onSelectFee,
  initialFeeConfig,
  playerCount,
}: FeePickerModalContentProps) {
  const [tempFeeType, setTempFeeType] = React.useState<FeeConfig["type"]>(
    initialFeeConfig?.type ?? "free",
  );
  const [rawAmount, setRawAmount] = React.useState(() => {
    const amount = initialFeeConfig?.amount;
    return amount && amount > 0 ? String(amount) : "";
  });

  const amount = React.useMemo(() => parsePositiveInt(rawAmount), [rawAmount]);

  const canConfirm =
    tempFeeType === "free" ? true : amount != null && amount > 0;

  const onConfirm = () => {
    if (!canConfirm) return;
    if (tempFeeType === "free") {
      onSelectFee({ type: "free" });
      onClose();
      return;
    }
    onSelectFee({ type: tempFeeType, amount });
    onClose();
  };

  return (
    <div className="flex max-h-[80dvh] flex-col">
      <ModalHeader onClose={onClose} />

      <div className="divide-y divide-[color-mix(in_srgb,var(--ds-color-text)_8%,transparent)]">
        {feeTypes.map((t) => (
          <FeeTypeOption
            key={t.id}
            title={t.title}
            description={t.description}
            selected={tempFeeType === t.id}
            onSelect={() => {
              setTempFeeType(t.id);
              if (t.id === "free") setRawAmount("");
            }}
          />
        ))}
      </div>

      {tempFeeType === "shared" ? (
        <SharedCostInput
          rawValue={rawAmount}
          onChangeRawValue={setRawAmount}
          total={amount}
          playerCount={playerCount}
        />
      ) : null}

      {tempFeeType === "per_person" ? (
        <PerPersonFeeInput rawValue={rawAmount} onChangeRawValue={setRawAmount} />
      ) : null}

      <div className="mt-auto px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-2">
        <Button
          className="w-full rounded-2xl py-3.5"
          disabled={!canConfirm}
          onClick={onConfirm}
        >
          Xác nhận
        </Button>
      </div>
    </div>
  );
}

