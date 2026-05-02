import type { Checkin, DailyScores, MetricKey, MetricSummary } from "@/types";

const clampScore = (score: number) => Math.min(100, Math.max(0, Math.round(score)));

export function calculateDailyScores(checkin: Omit<Checkin, "scores">): DailyScores {
  const sleepScore = clampScore(
    checkin.sleep.awakenings * 15 +
      checkin.sleep.awakeMinutes * 0.5 +
      (10 - checkin.sleep.sleepQuality) * 5
  );

  const digestionScore = clampScore(
    checkin.digestion.abdominalDiscomfort * 5 +
      checkin.digestion.constipationFeeling * 6 +
      (checkin.digestion.hadBowelMovement ? 0 : 20) +
      (checkin.digestion.hydration === "low" ? 15 : checkin.digestion.hydration === "medium" ? 5 : 0) +
      (checkin.digestion.healthAlert === "none" ? 0 : 25)
  );

  const procrastinationScore = clampScore(
    (checkin.procrastination.avoidedImportantTask ? 25 : 0) +
      checkin.procrastination.avoidedTasksCount * 10 +
      checkin.procrastination.blockageLevel * 6
  );

  const scrollScore = clampScore(
    checkin.scroll.uselessScrollMinutes * 0.5 +
      checkin.scroll.unintentionalOpens * 3 +
      checkin.scroll.lossOfControl * 5
  );

  const aggressionScore = clampScore(
    checkin.aggression.irritabilityLevel * 6 +
      (checkin.aggression.disproportionateReaction ? 20 : 0) +
      checkin.aggression.incidentsCount * 10
  );

  const globalStressSignalScore = clampScore(
    sleepScore * 0.25 +
      digestionScore * 0.15 +
      procrastinationScore * 0.2 +
      scrollScore * 0.2 +
      aggressionScore * 0.2
  );

  return {
    sleepScore,
    digestionScore,
    procrastinationScore,
    scrollScore,
    aggressionScore,
    globalStressSignalScore
  };
}

export function getScoreState(score: number): { label: string; tone: string; bg: string } {
  if (score <= 30) return { label: "Stable", tone: "text-leaf", bg: "bg-leaf/10" };
  if (score <= 60) return { label: "A surveiller", tone: "text-amber", bg: "bg-amber/10" };
  if (score <= 80) return { label: "Stress eleve", tone: "text-clay", bg: "bg-clay/10" };
  return { label: "Signal fort", tone: "text-coral", bg: "bg-coral/10" };
}

export const metricLabels: Record<MetricKey, string> = {
  sleep: "Sommeil",
  digestion: "Digestion",
  procrastination: "Procrastination",
  scroll: "Scroll",
  aggression: "Agressivite"
};

export function getMetricSummaries(checkin: Checkin): MetricSummary[] {
  return [
    { key: "sleep", label: metricLabels.sleep, score: checkin.scores.sleepScore },
    { key: "digestion", label: metricLabels.digestion, score: checkin.scores.digestionScore },
    { key: "procrastination", label: metricLabels.procrastination, score: checkin.scores.procrastinationScore },
    { key: "scroll", label: metricLabels.scroll, score: checkin.scores.scrollScore },
    { key: "aggression", label: metricLabels.aggression, score: checkin.scores.aggressionScore }
  ];
}

export function getDominantMetric(checkin: Checkin): MetricSummary {
  return getMetricSummaries(checkin).sort((a, b) => b.score - a.score)[0];
}

export function getLowestMetric(checkin: Checkin): MetricSummary {
  return getMetricSummaries(checkin).sort((a, b) => a.score - b.score)[0];
}
