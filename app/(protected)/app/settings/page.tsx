import ProfileForm from "@/components/ProfileForm";
import ReminderSettings from "@/components/ReminderSettings";
import { createProfileIfMissing, requireUser } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await requireUser();
  const profile = await createProfileIfMissing(user);

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Réglages</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">Configurer Relief</h1>
      </div>
      <ProfileForm profile={profile} email={user.email} />
      <ReminderSettings profile={profile} />
      <p className="rounded-3xl bg-white/80 p-4 text-xs leading-5 text-ink/60">
        Relief ne remplace pas un professionnel de santé. Pour douleur forte, sang, constipation persistante ou symptôme
        inquiétant, demande un avis médical.
      </p>
    </section>
  );
}
