import Link from "next/link";

export function CTA() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative rounded-2xl bg-primary p-12 sm:p-16 text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-primary-foreground/10 blur-3xl" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Prêt à optimiser vos comptes Dofus ?
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
            Rejoignez des milliers de joueurs qui font confiance à DOFUS BUSINESS
            pour gérer leurs comptes et équipes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-background px-6 py-3 text-sm font-medium text-foreground shadow-sm hover:bg-background/90 transition-colors"
            >
              Commencer Maintenant
              <span>→</span>
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/30 px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              Voir la Démo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
