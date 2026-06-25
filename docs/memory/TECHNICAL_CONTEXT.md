# Contexte Technique — DOFUS BUSINESS

## Stack technique

| Composant | Détail |
|---|---|
| Framework | Next.js 16.2.9, App Router, Turbopack |
| UI | Tailwind CSS 4 + shadcn/ui (base-nova) |
| Langage | TypeScript |
| ORM | Prisma 6.19.3 |
| Base de données | SQLite local (prisma/dev.db) |
| Node.js | v20.11.1 |
| Package manager | npm |

## Structure des dossiers

```
coco-solution/
├── prisma/
│   ├── schema.prisma           # Schéma de la base de données
│   ├── seed.ts                 # Données fictives de test (avec mots de passe hashés)
│   ├── dev.db                  # Base SQLite
│   └── migrations/             # Migrations Prisma
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (ThemeProvider only)
│   │   ├── page.tsx            # Redirection / → /dashboard
│   │   ├── login/
│   │   │   ├── page.tsx        # Page login
│   │   │   └── login-form.tsx  # Formulaire client
│   │   ├── (app)/              # Pages protégées (auth guard)
│   │   │   ├── layout.tsx      # Auth guard + AppShell
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── accounts/
│   │   │   │   ├── page.tsx          # Liste avec filtres
│   │   │   │   ├── new/page.tsx      # Création
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx      # Détail
│   │   │   │       └── edit/page.tsx # Édition
│   │   │   ├── characters/page.tsx
│   │   │   ├── teams/page.tsx
│   │   │   ├── subscriptions/page.tsx
│   │   │   ├── goals/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── api/auth/
│   │       ├── login/route.ts
│   │       ├── logout/route.ts
│   │       └── me/route.ts
│   ├── components/
│   │   ├── ui/                 # Composants shadcn/ui
│   │   ├── layout/             # AppShell, Sidebar, Header, MobileNav, NavItem
│   │   ├── dashboard/          # StatCard, RecentActivity, ModuleCard
│   │   ├── common/             # PageHeader, StatusBadge, EmptyState
│   │   ├── auth/               # LogoutButton, UserMenu
│   │   └── theme/              # ThemeProvider, ThemeToggle
│   ├── modules/
│   │   └── accounts/           # Module CRUD comptes
│   │       ├── validation.ts   # Schémas Zod v4
│   │       ├── permissions.ts  # Droits ADMIN/MEMBER
│   │       ├── queries.ts      # Requêtes Prisma
│   │       ├── actions.ts      # Server Actions
│   │       ├── types.ts        # Types TS
│   │       └── components/     # Composants UI
│   └── lib/
│       ├── prisma.ts           # Client Prisma singleton
│       └── auth/
│           ├── password.ts     # hashPassword, verifyPassword
│           ├── session.ts      # createSession, getCurrentUser, deleteCurrentSession
│           └── guards.ts       # requireUser, requireAdmin, redirectIfAuthenticated
├── docs/
│   ├── 00_PROJECT_OVERVIEW.md
│   ├── 01_DESIGN_SYSTEM_AND_LAYOUT.md
│   ├── 02_DATABASE_SCHEMA.md
│   ├── 03_INTERNAL_AUTH.md
│   ├── 04_ACCOUNTS_CRUD.md
│   └── memory/
├── package.json
├── tsconfig.json
├── next.config.ts
├── prisma.config.ts
└── .env
```

## Routes existantes

| Route | Statut | Protection |
|---|---|---|
| `/` | ✅ Active | Redirige vers /dashboard |
| `/login` | ✅ Login | Publique |
| `/dashboard` | ✅ Mocké | requireUser |
| `/accounts` | ✅ CRUD | requireUser |
| `/accounts/new` | ✅ Création | requireUser |
| `/accounts/[id]` | ✅ Détail | requireUser |
| `/accounts/[id]/edit` | ✅ Édition | requireUser |
| `/characters` | 📄 Placeholder | requireUser |
| `/teams` | 📄 Placeholder | requireUser |
| `/subscriptions` | 📄 Placeholder | requireUser |
| `/goals` | 📄 Placeholder | requireUser |
| `/settings` | 📄 Placeholder | requireUser |
| `/api/auth/login` | ✅ POST | Publique |
| `/api/auth/logout` | ✅ POST | Publique |
| `/api/auth/me` | ✅ GET | requireUser |

## Modèles Prisma

| Modèle | Description |
|---|---|
| `User` | Utilisateurs (rôle ADMIN/MEMBER, passwordHash, isActive) |
| `AuthSession` | Sessions d'authentification (tokenHash, expiresAt) |
| `GameAccount` | Comptes Dofus |
| `Character` | Personnages |
| `Team` | Équipes de jeu |
| `TeamMember` | Jonction Team ↔ Character |
| `Subscription` | Abonnements |
| `Goal` | Objectifs de farming |
| `AuditLog` | Journal d'audit |

## Enums Prisma

`UserRole`, `GameType`, `AccountStatus`, `SubscriptionStatus`, `BuildElement`, `CharacterRole`, `CharacterStatus`, `TeamStatus`, `GoalType`, `GoalPriority`, `GoalStatus`

## Scripts npm

```json
"dev": "next dev --turbopack",
"build": "next build",
"start": "next start",
"lint": "next lint",
"db:validate": "prisma validate",
"db:format": "prisma format",
"db:migrate": "prisma migrate dev",
"db:seed": "prisma db seed",
"db:studio": "prisma studio"
```

## Notes techniques importantes

1. **SQLite local** : Base de données fichier unique `prisma/dev.db` (155 Ko). Pas de serveur requis.

2. **Prisma client singleton** : `src/lib/prisma.ts` réutilise une instance unique en dev pour éviter les connexions multiples.

3. **shadcn/ui base-nova** : Utilise `@base-ui/react` au lieu de `@radix-ui/react`. **Attention** : Les composants base-ui (Sheet/Dialog, Separator, Button) peuvent causer des erreurs d'hydration. Utiliser des composants HTML natifs ou des wrapper custom si nécessaire.

4. **Système de thème** : `next-themes` avec `attribute="class"`, `defaultTheme="system"`, `enableSystem`. Toggle dans le header (cycle light → dark → system). Le choix est persisté dans localStorage.

5. **Light mode** : Palette claire professionnelle (background #F8FAFC, cards #FFFFFF, texte #0F172A). Accent violet préservé.

6. **Dark mode** : Palette gaming/business (background #080A12, cards #111827, texte #F9FAFB). Identique au LOT 1.

5. **Auth interne en place** : Login/logout avec bcryptjs + sessions en base (AuthSession). Route group `(app)` protège les pages internes.

6. **Dashboard encore mocké** : Les données affichées sont des hardcoded values. Pas de connexion à la DB en LOT 2.

7. **Enums SQLite** : SQLite ne supporte pas les enums natifs. Prisma les gère comme strings avec validation côté application.

8. **Node.js v20.11.1** : Compatibilité limitée avec Vite 7. Utiliser Vite 6 uniquement si besoin.
