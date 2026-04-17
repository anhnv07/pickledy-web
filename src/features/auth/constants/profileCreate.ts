export const GENDERS = ["male", "female", "other"] as const;
export type Gender = (typeof GENDERS)[number];

export const GENDER_LABELS: Record<Gender, string> = {
  male: "Nam",
  female: "Nữ",
  other: "Khác",
};

export const AGE_GROUPS = ["teen", "adult", "senior"] as const;
export type AgeGroup = (typeof AGE_GROUPS)[number];

export type AgeGroupOption = {
  value: AgeGroup;
  title: string;
  subtitle: string;
};

export const AGE_GROUP_OPTIONS: AgeGroupOption[] = [
  { value: "teen", title: "Thiếu niên", subtitle: "Dưới 18 tuổi" },
  { value: "adult", title: "Người trưởng thành", subtitle: "18 - 55 tuổi" },
  { value: "senior", title: "Người cao tuổi", subtitle: "Trên 55 tuổi" },
];

export type UsapaBand = {
  range: string;
  description: string;
};

export const USAPA_BANDS: UsapaBand[] = [
  {
    range: "2.0 - 2.75",
    description: "Mới bắt đầu, đang làm quen với luật và cách cầm vợt.",
  },
  {
    range: "3.0 - 3.25",
    description: "Biết đánh cờ bắn cơ bản và di chuyển hợp lý trên sân.",
  },
  {
    range: "3.5 - 3.75",
    description: "Kiểm soát được bóng và thực hiện các cú đánh ổn định.",
  },
  {
    range: "4.0 - 4.25",
    description: "Chơi tốt, đọc trận tốt và tạo áp lực lên đối thủ.",
  },
  {
    range: "4.5 - 5.0+",
    description: "Chuyên nghiệp hoặc gần chuyên nghiệp.",
  },
];

/** USAPA-style ratings from 2.0 to 5.0 in 0.25 steps */
function buildRatingSteps(): number[] {
  const steps: number[] = [];
  for (let n = 200; n <= 500; n += 25) {
    steps.push(n / 100);
  }
  return steps;
}

export const PICKLEBALL_RATING_STEPS = buildRatingSteps();

export const AVATAR_MAX_BYTES = 5 * 1024 * 1024;

/** Parse DD/MM/YYYY; returns null if invalid. */
export function parseDdMmYyyy(s: string): Date | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s.trim());
  if (!m) return null;
  const day = Number(m[1]);
  const month = Number(m[2]) - 1;
  const year = Number(m[3]);
  const date = new Date(year, month, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export function ageFromBirthDate(birth: Date, now = new Date()): number {
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
}
