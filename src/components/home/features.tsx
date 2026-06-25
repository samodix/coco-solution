import { BarChart3, Calendar, Users, MessageSquare, LayoutDashboard, Bell } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Analyses en Temps Réel",
    description: "Suivez les performances de vos comptes avec des tableaux de bord détaillés et des métriques en direct.",
    color: "primary",
  },
  {
    icon: Calendar,
    title: "Planification Intelligente",
    description: "Organisez et planifiez les actions de vos personnages sur toutes vos plateformes.",
    color: "emerald",
  },
  {
    icon: Users,
    title: "Collaboration d'Équipe",
    description: "Gérez et améliorez la coordination de vos teams de jeu efficacement.",
    color: "amber",
  },
  {
    icon: MessageSquare,
    title: "Communication Simplifiée",
    description: "Centralisez les conversations pour une coordination fluide entre les membres.",
    color: "primary",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards Personnalisables",
    description: "Adaptez votre espace de travail pour mettre en avant les métriques critiques.",
    color: "emerald",
  },
];

const colorMap: Record<string, { bg: string; icon: string }> = {
  primary: { bg: "bg-primary/10", icon: "text-primary" },
  emerald: { bg: "bg-emerald/10", icon: "text-emerald" },
  amber: { bg: "bg-amber/10", icon: "text-amber" },
};

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            Fonctionnalités
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Des Solutions{" "}
            <span className="text-primary">Personnalisables</span> pour Chaque Besoin
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Adaptez la plateforme à vos besoins uniques avec des solutions flexibles
            et scalables conçues pour évoluer avec vous.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.slice(0, 3).map((feature) => {
            const colors = colorMap[feature.color];
            return (
              <div
                key={feature.title}
                className="group rounded-xl bg-card p-6 shadow-[var(--shadow-level-2)] transition-all hover:shadow-[var(--shadow-level-3)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg}`}>
                    <feature.icon className={`h-5 w-5 ${colors.icon}`} />
                  </div>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${colors.bg}`}>
                    <Bell className={`h-4 w-4 ${colors.icon}`} />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom row - 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {features.slice(3).map((feature) => {
            const colors = colorMap[feature.color];
            return (
              <div
                key={feature.title}
                className="group rounded-xl bg-card p-6 shadow-[var(--shadow-level-2)] transition-all hover:shadow-[var(--shadow-level-3)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${colors.bg}`}>
                    <feature.icon className={`h-4 w-4 ${colors.icon}`} />
                  </div>
                </div>
                {/* Mock UI */}
                <div className="mt-4 rounded-lg bg-secondary/50 p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <div className="h-2 w-16 rounded bg-secondary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 rounded bg-secondary" />
                    <div className="h-2 w-12 rounded bg-secondary" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
