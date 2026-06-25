"use client";

import {
  LayoutDashboard,
  Users,
  Swords,
  Target,
  Settings,
  Crown,
  CreditCard,
} from "lucide-react";
import { NavItem } from "./nav-item";
import { Separator } from "@/components/ui/separator";

const mainNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/accounts", label: "Comptes", icon: Crown },
  { href: "/characters", label: "Personnages", icon: Users },
  { href: "/teams", label: "Teams", icon: Swords },
];

const secondaryNav = [
  { href: "/subscriptions", label: "Abonnements", icon: CreditCard },
  { href: "/goals", label: "Objectifs", icon: Target },
  { href: "/settings", label: "Paramètres", icon: Settings },
];

export function MobileNav() {
  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex items-center gap-2.5 px-4 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold shadow-[var(--shadow-level-1)]">
          DB
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground leading-tight">
            DOFUS BUSINESS
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Account Manager
          </span>
        </div>
      </div>

      <Separator className="bg-sidebar-border" />

      <nav className="flex flex-1 flex-col gap-0.5 px-3 py-4">
        <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Navigation
        </span>
        {mainNav.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}

        <Separator className="my-4 bg-sidebar-border" />

        <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Gestion
        </span>
        {secondaryNav.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </nav>
    </div>
  );
}
