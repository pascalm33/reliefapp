import WeeklyReport from "@/components/WeeklyReport";
import { requireUser } from "@/lib/auth";
import { getActionsForCheckins, getCheckinsForLast7Days } from "@/lib/repositories";

export default async function WeeklyReportPage() {
  const user = await requireUser();
  const checkins = await getCheckinsForLast7Days(user.id);
  const actions = await getActionsForCheckins(user.id, checkins.map((checkin) => checkin.id));

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-leaf">7 derniers jours</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">Rapport semaine</h1>
      </div>
      <WeeklyReport checkins={checkins} actions={actions} />
    </section>
  );
}
