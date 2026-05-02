export type MetricKey = "sleep" | "digestion" | "procrastination" | "scroll" | "aggression";

export type MainGoal =
  | "better_sleep"
  | "reduce_scroll"
  | "less_procrastination"
  | "less_irritable"
  | "improve_digestion"
  | "reduce_global_stress";

export type Profile = {
  id: string;
  email: string | null;
  firstName: string | null;
  mainGoal: MainGoal | null;
  reminderEnabled: boolean;
  reminderTime: string;
  createdAt: string;
  updatedAt: string;
};

export type Checkin = {
  id: string;
  userId: string;
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
  userId: string;
  checkinId: string;
  date: string;
  metric: MetricKey;
  actionName: string;
  completed: boolean;
  stressBefore?: number;
  stressAfter?: number;
  reliefAfter?: number;
  helped?: boolean;
  note?: string;
  createdAt?: string;
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

export type CheckinInput = Omit<Checkin, "id" | "userId" | "date" | "createdAt" | "scores"> & {
  date?: string;
};

export type ActionSessionInput = {
  checkinId: string;
  date: string;
  metric: MetricKey;
  actionName: string;
  completed: boolean;
  stressBefore?: number;
  stressAfter?: number;
  reliefAfter?: number;
  helped?: boolean;
  note?: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          first_name: string | null;
          main_goal: string | null;
          reminder_enabled: boolean;
          reminder_time: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          first_name?: string | null;
          main_goal?: string | null;
          reminder_enabled?: boolean;
          reminder_time?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string | null;
          first_name?: string | null;
          main_goal?: string | null;
          reminder_enabled?: boolean;
          reminder_time?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      checkins: {
        Row: CheckinRow;
        Insert: Partial<CheckinRow> & { user_id: string; date: string };
        Update: Partial<CheckinRow>;
        Relationships: [];
      };
      action_sessions: {
        Row: ActionSessionRow;
        Insert: Partial<ActionSessionRow> & {
          user_id: string;
          date: string;
          metric: string;
          action_name: string;
        };
        Update: Partial<ActionSessionRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type CheckinRow = {
  id: string;
  user_id: string;
  date: string;
  created_at: string;
  sleep_awakenings: number;
  sleep_awake_minutes: number;
  sleep_quality: number;
  sleep_main_cause: string | null;
  digestion_had_bowel_movement: boolean;
  digestion_abdominal_discomfort: number;
  digestion_constipation_feeling: number;
  digestion_hydration: string;
  digestion_health_alert: string;
  procrastination_avoided_important_task: boolean;
  procrastination_avoided_tasks_count: number;
  procrastination_blockage_level: number;
  procrastination_main_cause: string | null;
  scroll_useless_minutes: number;
  scroll_unintentional_opens: number;
  scroll_loss_of_control: number;
  scroll_main_moment: string | null;
  aggression_irritability_level: number;
  aggression_disproportionate_reaction: boolean;
  aggression_incidents_count: number;
  aggression_main_trigger: string | null;
  global_stress_level: number;
  global_relief_level: number;
  global_energy_level: number;
  global_note: string | null;
  sleep_score: number;
  digestion_score: number;
  procrastination_score: number;
  scroll_score: number;
  aggression_score: number;
  global_stress_signal_score: number;
};

export type ActionSessionRow = {
  id: string;
  user_id: string;
  checkin_id: string;
  date: string;
  metric: string;
  action_name: string;
  completed: boolean;
  stress_before: number | null;
  stress_after: number | null;
  relief_after: number | null;
  helped: boolean | null;
  note: string | null;
  created_at: string;
};
