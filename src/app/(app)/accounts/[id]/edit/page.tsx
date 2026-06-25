import { notFound } from "next/navigation"
import Link from "next/link"
import { requireUser } from "@/lib/auth/guards"
import { PageHeader } from "@/components/common/page-header"
import { AccountForm } from "@/modules/accounts/components/account-form"
import { getAccountById } from "@/modules/accounts/queries"
import { canEditAccount } from "@/modules/accounts/permissions"
import { updateAccount } from "@/modules/accounts/actions"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const account = await getAccountById(id)
  return {
    title: account ? `Modifier — ${account.label}` : "Compte introuvable",
  }
}

export default async function EditAccountPage({ params }: Props) {
  const { id } = await params
  const user = await requireUser()
  const account = await getAccountById(id)

  if (!account) notFound()
  if (!canEditAccount(user, account)) notFound()

  const boundUpdateAccount = updateAccount.bind(null, account.id)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href={`/accounts/${account.id}`}>
          <Button variant="ghost" size="icon-sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <PageHeader
          title={`Modifier — ${account.label}`}
          description="Modifier les informations du compte."
        />
      </div>
      <div className="max-w-2xl">
        <AccountForm account={account} mode="edit" action={boundUpdateAccount} />
      </div>
    </div>
  )
}
