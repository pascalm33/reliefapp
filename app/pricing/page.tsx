import PublicFooter from "@/components/public/PublicFooter";
import PublicHeader from "@/components/public/PublicHeader";
import PricingCards from "@/components/public/PricingCards";
import PricingTable from "@/components/public/PricingTable";

export default function PricingPage() {
  return (
    <>
      <PublicHeader />
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <section className="py-8 sm:py-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Tarification</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-normal text-ink sm:text-5xl">
            Choisis l’offre adaptée à ton usage
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
            Commence gratuitement, puis débloque les fonctionnalités avancées quand tu en as besoin.
          </p>
        </section>
        <section className="space-y-6">
          <PricingCards />
          <PricingTable />
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
