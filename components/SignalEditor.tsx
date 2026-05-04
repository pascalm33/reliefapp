"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState, useTransition } from "react";
import {
  deleteMealEntryAction,
  saveDailySignalEntryAction,
  saveMealEntryAction
} from "@/app/(protected)/app/actions";
import type { DailySignalEntry, MealEntry, MealType, SignalDefinition, SignalValue } from "@/types";

const mealLabels: Record<MealType, string> = {
  breakfast: "Petit-déjeuner",
  lunch: "Déjeuner",
  dinner: "Dîner",
  snack: "Collation",
  other: "Autre"
};

export default function SignalEditor({
  definition,
  entry,
  meals
}: {
  definition: SignalDefinition;
  entry?: DailySignalEntry;
  meals: MealEntry[];
}) {
  if (definition.inputType === "meal") {
    return <MealEditor meals={meals} />;
  }
  return <StandardSignalEditor definition={definition} entry={entry} />;
}

function StandardSignalEditor({
  definition,
  entry
}: {
  definition: SignalDefinition;
  entry?: DailySignalEntry;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const initialValue = useMemo(() => {
    const value = entry?.value;
    if (typeof value === "object" && value !== null && "value" in value) return String(value.value ?? "");
    if (value === undefined || value === null) return "";
    return String(value);
  }, [entry]);
  const [value, setValue] = useState(initialValue || (definition.inputType === "scale" ? "5" : ""));
  const [note, setNote] = useState(entry?.note ?? "");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const parsedValue: SignalValue =
      definition.inputType === "number" || definition.inputType === "scale"
        ? { value: Number(value) }
        : { value };

    startTransition(async () => {
      try {
        await saveDailySignalEntryAction({
          signalKey: definition.key,
          value: parsedValue,
          note
        });
        router.push("/app/dashboard");
        router.refresh();
      } catch {
        setError("Impossible d’enregistrer ce signal pour le moment.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-[28px] bg-white p-5 shadow-soft">
      <div>
        <label htmlFor="signal-value" className="text-sm font-medium text-ink/70">
          {definition.valueLabel}
        </label>
        {definition.inputType === "scale" ? (
          <>
            <div className="mt-2 flex items-center justify-between text-sm text-ink/65">
              <span>0</span>
              <strong className="text-ink">{value}/10</strong>
              <span>10</span>
            </div>
            <input
              id="signal-value"
              type="range"
              min={0}
              max={10}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className="mt-3 w-full"
            />
          </>
        ) : (
          <input
            id="signal-value"
            required
            type={definition.inputType === "number" ? "number" : "text"}
            min={0}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="mt-2 min-h-12 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-leaf"
          />
        )}
      </div>

      <label className="block">
        <span className="text-sm font-medium text-ink/70">Note optionnelle</span>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          className="mt-2 min-h-24 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-leaf"
        />
      </label>

      {error ? <p className="rounded-2xl bg-coral/10 p-3 text-sm text-ink/75">{error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-2xl bg-leaf px-5 py-4 font-semibold text-white shadow-soft disabled:opacity-60"
      >
        {pending ? "Enregistrement..." : "Enregistrer ce signal"}
      </button>
    </form>
  );
}

function MealEditor({ meals }: { meals: MealEntry[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const editingMeal = meals.find((meal) => meal.id === editingId);
  const [mealTime, setMealTime] = useState("12:30");
  const [mealType, setMealType] = useState<MealType>("lunch");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  function startEdit(meal: MealEntry) {
    setEditingId(meal.id);
    setMealTime(meal.mealTime);
    setMealType(meal.mealType ?? "other");
    setContent(meal.content);
  }

  function resetForm() {
    setEditingId(null);
    setMealTime("12:30");
    setMealType("lunch");
    setContent("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    startTransition(async () => {
      try {
        await saveMealEntryAction({
          id: editingId ?? undefined,
          mealTime,
          mealType,
          content
        });
        resetForm();
        router.refresh();
      } catch {
        setError("Impossible d’enregistrer ce repas pour le moment.");
      }
    });
  }

  function handleDelete(mealId: string) {
    setError("");
    startTransition(async () => {
      try {
        await deleteMealEntryAction(mealId);
        if (editingId === mealId) resetForm();
        router.refresh();
      } catch {
        setError("Impossible de supprimer ce repas pour le moment.");
      }
    });
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-[28px] bg-white p-5 shadow-soft">
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className="text-sm font-medium text-ink/70">Heure du repas</span>
            <input
              type="time"
              required
              value={mealTime}
              onChange={(event) => setMealTime(event.target.value)}
              className="mt-2 min-h-12 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-leaf"
            />
          </label>
          <label>
            <span className="text-sm font-medium text-ink/70">Type</span>
            <select
              value={mealType}
              onChange={(event) => setMealType(event.target.value as MealType)}
              className="mt-2 min-h-12 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-leaf"
            >
              {Object.entries(mealLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-medium text-ink/70">Ce que tu as mangé</span>
          <textarea
            required
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="mt-2 min-h-24 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-leaf"
          />
        </label>
        {error ? <p className="rounded-2xl bg-coral/10 p-3 text-sm text-ink/75">{error}</p> : null}
        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="submit"
            disabled={pending}
            className="rounded-2xl bg-leaf px-5 py-4 font-semibold text-white shadow-soft disabled:opacity-60"
          >
            {pending ? "Enregistrement..." : editingMeal ? "Modifier ce repas" : "Ajouter ce repas"}
          </button>
          {editingMeal ? (
            <button type="button" onClick={resetForm} className="rounded-2xl bg-mist px-5 py-4 font-semibold text-ink">
              Annuler
            </button>
          ) : null}
        </div>
      </form>

      <div className="space-y-3">
        {meals.length === 0 ? (
          <p className="rounded-3xl bg-white p-5 text-sm text-ink/65 shadow-sm">Aucun repas renseigné aujourd’hui.</p>
        ) : (
          meals.map((meal) => (
            <article key={meal.id} className="rounded-3xl bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">
                    {meal.mealTime} · {meal.mealType ? mealLabels[meal.mealType] : "Repas"}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-ink/70">{meal.content}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => startEdit(meal)} className="rounded-2xl bg-mist px-4 py-3 text-sm font-semibold text-ink">
                  Modifier
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(meal.id)}
                  className="rounded-2xl bg-coral/10 px-4 py-3 text-sm font-semibold text-ink/75"
                >
                  Supprimer
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
