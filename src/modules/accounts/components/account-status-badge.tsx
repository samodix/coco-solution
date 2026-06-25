"use client"

import { cn } from "@/lib/utils"
import {
  GAME_TYPE_LABELS,
  ACCOUNT_STATUS_LABELS,
  SUBSCRIPTION_STATUS_LABELS,
} from "@/modules/accounts/validation"

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  PAUSED: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  TO_CHECK: "bg-sky-500/15 text-sky-400 border-sky-500/20",
  EXPIRED: "bg-red-500/15 text-red-400 border-red-500/20",
  BANNED: "bg-red-700/15 text-red-300 border-red-700/20",
  ARCHIVED: "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
  UNKNOWN: "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
  CANCELLED: "bg-red-500/15 text-red-400 border-red-500/20",
}

interface StatusBadgeProps {
  status: string
  variant?: "account" | "subscription"
  className?: string
}

export function StatusBadge({ status, variant = "account", className }: StatusBadgeProps) {
  const labels = variant === "account" ? ACCOUNT_STATUS_LABELS : SUBSCRIPTION_STATUS_LABELS
  const label = labels[status] ?? status
  const colorClass = STATUS_COLORS[status] ?? STATUS_COLORS.UNKNOWN

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        colorClass,
        className
      )}
    >
      {label}
    </span>
  )
}

export function GameTypeBadge({ gameType, className }: { gameType: string; className?: string }) {
  const label = GAME_TYPE_LABELS[gameType] ?? gameType

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-purple-500/20 bg-purple-500/15 px-2 py-0.5 text-xs font-medium text-purple-400",
        className
      )}
    >
      {label}
    </span>
  )
}
