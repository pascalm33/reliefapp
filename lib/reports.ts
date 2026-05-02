import type { ActionSession, Checkin, MetricKey } from "@/types";
import { getDominantMetric, getLowestMetric, metricLabels } from "@/lib/scoring";

export function buildDailyReport(checkin?: Checkin, action?: ActionSession) {
  if (!checkin) return null;

  const dominant = getDominantMetric(checkin);
  const lowest = getLowestMetric(checkin);
  const reliefDelta =
    action?.reliefAfter !== undefined ? action.reliefAfter - checkin.global.reliefLevel : undefined;

  const positiveLines = [
    "Tu as pris le temps d’observer tes signaux, c’est déjà un effort utile.",
    action?.completed && reliefDelta !== undefined && reliefDelta > 0
      ? `Ton soulagement a progressé après l’action : bon signal.`
      : "Même si la journée a été tendue, tu as identifié un déclencheur.",
    "Tu n’as pas tout contrôlé, mais tu as fait un check-in. C’est un progrès."
  ];

  return {
    score: checkin.scores.globalStressSignalScore,
    dominant,
    lowest,
    actionCompleted: Boolean(action?.completed),
    reliefDelta,
    positiveLine: positiveLines.find(Boolean) ?? positiveLines[0],
    wentWell: [
      "Tu as fait ton check-in",
      "Tu as identifié ton principal signal de stress",
      action?.completed ? "Tu as essayé une action courte" : "Tu sais quelle action tester ensuite"
    ],
    effort:
      dominant.key === "scroll"
        ? "Réduire le scroll"
        : dominant.key === "procrastination"
          ? "Commencer une tâche évitée"
          : dominant.key === "aggression"
            ? "Prendre une pause avant de répondre"
            : dominant.key === "digestion"
              ? "Installer une routine digestion douce"
              : "Décharger les pensées avant la nuit",
    tomorrow: [
      "Faire le check-in plus tôt",
      "Lancer une action dès que le score dépasse 60",
      "Éviter le téléphone au lit"
    ]
  };
}

export function buildWeeklyReport(checkins: Checkin[], actions: ActionSession[]) {
  const week = [...checkins]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-7);

  if (week.length === 0) return null;

  const averageScore = Math.round(
    week.reduce((total, checkin) => total + checkin.scores.globalStressSignalScore, 0) / week.length
  );
  const bestDay = [...week].sort((a, b) => a.scores.globalStressSignalScore - b.scores.globalStressSignalScore)[0];
  const hardestDay = [...week].sort((a, b) => b.scores.globalStressSignalScore - a.scores.globalStressSignalScore)[0];
  const dominantCounts = week.reduce(
    (counts, checkin) => {
      const key = getDominantMetric(checkin).key;
      counts[key] = (counts[key] ?? 0) + 1;
      return counts;
    },
    {} as Record<MetricKey, number>
  );
  const recurringMetric = (Object.entries(dominantCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    "sleep") as MetricKey;
  const weekActionIds = new Set(week.map((checkin) => checkin.id));
  const weekActions = actions.filter((action) => weekActionIds.has(action.checkinId));
  const completedActions = weekActions.filter((action) => action.completed);
  const actionRate = week.length ? Math.round((completedActions.length / week.length) * 100) : 0;
  const firstHalf = week.slice(0, Math.max(1, Math.floor(week.length / 2)));
  const secondHalf = week.slice(Math.floor(week.length / 2));
  const firstAvg = average(firstHalf.map((item) => item.scores.globalStressSignalScore));
  const secondAvg = average(secondHalf.map((item) => item.scores.globalStressSignalScore));
  const evolution = Math.round(secondAvg - firstAvg);

  return {
    averageScore,
    bestDay,
    hardestDay,
    recurringMetric,
    checkinsCount: week.length,
    actionsCount: completedActions.length,
    actionRate,
    evolution,
    efforts: [
      recurringMetric === "scroll" ? "Continuer à réduire le téléphone au lit." : "Lancer une action courte plus tôt.",
      recurringMetric === "sleep" ? "Créer une micro-routine après le réveil nocturne." : "Garder un moment de récupération sans écran.",
      recurringMetric === "procrastination" ? "Commencer les tâches en version 2 minutes." : "Transformer le signal dominant en prochaine petite action."
    ],
    victories: [
      `Tu as fait ${week.length} check-ins cette semaine.`,
      completedActions.length > 0
        ? `Tu as réalisé ${completedActions.length} action${completedActions.length > 1 ? "s" : ""}.`
        : "Tu as repéré les moments à risque.",
      `Le signal le plus fréquent était ${metricLabels[recurringMetric].toLowerCase()}, tu sais où concentrer l’effort.`
    ],
    recommendation: `La semaine prochaine, garde une attention douce sur ${metricLabels[recurringMetric].toLowerCase()} et lance l’action associée dès que le score dépasse 60.`
  };
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}
