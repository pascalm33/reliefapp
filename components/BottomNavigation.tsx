"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/app/dashboard", label: "Aujourd’hui" },
  { href: "/app/checkin", label: "Check-in" },
  { href: "/app/action", label: "Action" },
  { href: "/app/daily-report", label: "Rapport" },
  { href: "/app/history", label: "Historique" }
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
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
  );
}
