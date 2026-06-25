import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { Swords } from "lucide-react";

export default function TeamsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Teams"
        description="Organiser vos équipes de jeu."
      />
      <EmptyState
        icon={Swords}
        title="Aucune team"
        description="Créez votre première team pour organiser vos personnages."
      />
    </div>
  );
}
