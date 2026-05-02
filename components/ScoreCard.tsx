import { getScoreState } from "@/lib/scoring";

export default function ScoreCard({ score }: { score: number }) {
  const state = getScoreState(score);

  return (
    <section className="rounded-[28px] bg-white p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-ink/60">Stress Signal Score</p>
          <p className="mt-2 text-6xl font-semibold tracking-normal text-ink">{score}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${state.bg} ${state.tone}`}>
          {state.label}
        </span>
      </div>
      <p className="mt-5 text-sm leading-6 text-ink/65">
        Ce score est un repère personnel, pas un diagnostic. Il aide à choisir une action courte aujourd’hui.
      </p>
    </section>
  );
}
