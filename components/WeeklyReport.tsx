"use client";

import { useEffect, useState } from "react";
import { buildWeeklyReport } from "@/lib/reports";
import { formatDisplayDate } from "@/lib/dates";
import { getActions, getCheckins } from "@/lib/storage";
import { metricLabels } from "@/lib/scoring";
import type { ActionSession, Checkin } from "@/types";
import { EmptyReport, ListCard } from "@/components/DailyReport";

export default function WeeklyReport() {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [actions, setActions] = useState<ActionSession[]>([]);

  useEffect(() => {
    setCheckins(getCheckins());
    setActions(getActions());
  }, []);

  const report = buildWeeklyReport(checkins, actions);

  if (!report) {
    return <EmptyReport message="Aucune donnée pour générer le rapport semaine." />;
  }

  return (
    <section className="space-y-4">
      <div className="rounded-[28px] bg-white p-6 shadow-soft">
        <p className="text-sm font-medium text-ink/60">Rapport semaine</p>
        <p className="mt-2 text-5xl font-semibold text-ink">{report.averageScore}</p>
        <p className="mt-3 text-sm leading-6 text-ink/70">{report.recommendation}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Info label="Meilleur jour" value={`${formatDisplayDate(report.bestDay.date)} · ${report.bestDay.scores.globalStressSignalScore}`} />
        <Info label="Jour difficile" value={`${formatDisplayDate(report.hardestDay.date)} · ${report.hardestDay.scores.globalStressSignalScore}`} />
        <Info label="Signal récurrent" value={metricLabels[report.recurringMetric]} />
        <Info label="Check-ins" value={String(report.checkinsCount)} />
        <Info label="Actions réalisées" value={String(report.actionsCount)} />
        <Info label="Taux d’action" value={`${report.actionRate}%`} />
        <Info label="Évolution" value={`${report.evolution > 0 ? "+" : ""}${report.evolution} pts`} />
      </div>
      <ListCard title="Top 3 victoires" items={report.victories} />
      <ListCard title="Top 3 efforts" items={report.efforts} />
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-ink/45">{label}</p>
      <p className="mt-2 text-base font-semibold text-ink">{value}</p>
    </div>
  );
}
