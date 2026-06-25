import { requireUser } from "@/lib/auth/guards"
import { PageHeader } from "@/components/common/page-header"
import { AccountForm } from "@/modules/accounts/components/account-form"
import { createAccount } from "@/modules/accounts/actions"

export default async function NewAccountPage() {
  await requireUser()

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Nouveau compte"
        description="Ajouter un nouveau compte Dofus."
      />
      <div className="max-w-2xl">
        <AccountForm mode="create" action={createAccount} />
      </div>
    </div>
  )
}
