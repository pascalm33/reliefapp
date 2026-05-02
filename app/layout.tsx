import type { Metadata } from "next";
import "./globals.css";
import CookieConsentPopup from "@/components/cookies/CookieConsentPopup";

export const metadata: Metadata = {
  title: "Stress Relief",
  description: "Mesure tes signaux de stress. Fais une action courte. Observe ton soulagement."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <CookieConsentPopup />
      </body>
    </html>
  );
}
