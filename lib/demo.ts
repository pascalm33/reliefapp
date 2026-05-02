import type { ActionSession, Checkin } from "@/types";
import { calculateDailyScores } from "@/lib/scoring";

const dateAtOffset = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date.toISOString().slice(0, 10);
};

function withScores(checkin: Omit<Checkin, "scores">): Checkin {
  return { ...checkin, scores: calculateDailyScores(checkin) };
}

export function createDemoCheckins(): Checkin[] {
  return [6, 5, 4, 3, 2, 1, 0].map((offset, index) =>
    withScores({
      id: `demo-checkin-${offset}`,
      date: dateAtOffset(offset),
      createdAt: new Date(`${dateAtOffset(offset)}T20:30:00`).toISOString(),
      sleep: {
        awakenings: [1, 3, 2, 0, 2, 1, 1][index],
        awakeMinutes: [15, 70, 40, 5, 55, 20, 25][index],
        sleepQuality: [7, 4, 5, 8, 5, 7, 6][index],
        mainCause: ["stress", "pensées", "digestion", "inconnu", "stress", "bruit", "pensées"][index]
      },
      digestion: {
        hadBowelMovement: [true, false, true, true, false, true, true][index],
        abdominalDiscomfort: [2, 7, 4, 1, 6, 2, 3][index],
        constipationFeeling: [2, 8, 5, 1, 7, 2, 3][index],
        hydration: ["good", "low", "medium", "good", "medium", "good", "medium"][index] as Checkin["digestion"]["hydration"],
        healthAlert: ["none", "none", "none", "none", "more_than_3_days", "none", "none"][index] as Checkin["digestion"]["healthAlert"]
      },
      procrastination: {
        avoidedImportantTask: [false, true, true, false, true, false, true][index],
        avoidedTasksCount: [0, 3, 2, 0, 2, 1, 1][index],
        blockageLevel: [2, 8, 6, 2, 7, 3, 4][index],
        mainCause: ["fatigue", "surcharge", "tâche trop floue", "autre", "peur de mal faire", "fatigue", "manque d’envie"][index]
      },
      scroll: {
        uselessScrollMinutes: [25, 95, 60, 20, 80, 35, 45][index],
        unintentionalOpens: [4, 18, 11, 3, 16, 6, 8][index],
        lossOfControl: [2, 8, 6, 2, 7, 3, 4][index],
        mainMoment: ["soir", "lit", "pause travail", "matin", "lit", "soir", "toilettes"][index]
      },
      aggression: {
        irritabilityLevel: [2, 6, 4, 1, 5, 3, 4][index],
        disproportionateReaction: [false, true, false, false, true, false, false][index],
        incidentsCount: [0, 2, 1, 0, 1, 0, 1][index],
        mainTrigger: ["fatigue", "travail", "surcharge", "inconnu", "famille", "frustration", "travail"][index]
      },
      global: {
        stressLevel: [3, 8, 6, 2, 7, 4, 5][index],
        reliefLevel: [6, 3, 4, 7, 4, 6, 5][index],
        energyLevel: [6, 3, 4, 8, 4, 6, 5][index],
        note: index % 2 === 0 ? "Journée observée sans chercher à tout régler." : undefined
      }
    })
  );
}

export function createDemoActions(checkins: Checkin[]): ActionSession[] {
  return checkins.slice(0, 5).map((checkin, index) => ({
    id: `demo-action-${checkin.id}`,
    checkinId: checkin.id,
    date: checkin.date,
    metric: ["scroll", "digestion", "procrastination", "sleep", "aggression"][index] as ActionSession["metric"],
    actionName: ["Pause anti-scroll", "Routine douce digestion", "Démarrage 2 minutes", "Décharge mentale + respiration", "Reset émotionnel"][index],
    completed: index !== 1,
    stressAfter: index !== 1 ? Math.max(0, checkin.global.stressLevel - 2) : undefined,
    reliefAfter: index !== 1 ? Math.min(10, checkin.global.reliefLevel + 2) : undefined,
    helped: index !== 1 ? true : undefined
  }));
}
