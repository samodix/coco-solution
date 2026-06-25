# Mémoire Projet — DOFUS BUSINESS

## Nom du projet

**DOFUS BUSINESS — Account Manager**

## Objectif

Application interne privée pour la gestion manuelle complète des comptes Dofus, personnages, équipes, abonnements, objectifs de farming, dépenses, notes, sécurité et historique.

**Aucune automatisation de gameplay n'est prévue.** L'application sert uniquement à l'organisation et au suivi.

## Stack technique

| Composant | Version |
|---|---|
| Next.js | 16.2.9 (App Router, Turbopack) |
| React | 19.2.4 |
| TypeScript | — |
| Tailwind CSS | 4 |
| shadcn/ui | base-nova |
| next-themes | thème dark/light/system |
| bcryptjs | hashage mots de passe |
| Prisma | 6.19.3 |
| SQLite | local (dev) |
| Node.js | v20.11.1 |

## Résumé LOT 0

- Suppression complète de l'ancienne stack Laravel + Vue + Nuxt UI
- Initialisation d'un projet Next.js propre
- Installation de Prisma et shadcn/ui
- Tests de base passés (lint, build, prisma validate)

## Résumé LOT 1

- Création du design system dark gaming/business (palette #080A12, #7C3AED, #22C55E)
- Création du layout interne (AppShell, Sidebar, Header, MobileNav)
- Création du dashboard mocké (6 stat cards, 6 module cards, recent activity)
- Création des 7 pages placeholders : /dashboard, /accounts, /characters, /teams, /subscriptions, /goals, /settings
- Redirection / → /dashboard
- Documentation docs/01_DESIGN_SYSTEM_AND_LAYOUT.md

## Résumé LOT 2

- Création du schéma Prisma complet (8 modèles, 11 enums)
- Migration SQLite initiale
- Seed avec données fictives (2 users, 2 comptes, 3 personnages, 1 team, 1 abonnement, 2 objectifs, 2 audit logs)
- Client Prisma singleton (src/lib/prisma.ts)
- Documentation docs/02_DATABASE_SCHEMA.md

## Résumé LOT 2.1

- Création des fichiers mémoire dans docs/memory/
- Mise à jour du README.md avec liens mémoire
- Vérification du serveur de développement

## Résumé LOT 2.2

- Installation de `next-themes` pour le système de thème
- Création de `ThemeProvider` et `ThemeToggle`
- Light mode : palette claire professionnelle (#F8FAFC, #FFFFFF, #0F172A)
- Dark mode : palette gaming/business identique au LOT 1 (#080A12, #111827, #F9FAFB)
- Bouton de cycle dans le header (Sun → Moon → Monitor)
- Le choix thème est persisté après refresh
- `suppressHydrationWarning` sur `<html>` pour éviter les warnings

## Résumé LOT 3

- Authentification interne custom (pas d'Auth.js/NextAuth)
- bcryptjs pour le hashage des mots de passe (12 rounds)
- Table AuthSession avec token hashé (SHA-256), jamais le token brut
- Cookie HttpOnly sécurisé (SameSite=Lax, Secure en prod)
- Route group `(app)` pour les pages protégées
- Page /login sans sidebar, compatible Dark/Light
- API routes : /api/auth/login, /api/auth/logout, /api/auth/me
- Guards : requireUser(), requireAdmin(), redirectIfAuthenticated()
- Header affiche l'utilisateur connecté + bouton déconnexion
- Seed mis à jour avec mots de passe hashés
- Documentation docs/03_INTERNAL_AUTH.md

## Modules prévus

| Module | Description |
|---|---|
| Accounts | Gestion des comptes Dofus |
| Characters | Gestion des personnages |
| Teams | Équipes de jeu |
| Subscriptions | Abonnements et dépenses |
| Goals | Objectifs de farming |
| Settings | Paramètres utilisateur |
| Audit Logs | Journal d'activité |
| Export | Import/Export de données |

## Règles de sécurité

- Application de gestion **manuelle** uniquement
- **Aucun** bot, sniffer, script LUA, automatisation
- **Aucune** connexion au client Dofus
- **Aucun** stockage de mots de passe/tokens/2FA Dofus
- Auth interne en place (LOT 3) — mots de passe application uniquement

## Interdictions strictes

- Bot
- Script LUA
- Intégration Frigost
- Sniffer
- Spoof HWID
- Automatisation gameplay
- Connexion au client Dofus
- Stockage mots de passe Dofus
- Stockage tokens Dofus
- Stockage code 2FA Dofus

## Résumé LOT 4

- Module `src/modules/accounts/` : validation (Zod v4), permissions, queries, actions, types
- Composants : account-form, account-table, account-status-badge, account-delete-dialog, account-archive-button, account-filters
- Pages : /accounts (liste filtres), /accounts/new, /accounts/[id], /accounts/[id]/edit
- Server Actions : createAccount, updateAccount, archiveAccount, deleteAccount
- Audit log pour chaque action (ACCOUNT_CREATED, UPDATED, ARCHIVED, DELETED)
- Permissions ADMIN (tout) / MEMBER (CRUD ses comptes)
- Composants UI natifs (Dialog, Select, Checkbox) pour éviter crash hydration @base-ui/react
- Zod v4 : `errorMap` remplacé par `message`
- Prisma AuditLog : champ `metadata` (pas `details`)
- Build : 16 routes, lint ✅, build ✅, prisma validate ✅
- Docs : 04_ACCOUNTS_CRUD.md

## Prochaine étape

**LOT 5 — CRUD Personnages** : Listage, création, édition, suppression des personnages liés aux comptes.
