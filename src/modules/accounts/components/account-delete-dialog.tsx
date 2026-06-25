"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { deleteAccount } from "../actions"

interface AccountDeleteDialogProps {
  accountId: string
  accountLabel: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccountDeleteDialog({
  accountId,
  accountLabel,
  open,
  onOpenChange,
}: AccountDeleteDialogProps) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  async function handleDelete() {
    setIsPending(true)
    const result = await deleteAccount(accountId)
    if (result.success) {
      onOpenChange(false)
      router.push("/accounts")
      router.refresh()
    } else {
      alert(result.error ?? "Erreur lors de la suppression.")
      setIsPending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer le compte</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer le compte <strong>{accountLabel}</strong> ?
            Cette action est irréversible et supprimera toutes les données associées.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
