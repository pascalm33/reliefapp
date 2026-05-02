"use client";

import { useSearchParams } from "next/navigation";
import AuthTabs, { type AuthMode } from "@/components/auth/AuthTabs";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

export default function AuthSwitcher() {
  const searchParams = useSearchParams();
  const mode: AuthMode = searchParams.get("mode") === "register" ? "register" : "login";

  return (
    <>
      <div className="mt-6">
        <AuthTabs mode={mode} />
      </div>

      <div className="mt-7">
        {mode === "register" ? (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-[#1F2937]">Créer un compte avec un email</p>
            <RegisterForm />
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </>
  );
}
