export const COOKIE_CONSENT_KEY = "relief_cookie_consent";

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  acceptedAt: string;
};

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    return raw ? (JSON.parse(raw) as CookieConsent) : null;
  } catch {
    return null;
  }
}

export function saveCookieConsent(consent: Omit<CookieConsent, "acceptedAt">) {
  if (typeof window === "undefined") return;
  const value: CookieConsent = {
    ...consent,
    necessary: true,
    acceptedAt: new Date().toISOString()
  };
  window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("relief-cookie-consent-updated"));
}

export function hasAnalyticsConsent(): boolean {
  return getCookieConsent()?.analytics === true;
}

export function openCookiePreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("relief-open-cookie-preferences"));
}
