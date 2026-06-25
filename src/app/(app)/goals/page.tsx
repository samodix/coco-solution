import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { Target } from "lucide-react";

export default function GoalsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Objectifs"
        description="Définir et suivre vos objectifs de farming."
      />
      <EmptyState
        icon={Target}
        title="Aucun objectif"
        description="Créez un objectif pour suivre votre progression."
      />
    </div>
  );
}
