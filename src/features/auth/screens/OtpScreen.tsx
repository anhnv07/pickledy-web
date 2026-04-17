"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { BackButton } from "@/shared/components/navigation/BackButton";
import { Container } from "@/shared/components/ui/Container";
import { Button } from "@/shared/components/ui/Button";
import { FormField } from "@/shared/components/forms/FormField";
import { StepIndicator } from "@/shared/components/ui/StepIndicator";
import {
  OtpCodeInput,
  type OtpCodeInputHandle,
} from "@/shared/components/forms/OtpCodeInput";
import { useCountdown } from "@/shared/hooks/useCountdown";
import {
  OtpVerificationError,
  resendOtp,
  verifyOtp,
} from "@/features/auth/api/mockOtp";
import { maskNationalPhoneForSubtitle } from "@/features/auth/utils/phoneDisplay";

const OTP_ERROR_ID = "otp-field-error";

function onlyDigits(v: string) {
  return v.replace(/\D/g, "");
}

export default function OtpScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneDigits = onlyDigits(searchParams.get("phoneDigits") ?? "");

  const otpRef = React.useRef<OtpCodeInputHandle>(null);
  const [otp, setOtp] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [isResending, setIsResending] = React.useState(false);

  const { secondsLeft, isActive, reset } = useCountdown(59);

  const maskedLine = maskNationalPhoneForSubtitle(phoneDigits);

  const onOtpChange = (next: string) => {
    setOtp(next);
    if (errorMessage) setErrorMessage(undefined);
  };

  const handleConfirm = async () => {
    if (otp.length !== 6 || isVerifying) return;
    setErrorMessage(undefined);
    setIsVerifying(true);
    try {
      await verifyOtp({ phoneDigits, otp });
      router.replace("/");
    } catch (e) {
      const msg =
        e instanceof OtpVerificationError
          ? e.message
          : "Mã xác nhận không chính xác hoặc đã hết hạn";
      setErrorMessage(msg);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (isActive || isResending || isVerifying || !phoneDigits) return;
    setErrorMessage(undefined);
    setIsResending(true);
    try {
      await resendOtp({ phoneDigits });
      setOtp("");
      reset(59);
      otpRef.current?.focusFirst();
    } finally {
      setIsResending(false);
    }
  };

  const canSubmit = otp.length === 6 && !isVerifying;
  const confirmDisabled = !canSubmit;

  return (
    <form
      className="min-h-dvh h-full bg-[var(--ds-color-bg)] flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        void handleConfirm();
      }}
    >
      <Container className="pt-[calc(12px+env(safe-area-inset-top))]">
        <div className="flex items-center">
          <BackButton />
        </div>

        <div className="mt-3">
          <StepIndicator total={2} activeIndex={1} className="max-w-full" />
        </div>

        <div className="mt-10 max-w-[520px]">
          <h1 className="text-[28px] font-bold tracking-tight text-near-black">
            Nhập mã xác nhận
          </h1>
          <p className="mt-2 text-[14px] text-secondary-gray">
            Mã 6 số đã được gửi đến +84 {maskedLine}
          </p>

          <div className="mt-8">
            <FormField errorMessage={errorMessage} errorId={OTP_ERROR_ID}>
              <OtpCodeInput
                ref={otpRef}
                value={otp}
                onChange={onOtpChange}
                error={Boolean(errorMessage)}
                disabled={isVerifying}
                autoFocus
                aria-invalid={Boolean(errorMessage) || undefined}
                aria-describedby={errorMessage ? OTP_ERROR_ID : undefined}
                className="max-w-md"
              />
            </FormField>

            <div className="mt-6">
              {isActive ? (
                <p className="text-[13px] text-secondary-gray">
                  Không nhận được mã? Gửi lại sau{" "}
                  <span className="tabular-nums">{secondsLeft}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  disabled={isResending || isVerifying || !phoneDigits}
                  onClick={() => void handleResend()}
                  className="text-left text-[13px] text-secondary-gray disabled:opacity-50"
                >
                  Không nhận được mã?{" "}
                  <span className="font-semibold text-[var(--ds-color-text)]">
                    {isResending ? "Đang gửi…" : "Gửi lại"}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>

      <div className="mt-auto">
        <Container className="pt-6 pb-[calc(24px+env(safe-area-inset-bottom))]">
          <Button
            size="lg"
            type="submit"
            disabled={confirmDisabled}
            leftIcon={
              canSubmit && !isVerifying ? (
                <Check className="h-5 w-5" aria-hidden="true" />
              ) : undefined
            }
            className={
              "w-full h-[52px] rounded-lg font-bold shadow-sm " +
              "disabled:opacity-100 disabled:bg-[#E6E6E6] disabled:text-white"
            }
          >
            {isVerifying ? "Đang xác nhận…" : "Xác nhận"}
          </Button>
        </Container>
      </div>
    </form>
  );
}
