# LOT 3 — Authentification interne

## Objectif

Créer un système d'authentification interne simple et sécurisé pour l'application DOFUS BUSINESS — Account Manager.

## Décisions techniques

- **Auth custom** : Pas d'Auth.js, NextAuth ou Better Auth. Système maison contrôlé.
- **bcryptjs** : Hashage des mots de passe (12 rounds).
- **Sessions en base** : Table `AuthSession` avec token hashé (SHA-256), jamais le token brut.
- **Cookie HttpOnly** : `dofus-business-session`, SameSite=Lax, Secure en production.
- **Durée de session** : 7 jours.
- **Route group `(app)`** : Pages protégées dans `src/app/(app)/`, login dans `src/app/login/`.

## Architecture

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (ThemeProvider only)
│   ├── login/
│   │   ├── page.tsx                  # Page login
│   │   └── login-form.tsx            # Formulaire client
│   ├── (app)/
│   │   ├── layout.tsx                # Auth guard + AppShell
│   │   ├── dashboard/page.tsx
│   │   ├── accounts/page.tsx
│   │   ├── characters/page.tsx
│   │   ├── teams/page.tsx
│   │   ├── subscriptions/page.tsx
│   │   ├── goals/page.tsx
│   │   └── settings/page.tsx
│   └── api/auth/
│       ├── login/route.ts            # POST login
│       ├── logout/route.ts           # POST logout
│       └── me/route.ts               # GET current user
├── components/
│   ├── auth/
│   │   ├── logout-button.tsx         # Bouton déconnexion
│   │   └── user-menu.tsx             # Menu utilisateur
│   └── layout/
│       ├── app-shell.tsx             # Reçoit user prop
│       └── header.tsx                # Affiche user + logout
└── lib/auth/
    ├── password.ts                   # hashPassword, verifyPassword
    ├── session.ts                    # createSession, getCurrentUser, deleteCurrentSession
    └── guards.ts                     # requireUser, requireAdmin, redirectIfAuthenticated
```

## Routes protégées

| Route | Protection |
|---|---|
| `/dashboard` | requireUser |
| `/accounts` | requireUser |
| `/characters` | requireUser |
| `/teams` | requireUser |
| `/subscriptions` | requireUser |
| `/goals` | requireUser |
| `/settings` | requireUser |

## Routes non protégées

| Route | Description |
|---|---|
| `/login` | Page de connexion |
| `/api/auth/login` | API login |
| `/api/auth/logout` | API logout |
| `/api/auth/me` | API utilisateur courant |

## Identifiants de test

| Email | Mot de passe | Rôle |
|---|---|---|
| `admin@example.local` | `Admin123!` | ADMIN |
| `ami@example.local` | `Ami123!` | MEMBER |

## Sécurité

- `passwordHash` n'est jamais retourné côté client
- Le cookie ne contient qu'un token aléatoire (32 bytes hex)
- La base stocke le hash SHA-256 du token, pas le token brut
- Les sessions expirées sont refusées et supprimées
- Les mots de passe échoués génèrent un message générique "Identifiants invalides."
- Les logs d'audit enregistrent LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT
- Les mots de passe Dofus ne sont JAMAIS stockés

## Tables Prisma

### User (modifié)

| Champ | Type | Description |
|---|---|---|
| `passwordHash` | String? | Hash bcrypt du mot de passe |
| `isActive` | Boolean | Compte actif (default: true) |
| `lastLoginAt` | DateTime? | Dernière connexion |

### AuthSession (nouveau)

| Champ | Type | Description |
|---|---|---|
| `id` | String | CUID |
| `userId` | String | FK vers User |
| `tokenHash` | String | SHA-256 du token (unique) |
| `expiresAt` | DateTime | Date d'expiration |
| `ipAddress` | String? | IP du client |
| `userAgent` | String? | User-Agent du client |
| `createdAt` | DateTime | Date de création |
| `updatedAt` | DateTime | Date de mise à jour |

## Tests effectués

| Test | Résultat |
|---|---|
| `npx prisma format` | ✅ |
| `npx prisma validate` | ✅ |
| `npx prisma migrate dev --name add_internal_auth` | ✅ |
| `npm run db:seed` | ✅ (2 users avec mots de passe) |
| `npm run lint` | ✅ |
| `npm run build` | ✅ (15 routes) |
| `POST /api/auth/login` (admin) | ✅ (200 + user) |
| `POST /api/auth/login` (ami) | ✅ (200 + user) |
| `POST /api/auth/login` (mauvais mdp) | ✅ (401 + erreur générique) |
| `GET /login` | ✅ (200, ThemeToggle + formulaire) |
