"use client";

import { useTransition } from "react";
import { signOutAction } from "@/app/(protected)/app/actions";

export default function UserMenu({ email }: { email: string | null | undefined }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => signOutAction())}
      className="rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-sm font-medium text-ink shadow-sm"
    >
      {pending ? "Déconnexion..." : email ? "Se déconnecter" : "Sortir"}
    </button>
  );
}
