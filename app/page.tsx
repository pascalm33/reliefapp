import Link from "next/link";
import PublicFooter from "@/components/public/PublicFooter";
import PublicHeader from "@/components/public/PublicHeader";
import { HomeSeoSections } from "@/components/public/HomeSeoSections";

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-col px-4 py-8 sm:px-6">
        <section className="flex min-h-[62vh] flex-col justify-center py-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Stress quotidien</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-normal text-ink sm:text-6xl">Stress Relief</h1>
          <p className="mt-5 max-w-xl text-xl leading-8 text-ink/75">
            Mesure tes signaux de stress. Fais une action courte. Observe ton soulagement.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link href="/register" className="rounded-2xl bg-leaf px-5 py-4 text-center font-semibold text-white shadow-soft">
              Créer mon compte
            </Link>
            <Link href="/login" className="rounded-2xl bg-white px-5 py-4 text-center font-semibold text-ink shadow-sm">
              S’identifier
            </Link>
          </div>
          <p className="mt-8 rounded-3xl bg-white/80 p-4 text-sm leading-6 text-ink/65">
            Stress Relief ne remplace pas un professionnel de santé. L’application aide à observer ses signaux et à tester des
            actions courtes de soulagement.
          </p>
        </section>
        <HomeSeoSections />
      </main>
      <PublicFooter />
    </>
  );
}
