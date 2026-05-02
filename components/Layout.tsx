"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Aujourd’hui" },
  { href: "/checkin", label: "Check-in" },
  { href: "/action", label: "Action" },
  { href: "/daily-report", label: "Rapport" },
  { href: "/history", label: "Historique" }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-24 pt-5 sm:px-6">
      <header className="mb-5 flex items-center justify-between">
        <Link href="/" className="leading-tight">
          <p className="text-2xl font-semibold tracking-normal text-ink">Relief</p>
          <p className="text-xs text-ink/60">Observer. Agir. Soulager.</p>
        </Link>
        <Link
          href="/settings"
          className="rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-sm font-medium text-ink shadow-sm"
        >
          Réglages
        </Link>
      </header>
      <main className="flex-1">{children}</main>
      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-20 border-t border-ink/10 bg-white/92 px-2 py-2 backdrop-blur">
        <div className="mx-auto grid max-w-3xl grid-cols-5 gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-1 py-2 text-center text-[11px] font-medium ${
                  active ? "bg-leaf text-white" : "text-ink/65"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
