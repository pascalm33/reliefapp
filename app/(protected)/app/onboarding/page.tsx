import ProfileForm from "@/components/ProfileForm";
import { createProfileIfMissing, requireUser } from "@/lib/auth";

export default async function OnboardingPage() {
  const user = await requireUser();
  const profile = await createProfileIfMissing(user);

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Premier réglage</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">Personnalise ton suivi Stress Relief</h1>
      </div>
      <ProfileForm profile={profile} email={user.email} mode="onboarding" />
    </section>
  );
}
