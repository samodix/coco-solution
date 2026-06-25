import { StatCard } from "@/components/dashboard/stat-card";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { ModuleCard } from "@/components/dashboard/module-card";
import { PageHeader } from "@/components/common/page-header";
import {
  Crown,
  Users,
  Swords,
  CreditCard,
  Target,
  Settings,
  AlertTriangle,
} from "lucide-react";

const stats = [
  { label: "Comptes total", value: 0, icon: Crown },
  { label: "Comptes actifs", value: 0, icon: Crown },
  { label: "Personnages", value: 0, icon: Users },
  { label: "Teams actives", value: 0, icon: Swords },
  { label: "Abonnements expirant", value: 0, icon: AlertTriangle },
  { label: "Objectifs ouverts", value: 0, icon: Target },
];

const modules = [
  {
    title: "Comptes Dofus",
    description: "Gérer vos comptes Dofus et leurs informations.",
    href: "/accounts",
    icon: Crown,
    count: 0,
  },
  {
    title: "Personnages",
    description: "Gérer les personnages liés à vos comptes.",
    href: "/characters",
    icon: Users,
    count: 0,
  },
  {
    title: "Teams",
    description: "Organiser vos équipes de jeu.",
    href: "/teams",
    icon: Swords,
    count: 0,
  },
  {
    title: "Abonnements",
    description: "Suivre les abonnements et dates d'expiration.",
    href: "/subscriptions",
    icon: CreditCard,
    count: 0,
  },
  {
    title: "Objectifs",
    description: "Définir et suivre vos objectifs de farming.",
    href: "/goals",
    icon: Target,
    count: 0,
  },
  {
    title: "Paramètres",
    description: "Configurer l'application.",
    href: "/settings",
    icon: Settings,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Dashboard"
        description="Vue d'ensemble de votre activité"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Modules + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-foreground mb-3">
            Modules
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {modules.map((mod) => (
              <ModuleCard key={mod.href} {...mod} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
