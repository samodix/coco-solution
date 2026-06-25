import { notFound } from "next/navigation"
import Link from "next/link"
import { requireUser } from "@/lib/auth/guards"
import { PageHeader } from "@/components/common/page-header"
import { StatusBadge, GameTypeBadge } from "@/modules/accounts/components/account-status-badge"
import { AccountArchiveButton } from "@/modules/accounts/components/account-archive-button"
import { AccountDeleteDialog } from "@/modules/accounts/components/account-delete-dialog"
import { getAccountById } from "@/modules/accounts/queries"
import { canEditAccount, canDeleteAccount, canArchiveAccount } from "@/modules/accounts/permissions"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Pencil, Shield, Phone, Mail } from "lucide-react"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const account = await getAccountById(id)
  return {
    title: account ? `Compte — ${account.label}` : "Compte introuvable",
  }
}

export default async function AccountDetailPage({ params }: Props) {
  const { id } = await params
  const user = await requireUser()
  const account = await getAccountById(id)

  if (!account) notFound()

  const canEdit = canEditAccount(user, account)
  const canDelete = canDeleteAccount(user)
  const canArchive = canArchiveAccount(user, account)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/accounts">
          <Button variant="ghost" size="icon-sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <PageHeader
            title={account.label}
            description={`Propriétaire : ${account.owner.name}`}
          />
        </div>
        <div className="flex gap-2">
          {canEdit && (
            <Link href={`/accounts/${account.id}/edit`}>
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 h-4 w-4" />
                Modifier
              </Button>
            </Link>
          )}
          {canArchive && (
            <AccountArchiveButton
              accountId={account.id}
              isArchived={account.status === "ARCHIVED"}
            />
          )}
          {canDelete && (
            <AccountDeleteDialog
              accountId={account.id}
              accountLabel={account.label}
              open={false}
              onOpenChange={() => {}}
            />
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-lg border p-4">
          <h3 className="font-heading text-sm font-medium">Informations</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <GameTypeBadge gameType={account.gameType} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Serveur :</span>
              <span>{account.server ?? "Non renseigné"}</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={account.status} variant="account" />
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={account.subscriptionStatus} variant="subscription" />
              {account.subscriptionExpiresAt && (
                <span className="text-muted-foreground">
                  — expire le {account.subscriptionExpiresAt.toLocaleDateString("fr-FR")}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span>2FA : {account.hasTwoFactor ? "Activée" : "Désactivée"}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border p-4">
          <h3 className="font-heading text-sm font-medium">Contact</h3>
          <div className="space-y-3 text-sm">
            {account.email ? (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{account.email}</span>
              </div>
            ) : (
              <p className="text-muted-foreground">Email non renseigné</p>
            )}
            {account.phone ? (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{account.phone}</span>
              </div>
            ) : (
              <p className="text-muted-foreground">Téléphone non renseigné</p>
            )}
          </div>
        </div>

        <div className="space-y-4 rounded-lg border p-4">
          <h3 className="font-heading text-sm font-medium">Statistiques</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{account._count.characters}</div>
              <div className="text-xs text-muted-foreground">Personnages</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{account._count.subscriptions}</div>
              <div className="text-xs text-muted-foreground">Abonnements</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{account._count.goals}</div>
              <div className="text-xs text-muted-foreground">Objectifs</div>
            </div>
          </div>
        </div>

        {account.notes && (
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-heading text-sm font-medium">Notes</h3>
            <p className="whitespace-pre-wrap text-sm text-muted-foreground">{account.notes}</p>
          </div>
        )}
      </div>

      <div className="text-xs text-muted-foreground">
        Créé le {account.createdAt.toLocaleDateString("fr-FR")} •
        Mis à jour le {account.updatedAt.toLocaleDateString("fr-FR")}
      </div>
    </div>
  )
}
