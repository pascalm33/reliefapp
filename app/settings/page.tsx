"use client";

import { useState } from "react";
import ReminderSettings from "@/components/ReminderSettings";
import { createDemoActions, createDemoCheckins } from "@/lib/demo";
import { clearAllData, loadDemoData } from "@/lib/storage";

export default function SettingsPage() {
  const [status, setStatus] = useState("");

  function handleDemo() {
    const checkins = createDemoCheckins();
    const actions = createDemoActions(checkins);
    loadDemoData(checkins, actions);
    setStatus("Données de démo chargées.");
  }

  function handleClear() {
    clearAllData();
    setStatus("Données locales supprimées.");
  }

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Réglages</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">Configurer Relief</h1>
      </div>
      <ReminderSettings />
      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">Données MVP</h2>
        <p className="mt-2 text-sm leading-6 text-ink/65">
          Les données restent dans le localStorage de ce navigateur pour cette première version.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={handleDemo} className="rounded-2xl bg-ink px-5 py-4 font-semibold text-white">
            Charger des données de démo
          </button>
          <button type="button" onClick={handleClear} className="rounded-2xl bg-mist px-5 py-4 font-semibold text-ink">
            Réinitialiser
          </button>
        </div>
        {status ? <p className="mt-4 rounded-2xl bg-leaf/10 p-3 text-sm font-medium text-leaf">{status}</p> : null}
      </section>
      <p className="rounded-3xl bg-white/80 p-4 text-xs leading-5 text-ink/60">
        Relief ne remplace pas un professionnel de santé. Pour douleur forte, sang, constipation persistante ou symptôme
        inquiétant, demande un avis médical.
      </p>
    </section>
  );
}
