import Link from "next/link";

export default function NotFound() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-soft">
      <p className="text-xl font-semibold text-ink">Page introuvable</p>
      <p className="mt-2 text-sm leading-6 text-ink/65">Ce chemin n’existe pas dans le MVP Stress Relief.</p>
      <Link href="/" className="mt-5 inline-flex rounded-2xl bg-leaf px-5 py-3 font-semibold text-white">
        Revenir aujourd’hui
      </Link>
    </section>
  );
}
