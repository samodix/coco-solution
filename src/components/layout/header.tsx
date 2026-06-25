"use client";

import { Menu } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { UserMenu } from "@/components/auth/user-menu";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/accounts": "Comptes Dofus",
  "/characters": "Personnages",
  "/teams": "Teams",
  "/subscriptions": "Abonnements",
  "/goals": "Objectifs",
  "/settings": "Paramètres",
};

interface HeaderProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "DOFUS BUSINESS";
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6">
      <button
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted lg:hidden"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Ouvrir le menu</span>
      </button>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMobileNavOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-y-0 left-0 w-72 bg-sidebar border-r border-sidebar-border shadow-[var(--shadow-level-4)]">
            <MobileNav />
          </div>
        </div>
      )}

      <div className="flex-1">
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <UserMenu user={user} />
      </div>
    </header>
  );
}
