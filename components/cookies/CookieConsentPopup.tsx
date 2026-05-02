"use client";

import { useEffect, useState } from "react";
import { getCookieConsent, saveCookieConsent } from "@/lib/cookies";

export default function CookieConsentPopup() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(!getCookieConsent());
    }, 0);

    function openPreferences() {
      const current = getCookieConsent();
      setAnalytics(current?.analytics ?? false);
      setCustomizing(true);
      setVisible(true);
    }

    window.addEventListener("relief-open-cookie-preferences", openPreferences);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("relief-open-cookie-preferences", openPreferences);
    };
  }, []);

  function closeWithConsent(nextAnalytics: boolean) {
    saveCookieConsent({ necessary: true, analytics: nextAnalytics });
    setVisible(false);
    setCustomizing(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:pb-6">
      <section className="mx-auto max-w-2xl rounded-[28px] border border-ink/10 bg-white p-5 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-ink">Gestion des cookies</h2>
            <p className="mt-2 text-sm leading-6 text-ink/65">
              Nous utilisons des cookies nécessaires au fonctionnement de l’application et, avec ton accord, des cookies
              de mesure d’audience pour améliorer Stress Relief.
            </p>
          </div>
        </div>

        {customizing ? (
          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-mist px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-ink">Cookies nécessaires</p>
                <p className="text-xs text-ink/55">Toujours activés</p>
              </div>
              <span className="rounded-full bg-leaf/10 px-3 py-1 text-xs font-semibold text-leaf">Activés</span>
            </div>
            <label className="flex items-center justify-between rounded-2xl bg-mist px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-ink">Mesure d’audience</p>
                <p className="text-xs text-ink/55">Aide à améliorer l’expérience produit</p>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
                className="h-5 w-5 accent-leaf"
              />
            </label>
            <button
              type="button"
              onClick={() => closeWithConsent(analytics)}
              className="w-full rounded-2xl bg-leaf px-5 py-3 font-semibold text-white"
            >
              Enregistrer mes choix
            </button>
          </div>
        ) : (
          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => closeWithConsent(true)}
              className="rounded-2xl bg-leaf px-4 py-3 text-sm font-semibold text-white"
            >
              Tout accepter
            </button>
            <button
              type="button"
              onClick={() => closeWithConsent(false)}
              className="rounded-2xl bg-mist px-4 py-3 text-sm font-semibold text-ink"
            >
              Refuser les cookies non essentiels
            </button>
            <button
              type="button"
              onClick={() => setCustomizing(true)}
              className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold text-ink"
            >
              Personnaliser
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
