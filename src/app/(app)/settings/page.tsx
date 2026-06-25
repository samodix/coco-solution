import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Paramètres"
        description="Configurer l'application."
      />
      <EmptyState
        icon={Settings}
        title="Aucun paramètre"
        description="Les paramètres seront disponibles prochainement."
      />
    </div>
  );
}
