"use client";

import * as React from "react";
import { Users, Volleyball, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/Button";

type CreateModalContentProps = {
  onClose: () => void;
};

type CreateOptionCardProps = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  iconBgClassName: string;
  onClick: () => void;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

function CreateOptionCard({
  title,
  description,
  icon: Icon,
  iconBgClassName,
  onClick,
}: CreateOptionCardProps) {
  return (
    <button
      type="button"
      className={cx(
        "w-full rounded-xl bg-[#F9FAFB] px-4 py-3 text-left",
        "transition-colors duration-150 ease-(--ds-ease-standard)",
        "hover:bg-[#F3F4F6] active:bg-[#EEF2F7]",
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="mr-3 shrink-0">
          <div
            className={cx(
              "flex h-12 w-12 items-center justify-center rounded-xl text-white",
              iconBgClassName,
            )}
          >
            <Icon className="h-6 w-6" aria-hidden />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold text-[#111827]">{title}</p>
          <p className="mt-0.5 text-[13px] leading-[1.4] text-[#6B7280]">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}

export function CreateModalContent({ onClose }: CreateModalContentProps) {
  const router = useRouter();

  return (
    <div className="px-4 pt-5 pb-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[20px] font-semibold text-[#111827]">Tạo mới</h2>

        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 rounded-full p-0 text-[#9CA3AF]"
          aria-label="Đóng modal tạo mới"
          onClick={onClose}
        >
          <X className="h-6 w-6" aria-hidden />
        </Button>
      </div>

      <div className="space-y-3">
        <CreateOptionCard
          title="Tạo kèo"
          description="Tổ chức buổi social pickleball, xếp trận theo trình độ và quản lý người chơi dễ dàng."
          icon={Volleyball}
          iconBgClassName="bg-[#10B981]"
          onClick={() => {
            console.log("Chọn Tạo kèo");
            onClose();
            router.push("/create-bet");
          }}
        />

        <CreateOptionCard
          title="Tạo câu lạc bộ"
          description="Tạo không gian chung cho cộng đồng pickleball của bạn, quản lý thành viên và tổ chức buổi chơi thường xuyên."
          icon={Users}
          iconBgClassName="bg-[#3B82F6]"
          onClick={() => {
            onClose();
            router.push("/create-club");
          }}
        />
      </div>
    </div>
  );
}
