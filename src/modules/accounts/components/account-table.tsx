"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { StatusBadge, GameTypeBadge } from "./account-status-badge"
import type { AccountWithRelations } from "../queries"
import type { User } from "@prisma/client"

interface AccountTableProps {
  accounts: AccountWithRelations[]
  user: User
}

export function AccountTable({ accounts, user }: AccountTableProps) {
  const router = useRouter()

  if (accounts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground">Aucun compte trouvé.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left font-medium">Nom</th>
            <th className="px-4 py-3 text-left font-medium">Jeu</th>
            <th className="px-4 py-3 text-left font-medium">Serveur</th>
            <th className="px-4 py-3 text-left font-medium">Statut</th>
            <th className="px-4 py-3 text-left font-medium">Abonnement</th>
            <th className="px-4 py-3 text-left font-medium">Persos</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3">
                <Link
                  href={`/accounts/${account.id}`}
                  className="font-medium text-foreground hover:underline"
                >
                  {account.label}
                </Link>
                {account.email && (
                  <p className="text-xs text-muted-foreground">{account.email}</p>
                )}
              </td>
              <td className="px-4 py-3">
                <GameTypeBadge gameType={account.gameType} />
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {account.server ?? "—"}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={account.status} variant="account" />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={account.subscriptionStatus} variant="subscription" />
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {account._count.characters}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/accounts/${account.id}`)}
                  >
                    Voir
                  </Button>
                  {(user.role === "ADMIN" || account.ownerId === user.id) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/accounts/${account.id}/edit`)}
                    >
                      Modifier
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
