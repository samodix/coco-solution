import { Shield, Zap, Settings, Gauge, Users } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Équipe Experte",
    description: "Une équipe prête à relever vos défis avec des solutions innovantes et des éprouvées.",
  },
  {
    icon: Zap,
    title: "Rapide et Scalable",
    description: "Faites évoluer votre entreprise sans effort avec notre SaaS conçu pour grandir avec vos besoins.",
  },
  {
    icon: Settings,
    title: "Personnalisable",
    description: "Personnalisez la plateforme pour qu'elle s'aligne parfaitement sur vos objectifs métier.",
  },
  {
    icon: Gauge,
    title: "Efficacité Maximale",
    description: "Maximisez l'efficacité avec des solutions intégrées qui éliminent les goulots d'étranglement.",
  },
  {
    icon: Users,
    title: "Facile à Utiliser",
    description: "Une interface simple et accessible pour tous les niveaux, facile à prendre en main.",
  },
];

const tags = [
  "Sécurité Robuste",
  "Personnalisable",
  "Accessibilité",
  "Efficacité Automatisée",
  "Données Centralisées",
];

export function Benefits() {
  return (
    <section id="benefits" className="py-20 sm:py-28 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left column */}
          <div>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
              Avantages
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ouvrez une Nouvelle Ère d&apos;
              <span className="text-primary">Excellence Opérationnelle</span> et d&apos;
              <span className="text-primary">Innovation</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Débloquez l&apos;excellence opérationnelle et l&apos;innovation avec nos outils
              avancés et nos processus optimisés.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-[var(--shadow-level-1)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right column - Benefits list */}
          <div className="flex flex-col gap-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex items-start gap-4 rounded-xl bg-card p-5 shadow-[var(--shadow-level-2)] transition-all hover:shadow-[var(--shadow-level-3)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <benefit.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
