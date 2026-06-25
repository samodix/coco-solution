import { prisma } from "@/lib/prisma"
import type { Prisma, GameAccount } from "@prisma/client"
import type { AccountFilterData } from "./validation"

export type AccountWithRelations = GameAccount & {
  owner: { id: string; name: string; email: string }
  _count: { characters: number; subscriptions: number; goals: number }
}

export async function getAccounts(
  filters: AccountFilterData = {},
  page: number = 1,
  pageSize: number = 20
): Promise<{ accounts: AccountWithRelations[]; total: number }> {
  const where: Prisma.GameAccountWhereInput = {}

  if (filters.search) {
    where.OR = [
      { label: { contains: filters.search } },
      { email: { contains: filters.search } },
      { server: { contains: filters.search } },
    ]
  }

  if (filters.status) {
    where.status = filters.status
  }

  if (filters.gameType) {
    where.gameType = filters.gameType
  }

  if (filters.server) {
    where.server = filters.server
  }

  const [accounts, total] = await Promise.all([
    prisma.gameAccount.findMany({
      where,
      include: {
        owner: { select: { id: true, name: true, email: true } },
        _count: { select: { characters: true, subscriptions: true, goals: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.gameAccount.count({ where }),
  ])

  return { accounts, total }
}

export async function getAccountById(id: string): Promise<AccountWithRelations | null> {
  return prisma.gameAccount.findUnique({
    where: { id },
    include: {
      owner: { select: { id: true, name: true, email: true } },
      _count: { select: { characters: true, subscriptions: true, goals: true } },
    },
  })
}

export async function getAccountsByOwner(
  ownerId: string,
  page: number = 1,
  pageSize: number = 20
): Promise<{ accounts: AccountWithRelations[]; total: number }> {
  const [accounts, total] = await Promise.all([
    prisma.gameAccount.findMany({
      where: { ownerId },
      include: {
        owner: { select: { id: true, name: true, email: true } },
        _count: { select: { characters: true, subscriptions: true, goals: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.gameAccount.count({ where: { ownerId } }),
  ])

  return { accounts, total }
}

export async function getAccountServers(): Promise<string[]> {
  const result = await prisma.gameAccount.findMany({
    where: { server: { not: null } },
    select: { server: true },
    distinct: ["server"],
    orderBy: { server: "asc" },
  })

  return result.map((r) => r.server).filter((s): s is string => s !== null)
}
