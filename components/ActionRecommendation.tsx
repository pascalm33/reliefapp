"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getRecommendedAction, recommendations } from "@/lib/recommendations";
import { saveActionSessionAction } from "@/app/(protected)/app/actions";
import type { Checkin, MetricKey } from "@/types";
import { metricLabels } from "@/lib/scoring";

export default function ActionRecommendation({ checkin }: { checkin: Checkin | null }) {
  const router = useRouter();
  const params = useSearchParams();
  const [completed, setCompleted] = useState(false);
  const [stressAfter, setStressAfter] = useState(checkin?.global.stressLevel ?? 4);
  const [reliefAfter, setReliefAfter] = useState(checkin?.global.reliefLevel ?? 6);
  const [helped, setHelped] = useState(true);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const recommendation = useMemo(() => {
    const forcedMetric = params.get("metric") as MetricKey | null;
    if (forcedMetric && recommendations[forcedMetric]) return recommendations[forcedMetric];
    return getRecommendedAction(checkin);
  }, [checkin, params]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!checkin) return;
    setError("");
    try {
      await saveActionSessionAction({
        checkinId: checkin.id,
        date: checkin.date,
        metric: recommendation.metric,
        actionName: recommendation.actionName,
        completed: true,
        stressBefore: checkin.global.stressLevel,
        stressAfter,
        reliefAfter,
        helped,
        note
      });
      setCompleted(true);
      setTimeout(() => router.push("/app/daily-report"), 650);
    } catch {
      setError("Impossible d’enregistrer l’action pour le moment.");
    }
  }

  if (!checkin) {
    return (
      <section className="rounded-3xl bg-white p-6 shadow-soft">
        <p className="text-lg font-semibold text-ink">Commence par un check-in.</p>
        <p className="mt-2 text-sm leading-6 text-ink/65">
          L’action recommandée se base sur ton signal le plus haut du jour.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="rounded-[28px] bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold text-leaf">{metricLabels[recommendation.metric]}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">{recommendation.actionName}</h1>
        <p className="mt-2 text-sm text-ink/60">Durée : {recommendation.duration}</p>
        <ol className="mt-5 space-y-3">
          {recommendation.steps.map((step, index) => (
            <li key={step} className="flex gap-3 text-sm leading-6 text-ink/75">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf/10 text-xs font-bold text-leaf">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        {recommendation.medicalNote ? (
          <p className="mt-5 rounded-2xl bg-coral/10 p-4 text-sm leading-6 text-ink/75">
            {recommendation.medicalNote}
          </p>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">Après l’action</h2>
        <ActionRange label="Stress maintenant" value={stressAfter} onChange={setStressAfter} />
        <ActionRange label="Soulagement maintenant" value={reliefAfter} onChange={setReliefAfter} />
        <div className="mt-4">
          <p className="text-sm font-medium text-ink/70">Est-ce que l’action t’a aidé ?</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {[true, false].map((option) => (
              <button
                type="button"
                key={String(option)}
                onClick={() => setHelped(option)}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold ${helped === option ? "bg-leaf text-white" : "bg-mist text-ink/65"}`}
              >
                {option ? "Oui" : "Non"}
              </button>
            ))}
          </div>
        </div>
        <label className="mt-4 block">
          <span className="text-sm font-medium text-ink/70">Note optionnelle</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            className="mt-2 min-h-24 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-leaf"
          />
        </label>
        <button type="submit" className="mt-5 w-full rounded-2xl bg-leaf px-5 py-4 font-semibold text-white">
          J’ai fait l’action
        </button>
        {completed ? <p className="mt-3 text-center text-sm font-medium text-leaf">Action enregistrée.</p> : null}
        {error ? <p className="mt-3 rounded-2xl bg-coral/10 p-3 text-sm text-ink/75">{error}</p> : null}
      </form>
    </section>
  );
}

function ActionRange({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="mt-4 block">
      <span className="flex items-center justify-between text-sm font-medium text-ink/70">
        {label}
        <strong className="text-ink">{value}/10</strong>
      </span>
      <input type="range" min={0} max={10} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 w-full" />
    </label>
  );
}
