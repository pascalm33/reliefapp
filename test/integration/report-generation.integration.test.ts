import { describe, expect, it } from "vitest";
import { buildWeeklyReport } from "@/lib/reports";
import type { ActionSession, Checkin } from "@/types";

function checkin(userId: string, id: string, date: string, score: number): Checkin {
  return {
    id,
    userId,
    date,
    createdAt: `${date}T08:00:00.000Z`,
    sleep: { awakenings: 1, awakeMinutes: 10, sleepQuality: 7, mainCause: "stress" },
    digestion: { hadBowelMovement: true, abdominalDiscomfort: 1, constipationFeeling: 1, hydration: "good", healthAlert: "none" },
    procrastination: { avoidedImportantTask: false, avoidedTasksCount: 0, blockageLevel: 1, mainCause: "fatigue" },
    scroll: { uselessScrollMinutes: 10, unintentionalOpens: 2, lossOfControl: 2, mainMoment: "soir" },
    aggression: { irritabilityLevel: 1, disproportionateReaction: false, incidentsCount: 0, mainTrigger: "fatigue" },
    global: { stressLevel: 4, reliefLevel: 5, energyLevel: 6 },
    scores: {
      sleepScore: score,
      digestionScore: 10,
      procrastinationScore: 10,
      scrollScore: 10,
      aggressionScore: 10,
      globalStressSignalScore: score
    }
  };
}

describe("weekly report integration boundaries", () => {
  it("must be called with already user-scoped data", () => {
    const userOneCheckins = [
      checkin("user-1", "u1-a", "2026-05-01", 40),
      checkin("user-1", "u1-b", "2026-05-02", 50)
    ];
    const actions: ActionSession[] = [
      {
        id: "action-1",
        userId: "user-1",
        checkinId: "u1-a",
        date: "2026-05-01",
        metric: "sleep",
        actionName: "Décharge mentale + respiration",
        completed: true
      }
    ];

    const report = buildWeeklyReport(userOneCheckins, actions);

    expect(report?.checkinsCount).toBe(2);
    expect(report?.actionsCount).toBe(1);
  });
});
