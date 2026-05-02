import { buildDailyReport } from "@/lib/reports";
import type { ActionSession, Checkin } from "@/types";

export default function DailyReport({ checkin, action }: { checkin: Checkin | null; action: ActionSession | null }) {
  const report = buildDailyReport(checkin ?? undefined, action ?? undefined);

  if (!report) {
    return <EmptyReport message="Aucun check-in pour générer le rapport du jour." />;
  }

  return (
    <section className="space-y-4">
      <div className="rounded-[28px] bg-white p-6 shadow-soft">
        <p className="text-sm font-medium text-ink/60">Rapport du jour</p>
        <p className="mt-2 text-5xl font-semibold text-ink">{report.score}</p>
        <p className="mt-3 text-sm leading-6 text-ink/70">{report.positiveLine}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <InfoCard label="Signal le plus haut" value={`${report.dominant.label} · ${report.dominant.score}`} />
        <InfoCard label="Signal le plus bas" value={`${report.lowest.label} · ${report.lowest.score}`} />
        <InfoCard label="Action réalisée" value={report.actionCompleted ? "Oui" : "Pas encore"} />
        <InfoCard label="Soulagement" value={report.reliefDelta !== undefined ? `${report.reliefDelta > 0 ? "+" : ""}${report.reliefDelta}` : "Non renseigné"} />
      </div>
      <ListCard title="Ce qui s’est bien passé" items={report.wentWell} />
      <ListCard title="Effort du jour" items={[report.effort]} />
      <ListCard title="À tester demain" items={report.tomorrow} />
    </section>
  );
}

export function EmptyReport({ message }: { message: string }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-soft">
      <p className="font-semibold text-ink">{message}</p>
      <p className="mt-2 text-sm leading-6 text-ink/65">Fais un check-in ou charge les données de démo depuis les réglages.</p>
    </section>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-ink/45">{label}</p>
      <p className="mt-2 text-lg font-semibold text-ink">{value}</p>
    </div>
  );
}

export function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-ink">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="rounded-2xl bg-mist px-4 py-3 text-sm leading-6 text-ink/75">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
