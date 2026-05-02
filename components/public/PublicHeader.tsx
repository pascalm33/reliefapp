import Link from "next/link";
import { Crown, UserRound } from "lucide-react";
import StressReliefLogo from "@/components/public/StressReliefLogo";

export default function PublicHeader() {
  return (
    <header className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" aria-label="Accueil Stress Relief">
          <StressReliefLogo compact />
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-ink/65">
          <Link href="/" className="hover:text-ink">
            Accueil
          </Link>
          <Link href="/pricing" className="hover:text-ink">
            Tarifs
          </Link>
        </nav>
      </div>
      <div className="grid gap-2 min-[380px]:grid-cols-2 sm:flex sm:items-center">
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F5C84C] px-5 py-3 text-sm font-bold text-ink shadow-sm transition hover:bg-[#e9bb3d]"
        >
          <Crown className="h-4 w-4" aria-hidden="true" />
          S’abonner
        </Link>
        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F1F2F5] px-5 py-3 text-sm font-semibold text-ink/80 transition hover:bg-[#E7E9EE]"
        >
          <UserRound className="h-4 w-4" aria-hidden="true" />
          S’identifier
        </Link>
      </div>
    </header>
  );
}
