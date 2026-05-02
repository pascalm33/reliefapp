import Link from "next/link";
import DailyReport from "@/components/DailyReport";

export default function DailyReportPage() {
  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Fin de journée</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">Rapport du jour</h1>
        </div>
        <Link href="/weekly-report" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm">
          Semaine
        </Link>
      </div>
      <DailyReport />
    </section>
  );
}
