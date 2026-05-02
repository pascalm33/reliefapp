import Link from "next/link";
import DailyReport from "@/components/DailyReport";
import { requireUser } from "@/lib/auth";
import { getActionForCheckin, getTodayCheckin } from "@/lib/repositories";

export default async function DailyReportPage() {
  const user = await requireUser();
  const checkin = await getTodayCheckin(user.id);
  const action = checkin ? await getActionForCheckin(user.id, checkin.id) : null;

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Fin de journée</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">Rapport du jour</h1>
        </div>
        <Link href="/app/weekly-report" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm">
          Semaine
        </Link>
      </div>
      <DailyReport checkin={checkin} action={action} />
    </section>
  );
}
