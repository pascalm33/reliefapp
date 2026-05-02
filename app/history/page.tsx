"use client";

import { useEffect, useState } from "react";
import { formatDisplayDate } from "@/lib/dates";
import { getActions, getCheckins } from "@/lib/storage";
import { getDominantMetric, getMetricSummaries } from "@/lib/scoring";
import type { ActionSession, Checkin } from "@/types";

export default function HistoryPage() {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [actions, setActions] = useState<ActionSession[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const loaded = getCheckins();
    setCheckins(loaded);
    setActions(getActions());
    setSelectedId(loaded[0]?.id ?? null);
  }, []);

  const selected = checkins.find((checkin) => checkin.id === selectedId);

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Historique</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">Tes check-ins</h1>
      </div>

      {checkins.length === 0 ? (
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <p className="font-semibold text-ink">Aucun check-in enregistré.</p>
          <p className="mt-2 text-sm text-ink/65">Ajoute ton premier check-in ou charge les données de démo.</p>
        </section>
      ) : (
        <div className="space-y-3">
          {checkins.map((checkin) => {
            const dominant = getDominantMetric(checkin);
            const action = actions.find((item) => item.checkinId === checkin.id);
            return (
              <button
                key={checkin.id}
                type="button"
                onClick={() => setSelectedId(checkin.id)}
                className={`w-full rounded-3xl p-4 text-left shadow-sm ${
                  selectedId === checkin.id ? "bg-ink text-white" : "bg-white text-ink"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{formatDisplayDate(checkin.date)}</p>
                    <p className={`mt-1 text-sm ${selectedId === checkin.id ? "text-white/70" : "text-ink/60"}`}>
                      Dominant : {dominant.label}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold">{checkin.scores.globalStressSignalScore}</p>
                    <p className={`text-xs ${selectedId === checkin.id ? "text-white/70" : "text-ink/50"}`}>
                      {action?.completed ? "action faite" : "sans action"}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {selected ? (
        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">Détail du jour</h2>
          <div className="mt-4 grid gap-2">
            {getMetricSummaries(selected).map((metric) => (
              <div key={metric.key} className="flex items-center justify-between rounded-2xl bg-mist px-4 py-3">
                <span className="text-sm font-medium text-ink/70">{metric.label}</span>
                <strong className="text-ink">{metric.score}</strong>
              </div>
            ))}
          </div>
          {selected.global.note ? (
            <p className="mt-4 rounded-2xl bg-leaf/10 p-4 text-sm leading-6 text-ink/70">{selected.global.note}</p>
          ) : null}
        </section>
      ) : null}
    </section>
  );
}
