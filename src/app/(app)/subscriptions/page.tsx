import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { CreditCard } from "lucide-react";

export default function SubscriptionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Abonnements"
        description="Suivre les abonnements et dates d'expiration."
      />
      <EmptyState
        icon={CreditCard}
        title="Aucun abonnement"
        description="Ajoutez un abonnement pour suivre les dates d'expiration."
      />
    </div>
  );
}
