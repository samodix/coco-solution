import { EmptyState } from "@/components/common/empty-state";
import { Activity } from "lucide-react";

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">
        Activité récente
      </h3>
      <EmptyState
        icon={Activity}
        title="Aucune activité"
        description="Aucune activité pour le moment."
      />
    </div>
  );
}
