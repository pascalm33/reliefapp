"use client";

import { Apple } from "lucide-react";
import { useState, useTransition } from "react";
import { createClient, hasSupabaseBrowserConfig } from "@/lib/supabase/client";

type Provider = "google" | "apple";

export default function SocialLoginButtons() {
  const [error, setError] = useState("");
  const [pendingProvider, setPendingProvider] = useState<Provider | null>(null);
  const [pending, startTransition] = useTransition();

  function signInWithProvider(provider: Provider) {
    setError("");

    if (!hasSupabaseBrowserConfig()) {
      setError("Connexion sociale indisponible : la configuration Supabase publique est manquante.");
      return;
    }

    setPendingProvider(provider);
    startTransition(async () => {
      try {
        const supabase = createClient();
        const { error: oauthError } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${window.location.origin}/auth/callback?next=/app/dashboard`
          }
        });

        if (oauthError) {
          setError(
            provider === "google"
              ? "Connexion Google indisponible. Vérifie que le provider Google est activé dans Supabase."
              : "Connexion Apple indisponible. Vérifie que le provider Apple est activé dans Supabase."
          );
          setPendingProvider(null);
        }
      } catch {
        setError("Connexion sociale indisponible pour le moment.");
        setPendingProvider(null);
      }
    });
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-ink">S’identifier avec</p>
      <div className="grid gap-3">
        <SocialButton
          icon={<span className="text-base font-bold leading-none text-[#1F2937]">G</span>}
          label={pending && pendingProvider === "google" ? "Redirection Google..." : "Continuer avec Google"}
          disabled={pending}
          onClick={() => signInWithProvider("google")}
        />
        <SocialButton
          icon={<Apple className="h-4 w-4" aria-hidden="true" />}
          label={pending && pendingProvider === "apple" ? "Redirection Apple..." : "Continuer avec Apple"}
          disabled={pending}
          onClick={() => signInWithProvider("apple")}
        />
      </div>
      {error ? <p className="rounded-2xl bg-coral/10 p-3 text-sm text-ink/75">{error}</p> : null}
    </div>
  );
}

function SocialButton({
  icon,
  label,
  disabled,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-semibold text-[#1F2937] transition hover:bg-[#F8F6F1] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {icon}
      {label}
    </button>
  );
}
