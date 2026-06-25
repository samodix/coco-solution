"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  GAME_TYPE_LABELS,
  ACCOUNT_STATUS_LABELS,
  SUBSCRIPTION_STATUS_LABELS,
} from "@/modules/accounts/validation"
import type { GameAccount } from "@prisma/client"
import type { ActionState } from "../actions"

interface AccountFormProps {
  account?: GameAccount
  mode: "create" | "edit"
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>
}

export function AccountForm({ account, mode, action }: AccountFormProps) {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(action, { success: false })

  if (state.success) {
    return null
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="label">Nom du compte *</Label>
          <Input
            id="label"
            name="label"
            defaultValue={account?.label}
            placeholder="Mon compte Dofus"
            required
          />
          {state.errors?.label && (
            <p className="text-sm text-red-400">{state.errors.label[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gameType">Type de jeu *</Label>
          <select
            id="gameType"
            name="gameType"
            defaultValue={account?.gameType ?? "DOFUS_3"}
            className="flex h-10 w-full items-center rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {Object.entries(GAME_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {state.errors?.gameType && (
            <p className="text-sm text-red-400">{state.errors.gameType[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="server">Serveur</Label>
          <Input
            id="server"
            name="server"
            defaultValue={account?.server ?? ""}
            placeholder="Arty, Osh, etc."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={account?.email ?? ""}
            placeholder="email@exemple.com"
          />
          {state.errors?.email && (
            <p className="text-sm text-red-400">{state.errors.email[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            name="phone"
            defaultValue={account?.phone ?? ""}
            placeholder="+33 6 12 34 56 78"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Statut *</Label>
          <select
            id="status"
            name="status"
            defaultValue={account?.status ?? "ACTIVE"}
            className="flex h-10 w-full items-center rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {Object.entries(ACCOUNT_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {state.errors?.status && (
            <p className="text-sm text-red-400">{state.errors.status[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="subscriptionStatus">Statut abonnement *</Label>
          <select
            id="subscriptionStatus"
            name="subscriptionStatus"
            defaultValue={account?.subscriptionStatus ?? "UNKNOWN"}
            className="flex h-10 w-full items-center rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {Object.entries(SUBSCRIPTION_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {state.errors?.subscriptionStatus && (
            <p className="text-sm text-red-400">{state.errors.subscriptionStatus[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="subscriptionExpiresAt">Expire le</Label>
          <Input
            id="subscriptionExpiresAt"
            name="subscriptionExpiresAt"
            type="date"
            defaultValue={account?.subscriptionExpiresAt?.toISOString().split("T")[0] ?? ""}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="hasTwoFactor"
          name="hasTwoFactor"
          defaultChecked={account?.hasTwoFactor ?? false}
        />
        <Label htmlFor="hasTwoFactor">Double authentification activée</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          defaultValue={account?.notes ?? ""}
          placeholder="Informations supplémentaires..."
          rows={3}
        />
      </div>

      {state.error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Enregistrement..." : mode === "create" ? "Créer le compte" : "Enregistrer"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Annuler
        </Button>
      </div>
    </form>
  )
}
