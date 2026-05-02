"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ScoreCard from "@/components/ScoreCard";
import MetricCard from "@/components/MetricCard";
import { getCheckins } from "@/lib/storage";
import { getMetricSummaries } from "@/lib/scoring";
import { toDateKey } from "@/lib/dates";
import type { Checkin, MetricKey, Trend } from "@/types";

export default function HomePage() {
  const [checkins, setCheckins] = useState<Checkin[]>([]);

  useEffect(() => {
    setCheckins(getCheckins());
  }, []);

  const today = checkins.find((checkin) => checkin.date === toDateKey()) ?? checkins[0];
  const previous = today ? checkins.find((checkin) => checkin.date < today.date) : undefined;

  const metrics = useMemo(() => (today ? getMetricSummaries(today) : []), [today]);

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-leaf">MVP Relief</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">
          Mesure tes signaux. Fais une action courte.
        </h1>
      </div>

      {today ? (
        <>
          <ScoreCard score={today.scores.globalStressSignalScore} />
          <div className="grid gap-3 sm:grid-cols-2">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.key}
                metric={metric.key}
                label={metric.label}
                score={metric.score}
                trend={getTrend(metric.key, today, previous)}
              />
            ))}
          </div>
        </>
      ) : (
        <section className="rounded-[28px] bg-white p-6 shadow-soft">
          <p className="text-xl font-semibold text-ink">Bienvenue dans Relief.</p>
          <p className="mt-3 text-sm leading-6 text-ink/65">
            Fais ton premier check-in ou charge des données de démo dans les réglages pour explorer les rapports.
          </p>
        </section>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/checkin" className="rounded-2xl bg-leaf px-5 py-4 text-center font-semibold text-white shadow-soft">
          Faire mon check-in
        </Link>
        <Link href="/daily-report" className="rounded-2xl bg-white px-5 py-4 text-center font-semibold text-ink shadow-sm">
          Voir mon rapport
        </Link>
      </div>

      <p className="rounded-3xl bg-white/80 p-4 text-xs leading-5 text-ink/60">
        Relief ne pose pas de diagnostic médical et ne remplace pas un professionnel de santé. En cas de symptôme
        inquiétant, demande un avis médical.
      </p>
    </section>
  );
}

function getTrend(metric: MetricKey, today: Checkin, previous?: Checkin): Trend {
  if (!previous) return "stable";
  const key = `${metric}Score` as keyof Checkin["scores"];
  const delta = Number(today.scores[key]) - Number(previous.scores[key]);
  if (delta <= -5) return "improvement";
  if (delta >= 5) return "decline";
  return "stable";
}
