import WeeklyReport from "@/components/WeeklyReport";

export default function WeeklyReportPage() {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-leaf">7 derniers jours</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">Rapport semaine</h1>
      </div>
      <WeeklyReport />
    </section>
  );
}
