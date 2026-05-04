import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  calculateSignalProgress,
  createSignalEntry,
  getSignalDashboardItems,
  isSignalCompleted,
  signalDefinitions,
  upsertSignalEntryInList
} from "@/lib/signals";
import type { DailySignalEntry, MealEntry } from "@/types";

const baseEntry: DailySignalEntry = {
  id: "entry-1",
  checkinId: "checkin-1",
  signalKey: "global_stress",
  value: { value: 6 },
  note: null,
  completedAt: "2026-05-04T08:00:00.000Z",
  createdAt: "2026-05-04T08:00:00.000Z",
  updatedAt: "2026-05-04T08:00:00.000Z"
};

const meal: MealEntry = {
  id: "meal-1",
  checkinId: "checkin-1",
  mealTime: "12:30",
  mealType: "lunch",
  content: "Riz, légumes, yaourt",
  createdAt: "2026-05-04T12:30:00.000Z",
  updatedAt: "2026-05-04T12:30:00.000Z"
};

describe("daily signal state", () => {
  it("calculates signal progress", () => {
    const progress = calculateSignalProgress([baseEntry], [meal]);

    expect(progress.completed).toBe(2);
    expect(progress.total).toBe(signalDefinitions.length);
    expect(progress.message).toBe("Ton état des lieux est en cours.");
  });

  it("marks a signal as completed when it has a completed entry for today", () => {
    expect(isSignalCompleted("global_stress", [baseEntry])).toBe(true);
    expect(isSignalCompleted("energy", [baseEntry])).toBe(false);
  });

  it("marks food as completed when at least one meal exists", () => {
    expect(isSignalCompleted("food", [], [meal])).toBe(true);
    expect(isSignalCompleted("food", [], [])).toBe(false);
  });

  it("saves signals independently in a list without replacing other signals", () => {
    const energyEntry = createSignalEntry({
      checkinId: "checkin-1",
      signalKey: "energy",
      value: { value: 7 }
    });
    const entries = upsertSignalEntryInList([baseEntry], energyEntry);

    expect(entries).toHaveLength(2);
    expect(entries.some((entry) => entry.signalKey === "global_stress")).toBe(true);
    expect(entries.some((entry) => entry.signalKey === "energy")).toBe(true);
  });

  it("keeps the complete check-in page available", () => {
    expect(existsSync(resolve(process.cwd(), "app/(protected)/app/checkin/full/page.tsx"))).toBe(true);
  });

  it("builds dashboard items with completed and pending statuses", () => {
    const items = getSignalDashboardItems([baseEntry], [meal]);
    const globalStress = items.find((item) => item.key === "global_stress");
    const food = items.find((item) => item.key === "food");
    const mood = items.find((item) => item.key === "mood");

    expect(globalStress?.statusLabel).toBe("Complété");
    expect(food?.valueLabel).toBe("1 repas renseigné");
    expect(mood?.statusLabel).toBe("À compléter");
  });
});
