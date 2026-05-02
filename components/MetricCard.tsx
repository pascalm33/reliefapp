"use client";

import Link from "next/link";
import type { MetricKey, Trend } from "@/types";
import { getScoreState } from "@/lib/scoring";

const trendLabels: Record<Trend, string> = {
  improvement: "amélioration",
  stable: "stable",
  decline: "dégradation"
};

export default function MetricCard({
  metric,
  label,
  score,
  trend
}: {
  metric: MetricKey;
  label: string;
  score: number;
  trend: Trend;
}) {
  const state = getScoreState(score);

  return (
    <article className="rounded-3xl border border-ink/8 bg-white/90 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-ink">{label}</p>
          <p className="mt-1 text-xs text-ink/55">Tendance : {trendLabels[trend]}</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${state.bg} ${state.tone}`}>
          {score}
        </span>
      </div>
      <Link
        href={`/action?metric=${metric}`}
        className="mt-4 block rounded-2xl bg-ink px-4 py-3 text-center text-sm font-semibold text-white"
      >
        Agir maintenant
      </Link>
    </article>
  );
}
