import Link from "next/link";
import { notFound } from "next/navigation";
import SignalEditor from "@/components/SignalEditor";
import { requireUser } from "@/lib/auth";
import { getDailySignalState } from "@/lib/repositories";
import { getSignalDefinition } from "@/lib/signals";

export default async function SignalCheckinPage({
  params
}: {
  params: Promise<{ signalKey: string }>;
}) {
  const { signalKey } = await params;
  const definition = getSignalDefinition(signalKey);
  if (!definition) notFound();

  const user = await requireUser();
  const signalState = await getDailySignalState(user.id);
  const entry = signalState.entries.find((item) => item.signalKey === definition.key);

  return (
    <section className="space-y-5">
      <div>
        <Link href="/app/checkin" className="text-sm font-semibold text-leaf">
          ← Tous les signaux
        </Link>
        <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-leaf">Modification individuelle</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">{definition.label}</h1>
        <p className="mt-3 text-sm leading-6 text-ink/65">{definition.description}</p>
      </div>
      <SignalEditor definition={definition} entry={entry} meals={signalState.meals} />
    </section>
  );
}
