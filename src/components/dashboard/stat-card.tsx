import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendValue,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-card p-4 sm:p-5 shadow-[var(--shadow-level-2)] transition-all hover:shadow-[var(--shadow-level-3)]",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
          <span className="text-2xl font-bold text-foreground">{value}</span>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      {trend && trendValue && (
        <div className="mt-3 flex items-center gap-1">
          <span
            className={cn(
              "text-xs font-medium",
              trend === "up" && "text-emerald",
              trend === "down" && "text-danger",
              trend === "neutral" && "text-muted-foreground"
            )}
          >
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trendValue}
          </span>
        </div>
      )}
    </div>
  );
}
