import AppShell from "@/components/AppShell";
import { createProfileIfMissing, requireUser } from "@/lib/auth";
import { getTodayCheckin } from "@/lib/repositories";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const profile = await createProfileIfMissing(user);
  const todayCheckin = await getTodayCheckin(user.id);

  return (
    <AppShell profile={profile} email={user.email} todayCheckin={todayCheckin}>
      {children}
    </AppShell>
  );
}
