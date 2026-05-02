import PublicFooter from "@/components/public/PublicFooter";
import PublicHeader from "@/components/public/PublicHeader";

export default function HowItWorksPage() {
  return (
    <>
      <PublicHeader />
      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <section className="rounded-[32px] bg-white p-6 shadow-soft sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Méthode</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink">Comment fonctionne Stress Relief</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
            Fais un check-in rapide, observe les signaux qui montent, puis teste une action courte. Les rapports aident
            à repérer ce qui te soulage vraiment au fil du temps.
          </p>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
