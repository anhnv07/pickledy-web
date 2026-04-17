import { Suspense } from "react";
import OtpScreen from "@/src/features/auth/screens/OtpScreen";

export default function OtpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh w-full bg-[var(--ds-color-bg)]" aria-hidden />
      }
    >
      <OtpScreen />
    </Suspense>
  );
}
