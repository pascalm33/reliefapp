import CheckinForm from "@/components/CheckinForm";

export default function FullCheckinPage() {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Check-in complet</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">Remplir tous les signaux</h1>
        <p className="mt-3 text-sm leading-6 text-ink/65">
          Cette page conserve le formulaire complet existant pour calculer le score global en une seule fois.
        </p>
      </div>
      <CheckinForm />
    </section>
  );
}
