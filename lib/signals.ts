import { toDateKey } from "@/lib/dates";
import type {
  DailySignalEntry,
  MealEntry,
  SignalDefinition,
  SignalKey,
  SignalValue
} from "@/types";

export const signalDefinitions: SignalDefinition[] = [
  {
    key: "sleep_awakenings",
    label: "Réveils nocturnes",
    description: "Nombre de réveils et temps éveillé cette nuit.",
    valueLabel: "Réveils cette nuit",
    inputType: "number",
    unit: "réveil(s)"
  },
  {
    key: "procrastination",
    label: "Procrastination",
    description: "Niveau de blocage ou tâches évitées aujourd’hui.",
    valueLabel: "Niveau de blocage",
    inputType: "scale",
    unit: "/10"
  },
  {
    key: "digestion",
    label: "Constipation / troubles digestifs",
    description: "Inconfort abdominal, transit ou sensation de constipation.",
    valueLabel: "Inconfort digestif",
    inputType: "scale",
    unit: "/10"
  },
  {
    key: "scroll",
    label: "Scroll compulsif",
    description: "Temps de scroll inutile ou ouvertures sans intention.",
    valueLabel: "Minutes de scroll inutile",
    inputType: "number",
    unit: "min"
  },
  {
    key: "aggression",
    label: "Agressivité / irritabilité",
    description: "Irritabilité, tensions ou réaction disproportionnée.",
    valueLabel: "Niveau d’irritabilité",
    inputType: "scale",
    unit: "/10"
  },
  {
    key: "global_stress",
    label: "Niveau de stress global",
    description: "Stress ressenti maintenant.",
    valueLabel: "Stress maintenant",
    inputType: "scale",
    unit: "/10"
  },
  {
    key: "energy",
    label: "Énergie",
    description: "Niveau d’énergie disponible aujourd’hui.",
    valueLabel: "Énergie",
    inputType: "scale",
    unit: "/10"
  },
  {
    key: "mood",
    label: "Humeur",
    description: "Humeur dominante de la journée.",
    valueLabel: "Humeur",
    inputType: "text"
  },
  {
    key: "food",
    label: "Alimentation",
    description: "Repas ou collations renseignés aujourd’hui.",
    valueLabel: "Repas renseignés",
    inputType: "meal"
  }
];

export function getSignalDefinition(signalKey: string) {
  return signalDefinitions.find((signal) => signal.key === signalKey);
}

export function isSignalKey(signalKey: string): signalKey is SignalKey {
  return signalDefinitions.some((signal) => signal.key === signalKey);
}

export function getSignalValueLabel(
  definition: SignalDefinition,
  entry?: DailySignalEntry,
  meals: MealEntry[] = []
) {
  if (definition.key === "food") {
    if (meals.length === 0) return "Aucun repas renseigné";
    return `${meals.length} repas renseigné${meals.length > 1 ? "s" : ""}`;
  }

  if (!entry) return "Aucune valeur";
  const value = entry.value;
  const rawValue = typeof value === "object" && value !== null && "value" in value ? value.value : value;
  if (rawValue === undefined || rawValue === null || rawValue === "") return "Aucune valeur";
  return `${String(rawValue)}${definition.unit ? ` ${definition.unit}` : ""}`;
}

export function isSignalCompleted(
  signalKey: SignalKey,
  entries: DailySignalEntry[],
  meals: MealEntry[] = []
) {
  if (signalKey === "food") return meals.length > 0;
  return entries.some((entry) => entry.signalKey === signalKey && Boolean(entry.completedAt));
}

export function getSignalDashboardItems(entries: DailySignalEntry[], meals: MealEntry[] = []) {
  return signalDefinitions.map((definition) => {
    const entry = entries.find((item) => item.signalKey === definition.key);
    const completed = isSignalCompleted(definition.key, entries, meals);
    return {
      ...definition,
      completed,
      statusLabel: completed ? "Complété" : "À compléter",
      valueLabel: getSignalValueLabel(definition, entry, meals),
      entry
    };
  });
}

export function calculateSignalProgress(entries: DailySignalEntry[], meals: MealEntry[] = []) {
  const items = getSignalDashboardItems(entries, meals);
  const completed = items.filter((item) => item.completed).length;
  const total = items.length;
  const message =
    completed === 0
      ? "Commence par observer un premier signal."
      : completed === total
        ? "État des lieux complet pour aujourd’hui."
        : "Ton état des lieux est en cours.";

  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    message
  };
}

export function createSignalEntry({
  id = "draft",
  checkinId,
  signalKey,
  value,
  note,
  date = toDateKey()
}: {
  id?: string;
  checkinId: string;
  signalKey: SignalKey;
  value: SignalValue;
  note?: string | null;
  date?: string;
}): DailySignalEntry {
  const timestamp = new Date().toISOString();
  return {
    id,
    checkinId,
    signalKey,
    value,
    note: note ?? null,
    completedAt: timestamp,
    createdAt: timestamp,
    updatedAt: timestamp,
    date
  };
}

export function upsertSignalEntryInList(
  entries: DailySignalEntry[],
  nextEntry: DailySignalEntry
) {
  const existing = entries.findIndex((entry) => entry.signalKey === nextEntry.signalKey);
  if (existing === -1) return [...entries, nextEntry];
  return entries.map((entry, index) => (index === existing ? nextEntry : entry));
}
