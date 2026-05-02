import Link from "next/link";
import CookiePreferencesLink from "@/components/cookies/CookiePreferencesLink";
import StressReliefLogo from "@/components/public/StressReliefLogo";

export default function PublicFooter() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <div className="rounded-[28px] bg-white/80 p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <StressReliefLogo compact />
            <p className="mt-1 text-sm text-ink/60">Application de suivi personnel du stress. Ne remplace pas un avis médical.</p>
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-ink/65">
            <Link href="/pricing" className="hover:text-ink">
              Tarifs
            </Link>
            <Link href="/login" className="hover:text-ink">
              S’identifier
            </Link>
            <Link href="/register" className="hover:text-ink">
              Créer un compte
            </Link>
            <Link href="/forgot-password" className="hover:text-ink">
              Mot de passe oublié
            </Link>
            <CookiePreferencesLink className="font-medium text-ink/65 hover:text-ink" />
          </nav>
        </div>
      </div>
    </footer>
  );
}
