"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { BackButton } from "@/shared/components/navigation/BackButton";
import { Container } from "@/shared/components/ui/Container";
import { Button } from "@/shared/components/ui/Button";
import { FormField } from "@/shared/components/forms/FormField";
import { StepIndicator } from "@/shared/components/ui/StepIndicator";
import { PhoneCountryCodeSelect } from "../components/PhoneCountryCodeSelect";
import { VnPhoneInput } from "../components/VnPhoneInput";

const vnPhoneDigitsRegex = /^(03|05|07|08|09)\d{7,8}$/;

const schema = z.object({
    phoneDigits: z
        .string()
        .transform((v) => v.replace(/\D/g, ""))
        .refine((v) => v.length >= 9 && v.length <= 10, {
            message: "Số điện thoại phải có 9–10 chữ số.",
        })
        .refine((v) => vnPhoneDigitsRegex.test(v), {
            message: "Số điện thoại Việt Nam không hợp lệ.",
        }),
});

type FormValues = z.infer<typeof schema>;

const disclaimer =
    "Chúng tôi sẽ gọi hoặc nhắn tin cho bạn để xác nhận số điện thoại. Có thể áp dụng phí tin nhắn và dữ liệu tiêu chuẩn.";

export default function LoginScreen() {
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, touchedFields },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: { phoneDigits: "" },
    });

    const goToOtp = handleSubmit((data) => {
        router.push(`/otp?phoneDigits=${encodeURIComponent(data.phoneDigits)}`);
    });

    return (
        <div className="min-h-dvh h-full bg-white flex flex-col">
            <Container className="pt-[calc(12px+env(safe-area-inset-top))]">
                <div className="flex items-center">
                    <BackButton />
                </div>

                <div className="mt-3">
                    <StepIndicator total={2} activeIndex={0} className="max-w-full" />
                </div>

                <div className="mt-10 w-full">
                    <h1 className="text-[28px] font-bold tracking-tight text-near-black">
                        Nhập số điện thoại
                    </h1>
                    <p className="mt-2 text-[14px] text-secondary-gray">
                        Chúng tôi sẽ gửi mã xác nhận qua SMS.
                    </p>

                    <form className="mt-8" onSubmit={goToOtp}>
                        <FormField
                            errorMessage={
                                touchedFields.phoneDigits ? errors.phoneDigits?.message : undefined
                            }
                        >
                            <div className="flex items-start gap-3">
                                <PhoneCountryCodeSelect />

                                <Controller
                                    control={control}
                                    name="phoneDigits"
                                    render={({ field }) => (
                                        <VnPhoneInput
                                            id="phoneDigits"
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            error={Boolean(
                                                touchedFields.phoneDigits && errors.phoneDigits?.message,
                                            )}
                                            autoFocus
                                            inputClassName="h-10"
                                            className="w-full"
                                        />
                                    )}
                                />
                            </div>
                        </FormField>

                        <p className="mt-4 text-[13px] leading-relaxed text-secondary-gray">
                            {disclaimer}
                        </p>
                    </form>
                </div>
            </Container>

            <div className="mt-auto">
                <Container className="pt-6 pb-[calc(24px+env(safe-area-inset-bottom))]">
                    <Button
                        size="lg"
                        type="submit"
                        rightIcon={<ArrowRight className="h-5 w-5" aria-hidden="true" />}
                        disabled={!isValid}
                        className="w-full h-[52px] rounded-lg font-bold shadow-sm disabled:opacity-100 disabled:bg-[#E6E6E6] disabled:text-white"
                        onClick={goToOtp}
                    >
                        Tiếp tục
                    </Button>
                </Container>
            </div>
        </div>
    );
}
