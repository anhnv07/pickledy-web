"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "lucide-react";
import { Container } from "@/shared/components/ui/Container";
import { Button } from "@/shared/components/ui/Button";
import { FormField } from "@/shared/components/forms/FormField";
import { Input } from "@/shared/components/ui/Input";
import { AvatarUpload } from "../components/AvatarUpload";
import { GenderSegmentedControl } from "../components/GenderSegmentedControl";
import { AgeGroupSelector } from "../components/AgeGroupSelector";
import { PickleballSkillSelector } from "../components/PickleballSkillSelector";
import { PickleballSubSelector } from "../components/PickleballSubSelector";
import {
  AGE_GROUPS,
  AVATAR_MAX_BYTES,
  GENDERS,
  PICKLEBALL_RATING_STEPS,
  ageFromBirthDate,
  parseDdMmYyyy,
  type AgeGroup,
  type Gender,
} from "../constants/profileCreate";

const schema = z.object({
  avatar: z
    .custom<File | null>((v) => v === null || v instanceof File)
    .refine((f) => f === null || f.size <= AVATAR_MAX_BYTES, {
      message: "Ảnh phải nhỏ hơn 5MB.",
    })
    .refine(
      (f) => f === null || f.type === "image/jpeg" || f.type === "image/png",
      { message: "Chỉ chấp nhận JPG hoặc PNG." },
    ),
  displayName: z.string().trim().min(1, { message: "Nhập tên hiển thị." }),
  username: z.string().trim().min(1, { message: "Nhập username." }),
  birthDate: z
    .string()
    .trim()
    .refine((s) => parseDdMmYyyy(s) !== null, {
      message: "Nhập ngày sinh đúng định dạng DD/MM/YYYY.",
    })
    .refine(
      (s) => {
        const d = parseDdMmYyyy(s);
        if (!d) return false;
        const age = ageFromBirthDate(d);
        return age >= 13 && age <= 120;
      },
      { message: "Ngày sinh phải tương ứng độ tuổi từ 13 đến 120." },
    ),
  gender: z.enum(GENDERS),
  ageGroup: z.enum(AGE_GROUPS),
  pickleballRating: z
    .number()
    .refine((n) => PICKLEBALL_RATING_STEPS.includes(n), {
      message: "Chọn một mức điểm hợp lệ.",
    }),
});

type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  avatar: null,
  displayName: "",
  username: "",
  birthDate: "",
  gender: "other" satisfies Gender,
  ageGroup: "adult" satisfies AgeGroup,
  pickleballRating: 3,
};

export default function ProfileCreateScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = (data: FormValues) => {
    console.log({
      ...data,
      avatar: data.avatar
        ? {
            name: data.avatar.name,
            size: data.avatar.size,
            type: data.avatar.type,
          }
        : null,
    });
  };

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <form
        className="flex min-h-dvh flex-1 flex-col"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Container className="flex-1 pt-[calc(12px+env(safe-area-inset-top))] pb-6">
          <div className="mx-auto w-full max-w-[520px]">
            <h1 className="text-center text-[28px] font-bold tracking-tight text-near-black">
              Tạo hồ sơ của bạn
            </h1>

            <div className="mt-8 flex flex-col gap-6">
              <Controller
                control={control}
                name="avatar"
                render={({ field }) => (
                  <AvatarUpload
                    id="avatar"
                    value={field.value}
                    onChange={field.onChange}
                    errorMessage={
                      touchedFields.avatar ? errors.avatar?.message : undefined
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="displayName"
                render={({ field }) => (
                  <FormField
                    label="Tên hiển thị"
                    errorMessage={
                      touchedFields.displayName
                        ? errors.displayName?.message
                        : undefined
                    }
                  >
                    <Input
                      id="displayName"
                      {...field}
                      autoComplete="name"
                      placeholder="Nhập tên hiển thị"
                      error={Boolean(
                        touchedFields.displayName &&
                        errors.displayName?.message,
                      )}
                    />
                  </FormField>
                )}
              />

              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <FormField
                    label="Username"
                    errorMessage={
                      touchedFields.username
                        ? errors.username?.message
                        : undefined
                    }
                  >
                    <Input
                      id="username"
                      {...field}
                      autoComplete="username"
                      placeholder="Nhập username"
                      error={Boolean(
                        touchedFields.username && errors.username?.message,
                      )}
                    />
                  </FormField>
                )}
              />

              <Controller
                control={control}
                name="birthDate"
                render={({ field }) => (
                  <FormField
                    label="Ngày sinh"
                    errorMessage={
                      touchedFields.birthDate
                        ? errors.birthDate?.message
                        : undefined
                    }
                  >
                    <div className="relative">
                      <Input
                        id="birthDate"
                        {...field}
                        inputMode="numeric"
                        placeholder="DD/MM/YYYY"
                        autoComplete="bday"
                        error={Boolean(
                          touchedFields.birthDate && errors.birthDate?.message,
                        )}
                        className="pr-10"
                      />
                      <Calendar
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-gray"
                        aria-hidden
                      />
                    </div>
                  </FormField>
                )}
              />

              <div>
                <FormField label="Giới tính">
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <GenderSegmentedControl
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </FormField>
              </div>

              <div>
                <FormField label="Độ tuổi">
                  <Controller
                    control={control}
                    name="ageGroup"
                    render={({ field }) => (
                      <AgeGroupSelector
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </FormField>
              </div>

              <div>
                <FormField label="Trình độ pickleball">
                  <>
                    <PickleballSkillSelector />
                    <div className="mt-4">
                      <Controller
                        control={control}
                        name="pickleballRating"
                        render={({ field }) => (
                          <PickleballSubSelector
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                    {errors.pickleballRating?.message ? (
                      <p
                        className="mt-2 text-[13px] text-[var(--ds-color-danger)]"
                        role="alert"
                      >
                        {errors.pickleballRating.message}
                      </p>
                    ) : null}
                  </>
                </FormField>
              </div>
            </div>
          </div>
        </Container>

        <div className="mt-auto">
          <Container className="pt-2 pb-[calc(24px+env(safe-area-inset-bottom))]">
            <Button
              size="lg"
              type="submit"
              disabled={!isValid}
              className="h-[52px] w-full rounded-lg font-bold shadow-sm disabled:opacity-100 disabled:bg-[#E6E6E6] disabled:text-white"
            >
              Hoàn tất
            </Button>
          </Container>
        </div>
      </form>
    </div>
  );
}
