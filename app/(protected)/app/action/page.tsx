import { Suspense } from "react";
import ActionRecommendation from "@/components/ActionRecommendation";
import { requireUser } from "@/lib/auth";
import { getTodayCheckin } from "@/lib/repositories";

export default async function ActionPage() {
  const user = await requireUser();
  const checkin = await getTodayCheckin(user.id);

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Action recommandée</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">Une petite action, maintenant.</h1>
      </div>
      <Suspense>
        <ActionRecommendation checkin={checkin} />
      </Suspense>
    </section>
  );
}
