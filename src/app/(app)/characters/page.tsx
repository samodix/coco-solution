import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { Users } from "lucide-react";

export default function CharactersPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Personnages"
        description="Gérer les personnages liés à vos comptes."
      />
      <EmptyState
        icon={Users}
        title="Aucun personnage"
        description="Ajoutez un compte pour commencer à gérer vos personnages."
      />
    </div>
  );
}
