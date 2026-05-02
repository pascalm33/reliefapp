"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import { createClient, hasSupabaseBrowserConfig } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    if (!email || !password) {
      setError("Renseigne ton email et ton mot de passe.");
      return;
    }

    if (!hasSupabaseBrowserConfig()) {
      setError("Connexion indisponible : la configuration Supabase publique est manquante.");
      return;
    }

    startTransition(async () => {
      try {
        const supabase = createClient();
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) {
          setError("Impossible de t’identifier. Vérifie ton email et ton mot de passe.");
          return;
        }
        router.push(params.get("redirectTo") || "/app/dashboard");
        router.refresh();
      } catch {
        setError("Impossible de t’identifier. Vérifie ton email et ton mot de passe.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm font-semibold text-[#1F2937]">S’identifier avec un email</p>
      <Field label="Adresse e-mail" name="email" type="email" autoComplete="email" />
      <div className="block">
        <label htmlFor="login-password" className="text-sm font-medium text-[#374151]">
          Mot de passe
        </label>
        <div className="mt-2 flex min-h-12 items-center rounded-2xl border border-[#E5E7EB] bg-white px-4 focus-within:border-leaf">
          <input
            id="login-password"
            required
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            className="w-full bg-transparent py-3 text-[#1F2937] outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="ml-3 rounded-full p-1 text-[#6B7280] transition hover:bg-[#F1F2F5] hover:text-[#1F2937]"
            aria-label={showPassword ? "Masquer" : "Afficher"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>
      {error ? <p className="rounded-2xl bg-coral/10 p-3 text-sm text-ink/75">{error}</p> : null}
      <div className="flex justify-end">
        <Link href="/forgot-password" className="text-sm font-semibold text-leaf">
          Mot de passe oublié ?
        </Link>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="min-h-12 w-full rounded-2xl bg-[#F5C84C] px-5 py-4 font-bold text-[#1F2937] transition hover:bg-[#e9bb3d] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Identification..." : "S’identifier"}
      </button>
    </form>
  );
}

export function Field({
  label,
  name,
  type,
  autoComplete,
  defaultValue
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink/70">{label}</span>
      <input
        required
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        className="mt-2 min-h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-[#1F2937] outline-none focus:border-leaf"
      />
    </label>
  );
}
