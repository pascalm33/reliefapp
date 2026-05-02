"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { Checkin, Profile } from "@/types";
import BottomNavigation from "@/components/BottomNavigation";
import UserMenu from "@/components/UserMenu";

export default function AppShell({
  children,
  profile,
  email,
  todayCheckin
}: {
  children: React.ReactNode;
  profile: Profile;
  email: string | null | undefined;
  todayCheckin: Checkin | null;
}) {
  const reminderCopy = useMemo(() => {
    if (!profile.reminderEnabled) return "";
    return `Rappel configuré à ${profile.reminderTime}`;
  }, [profile.reminderEnabled, profile.reminderTime]);

  const showReminder = useMemo(() => {
    if (!profile.reminderEnabled || todayCheckin) return false;
    const [hour, minute] = profile.reminderTime.split(":").map(Number);
    const now = new Date();
    const reminder = new Date();
    reminder.setHours(hour || 21, minute || 30, 0, 0);
    return now >= reminder;
  }, [profile.reminderEnabled, profile.reminderTime, todayCheckin]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-24 pt-5 sm:px-6">
      <header className="mb-5 flex items-center justify-between gap-3">
        <Link href="/app/dashboard" className="leading-tight">
          <p className="text-2xl font-semibold tracking-normal text-ink">Relief</p>
          <p className="text-xs text-ink/60">Observer. Agir. Soulager.</p>
        </Link>
        <UserMenu email={email} />
      </header>
      {reminderCopy ? (
        <p className="mb-3 rounded-2xl bg-leaf/10 px-4 py-3 text-sm font-medium text-leaf">{reminderCopy}</p>
      ) : null}
      {showReminder ? (
        <Link href="/app/checkin" className="mb-4 rounded-2xl bg-amber/15 px-4 py-3 text-sm font-semibold text-ink">
          Tu n’as pas encore fait ton check-in Relief aujourd’hui.
        </Link>
      ) : null}
      <main className="flex-1">{children}</main>
      <BottomNavigation />
    </div>
  );
}
