import { requireUser } from "@/lib/auth";
import { formatDisplayDate } from "@/lib/dates";
import { getActionsForCheckins, getAllCheckins } from "@/lib/repositories";
import { getDominantMetric, getMetricSummaries } from "@/lib/scoring";

export default async function HistoryPage() {
  const user = await requireUser();
  const checkins = await getAllCheckins(user.id);
  const actions = await getActionsForCheckins(user.id, checkins.map((checkin) => checkin.id));

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
              <details key={checkin.id} className="rounded-3xl bg-white p-4 shadow-sm">
                <summary className="cursor-pointer list-none">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-ink">{formatDisplayDate(checkin.date)}</p>
                      <p className="mt-1 text-sm text-ink/60">Dominant : {dominant.label}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold text-ink">{checkin.scores.globalStressSignalScore}</p>
                      <p className="text-xs text-ink/50">{action?.completed ? "action faite" : "sans action"}</p>
                    </div>
                  </div>
                </summary>
                <div className="mt-4 grid gap-2">
                  {getMetricSummaries(checkin).map((metric) => (
                    <div key={metric.key} className="flex items-center justify-between rounded-2xl bg-mist px-4 py-3">
                      <span className="text-sm font-medium text-ink/70">{metric.label}</span>
                      <strong className="text-ink">{metric.score}</strong>
                    </div>
                  ))}
                </div>
                {checkin.global.note ? (
                  <p className="mt-4 rounded-2xl bg-leaf/10 p-4 text-sm leading-6 text-ink/70">{checkin.global.note}</p>
                ) : null}
              </details>
            );
          })}
        </div>
      )}
    </section>
  );
}
