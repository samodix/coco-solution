"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GAME_TYPE_LABELS, ACCOUNT_STATUS_LABELS } from "../validation"

export function AccountFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") ?? "")
  const [status, setStatus] = useState(searchParams.get("status") ?? "")
  const [gameType, setGameType] = useState(searchParams.get("gameType") ?? "")

  function applyFilters() {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (status) params.set("status", status)
    if (gameType) params.set("gameType", gameType)
    router.push(`/accounts?${params.toString()}`)
  }

  function clearFilters() {
    setSearch("")
    setStatus("")
    setGameType("")
    router.push("/accounts")
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Input
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-48"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="flex h-10 items-center rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <option value="">Tous les statuts</option>
        {Object.entries(ACCOUNT_STATUS_LABELS).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      <select
        value={gameType}
        onChange={(e) => setGameType(e.target.value)}
        className="flex h-10 items-center rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <option value="">Tous les jeux</option>
        {Object.entries(GAME_TYPE_LABELS).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      <Button onClick={applyFilters}>Filtrer</Button>
      {(search || status || gameType) && (
        <Button variant="ghost" onClick={clearFilters}>Effacer</Button>
      )}
    </div>
  )
}
