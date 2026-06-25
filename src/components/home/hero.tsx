import Link from "next/link";
import { Shield, Zap, Settings, Users, Crown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-20 sm:pt-24 sm:pb-28">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-[var(--shadow-level-1)]">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="inline-flex items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider">
              Nouveau
            </span>
            Smart AI Features
          </div>
        </div>

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Gérez vos comptes Dofus avec{" "}
            <span className="text-primary">intelligence</span> et{" "}
            <span className="text-primary">efficacité</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Optimisez la gestion de vos comptes, personnages, teams et abonnements
            avec une plateforme intelligente conçue pour les joueurs professionnels.
          </p>
        </div>

        {/* Feature chips */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {[
            { icon: Settings, label: "Personnalisable" },
            { icon: Zap, label: "Performance" },
            { icon: Shield, label: "Sécurisé" },
          ].map((chip) => (
            <div
              key={chip.label}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-[var(--shadow-level-1)]"
            >
              <chip.icon className="h-3.5 w-3.5 text-primary" />
              {chip.label}
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            Explorer
            <span>→</span>
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            En savoir plus
            <span>↗</span>
          </a>
        </div>

        {/* Social proof */}
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Rejoint par 4,000+ joueurs actifs
          </p>
          <div className="flex items-center justify-center gap-6 mt-4">
            {["Ankama", "DofusDB", "DofusPourLesNoobs", "DofusTouch"].map((name) => (
              <span key={name} className="text-sm font-medium text-muted-foreground/60">
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Floating stat cards */}
        <div className="relative mt-16 hidden lg:block">
          {/* Left card */}
          <div className="absolute -left-4 top-0 w-56 rounded-xl bg-card p-4 shadow-[var(--shadow-level-3)] border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Crown className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Comptes gérés</p>
                <p className="text-lg font-bold text-foreground">$18,055</p>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <div className="h-full w-3/4 rounded-full bg-primary" />
            </div>
          </div>

          {/* Right card */}
          <div className="absolute -right-4 top-8 w-56 rounded-xl bg-card p-4 shadow-[var(--shadow-level-3)] border border-border">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald/10">
                <Users className="h-4 w-4 text-emerald" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total utilisateurs</p>
                <p className="text-lg font-bold text-foreground">150K+</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-secondary p-2">
                <p className="text-[10px] text-muted-foreground">Personnages</p>
                <p className="text-sm font-semibold text-foreground">5,490</p>
              </div>
              <div className="rounded-lg bg-secondary p-2">
                <p className="text-[10px] text-muted-foreground">Teams</p>
                <p className="text-sm font-semibold text-foreground">8,370</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
