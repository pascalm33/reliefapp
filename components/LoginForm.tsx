"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    startTransition(async () => {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError("Email ou mot de passe incorrect.");
        return;
      }
      router.push(params.get("redirectTo") || "/app/dashboard");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Email" name="email" type="email" autoComplete="email" />
      <Field label="Mot de passe" name="password" type="password" autoComplete="current-password" />
      {error ? <p className="rounded-2xl bg-coral/10 p-3 text-sm text-ink/75">{error}</p> : null}
      <button type="submit" disabled={pending} className="w-full rounded-2xl bg-leaf px-5 py-4 font-semibold text-white">
        {pending ? "Connexion..." : "Se connecter"}
      </button>
      <div className="flex items-center justify-between text-sm">
        <Link href="/forgot-password" className="font-medium text-leaf">
          Mot de passe oublié
        </Link>
        <Link href="/register" className="font-medium text-ink/70">
          Créer un compte
        </Link>
      </div>
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
        className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-leaf"
      />
    </label>
  );
}
