export type GameType = "DOFUS_3" | "DOFUS_RETRO" | "WAKFU" | "OTHER"
export type AccountStatus = "ACTIVE" | "PAUSED" | "TO_CHECK" | "EXPIRED" | "BANNED" | "ARCHIVED"
export type SubscriptionStatus = "UNKNOWN" | "ACTIVE" | "EXPIRED" | "CANCELLED" | "PAUSED"

export interface AccountOwner {
  id: string
  name: string
  email: string
}

export interface AccountCounts {
  characters: number
  subscriptions: number
  goals: number
}

export interface AccountWithOwner {
  id: string
  ownerId: string
  label: string
  gameType: string
  server: string | null
  email: string | null
  phone: string | null
  status: string
  subscriptionStatus: string
  subscriptionExpiresAt: Date | null
  hasTwoFactor: boolean
  notes: string | null
  createdAt: Date
  updatedAt: Date
  owner: AccountOwner
  _count: AccountCounts
}
