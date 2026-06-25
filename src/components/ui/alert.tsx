import { cn } from "@/lib/utils";
import { CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react";

type AlertVariant = "success" | "info" | "warning" | "error";

interface AlertProps {
  variant: AlertVariant;
  title: string;
  description?: string;
  className?: string;
}

const variantConfig: Record<
  AlertVariant,
  {
    border: string;
    bg: string;
    iconColor: string;
    textColor: string;
    icon: typeof CheckCircle;
  }
> = {
  success: {
    border: "border-l-4 border-l-emerald",
    bg: "bg-emerald/10",
    iconColor: "text-emerald",
    textColor: "text-emerald",
    icon: CheckCircle,
  },
  info: {
    border: "border-l-4 border-l-primary",
    bg: "bg-primary/10",
    iconColor: "text-primary",
    textColor: "text-primary",
    icon: Info,
  },
  warning: {
    border: "border-l-4 border-l-amber",
    bg: "bg-amber/10",
    iconColor: "text-amber",
    textColor: "text-amber",
    icon: AlertTriangle,
  },
  error: {
    border: "border-l-4 border-l-danger",
    bg: "bg-danger/10",
    iconColor: "text-danger",
    textColor: "text-danger",
    icon: XCircle,
  },
};

const variantLabels: Record<AlertVariant, string> = {
  success: "Success",
  info: "Info",
  warning: "Warning",
  error: "Error",
};

export function Alert({ variant, title, description, className }: AlertProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg px-4 py-3 shadow-[var(--shadow-level-1)]",
        config.border,
        config.bg,
        className
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", config.iconColor)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">
          <span className={config.textColor}>{variantLabels[variant]}: </span>
          {title}
        </p>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
    </div>
  );
}
