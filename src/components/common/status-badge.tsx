import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "outline";

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-secondary text-secondary-foreground",
  success: "bg-emerald/15 text-emerald",
  warning: "bg-amber/15 text-amber",
  danger: "bg-danger/15 text-danger",
  info: "bg-primary/15 text-primary",
  outline: "border border-border text-muted-foreground",
};

export function StatusBadge({ label, variant = "default", className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
