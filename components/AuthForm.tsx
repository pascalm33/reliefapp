import PublicFooter from "@/components/public/PublicFooter";
import PublicHeader from "@/components/public/PublicHeader";

export default function AuthForm({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicHeader />
      <main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-4 py-10">
        <section className="rounded-[28px] bg-white p-6 shadow-soft">
          <h1 className="text-3xl font-semibold tracking-normal text-ink">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-ink/65">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </section>
        <p className="mt-5 rounded-3xl bg-white/80 p-4 text-xs leading-5 text-ink/60">
          Stress Relief ne remplace pas un professionnel de santé. L’application aide à observer ses signaux et à tester des
          actions courtes de soulagement.
        </p>
      </main>
      <PublicFooter />
    </>
  );
}
