"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { saveCheckinAction } from "@/app/(protected)/app/actions";
import type { CheckinInput } from "@/types";

type FormState = Omit<CheckinInput, "date">;

const initialState: FormState = {
  sleep: { awakenings: 1, awakeMinutes: 20, sleepQuality: 6, mainCause: "pensées" },
  digestion: {
    hadBowelMovement: true,
    abdominalDiscomfort: 2,
    constipationFeeling: 2,
    hydration: "medium",
    healthAlert: "none"
  },
  procrastination: {
    avoidedImportantTask: false,
    avoidedTasksCount: 0,
    blockageLevel: 2,
    mainCause: "fatigue"
  },
  scroll: { uselessScrollMinutes: 30, unintentionalOpens: 5, lossOfControl: 3, mainMoment: "soir" },
  aggression: {
    irritabilityLevel: 2,
    disproportionateReaction: false,
    incidentsCount: 0,
    mainTrigger: "fatigue"
  },
  global: { stressLevel: 4, reliefLevel: 5, energyLevel: 5, note: "" }
};

export default function CheckinForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function updateSection<Section extends keyof FormState>(
    section: Section,
    value: Partial<FormState[Section]>
  ) {
    setForm((current) => ({
      ...current,
      [section]: { ...current[section], ...value }
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    startTransition(async () => {
      try {
        await saveCheckinAction(form);
        router.push("/app/action");
        router.refresh();
      } catch {
        setError("Impossible d’enregistrer le check-in pour le moment.");
      }
    });
  }

  const digestionAlert = form.digestion.healthAlert !== "none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormBlock title="A. Réveil nocturne">
        <NumberField label="Réveils cette nuit" value={form.sleep.awakenings} onChange={(value) => updateSection("sleep", { awakenings: value })} />
        <NumberField label="Temps éveillé total estimé" suffix="min" value={form.sleep.awakeMinutes} onChange={(value) => updateSection("sleep", { awakeMinutes: value })} />
        <RangeField label="Qualité du sommeil" value={form.sleep.sleepQuality} onChange={(value) => updateSection("sleep", { sleepQuality: value })} />
        <SelectField label="Cause principale" value={form.sleep.mainCause} options={["pensées", "stress", "digestion", "bruit", "inconnu", "autre"]} onChange={(value) => updateSection("sleep", { mainCause: value })} />
      </FormBlock>

      <FormBlock title="B. Digestion / constipation">
        <ToggleField label="As-tu été à la selle aujourd’hui ?" value={form.digestion.hadBowelMovement} onChange={(value) => updateSection("digestion", { hadBowelMovement: value })} />
        <RangeField label="Inconfort abdominal" value={form.digestion.abdominalDiscomfort} onChange={(value) => updateSection("digestion", { abdominalDiscomfort: value })} />
        <RangeField label="Sensation de constipation" value={form.digestion.constipationFeeling} onChange={(value) => updateSection("digestion", { constipationFeeling: value })} />
        <SelectField label="Hydratation estimée" value={form.digestion.hydration} options={["low", "medium", "good"]} optionLabels={{ low: "faible", medium: "moyenne", good: "bonne" }} onChange={(value) => updateSection("digestion", { hydration: value as FormState["digestion"]["hydration"] })} />
        <SelectField label="Alerte santé" value={form.digestion.healthAlert} options={["none", "strong_pain", "blood", "more_than_3_days"]} optionLabels={{ none: "aucun", strong_pain: "douleur forte", blood: "sang", more_than_3_days: "constipation depuis plus de 3 jours" }} onChange={(value) => updateSection("digestion", { healthAlert: value as FormState["digestion"]["healthAlert"] })} />
        {digestionAlert ? (
          <p className="rounded-2xl bg-coral/10 p-3 text-sm leading-6 text-ink/75">
            Si douleur forte, sang, constipation persistante ou symptôme inquiétant : demande un avis médical.
          </p>
        ) : null}
      </FormBlock>

      <FormBlock title="C. Procrastination">
        <ToggleField label="Tâche importante repoussée ?" value={form.procrastination.avoidedImportantTask} onChange={(value) => updateSection("procrastination", { avoidedImportantTask: value })} />
        <NumberField label="Nombre de tâches évitées" value={form.procrastination.avoidedTasksCount} onChange={(value) => updateSection("procrastination", { avoidedTasksCount: value })} />
        <RangeField label="Niveau de blocage" value={form.procrastination.blockageLevel} onChange={(value) => updateSection("procrastination", { blockageLevel: value })} />
        <SelectField label="Cause principale" value={form.procrastination.mainCause} options={["peur de mal faire", "tâche trop floue", "fatigue", "surcharge", "manque d’envie", "autre"]} onChange={(value) => updateSection("procrastination", { mainCause: value })} />
      </FormBlock>

      <FormBlock title="D. Scroll compulsif">
        <NumberField label="Temps de scroll inutile" suffix="min" value={form.scroll.uselessScrollMinutes} onChange={(value) => updateSection("scroll", { uselessScrollMinutes: value })} />
        <NumberField label="Ouvertures sans intention" value={form.scroll.unintentionalOpens} onChange={(value) => updateSection("scroll", { unintentionalOpens: value })} />
        <RangeField label="Perte de contrôle" value={form.scroll.lossOfControl} onChange={(value) => updateSection("scroll", { lossOfControl: value })} />
        <SelectField label="Moment principal" value={form.scroll.mainMoment} options={["matin", "pause travail", "soir", "lit", "toilettes", "autre"]} onChange={(value) => updateSection("scroll", { mainMoment: value })} />
      </FormBlock>

      <FormBlock title="E. Agressivité / irritabilité">
        <RangeField label="Niveau d’irritabilité" value={form.aggression.irritabilityLevel} onChange={(value) => updateSection("aggression", { irritabilityLevel: value })} />
        <ToggleField label="Réaction disproportionnée ?" value={form.aggression.disproportionateReaction} onChange={(value) => updateSection("aggression", { disproportionateReaction: value })} />
        <NumberField label="Incidents ou tensions" value={form.aggression.incidentsCount} onChange={(value) => updateSection("aggression", { incidentsCount: value })} />
        <SelectField label="Déclencheur principal" value={form.aggression.mainTrigger} options={["fatigue", "travail", "famille", "frustration", "surcharge", "inconnu", "autre"]} onChange={(value) => updateSection("aggression", { mainTrigger: value })} />
      </FormBlock>

      <FormBlock title="F. Ressenti global">
        <RangeField label="Stress maintenant" value={form.global.stressLevel} onChange={(value) => updateSection("global", { stressLevel: value })} />
        <RangeField label="Soulagement maintenant" value={form.global.reliefLevel} onChange={(value) => updateSection("global", { reliefLevel: value })} />
        <RangeField label="Énergie" value={form.global.energyLevel} onChange={(value) => updateSection("global", { energyLevel: value })} />
        <label className="block">
          <span className="text-sm font-medium text-ink/70">Qu’est-ce qui t’a pesé aujourd’hui ?</span>
          <textarea
            value={form.global.note}
            onChange={(event) => updateSection("global", { note: event.target.value })}
            className="mt-2 min-h-28 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-leaf"
          />
        </label>
      </FormBlock>

      <button type="submit" className="w-full rounded-2xl bg-leaf px-5 py-4 text-base font-semibold text-white shadow-soft">
        {pending ? "Enregistrement..." : "Enregistrer mon check-in"}
      </button>
      {error ? <p className="rounded-2xl bg-coral/10 p-3 text-sm text-ink/75">{error}</p> : null}
    </form>
  );
}

function FormBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-3xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      {children}
    </section>
  );
}

function NumberField({ label, value, suffix, onChange }: { label: string; value: number; suffix?: string; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink/70">{label}</span>
      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-ink/10 bg-white px-4 py-3">
        <input type="number" min={0} value={value} onChange={(event) => onChange(Number(event.target.value))} className="w-full bg-transparent outline-none" />
        {suffix ? <span className="text-sm text-ink/50">{suffix}</span> : null}
      </div>
    </label>
  );
}

function RangeField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-sm font-medium text-ink/70">
        {label}
        <strong className="text-ink">{value}/10</strong>
      </span>
      <input type="range" min={0} max={10} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 w-full" />
    </label>
  );
}

function SelectField({ label, value, options, optionLabels, onChange }: { label: string; value: string; options: string[]; optionLabels?: Record<string, string>; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink/70">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-leaf">
        {options.map((option) => (
          <option key={option} value={option}>
            {optionLabels?.[option] ?? option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ToggleField({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }) {
  return (
    <div>
      <p className="text-sm font-medium text-ink/70">{label}</p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {[true, false].map((option) => (
          <button
            type="button"
            key={String(option)}
            onClick={() => onChange(option)}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold ${value === option ? "bg-leaf text-white" : "bg-mist text-ink/65"}`}
          >
            {option ? "Oui" : "Non"}
          </button>
        ))}
      </div>
    </div>
  );
}
