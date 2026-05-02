"use client";

import { FormEvent, useEffect, useState } from "react";
import { getReminderSettings, saveReminderSettings } from "@/lib/storage";
import type { ReminderSettings as ReminderSettingsType } from "@/types";

export default function ReminderSettings() {
  const [settings, setSettings] = useState<ReminderSettingsType>({ enabled: false, time: "21:30" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    setSettings(getReminderSettings());
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = { ...settings, enabled: true };
    saveReminderSettings(next);
    setSettings(next);

    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        new Notification("C’est l’heure de ton check-in Relief");
        setStatus("Notifications activées. Le rappel est aussi affiché dans l’app.");
        return;
      }
    }
    setStatus("Rappel configuré dans l’app.");
  }

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-ink">Rappel journalier</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
          Activer le rappel
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
