import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground text-lg font-bold shadow-[var(--shadow-level-2)]">
          DB
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-foreground leading-tight">
            DOFUS BUSINESS
          </span>
          <span className="text-xs text-muted-foreground">
            Account Manager
          </span>
        </div>
      </div>

      <div className="w-full max-w-sm rounded-xl bg-card p-6 shadow-[var(--shadow-level-3)]">
        <div className="mb-6 text-center">
          <h1 className="text-lg font-semibold text-foreground">
            Accès interne sécurisé
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Connectez-vous avec vos identifiants.
          </p>
        </div>

        <LoginForm />

        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          Application privée. Accès restreint aux utilisateurs autorisés.
        </p>
      </div>
    </div>
  );
}
