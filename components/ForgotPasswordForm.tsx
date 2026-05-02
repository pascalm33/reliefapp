"use client";

import Link from "next/link";
import { FormEvent, useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { Field } from "@/components/LoginForm";

export default function ForgotPasswordForm() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");

    startTransition(async () => {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/app/settings`
      });
      if (resetError) {
        setError(resetError.message);
        return;
      }
      setMessage("Si un compte existe avec cet email, un lien de réinitialisation vient d’être envoyé.");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Email" name="email" type="email" autoComplete="email" />
      {error ? <p className="rounded-2xl bg-coral/10 p-3 text-sm text-ink/75">{error}</p> : null}
      {message ? <p className="rounded-2xl bg-leaf/10 p-3 text-sm font-medium text-leaf">{message}</p> : null}
      <button type="submit" disabled={pending} className="w-full rounded-2xl bg-leaf px-5 py-4 font-semibold text-white">
        {pending ? "Envoi..." : "Recevoir un lien de réinitialisation"}
      </button>
      <Link href="/login" className="block text-center text-sm font-semibold text-ink/70">
        Retour connexion
      </Link>
    </form>
  );
}
