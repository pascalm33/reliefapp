import { describe, expect, it } from "vitest";
import { buildDailyReport, buildWeeklyReport } from "@/lib/reports";
import type { ActionSession, Checkin, MetricKey } from "@/types";

function makeCheckin(day: number, score: number, dominant: MetricKey = "scroll"): Checkin {
  return {
    id: `checkin-${day}`,
    userId: "user-1",
    date: `2026-05-${String(day).padStart(2, "0")}`,
    createdAt: `2026-05-${String(day).padStart(2, "0")}T10:00:00.000Z`,
    sleep: { awakenings: 0, awakeMinutes: 0, sleepQuality: 8, mainCause: "inconnu" },
    digestion: { hadBowelMovement: true, abdominalDiscomfort: 1, constipationFeeling: 1, hydration: "good", healthAlert: "none" },
    procrastination: { avoidedImportantTask: false, avoidedTasksCount: 0, blockageLevel: 1, mainCause: "fatigue" },
    scroll: { uselessScrollMinutes: 20, unintentionalOpens: 2, lossOfControl: 2, mainMoment: "soir" },
    aggression: { irritabilityLevel: 2, disproportionateReaction: false, incidentsCount: 0, mainTrigger: "fatigue" },
    global: { stressLevel: 5, reliefLevel: 4, energyLevel: 7 },
    scores: {
      sleepScore: dominant === "sleep" ? score : 10,
      digestionScore: dominant === "digestion" ? score : 12,
      procrastinationScore: dominant === "procrastination" ? score : 14,
      scrollScore: dominant === "scroll" ? score : 16,
      aggressionScore: dominant === "aggression" ? score : 18,
      globalStressSignalScore: score
    }
  };
}

describe("buildDailyReport", () => {
  it("returns null without a checkin", () => {
    expect(buildDailyReport()).toBeNull();
  });

  it("includes relief delta and action status", () => {
    const checkin = makeCheckin(2, 70, "scroll");
    const action: ActionSession = {
      id: "action-1",
      userId: "user-1",
      checkinId: checkin.id,
      date: checkin.date,
      metric: "scroll",
      actionName: "Pause anti-scroll",
      completed: true,
      reliefAfter: 7
    };

    const report = buildDailyReport(checkin, action);

    expect(report?.dominant.key).toBe("scroll");
    expect(report?.actionCompleted).toBe(true);
    expect(report?.reliefDelta).toBe(3);
  });
});

describe("buildWeeklyReport", () => {
  it("summarizes the latest seven checkins", () => {
    const checkins = Array.from({ length: 8 }, (_, index) => makeCheckin(index + 1, 20 + index * 5, index < 4 ? "scroll" : "sleep"));
    const actions: ActionSession[] = checkins.slice(2, 6).map((checkin) => ({
      id: `action-${checkin.id}`,
      userId: checkin.userId,
      checkinId: checkin.id,
      date: checkin.date,
      metric: "scroll",
      actionName: "Pause anti-scroll",
      completed: true
    }));

    const report = buildWeeklyReport(checkins, actions);

    expect(report?.checkinsCount).toBe(7);
    expect(report?.actionsCount).toBe(4);
    expect(report?.bestDay.date).toBe("2026-05-02");
    expect(report?.hardestDay.date).toBe("2026-05-08");
  });
});
