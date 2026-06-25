import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ModuleCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  count?: number;
  className?: string;
}

export function ModuleCard({
  title,
  description,
  href,
  icon: Icon,
  count,
  className,
}: ModuleCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-3 rounded-xl bg-card p-5 shadow-[var(--shadow-level-2)] transition-all hover:shadow-[var(--shadow-level-3)]",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        {count !== undefined && (
          <span className="text-xs font-semibold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors mt-auto">
        <span>Accéder</span>
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
