"use client";

import { openCookiePreferences } from "@/lib/cookies";

export default function CookiePreferencesLink({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      Préférences cookies
    </button>
  );
}
