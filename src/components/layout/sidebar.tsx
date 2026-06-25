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

export function Sidebar() {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col border-r border-border bg-sidebar">
      <div className="flex grow flex-col gap-y-6 overflow-y-auto px-4 py-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-1">
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

        <Separator className="bg-border" />

        {/* Main nav */}
        <nav className="flex flex-col gap-0.5">
          <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Navigation
          </span>
          {mainNav.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>

        <Separator className="bg-border" />

        {/* Secondary nav */}
        <nav className="flex flex-col gap-0.5">
          <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Gestion
          </span>
          {secondaryNav.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground leading-tight">
              Admin
            </span>
            <span className="text-[10px] text-muted-foreground">
              Administrateur
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
