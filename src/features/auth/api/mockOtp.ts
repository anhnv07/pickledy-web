export class OtpVerificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OtpVerificationError";
  }
}

export type VerifyOtpParams = {
  phoneDigits: string;
  otp: string;
};

export type ResendOtpParams = {
  phoneDigits: string;
};

const MOCK_SUCCESS_CODE = "123456";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Mock: OTP đúng cố định `123456`.
 */
export async function verifyOtp({ otp }: VerifyOtpParams): Promise<void> {
  await delay(650 + Math.floor(Math.random() * 250));
  const trimmed = otp.replace(/\D/g, "");
  if (trimmed !== MOCK_SUCCESS_CODE) {
    throw new OtpVerificationError(
      "Mã xác nhận không chính xác hoặc đã hết hạn",
    );
  }
}

export async function resendOtp({ phoneDigits }: ResendOtpParams): Promise<void> {
  await delay(450 + Math.floor(Math.random() * 250));
  void phoneDigits;
}

export { MOCK_SUCCESS_CODE as MOCK_OTP_CODE };
