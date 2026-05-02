import { Activity, HeartHandshake, Moon, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: HeartHandshake,
    title: "Nous sommes là pour t’aider",
    text: "Stress Relief t’aide à repérer les signaux qui montent : réveil nocturne, digestion, procrastination, scroll compulsif et irritabilité."
  },
  {
    icon: Activity,
    title: "Tu restes libre",
    text: "Tu peux commencer gratuitement, suivre tes données et choisir plus tard si tu veux débloquer les rapports avancés."
  },
  {
    icon: ShieldCheck,
    title: "Pas de diagnostic",
    text: "Stress Relief ne remplace pas un professionnel de santé. L’application t’aide à observer tes signaux et à tester des actions courtes."
  }
];

export default function ReassurancePanel() {
  return (
    <aside className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#F8F6F1] via-white to-[#EAF2EC] p-6 shadow-soft sm:p-8">
      <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-[#F5C84C]/30 blur-2xl" />
      <div className="absolute bottom-10 left-8 h-28 w-28 rounded-full bg-leaf/15 blur-2xl" />
      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-leaf shadow-sm">
          <Moon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-3xl font-semibold tracking-normal text-[#1F2937]">Rien d’autre à faire</h2>
        <p className="mt-3 text-base leading-7 text-[#6B7280]">
          Connecte-toi, fais ton check-in, puis observe ce qui t’aide vraiment à te sentir soulagé.
        </p>
        <div className="mt-8 space-y-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <section key={item.title} className="rounded-3xl bg-white/82 p-4 shadow-sm">
                <div className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F1F2F5] text-leaf">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#1F2937]">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#6B7280]">{item.text}</p>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
