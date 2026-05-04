import Link from "next/link";
import ScoreCard from "@/components/ScoreCard";
import MetricCard from "@/components/MetricCard";
import SignalOverview from "@/components/SignalOverview";
import { requireUser } from "@/lib/auth";
import { getAllCheckins, getDailySignalState, getProfile, getTodayCheckin, userDisplayName } from "@/lib/repositories";
import { getMetricSummaries } from "@/lib/scoring";
import type { Checkin, MetricKey, Trend } from "@/types";

export default async function DashboardPage() {
  const user = await requireUser();
  const [profile, today, checkins, signalState] = await Promise.all([
    getProfile(user.id),
    getTodayCheckin(user.id),
    getAllCheckins(user.id),
    getDailySignalState(user.id)
  ]);
  const previous = today ? checkins.find((checkin) => checkin.date < today.date) : undefined;

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Aujourd’hui</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">
          Bonjour {userDisplayName(user, profile)}
        </h1>
      </div>

      <SignalOverview entries={signalState.entries} meals={signalState.meals} />

      {today ? (
        <>
          <ScoreCard score={today.scores.globalStressSignalScore} />
          <div className="grid gap-3 sm:grid-cols-2">
            {getMetricSummaries(today).map((metric) => (
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
          <p className="text-xl font-semibold text-ink">Aucun check-in complet aujourd’hui.</p>
          <p className="mt-3 text-sm leading-6 text-ink/65">
            Tu peux compléter les signaux un par un, ou remplir le check-in complet pour calculer le score global.
          </p>
        </section>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        <Link href="/app/checkin" className="rounded-2xl bg-leaf px-5 py-4 text-center font-semibold text-white shadow-soft">
          Modifier mes signaux
        </Link>
        <Link href="/app/checkin/full" className="rounded-2xl bg-white px-5 py-4 text-center font-semibold text-ink shadow-sm">
          Remplir tous les signaux
        </Link>
        <Link href="/app/action" className="rounded-2xl bg-ink px-5 py-4 text-center font-semibold text-white shadow-sm">
          Agir maintenant
        </Link>
        <Link href="/app/daily-report" className="rounded-2xl bg-white px-5 py-4 text-center font-semibold text-ink shadow-sm">
          Voir mon rapport
        </Link>
      </div>
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
