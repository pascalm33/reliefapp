"use client";

import { useRouter, useSearchParams } from "next/navigation";

export type AuthMode = "login" | "register";

export default function AuthTabs({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setMode(nextMode: AuthMode) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextMode === "login") {
      params.delete("mode");
    } else {
      params.set("mode", nextMode);
    }
    const query = params.toString();
    router.push(query ? `/login?${query}` : "/login");
  }

  return (
    <div className="grid grid-cols-2 rounded-2xl bg-[#F1F2F5] p-1">
      <button
        type="button"
        onClick={() => setMode("register")}
        className={`rounded-xl px-3 py-3 text-center text-sm font-semibold transition ${
          mode === "register" ? "bg-white text-ink shadow-sm" : "text-ink/55 hover:text-ink"
        }`}
      >
        Je n’ai pas de compte
      </button>
      <button
        type="button"
        onClick={() => setMode("login")}
        className={`rounded-xl px-3 py-3 text-center text-sm font-semibold transition ${
          mode === "login" ? "bg-white text-ink shadow-sm" : "text-ink/55 hover:text-ink"
        }`}
      >
        J’ai déjà un compte
      </button>
    </div>
  );
}
