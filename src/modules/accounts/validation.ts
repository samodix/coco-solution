import { z } from "zod"

const GAME_TYPES = ["DOFUS_3", "DOFUS_RETRO", "WAKFU", "OTHER"] as const
const ACCOUNT_STATUSES = ["ACTIVE", "PAUSED", "TO_CHECK", "EXPIRED", "BANNED", "ARCHIVED"] as const
const SUBSCRIPTION_STATUSES = ["UNKNOWN", "ACTIVE", "EXPIRED", "CANCELLED", "PAUSED"] as const

export const gameTypeEnum = z.enum(GAME_TYPES)
export const accountStatusEnum = z.enum(ACCOUNT_STATUSES)
export const subscriptionStatusEnum = z.enum(SUBSCRIPTION_STATUSES)

export const accountFormSchema = z.object({
  label: z.string().min(1, "Le nom du compte est requis").max(100),
  gameType: z.enum(GAME_TYPES, { message: "Type de jeu invalide" }),
  server: z.string().max(50).optional().or(z.literal("")),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  phone: z.string().max(20).optional().or(z.literal("")),
  status: z.enum(ACCOUNT_STATUSES, { message: "Statut invalide" }),
  subscriptionStatus: z.enum(SUBSCRIPTION_STATUSES, { message: "Statut d'abonnement invalide" }),
  subscriptionExpiresAt: z.string().optional().or(z.literal("")),
  hasTwoFactor: z.boolean().default(false),
  notes: z.string().max(1000).optional().or(z.literal("")),
})

export type AccountFormData = z.infer<typeof accountFormSchema>

export const accountUpdateSchema = accountFormSchema.partial()

export type AccountUpdateData = z.infer<typeof accountUpdateSchema>

export const accountFilterSchema = z.object({
  search: z.string().optional(),
  status: z.enum(ACCOUNT_STATUSES).optional(),
  gameType: z.enum(GAME_TYPES).optional(),
  server: z.string().optional(),
})

export type AccountFilterData = z.infer<typeof accountFilterSchema>

export const GAME_TYPE_LABELS: Record<string, string> = {
  DOFUS_3: "Dofus 3",
  DOFUS_RETRO: "Dofus Retro",
  WAKFU: "Wakfu",
  OTHER: "Autre",
}

export const ACCOUNT_STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Actif",
  PAUSED: "En pause",
  TO_CHECK: "À vérifier",
  EXPIRED: "Expiré",
  BANNED: "Banni",
  ARCHIVED: "Archivé",
}

export const SUBSCRIPTION_STATUS_LABELS: Record<string, string> = {
  UNKNOWN: "Inconnu",
  ACTIVE: "Actif",
  EXPIRED: "Expiré",
  CANCELLED: "Annulé",
  PAUSED: "En pause",
}
