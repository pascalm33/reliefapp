"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { Field } from "@/components/LoginForm";

export default function RegisterForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (!email) return setError("L’email est obligatoire.");
    if (password.length < 8) return setError("Le mot de passe doit contenir au moins 8 caractères.");
    if (password !== confirm) return setError("La confirmation ne correspond pas.");

    startTransition(async () => {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/app/onboarding` }
      });
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      if (data.session) {
        router.push("/app/onboarding");
        router.refresh();
        return;
      }
      setMessage("Vérifie ta boîte mail pour confirmer ton compte.");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Email" name="email" type="email" autoComplete="email" />
      <Field label="Mot de passe" name="password" type="password" autoComplete="new-password" />
      <Field label="Confirmation du mot de passe" name="confirm" type="password" autoComplete="new-password" />
      {error ? <p className="rounded-2xl bg-coral/10 p-3 text-sm text-ink/75">{error}</p> : null}
      {message ? <p className="rounded-2xl bg-leaf/10 p-3 text-sm font-medium text-leaf">{message}</p> : null}
      <button type="submit" disabled={pending} className="w-full rounded-2xl bg-leaf px-5 py-4 font-semibold text-white">
        {pending ? "Création..." : "Créer mon compte"}
      </button>
      <p className="text-center text-sm text-ink/65">
        Déjà inscrit ?{" "}
        <Link href="/login" className="font-semibold text-leaf">
          Se connecter
        </Link>
      </p>
    </form>
  );
}
