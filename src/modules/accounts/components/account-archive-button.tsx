"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { archiveAccount } from "../actions"

interface AccountArchiveButtonProps {
  accountId: string
  isArchived: boolean
}

export function AccountArchiveButton({ accountId, isArchived }: AccountArchiveButtonProps) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  async function handleArchive() {
    if (!confirm(isArchived ? "Restaurer ce compte ?" : "Archiver ce compte ?")) return
    setIsPending(true)
    const result = await archiveAccount(accountId)
    if (result.success) {
      router.refresh()
    } else {
      alert(result.error ?? "Erreur lors de l'opération.")
    }
    setIsPending(false)
  }

  return (
    <Button
      variant="outline"
      onClick={handleArchive}
      disabled={isPending}
    >
      {isPending ? "..." : isArchived ? "Restaurer" : "Archiver"}
    </Button>
  )
}
