import type { User, GameAccount } from "@prisma/client"

export type AccountPermission = "VIEW" | "CREATE" | "UPDATE" | "ARCHIVE" | "DELETE"

const ROLE_PERMISSIONS: Record<string, AccountPermission[]> = {
  ADMIN: ["VIEW", "CREATE", "UPDATE", "ARCHIVE", "DELETE"],
  MEMBER: ["VIEW", "CREATE", "UPDATE"],
}

export function getAccountPermissions(user: User): AccountPermission[] {
  return ROLE_PERMISSIONS[user.role] ?? ["VIEW"]
}

export function canPerformAccountAction(
  user: User,
  action: AccountPermission,
  account?: GameAccount
): boolean {
  const permissions = getAccountPermissions(user)
  if (!permissions.includes(action)) return false

  if (account && user.role === "MEMBER" && account.ownerId !== user.id) {
    return false
  }

  return true
}

export function canViewAccount(user: User, account: GameAccount): boolean {
  if (user.role === "ADMIN") return true
  return account.ownerId === user.id
}

export function canEditAccount(user: User, account: GameAccount): boolean {
  if (user.role === "ADMIN") return true
  return account.ownerId === user.id
}

export function canArchiveAccount(user: User, account: GameAccount): boolean {
  if (user.role === "ADMIN") return true
  return account.ownerId === user.id
}

export function canDeleteAccount(user: User): boolean {
  return user.role === "ADMIN"
}
