import Link from "next/link";
import SignalOverview from "@/components/SignalOverview";
import { requireUser } from "@/lib/auth";
import { getDailySignalState } from "@/lib/repositories";

export default async function CheckinPage() {
  const user = await requireUser();
  const signalState = await getDailySignalState(user.id);

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Check-in par signal</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">Complète un signal à la fois</h1>
        <p className="mt-3 text-sm leading-6 text-ink/65">
          Ouvre uniquement le signal que tu veux renseigner. Les valeurs déjà enregistrées aujourd’hui sont conservées.
        </p>
      </div>
      <Link href="/app/checkin/full" className="block rounded-2xl bg-leaf px-5 py-4 text-center font-semibold text-white shadow-soft">
        Remplir tous les signaux
      </Link>
      <SignalOverview entries={signalState.entries} meals={signalState.meals} />
    </section>
  );
}
