import Link from "next/link";

const plans = [
  {
    name: "Gratuit",
    price: "0 €",
    text: "Pour découvrir tes signaux de stress.",
    href: "/register?plan=free",
    cta: "Commencer gratuitement",
    featured: false
  },
  {
    name: "Payant",
    price: "4,99 € / mois",
    text: "Pour suivre ton évolution et débloquer les rapports avancés.",
    href: "/register?plan=paid",
    cta: "S’abonner",
    featured: true
  }
];

export default function PricingCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {plans.map((plan) => (
        <article
          key={plan.name}
          className={`relative rounded-[28px] p-6 shadow-soft ${
            plan.featured ? "border border-[#F5C84C] bg-white" : "bg-white/85"
          }`}
        >
          {plan.featured ? (
            <span className="absolute right-5 top-5 rounded-full bg-[#F5C84C] px-3 py-1 text-xs font-bold text-ink">
              Recommandé
            </span>
          ) : null}
          <p className="text-sm font-semibold uppercase tracking-wide text-leaf">{plan.name}</p>
          <p className="mt-3 text-4xl font-semibold tracking-normal text-ink">{plan.price}</p>
          <p className="mt-3 min-h-12 text-sm leading-6 text-ink/65">{plan.text}</p>
          <Link
            href={plan.href}
            className={`mt-6 inline-flex w-full justify-center rounded-2xl px-5 py-4 text-center font-semibold ${
              plan.featured ? "bg-[#F5C84C] text-ink hover:bg-[#e9bb3d]" : "bg-ink text-white hover:bg-ink/90"
            }`}
          >
            {plan.cta}
          </Link>
        </article>
      ))}
    </div>
  );
}
