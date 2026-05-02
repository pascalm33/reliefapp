"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loadDemoDataAction, signOutAction, updateProfileAction } from "@/app/(protected)/app/actions";
import type { MainGoal, Profile } from "@/types";

export const goalLabels: Record<MainGoal, string> = {
  better_sleep: "mieux dormir",
  reduce_scroll: "réduire le scroll",
  less_procrastination: "moins procrastiner",
  less_irritable: "être moins irritable",
  improve_digestion: "améliorer digestion / constipation",
  reduce_global_stress: "réduire stress global"
};

export default function ProfileForm({
  profile,
  email,
  mode = "settings"
}: {
  profile: Profile;
  email: string | null | undefined;
  mode?: "settings" | "onboarding";
}) {
  const router = useRouter();
  const [firstName, setFirstName] = useState(profile.firstName ?? "");
  const [mainGoal, setMainGoal] = useState<MainGoal | "">((profile.mainGoal as MainGoal | null) ?? "");
  const [reminderEnabled, setReminderEnabled] = useState(profile.reminderEnabled);
  const [reminderTime, setReminderTime] = useState(profile.reminderTime);
  const [status, setStatus] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    startTransition(async () => {
      await updateProfileAction({
        firstName,
        mainGoal: mainGoal || null,
        reminderEnabled,
        reminderTime
      });
      if (reminderEnabled && "Notification" in window) {
        await Notification.requestPermission();
      }
      if (mode === "onboarding") {
        router.push("/app/dashboard");
        router.refresh();
        return;
      }
      setStatus("Réglages sauvegardés.");
      router.refresh();
    });
  }

  function handleDemo() {
    setStatus("");
    startTransition(async () => {
      const result = await loadDemoDataAction();
      setStatus(`${result.checkinsCount} check-ins de démo chargés pour ce compte.`);
      router.refresh();
    });
  }

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-ink/70">Email du compte</span>
          <input
            value={email ?? ""}
            disabled
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-mist px-4 py-3 text-ink/65"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink/70">Prénom</span>
          <input
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-leaf"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink/70">Objectif principal</span>
          <select
            value={mainGoal}
            onChange={(event) => setMainGoal(event.target.value as MainGoal)}
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-leaf"
          >
            <option value="">Choisir un objectif</option>
            {Object.entries(goalLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center justify-between rounded-2xl bg-mist px-4 py-3">
          <span className="text-sm font-semibold text-ink">Rappel journalier</span>
          <input
            type="checkbox"
            checked={reminderEnabled}
            onChange={(event) => setReminderEnabled(event.target.checked)}
            className="h-5 w-5 accent-leaf"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink/70">Heure de rappel</span>
          <input
            type="time"
            value={reminderTime}
            onChange={(event) => setReminderTime(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-leaf"
          />
        </label>
        <button type="submit" disabled={pending} className="w-full rounded-2xl bg-leaf px-5 py-4 font-semibold text-white">
          {pending ? "Sauvegarde..." : mode === "onboarding" ? "Terminer l’onboarding" : "Sauvegarder"}
        </button>
      </form>

      {mode === "settings" ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={handleDemo} className="rounded-2xl bg-ink px-5 py-4 font-semibold text-white">
            Charger des données de démo
          </button>
          <button type="button" onClick={() => signOutAction()} className="rounded-2xl bg-mist px-5 py-4 font-semibold text-ink">
            Déconnexion
          </button>
        </div>
      ) : null}

      {status ? <p className="mt-4 rounded-2xl bg-leaf/10 p-3 text-sm font-medium text-leaf">{status}</p> : null}
    </section>
  );
}
