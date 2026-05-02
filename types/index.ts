export type MetricKey = "sleep" | "digestion" | "procrastination" | "scroll" | "aggression";

export type Checkin = {
  id: string;
  date: string;
  createdAt: string;
  sleep: {
    awakenings: number;
    awakeMinutes: number;
    sleepQuality: number;
    mainCause: string;
  };
  digestion: {
    hadBowelMovement: boolean;
    abdominalDiscomfort: number;
    constipationFeeling: number;
    hydration: "low" | "medium" | "good";
    healthAlert: "strong_pain" | "blood" | "more_than_3_days" | "none";
  };
  procrastination: {
    avoidedImportantTask: boolean;
    avoidedTasksCount: number;
    blockageLevel: number;
    mainCause: string;
  };
  scroll: {
    uselessScrollMinutes: number;
    unintentionalOpens: number;
    lossOfControl: number;
    mainMoment: string;
  };
  aggression: {
    irritabilityLevel: number;
    disproportionateReaction: boolean;
    incidentsCount: number;
    mainTrigger: string;
  };
  global: {
    stressLevel: number;
    reliefLevel: number;
    energyLevel: number;
    note?: string;
  };
  scores: DailyScores;
};

export type DailyScores = {
  sleepScore: number;
  digestionScore: number;
  procrastinationScore: number;
  scrollScore: number;
  aggressionScore: number;
  globalStressSignalScore: number;
};

export type ActionSession = {
  id: string;
  checkinId: string;
  date: string;
  metric: MetricKey;
  actionName: string;
  completed: boolean;
  stressAfter?: number;
  reliefAfter?: number;
  helped?: boolean;
  note?: string;
};

export type ReminderSettings = {
  enabled: boolean;
  time: string;
};

export type MetricSummary = {
  key: MetricKey;
  label: string;
  score: number;
};

export type Trend = "improvement" | "stable" | "decline";
