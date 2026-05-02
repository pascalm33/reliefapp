"use client";

import type { ActionSession, Checkin, ReminderSettings } from "@/types";

const CHECKINS_KEY = "relief.checkins";
const ACTIONS_KEY = "relief.actions";
const REMINDER_KEY = "relief.reminder";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getCheckins(): Checkin[] {
  return readJson<Checkin[]>(CHECKINS_KEY, []).sort((a, b) => b.date.localeCompare(a.date));
}

export function saveCheckin(checkin: Checkin): void {
  const existing = getCheckins().filter((item) => item.date !== checkin.date);
  writeJson(CHECKINS_KEY, [checkin, ...existing]);
}

export function getTodayCheckin(dateKey: string): Checkin | undefined {
  return getCheckins().find((checkin) => checkin.date === dateKey);
}

export function getActions(): ActionSession[] {
  return readJson<ActionSession[]>(ACTIONS_KEY, []).sort((a, b) => b.date.localeCompare(a.date));
}

export function saveActionSession(action: ActionSession): void {
  const existing = getActions().filter((item) => item.id !== action.id);
  writeJson(ACTIONS_KEY, [action, ...existing]);
}

export function getActionForCheckin(checkinId: string): ActionSession | undefined {
  return getActions().find((action) => action.checkinId === checkinId);
}

export function getReminderSettings(): ReminderSettings {
  return readJson<ReminderSettings>(REMINDER_KEY, { enabled: false, time: "21:30" });
}

export function saveReminderSettings(settings: ReminderSettings): void {
  writeJson(REMINDER_KEY, settings);
}

export function loadDemoData(checkins: Checkin[], actions: ActionSession[]): void {
  writeJson(CHECKINS_KEY, checkins);
  writeJson(ACTIONS_KEY, actions);
}

export function clearAllData(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CHECKINS_KEY);
  window.localStorage.removeItem(ACTIONS_KEY);
}
