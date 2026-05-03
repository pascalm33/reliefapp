import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, ShieldCheck } from "lucide-react";

const signalCards = [
  {
    title: "Réveil nocturne stress",
    text: "Repère les nuits coupées, le temps éveillé et la qualité ressentie pour mieux comprendre l’impact du stress sur ton sommeil."
  },
  {
    title: "Stress et constipation",
    text: "Observe les signaux digestifs sans dramatiser : inconfort, hydratation, transit et alertes qui justifient un avis médical."
  },
  {
    title: "Procrastination et stress",
    text: "Transforme le blocage en micro-action de deux minutes pour sortir de l’évitement sans viser la perfection."
  },
  {
    title: "Scroll compulsif stress",
    text: "Mesure le scroll inutile et les ouvertures automatiques du téléphone pour retrouver une marge de choix."
  },
  {
    title: "Irritabilité stress",
    text: "Identifie les tensions, les réactions disproportionnées et les déclencheurs avant qu’ils ne prennent toute la place."
  }
];

const differentiators = [
  "Un score simple, lisible, centré sur cinq signaux concrets du quotidien.",
  "Des actions courtes, faisables en 90 secondes à 5 minutes.",
  "Une approche d’observation personnelle, sans diagnostic et sans ton anxiogène.",
  "Des rapports qui valorisent aussi les efforts, pas seulement les difficultés."
];

const testimonials = [
  {
    quote:
      "J’ai enfin un endroit simple pour noter ce qui monte dans ma journée, sans avoir l’impression de remplir un dossier médical.",
    name: "Exemple de retour utilisateur",
    context: "Placeholder à remplacer par un vrai témoignage"
  },
  {
    quote:
      "Le check-in m’aide à voir quand le scroll ou l’irritabilité deviennent des signaux, puis à lancer une action courte.",
    name: "Exemple de retour utilisateur",
    context: "Placeholder à remplacer par un vrai témoignage"
  },
  {
    quote:
      "Le rapport de fin de journée rend mes efforts visibles, même quand la journée n’a pas été parfaite.",
    name: "Exemple de retour utilisateur",
    context: "Placeholder à remplacer par un vrai témoignage"
  }
];

const evidenceItems = [
  {
    source: "CDC",
    href: "https://www.cdc.gov/howrightnow/emotion/stress/index.html",
    title: "Prendre quelques minutes peut aider à faire baisser la pression ressentie.",
    text: "Le CDC recommande notamment de respirer, bouger, maintenir une routine et chercher du soutien quand le stress devient difficile à porter."
  },
  {
    source: "NCCIH",
    href: "https://www.nccih.nih.gov/health/stress",
    title: "Les techniques de relaxation s’appuient souvent sur la respiration et l’attention.",
    text: "Stress Relief reprend cette logique sous forme d’actions brèves : respiration lente, pause, écriture simple et retour au corps."
  },
  {
    source: "CDC Sleep",
    href: "https://www.cdc.gov/sleep/about/index.html",
    title: "Le sommeil est lié au bien-être émotionnel.",
    text: "L’app aide à suivre les réveils nocturnes et la qualité ressentie du sommeil, sans établir de diagnostic."
  }
];

const steps = [
  {
    title: "Check-in rapide",
    text: "Tu renseignes ton sommeil, ta digestion, ta procrastination, ton scroll, ton irritabilité et ton ressenti global."
  },
  {
    title: "Score lisible",
    text: "Stress Relief calcule un Stress Signal Score pour t’aider à mesurer ton stress sans surinterpréter chaque détail."
  },
  {
    title: "Action courte",
    text: "L’app recommande une action adaptée au signal dominant : respiration, marche, démarrage deux minutes ou pause anti-scroll."
  },
  {
    title: "Rapport utile",
    text: "Tu vois ce qui s’est bien passé, l’effort réalisé et une piste concrète à tester demain."
  }
];

const measurableBenefits = [
  "Nombre de check-ins réalisés",
  "Évolution du Stress Signal Score",
  "Signal dominant de la journée",
  "Actions terminées et soulagement après action",
  "Tendance sur sept jours",
  "Moments à risque identifiés"
];

export function AppExplanationSection() {
  return (
    <section className="py-10 sm:py-14" aria-labelledby="app-explanation-title">
      <div className="rounded-[32px] bg-white/85 p-6 shadow-soft sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Application anti-stress</p>
        <h2 id="app-explanation-title" className="mt-3 text-3xl font-semibold tracking-normal text-ink sm:text-4xl">
          Gérer le stress commence souvent par mieux l’observer.
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/72">
          Stress Relief est une application anti-stress mobile-first pensée pour mesurer son stress à travers des signaux
          concrets : réveil nocturne, digestion, procrastination, scroll compulsif et irritabilité. L’objectif n’est pas de
          tout contrôler, mais de repérer ce qui se répète et de tester une action courte de soulagement du stress.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {signalCards.map((card) => (
            <article key={card.title} className="rounded-3xl border border-sage/20 bg-mist p-5">
              <h3 className="text-lg font-semibold text-ink">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/68">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DifferentiationSection() {
  return (
    <section className="py-10 sm:py-14" aria-labelledby="different-title">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Pourquoi c’est différent</p>
          <h2 id="different-title" className="mt-3 text-3xl font-semibold tracking-normal text-ink sm:text-4xl">
            Une lecture douce, concrète et actionnable de ton stress.
          </h2>
          <p className="mt-4 text-base leading-7 text-ink/70">
            Beaucoup d’outils demandent d’écrire longuement ou de suivre des données complexes. Stress Relief se concentre sur
            cinq signaux du quotidien et propose une action courte, immédiatement faisable.
          </p>
        </div>
        <div className="grid gap-3">
          {differentiators.map((item) => (
            <div key={item} className="flex gap-3 rounded-3xl bg-white/85 p-4 shadow-sm">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-leaf" aria-hidden="true" />
              <p className="text-sm leading-6 text-ink/72">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-10 sm:py-14" aria-labelledby="testimonials-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Témoignages</p>
          <h2 id="testimonials-title" className="mt-3 text-3xl font-semibold tracking-normal text-ink sm:text-4xl">
            Des exemples de retours orientés usage.
          </h2>
        </div>
        <p className="max-w-sm rounded-full bg-amber/15 px-4 py-2 text-sm font-medium text-ink/70">
          Placeholders, à remplacer par de vrais avis.
        </p>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article key={testimonial.quote} className="rounded-[28px] bg-white/90 p-5 shadow-sm">
            <p className="text-4xl leading-none text-amber">“</p>
            <blockquote className="mt-1 text-base leading-7 text-ink/76">{testimonial.quote}</blockquote>
            <div className="mt-5 border-t border-sage/20 pt-4">
              <p className="font-semibold text-ink">{testimonial.name}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink/45">{testimonial.context}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EvidenceSection() {
  return (
    <section className="py-10 sm:py-14" aria-labelledby="evidence-title">
      <div className="rounded-[32px] bg-[#EEF3EF] p-6 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Sources reconnues</p>
        <h2 id="evidence-title" className="mt-3 text-3xl font-semibold tracking-normal text-ink sm:text-4xl">
          Stress Relief s’inspire de principes simples et prudents.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink/70">
          Les sources de santé publique recommandent souvent des gestes accessibles : respirer, bouger doucement, garder une
          routine, dormir suffisamment et demander de l’aide quand le stress devient trop lourd. L’app transforme ces principes
          en suivi personnel et en actions courtes.
        </p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {evidenceItems.map((item) => (
            <article key={item.source} className="rounded-3xl bg-white/85 p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-leaf">{item.source}</p>
              <h3 className="mt-3 text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/68">{item.text}</p>
              <a
                href={item.href}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-leaf"
                target="_blank"
                rel="noreferrer"
              >
                Voir la source
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSummarySection() {
  return (
    <section className="py-10 sm:py-14" aria-labelledby="how-title">
      <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Fonctionnement</p>
      <h2 id="how-title" className="mt-3 text-3xl font-semibold tracking-normal text-ink sm:text-4xl">
        Comment fonctionne Stress Relief ?
      </h2>
      <div className="mt-7 grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <article key={step.title} className="rounded-[28px] bg-white/88 p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F5C84C] text-sm font-bold text-ink">
              {index + 1}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/68">{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MeasurableBenefitsSection() {
  return (
    <section className="py-10 sm:py-14" aria-labelledby="benefits-title">
      <div className="grid gap-6 rounded-[32px] bg-white/85 p-6 shadow-soft sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Gains mesurables</p>
          <h2 id="benefits-title" className="mt-3 text-3xl font-semibold tracking-normal text-ink sm:text-4xl">
            Des repères simples pour voir ce qui change.
          </h2>
          <p className="mt-4 text-base leading-7 text-ink/70">
            Stress Relief ne promet pas de guérison. L’app t’aide à rendre visibles des éléments mesurables : régularité,
            score, signal dominant, actions réalisées et soulagement ressenti après une action.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {measurableBenefits.map((benefit) => (
            <div key={benefit} className="flex items-center gap-3 rounded-3xl border border-sage/20 bg-mist p-4">
              <BarChart3 className="h-5 w-5 flex-none text-leaf" aria-hidden="true" />
              <p className="text-sm font-medium text-ink/72">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HealthDisclaimerSection() {
  return (
    <section className="py-10 sm:py-14" aria-labelledby="health-title">
      <div className="rounded-[32px] border border-coral/15 bg-white p-6 shadow-sm sm:p-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-start">
          <div className="flex h-12 w-12 flex-none items-center justify-center rounded-3xl bg-coral/10 text-coral">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-coral">Message responsable santé</p>
            <h2 id="health-title" className="mt-3 text-3xl font-semibold tracking-normal text-ink sm:text-4xl">
              Une aide d’observation, pas un diagnostic.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-ink/72">
              Stress Relief ne remplace pas un professionnel de santé, un diagnostic ou un traitement. Si tu ressens une
              détresse importante, des symptômes persistants ou inquiétants, ou si les signaux digestifs incluent douleur forte,
              sang ou constipation prolongée, demande un avis médical.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Link
                href="/register?plan=free"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-leaf px-5 py-3 text-center font-semibold text-white shadow-soft"
              >
                Commencer gratuitement
              </Link>
              <Link
                href="/pricing"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#F5C84C] px-5 py-3 text-center font-semibold text-ink"
              >
                Voir les offres
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeSeoSections() {
  return (
    <>
      <AppExplanationSection />
      <DifferentiationSection />
      <TestimonialsSection />
      <EvidenceSection />
      <HowItWorksSummarySection />
      <MeasurableBenefitsSection />
      <HealthDisclaimerSection />
    </>
  );
}
