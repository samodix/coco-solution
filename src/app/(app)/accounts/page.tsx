import Link from "next/link"
import { Suspense } from "react"
import { requireUser } from "@/lib/auth/guards"
import { PageHeader } from "@/components/common/page-header"
import { EmptyState } from "@/components/common/empty-state"
import { AccountTable } from "@/modules/accounts/components/account-table"
import { AccountFilters } from "@/modules/accounts/components/account-filters"
import { getAccounts } from "@/modules/accounts/queries"
import { Button } from "@/components/ui/button"
import { Plus, Crown } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Comptes Dofus — DOFUS BUSINESS",
}

interface Props {
  searchParams: Promise<{ search?: string; status?: string; gameType?: string }>
}

export default async function AccountsPage({ searchParams }: Props) {
  const user = await requireUser()
  const params = await searchParams

  const { accounts, total } = await getAccounts({
    search: params.search,
    status: params.status as "ACTIVE" | "PAUSED" | "TO_CHECK" | "EXPIRED" | "BANNED" | "ARCHIVED" | undefined,
    gameType: params.gameType as "DOFUS_3" | "DOFUS_RETRO" | "WAKFU" | "OTHER" | undefined,
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Comptes Dofus"
          description={`${total} compte${total > 1 ? "s" : ""} au total.`}
        />
        <Link href="/accounts/new">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau
          </Button>
        </Link>
      </div>

      <Suspense fallback={<div className="text-muted-foreground">Chargement...</div>}>
        <AccountFilters />
      </Suspense>

      {accounts.length > 0 ? (
        <AccountTable accounts={accounts} user={user} />
      ) : (
        <EmptyState
          icon={Crown}
          title="Aucun compte"
          description="Commencez par ajouter un premier compte Dofus."
        />
      )}
    </div>
  )
}
