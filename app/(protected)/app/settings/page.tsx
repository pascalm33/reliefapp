import ProfileForm from "@/components/ProfileForm";
import ReminderSettings from "@/components/ReminderSettings";
import CookiePreferencesLink from "@/components/cookies/CookiePreferencesLink";
import { createProfileIfMissing, requireUser } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await requireUser();
  const profile = await createProfileIfMissing(user);

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Réglages</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">Configurer Stress Relief</h1>
      </div>
      <ProfileForm profile={profile} email={user.email} />
      <ReminderSettings profile={profile} />
      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">Confidentialité</h2>
        <p className="mt-2 text-sm leading-6 text-ink/65">
          Tu peux modifier ton choix concernant les cookies non essentiels à tout moment.
        </p>
        <CookiePreferencesLink className="mt-4 rounded-2xl bg-mist px-5 py-3 text-sm font-semibold text-ink" />
      </section>
      <p className="rounded-3xl bg-white/80 p-4 text-xs leading-5 text-ink/60">
        Stress Relief ne remplace pas un professionnel de santé. Pour douleur forte, sang, constipation persistante ou symptôme
        inquiétant, demande un avis médical.
      </p>
    </section>
  );
}
