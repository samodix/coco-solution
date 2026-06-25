import { NavbarPublic } from "@/components/home/navbar-public";
import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { Benefits } from "@/components/home/benefits";
import { CTA } from "@/components/home/cta";
import { Footer } from "@/components/home/footer";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Info,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Download,
  Plus,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavbarPublic />
      <main>
        <Hero />
        <Features />
        <Benefits />

        {/* Styleguide Showcase — Buttons & Alerts */}
        <section className="py-20 sm:py-28 bg-secondary/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                Composants
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Boutons & Alertes
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Éléments d&apos;interface conformes à la charte graphique Clean SaaS Monochrome.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Buttons */}
              <div className="rounded-xl bg-card p-6 shadow-[var(--shadow-level-2)]">
                <h3 className="text-sm font-semibold text-foreground mb-1">Boutons</h3>
                <p className="text-xs text-muted-foreground mb-6">
                  Trois niveaux hiérarchiques avec états Default, Hover, Active.
                </p>

                <div className="space-y-6">
                  {/* Primary */}
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Primary
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="default" size="sm">Default</Button>
                      <Button variant="default" size="sm" className="hover:bg-primary/80">Hover</Button>
                      <Button variant="default" size="sm" className="bg-primary/80">Active</Button>
                    </div>
                  </div>

                  {/* Secondary */}
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Secondary
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="secondary" size="sm">Default</Button>
                      <Button variant="secondary" size="sm" className="hover:bg-secondary/80">Hover</Button>
                      <Button variant="secondary" size="sm" className="bg-secondary/80">Active</Button>
                    </div>
                  </div>

                  {/* Tertiary */}
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Tertiary
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="tertiary" size="sm">Default</Button>
                      <Button variant="tertiary" size="sm" className="bg-muted">Hover</Button>
                      <Button variant="tertiary" size="sm" className="bg-muted/80">Active</Button>
                    </div>
                  </div>

                  {/* With icons */}
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Avec icônes
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="default" size="sm">
                        <Plus className="h-3.5 w-3.5" />
                        Créer
                      </Button>
                      <Button variant="secondary" size="sm">
                        <Download className="h-3.5 w-3.5" />
                        Exporter
                      </Button>
                      <Button variant="default" size="sm">
                        Commencer
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              <div className="rounded-xl bg-card p-6 shadow-[var(--shadow-level-2)]">
                <h3 className="text-sm font-semibold text-foreground mb-1">Alertes</h3>
                <p className="text-xs text-muted-foreground mb-6">
                  Messages de retour contextuels avec icônes et couleurs sémantiques.
                </p>

                <div className="flex flex-col gap-3">
                  <Alert
                    variant="success"
                    title="Changes saved."
                  />
                  <Alert
                    variant="info"
                    title="New feature available."
                  />
                  <Alert
                    variant="warning"
                    title="Session expiring."
                  />
                  <Alert
                    variant="error"
                    title="Failed to save."
                  />
                </div>

                {/* Chips */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Chips
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                      Filter: Active
                    </span>
                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                      Filled
                    </span>
                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                      Status: Pending
                    </span>
                    <span className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      Tag: New
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
