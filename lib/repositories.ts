import type { SupabaseClient, User } from "@supabase/supabase-js";
import { toDateKey, getLastDays } from "@/lib/dates";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { calculateDailyScores } from "@/lib/scoring";
import { buildDailyReport, buildWeeklyReport } from "@/lib/reports";
import type {
  ActionSession,
  ActionSessionInput,
  ActionSessionRow,
  Checkin,
  CheckinInput,
  CheckinRow,
  Database,
  MainGoal,
  Profile
} from "@/types";

type DbClient = SupabaseClient<Database>;

export function mapProfile(row: Database["public"]["Tables"]["profiles"]["Row"]): Profile {
  return {
    id: row.id,
    email: row.email,
    firstName: row.first_name,
    mainGoal: row.main_goal as MainGoal | null,
    reminderEnabled: row.reminder_enabled,
    reminderTime: row.reminder_time,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function mapCheckin(row: CheckinRow): Checkin {
  return {
    id: row.id,
    userId: row.user_id,
    date: row.date,
    createdAt: row.created_at,
    sleep: {
      awakenings: row.sleep_awakenings,
      awakeMinutes: row.sleep_awake_minutes,
      sleepQuality: row.sleep_quality,
      mainCause: row.sleep_main_cause ?? "inconnu"
    },
    digestion: {
      hadBowelMovement: row.digestion_had_bowel_movement,
      abdominalDiscomfort: row.digestion_abdominal_discomfort,
      constipationFeeling: row.digestion_constipation_feeling,
      hydration: normalizeHydration(row.digestion_hydration),
      healthAlert: normalizeHealthAlert(row.digestion_health_alert)
    },
    procrastination: {
      avoidedImportantTask: row.procrastination_avoided_important_task,
      avoidedTasksCount: row.procrastination_avoided_tasks_count,
      blockageLevel: row.procrastination_blockage_level,
      mainCause: row.procrastination_main_cause ?? "autre"
    },
    scroll: {
      uselessScrollMinutes: row.scroll_useless_minutes,
      unintentionalOpens: row.scroll_unintentional_opens,
      lossOfControl: row.scroll_loss_of_control,
      mainMoment: row.scroll_main_moment ?? "autre"
    },
    aggression: {
      irritabilityLevel: row.aggression_irritability_level,
      disproportionateReaction: row.aggression_disproportionate_reaction,
      incidentsCount: row.aggression_incidents_count,
      mainTrigger: row.aggression_main_trigger ?? "inconnu"
    },
    global: {
      stressLevel: row.global_stress_level,
      reliefLevel: row.global_relief_level,
      energyLevel: row.global_energy_level,
      note: row.global_note ?? undefined
    },
    scores: {
      sleepScore: row.sleep_score,
      digestionScore: row.digestion_score,
      procrastinationScore: row.procrastination_score,
      scrollScore: row.scroll_score,
      aggressionScore: row.aggression_score,
      globalStressSignalScore: row.global_stress_signal_score
    }
  };
}

export function mapActionSession(row: ActionSessionRow): ActionSession {
  return {
    id: row.id,
    userId: row.user_id,
    checkinId: row.checkin_id,
    date: row.date,
    metric: row.metric as ActionSession["metric"],
    actionName: row.action_name,
    completed: row.completed,
    stressBefore: row.stress_before ?? undefined,
    stressAfter: row.stress_after ?? undefined,
    reliefAfter: row.relief_after ?? undefined,
    helped: row.helped ?? undefined,
    note: row.note ?? undefined,
    createdAt: row.created_at
  };
}

export function checkinToRow(userId: string, input: CheckinInput): Database["public"]["Tables"]["checkins"]["Insert"] {
  const date = input.date ?? toDateKey();
  const scores = calculateDailyScores({
    id: "draft",
    userId,
    date,
    createdAt: new Date().toISOString(),
    ...input
  });

  return {
    user_id: userId,
    date,
    sleep_awakenings: input.sleep.awakenings,
    sleep_awake_minutes: input.sleep.awakeMinutes,
    sleep_quality: input.sleep.sleepQuality,
    sleep_main_cause: input.sleep.mainCause,
    digestion_had_bowel_movement: input.digestion.hadBowelMovement,
    digestion_abdominal_discomfort: input.digestion.abdominalDiscomfort,
    digestion_constipation_feeling: input.digestion.constipationFeeling,
    digestion_hydration: input.digestion.hydration,
    digestion_health_alert: input.digestion.healthAlert,
    procrastination_avoided_important_task: input.procrastination.avoidedImportantTask,
    procrastination_avoided_tasks_count: input.procrastination.avoidedTasksCount,
    procrastination_blockage_level: input.procrastination.blockageLevel,
    procrastination_main_cause: input.procrastination.mainCause,
    scroll_useless_minutes: input.scroll.uselessScrollMinutes,
    scroll_unintentional_opens: input.scroll.unintentionalOpens,
    scroll_loss_of_control: input.scroll.lossOfControl,
    scroll_main_moment: input.scroll.mainMoment,
    aggression_irritability_level: input.aggression.irritabilityLevel,
    aggression_disproportionate_reaction: input.aggression.disproportionateReaction,
    aggression_incidents_count: input.aggression.incidentsCount,
    aggression_main_trigger: input.aggression.mainTrigger,
    global_stress_level: input.global.stressLevel,
    global_relief_level: input.global.reliefLevel,
    global_energy_level: input.global.energyLevel,
    global_note: input.global.note || null,
    sleep_score: scores.sleepScore,
    digestion_score: scores.digestionScore,
    procrastination_score: scores.procrastinationScore,
    scroll_score: scores.scrollScore,
    aggression_score: scores.aggressionScore,
    global_stress_signal_score: scores.globalStressSignalScore
  };
}

export async function getProfile(userId: string, supabase?: DbClient) {
  const client = supabase ?? (await createServerClient());
  const { data, error } = await client.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (error) throw error;
  return data ? mapProfile(data) : null;
}

export async function updateProfile(
  userId: string,
  input: Partial<Pick<Profile, "firstName" | "mainGoal" | "reminderEnabled" | "reminderTime">>,
  supabase?: DbClient
) {
  const client = supabase ?? (await createServerClient());
  const { data, error } = await client
    .from("profiles")
    .update({
      first_name: input.firstName,
      main_goal: input.mainGoal,
      reminder_enabled: input.reminderEnabled,
      reminder_time: input.reminderTime,
      updated_at: new Date().toISOString()
    })
    .eq("id", userId)
    .select("*")
    .single();
  if (error) throw error;
  return mapProfile(data);
}

export async function saveCheckin(userId: string, checkinInput: CheckinInput, supabase?: DbClient) {
  const client = supabase ?? (await createServerClient());
  const row = checkinToRow(userId, checkinInput);
  const { data, error } = await client
    .from("checkins")
    .upsert(row, { onConflict: "user_id,date" })
    .select("*")
    .single();
  if (error) throw error;
  return mapCheckin(data);
}

export async function getTodayCheckin(userId: string, supabase?: DbClient) {
  const client = supabase ?? (await createServerClient());
  const { data, error } = await client
    .from("checkins")
    .select("*")
    .eq("user_id", userId)
    .eq("date", toDateKey())
    .maybeSingle();
  if (error) throw error;
  return data ? mapCheckin(data) : null;
}

export async function getCheckinsForLast7Days(userId: string, supabase?: DbClient) {
  const client = supabase ?? (await createServerClient());
  const days = getLastDays(7);
  const { data, error } = await client
    .from("checkins")
    .select("*")
    .eq("user_id", userId)
    .gte("date", days[0])
    .lte("date", days[days.length - 1])
    .order("date", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapCheckin);
}

export async function getAllCheckins(userId: string, supabase?: DbClient) {
  const client = supabase ?? (await createServerClient());
  const { data, error } = await client
    .from("checkins")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapCheckin);
}

export async function saveActionSession(userId: string, input: ActionSessionInput, supabase?: DbClient) {
  const client = supabase ?? (await createServerClient());
  const { data, error } = await client
    .from("action_sessions")
    .insert({
      user_id: userId,
      checkin_id: input.checkinId,
      date: input.date,
      metric: input.metric,
      action_name: input.actionName,
      completed: input.completed,
      stress_before: input.stressBefore ?? null,
      stress_after: input.stressAfter ?? null,
      relief_after: input.reliefAfter ?? null,
      helped: input.helped ?? null,
      note: input.note || null
    })
    .select("*")
    .single();
  if (error) throw error;
  return mapActionSession(data);
}

export async function getActionForCheckin(userId: string, checkinId: string, supabase?: DbClient) {
  const client = supabase ?? (await createServerClient());
  const { data, error } = await client
    .from("action_sessions")
    .select("*")
    .eq("user_id", userId)
    .eq("checkin_id", checkinId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data ? mapActionSession(data) : null;
}

export async function getActionsForCheckins(userId: string, checkinIds: string[], supabase?: DbClient) {
  if (checkinIds.length === 0) return [];
  const client = supabase ?? (await createServerClient());
  const { data, error } = await client
    .from("action_sessions")
    .select("*")
    .eq("user_id", userId)
    .in("checkin_id", checkinIds)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapActionSession);
}

export async function getTodayReport(userId: string, supabase?: DbClient) {
  const client = supabase ?? (await createServerClient());
  const checkin = await getTodayCheckin(userId, client);
  const action = checkin ? await getActionForCheckin(userId, checkin.id, client) : null;
  return buildDailyReport(checkin ?? undefined, action ?? undefined);
}

export async function getWeeklyReport(userId: string, supabase?: DbClient) {
  const client = supabase ?? (await createServerClient());
  const checkins = await getCheckinsForLast7Days(userId, client);
  const actions = await getActionsForCheckins(userId, checkins.map((checkin) => checkin.id), client);
  return buildWeeklyReport(checkins, actions);
}

export async function signOut() {
  const client = await createServerClient();
  await client.auth.signOut();
}

export function userDisplayName(user: User, profile?: Profile | null) {
  return profile?.firstName || user.email || "toi";
}

function normalizeHydration(value: string): Checkin["digestion"]["hydration"] {
  return value === "low" || value === "medium" || value === "good" ? value : "medium";
}

function normalizeHealthAlert(value: string): Checkin["digestion"]["healthAlert"] {
  return value === "strong_pain" || value === "blood" || value === "more_than_3_days" || value === "none"
    ? value
    : "none";
}
