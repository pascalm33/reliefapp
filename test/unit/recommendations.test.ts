import { describe, expect, it } from "vitest";
import { buildActionSession, getRecommendedAction, recommendations } from "@/lib/recommendations";
import type { Checkin } from "@/types";

const checkin: Checkin = {
  id: "checkin-1",
  userId: "user-1",
  date: "2026-05-02",
  createdAt: "2026-05-02T10:00:00.000Z",
  sleep: { awakenings: 0, awakeMinutes: 0, sleepQuality: 8, mainCause: "inconnu" },
  digestion: { hadBowelMovement: true, abdominalDiscomfort: 1, constipationFeeling: 1, hydration: "good", healthAlert: "none" },
  procrastination: { avoidedImportantTask: false, avoidedTasksCount: 0, blockageLevel: 1, mainCause: "fatigue" },
  scroll: { uselessScrollMinutes: 20, unintentionalOpens: 2, lossOfControl: 2, mainMoment: "soir" },
  aggression: { irritabilityLevel: 2, disproportionateReaction: false, incidentsCount: 0, mainTrigger: "fatigue" },
  global: { stressLevel: 3, reliefLevel: 5, energyLevel: 7 },
  scores: {
    sleepScore: 10,
    digestionScore: 95,
    procrastinationScore: 10,
    scrollScore: 20,
    aggressionScore: 12,
    globalStressSignalScore: 30
  }
};

describe("recommendations", () => {
  it("returns sleep recommendation without a checkin", () => {
    expect(getRecommendedAction(null)).toEqual(recommendations.sleep);
  });

  it("returns the recommendation for the dominant metric", () => {
    expect(getRecommendedAction(checkin).metric).toBe("digestion");
    expect(getRecommendedAction(checkin).medicalNote).toContain("avis médical");
  });

  it("builds an action session linked to user and checkin", () => {
    const session = buildActionSession(checkin, recommendations.digestion);

    expect(session.userId).toBe("user-1");
    expect(session.checkinId).toBe("checkin-1");
    expect(session.metric).toBe("digestion");
    expect(session.completed).toBe(false);
  });
});
