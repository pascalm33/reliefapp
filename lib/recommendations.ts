import type { ActionSession, Checkin, MetricKey } from "@/types";
import { getDominantMetric } from "@/lib/scoring";

export type Recommendation = {
  metric: MetricKey;
  actionName: string;
  duration: string;
  steps: string[];
  medicalNote?: string;
};

export const recommendations: Record<MetricKey, Recommendation> = {
  sleep: {
    metric: "sleep",
    actionName: "Décharge mentale + respiration",
    duration: "3 minutes",
    steps: [
      "Écris en une phrase ce qui tourne dans ta tête.",
      "Note la prochaine petite action possible demain.",
      "Fais 10 respirations lentes : inspire 4 secondes, expire 6 secondes.",
      "Ne cherche pas à résoudre le problème maintenant."
    ]
  },
  digestion: {
    metric: "digestion",
    actionName: "Routine douce digestion",
    duration: "5 minutes",
    steps: [
      "Bois un verre d’eau.",
      "Fais 10 respirations abdominales lentes.",
      "Marche 3 à 5 minutes.",
      "Prévois un passage calme aux toilettes après un repas."
    ],
    medicalNote:
      "Si douleur forte, sang, constipation persistante ou symptôme inquiétant : demande un avis médical."
  },
  procrastination: {
    metric: "procrastination",
    actionName: "Démarrage 2 minutes",
    duration: "2 minutes",
    steps: [
      "Écris la tâche que tu évites.",
      "Transforme-la en une action minuscule.",
      "Lance un timer de 2 minutes.",
      "Objectif : commencer, pas finir."
    ]
  },
  scroll: {
    metric: "scroll",
    actionName: "Pause anti-scroll",
    duration: "3 minutes",
    steps: [
      "Pose ton téléphone hors de portée.",
      "Respire 5 fois lentement.",
      "Note ce que tu cherchais vraiment : repos, distraction, fuite, stimulation ?",
      "Choisis une alternative de 5 minutes : marcher, eau, rangement, respiration, message utile."
    ]
  },
  aggression: {
    metric: "aggression",
    actionName: "Reset émotionnel",
    duration: "90 secondes",
    steps: [
      "Ne réponds pas immédiatement.",
      "Relâche la mâchoire et les épaules.",
      "Inspire 4 secondes, expire 6 secondes pendant 90 secondes.",
      "Écris la réponse que tu voulais envoyer, sans l’envoyer.",
      "Reviens plus tard avec une phrase plus calme."
    ]
  }
};

export function getRecommendedAction(checkin?: Checkin | null): Recommendation {
  if (!checkin) return recommendations.sleep;
  return recommendations[getDominantMetric(checkin).key];
}

export function buildActionSession(checkin: Checkin, recommendation: Recommendation): ActionSession {
  return {
    id: crypto.randomUUID(),
    checkinId: checkin.id,
    date: checkin.date,
    metric: recommendation.metric,
    actionName: recommendation.actionName,
    completed: false
  };
}
