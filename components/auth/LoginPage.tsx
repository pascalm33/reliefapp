import { Suspense } from "react";
import AuthSwitcher from "@/components/auth/AuthSwitcher";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import PublicFooter from "@/components/public/PublicFooter";
import PublicHeader from "@/components/public/PublicHeader";
import ReassurancePanel from "@/components/public/ReassurancePanel";

export default function LoginPageExperience() {
  return (
    <>
      <PublicHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,440px)_1fr] lg:items-stretch">
          <section className="rounded-[32px] bg-white p-6 shadow-soft sm:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Mon espace</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-normal text-[#1F2937]">
                Accéder à mon espace
              </h1>
              <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                Connecte-toi pour suivre tes signaux de stress et retrouver tes rapports.
              </p>
            </div>

            <Suspense>
              <AuthSwitcher />
            </Suspense>

            <div className="my-7 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#E5E7EB]" />
              <span className="text-sm font-medium text-[#6B7280]">ou</span>
              <span className="h-px flex-1 bg-[#E5E7EB]" />
            </div>

            <SocialLoginButtons />
          </section>

          <ReassurancePanel />
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
