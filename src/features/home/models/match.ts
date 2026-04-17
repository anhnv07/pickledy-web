export type MatchStatus = "available" | "full";

export type Match = {
  id: string;
  clubName: string;
  level: string;
  price: string;
  venue: string;
  typeLabel: string;
  currentPlayers: number;
  maxPlayers: number;
  distance: string;
  status: MatchStatus;
};

export type MatchGroup = {
  time: string; // "17:00"
  matches: Match[];
};

export type WeekdayKey =
  | "T4 8"
  | "T5 9"
  | "T6 10"
  | "T7 11"
  | "CN 12"
  | "T2 13";

export type WeekdayOption = {
  key: WeekdayKey;
  weekdayLabel: string; // "T4"
  dateLabel: string; // "8"
};

