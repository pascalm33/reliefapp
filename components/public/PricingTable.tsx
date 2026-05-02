const rows = [
  ["Création d’un compte", "Oui", "Oui"],
  ["Check-in quotidien", "Oui", "Oui"],
  ["Suivi des 5 signaux de stress", "Oui", "Oui"],
  ["Score global Stress Signal Score", "Oui", "Oui"],
  ["Action recommandée du jour", "Oui", "Oui"],
  ["Historique des données", "7 derniers jours", "Historique illimité"],
  ["Rapport de fin de journée", "Basique", "Détaillé"],
  ["Rapport hebdomadaire", "Non", "Oui"],
  ["Analyse des tendances", "Non", "Oui"],
  ["Recommandations personnalisées", "Limitées", "Avancées"],
  ["Rappels journaliers", "Oui", "Oui"],
  ["Export des données", "Non", "Oui"],
  ["Accès aux futures fonctionnalités premium", "Non", "Oui"]
];

export default function PricingTable() {
  return (
    <section className="overflow-hidden rounded-[28px] bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-left">
          <thead className="bg-mist">
            <tr>
              <th className="px-5 py-4 text-sm font-semibold text-ink">Fonctionnalité</th>
              <th className="px-5 py-4 text-sm font-semibold text-ink">Gratuit</th>
              <th className="px-5 py-4 text-sm font-semibold text-ink">Payant</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([feature, free, paid]) => (
              <tr key={feature} className="border-t border-ink/8">
                <td className="px-5 py-4 text-sm font-medium text-ink">{feature}</td>
                <td className="px-5 py-4 text-sm text-ink/65">{free}</td>
                <td className="px-5 py-4 text-sm font-medium text-ink/80">{paid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
