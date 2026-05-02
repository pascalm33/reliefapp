import { describe, expect, it } from "vitest";
import { calculateDailyScores, getDominantMetric, getLowestMetric, getScoreState } from "@/lib/scoring";
import type { Checkin } from "@/types";

function baseCheckin(overrides: Partial<Omit<Checkin, "scores">> = {}): Omit<Checkin, "scores"> {
  return {
    id: "checkin-1",
    userId: "user-1",
    date: "2026-05-02",
    createdAt: "2026-05-02T10:00:00.000Z",
    sleep: { awakenings: 1, awakeMinutes: 20, sleepQuality: 6, mainCause: "stress" },
    digestion: {
      hadBowelMovement: true,
      abdominalDiscomfort: 2,
      constipationFeeling: 2,
      hydration: "medium",
      healthAlert: "none"
    },
    procrastination: {
      avoidedImportantTask: false,
      avoidedTasksCount: 1,
      blockageLevel: 3,
      mainCause: "fatigue"
    },
    scroll: { uselessScrollMinutes: 30, unintentionalOpens: 5, lossOfControl: 3, mainMoment: "soir" },
    aggression: { irritabilityLevel: 2, disproportionateReaction: false, incidentsCount: 0, mainTrigger: "fatigue" },
    global: { stressLevel: 4, reliefLevel: 5, energyLevel: 6 },
    ...overrides
  };
}

describe("calculateDailyScores", () => {
  it("calculates weighted daily scores deterministically", () => {
    const scores = calculateDailyScores(baseCheckin());

    expect(scores).toEqual({
      sleepScore: 45,
      digestionScore: 27,
      procrastinationScore: 28,
      scrollScore: 45,
      aggressionScore: 12,
      globalStressSignalScore: 32
    });
  });

  it("clamps every score to 100", () => {
    const scores = calculateDailyScores(
      baseCheckin({
        sleep: { awakenings: 99, awakeMinutes: 999, sleepQuality: 0, mainCause: "stress" },
        digestion: {
          hadBowelMovement: false,
          abdominalDiscomfort: 99,
          constipationFeeling: 99,
          hydration: "low",
          healthAlert: "strong_pain"
        },
        procrastination: { avoidedImportantTask: true, avoidedTasksCount: 99, blockageLevel: 99, mainCause: "surcharge" },
        scroll: { uselessScrollMinutes: 999, unintentionalOpens: 99, lossOfControl: 99, mainMoment: "lit" },
        aggression: { irritabilityLevel: 99, disproportionateReaction: true, incidentsCount: 99, mainTrigger: "travail" }
      })
    );

    expect(Object.values(scores).every((score) => score === 100)).toBe(true);
  });
});

describe("metric helpers", () => {
  it("returns dominant and lowest metric", () => {
    const checkin: Checkin = {
      ...baseCheckin(),
      scores: {
        sleepScore: 10,
        digestionScore: 20,
        procrastinationScore: 80,
        scrollScore: 50,
        aggressionScore: 5,
        globalStressSignalScore: 35
      }
    };

    expect(getDominantMetric(checkin).key).toBe("procrastination");
    expect(getLowestMetric(checkin).key).toBe("aggression");
  });

  it("maps score state thresholds", () => {
    expect(getScoreState(30).label).toBe("Stable");
    expect(getScoreState(60).label).toBe("A surveiller");
    expect(getScoreState(80).label).toBe("Stress eleve");
    expect(getScoreState(81).label).toBe("Signal fort");
  });
});
