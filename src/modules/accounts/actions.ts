"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { requireUser } from "@/lib/auth/guards"
import { accountFormSchema } from "./validation"
import { canPerformAccountAction, canEditAccount, canArchiveAccount, canDeleteAccount } from "./permissions"
import { getAccountById } from "./queries"

export type ActionState = {
  success: boolean
  error?: string
  errors?: Record<string, string[]>
}

export async function createAccount(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await requireUser()

  if (!canPerformAccountAction(user, "CREATE")) {
    return { success: false, error: "Vous n'avez pas les droits pour créer un compte." }
  }

  const raw: Record<string, unknown> = {
    label: formData.get("label") as string,
    gameType: formData.get("gameType") as string,
    server: formData.get("server") as string || undefined,
    email: formData.get("email") as string || undefined,
    phone: formData.get("phone") as string || undefined,
    status: formData.get("status") as string,
    subscriptionStatus: formData.get("subscriptionStatus") as string,
    subscriptionExpiresAt: formData.get("subscriptionExpiresAt") as string || undefined,
    hasTwoFactor: formData.get("hasTwoFactor") === "on",
    notes: formData.get("notes") as string || undefined,
  }

  const result = accountFormSchema.safeParse(raw)
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors }
  }

  const data = result.data

  const account = await prisma.gameAccount.create({
    data: {
      ownerId: user.id,
      label: data.label,
      gameType: data.gameType,
      server: data.server || null,
      email: data.email || null,
      phone: data.phone || null,
      status: data.status,
      subscriptionStatus: data.subscriptionStatus,
      subscriptionExpiresAt: data.subscriptionExpiresAt ? new Date(data.subscriptionExpiresAt) : null,
      hasTwoFactor: data.hasTwoFactor,
      notes: data.notes || null,
    },
  })

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: "ACCOUNT_CREATED",
      entityType: "GameAccount",
      entityId: account.id,
      metadata: JSON.stringify({ label: account.label }),
    },
  })

  revalidatePath("/accounts")
  redirect(`/accounts/${account.id}`)
}

export async function updateAccount(
  accountId: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await requireUser()
  const account = await getAccountById(accountId)

  if (!account) {
    return { success: false, error: "Compte introuvable." }
  }

  if (!canEditAccount(user, account)) {
    return { success: false, error: "Vous n'avez pas les droits pour modifier ce compte." }
  }

  if (!canPerformAccountAction(user, "UPDATE")) {
    return { success: false, error: "Vous n'avez pas les droits pour modifier un compte." }
  }

  const raw: Record<string, unknown> = {
    label: formData.get("label") as string,
    gameType: formData.get("gameType") as string,
    server: formData.get("server") as string || undefined,
    email: formData.get("email") as string || undefined,
    phone: formData.get("phone") as string || undefined,
    status: formData.get("status") as string,
    subscriptionStatus: formData.get("subscriptionStatus") as string,
    subscriptionExpiresAt: formData.get("subscriptionExpiresAt") as string || undefined,
    hasTwoFactor: formData.get("hasTwoFactor") === "on",
    notes: formData.get("notes") as string || undefined,
  }

  const result = accountFormSchema.safeParse(raw)
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors }
  }

  const data = result.data

  await prisma.gameAccount.update({
    where: { id: accountId },
    data: {
      label: data.label,
      gameType: data.gameType,
      server: data.server || null,
      email: data.email || null,
      phone: data.phone || null,
      status: data.status,
      subscriptionStatus: data.subscriptionStatus,
      subscriptionExpiresAt: data.subscriptionExpiresAt ? new Date(data.subscriptionExpiresAt) : null,
      hasTwoFactor: data.hasTwoFactor,
      notes: data.notes || null,
    },
  })

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: "ACCOUNT_UPDATED",
      entityType: "GameAccount",
      entityId: accountId,
      metadata: JSON.stringify({ label: data.label }),
    },
  })

  revalidatePath("/accounts")
  revalidatePath(`/accounts/${accountId}`)
  redirect(`/accounts/${accountId}`)
}

export async function archiveAccount(accountId: string): Promise<ActionState> {
  const user = await requireUser()
  const account = await getAccountById(accountId)

  if (!account) {
    return { success: false, error: "Compte introuvable." }
  }

  if (!canArchiveAccount(user, account)) {
    return { success: false, error: "Vous n'avez pas les droits pour archiver ce compte." }
  }

  if (!canPerformAccountAction(user, "ARCHIVE")) {
    return { success: false, error: "Vous n'avez pas les droits pour archiver un compte." }
  }

  await prisma.gameAccount.update({
    where: { id: accountId },
    data: { status: "ARCHIVED" },
  })

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: "ACCOUNT_ARCHIVED",
      entityType: "GameAccount",
      entityId: accountId,
      metadata: JSON.stringify({ label: account.label }),
    },
  })

  revalidatePath("/accounts")
  return { success: true }
}

export async function deleteAccount(accountId: string): Promise<ActionState> {
  const user = await requireUser()
  const account = await getAccountById(accountId)

  if (!account) {
    return { success: false, error: "Compte introuvable." }
  }

  if (!canDeleteAccount(user)) {
    return { success: false, error: "Seuls les administrateurs peuvent supprimer un compte." }
  }

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: "ACCOUNT_DELETED",
      entityType: "GameAccount",
      entityId: accountId,
      metadata: JSON.stringify({ label: account.label }),
    },
  })

  await prisma.gameAccount.delete({ where: { id: accountId } })

  revalidatePath("/accounts")
  return { success: true }
}
