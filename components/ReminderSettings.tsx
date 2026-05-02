"use client";

import { FormEvent, useState } from "react";
import { updateProfileAction } from "@/app/(protected)/app/actions";
import type { Profile } from "@/types";

export default function ReminderSettings({ profile }: { profile: Profile }) {
  const [settings, setSettings] = useState({ enabled: profile.reminderEnabled, time: profile.reminderTime });
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await updateProfileAction({
      firstName: profile.firstName,
      mainGoal: profile.mainGoal,
      reminderEnabled: settings.enabled,
      reminderTime: settings.time
    });

    if (settings.enabled && "Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        new Notification("C’est l’heure de ton check-in Relief");
        setStatus("Notifications activées. Le rappel est aussi affiché dans l’app.");
        return;
      }
    }
    setStatus(settings.enabled ? "Rappel configuré dans l’app." : "Rappel désactivé.");
  }

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-ink">Rappel journalier</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <label className="flex items-center justify-between rounded-2xl bg-mist px-4 py-3">
          <span className="text-sm font-semibold text-ink">Activer le rappel</span>
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(event) => setSettings((current) => ({ ...current, enabled: event.target.checked }))}
            className="h-5 w-5 accent-leaf"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink/70">Heure de rappel</span>
          <input
            type="time"
            value={settings.time}
            onChange={(event) => setSettings((current) => ({ ...current, time: event.target.value }))}
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-leaf"
          />
        </label>
        <button type="submit" className="w-full rounded-2xl bg-leaf px-5 py-4 font-semibold text-white">
          Sauvegarder le rappel
        </button>
      </form>
      {settings.enabled ? (
        <p className="mt-4 rounded-2xl bg-leaf/10 p-3 text-sm font-medium text-leaf">
          Rappel configuré à {settings.time}
        </p>
      ) : null}
      {status ? <p className="mt-3 text-sm leading-6 text-ink/65">{status}</p> : null}
    </section>
  );
}
