import { Suspense } from "react";
import ActionRecommendation from "@/components/ActionRecommendation";

export default function ActionPage() {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Action recommandée</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">Une petite action, maintenant.</h1>
      </div>
      <Suspense>
        <ActionRecommendation />
      </Suspense>
    </section>
  );
}
