import Link from "next/link";
import { calculateSignalProgress, getSignalDashboardItems } from "@/lib/signals";
import type { DailySignalEntry, MealEntry } from "@/types";

export default function SignalOverview({
  entries,
  meals,
  compact = false
}: {
  entries: DailySignalEntry[];
  meals: MealEntry[];
  compact?: boolean;
}) {
  const progress = calculateSignalProgress(entries, meals);
  const items = getSignalDashboardItems(entries, meals);

  return (
    <section className="space-y-4">
      <div className="rounded-[28px] bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-leaf">État des lieux</p>
            <h2 className="mt-1 text-2xl font-semibold text-ink">
              {progress.completed} / {progress.total} signaux complétés aujourd’hui
            </h2>
          </div>
          <span className="rounded-full bg-leaf/10 px-3 py-1 text-sm font-semibold text-leaf">
            {progress.percentage}%
          </span>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-mist">
          <div className="h-full rounded-full bg-leaf" style={{ width: `${progress.percentage}%` }} />
        </div>
        <p className="mt-3 text-sm leading-6 text-ink/65">{progress.message}</p>
      </div>

      <div className="grid gap-3">
        {items.map((item) => (
          <article key={item.key} className="rounded-[24px] bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-ink">{item.label}</h3>
                <p className="mt-1 text-sm leading-5 text-ink/60">{compact ? item.valueLabel : item.description}</p>
                {!compact ? <p className="mt-2 text-sm font-medium text-ink/75">{item.valueLabel}</p> : null}
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  item.completed ? "bg-leaf/10 text-leaf" : "bg-amber/15 text-ink/70"
                }`}
              >
                {item.statusLabel}
              </span>
            </div>
            <Link
              href={`/app/checkin/${item.key}`}
              className="mt-4 inline-flex w-full justify-center rounded-2xl bg-mist px-4 py-3 text-sm font-semibold text-ink transition hover:bg-sage/20"
            >
              Modifier ce signal
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
