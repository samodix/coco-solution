# LOT 4 — CRUD Comptes Dofus

## Objectif
Implémenter le CRUD complet des comptes Dofus : création, lecture, mise à jour, archivage et suppression.

## Architecture

### Module `src/modules/accounts/`

| Fichier | Rôle |
|---------|------|
| `validation.ts` | Schémas Zod v4, labels FR, types TS |
| `permissions.ts` | Vérification des droits ADMIN/MEMBER |
| `queries.ts` | Requêtes Prisma (getAccounts, getAccountById, getAccountsByOwner, getAccountServers) |
| `actions.ts` | Server Actions (createAccount, updateAccount, archiveAccount, deleteAccount) |
| `types.ts` | Types TypeScript partagés |

### Composants `src/modules/accounts/components/`

| Composant | Description |
|-----------|-------------|
| `account-form.tsx` | Formulaire création/édition (useActionState) |
| `account-table.tsx` | Tableau de la liste des comptes |
| `account-status-badge.tsx` | Badges statut compte/abonnement + type jeu |
| `account-delete-dialog.tsx` | Dialogue confirmation suppression |
| `account-archive-button.tsx` | Bouton archiver/restaurer |
| `account-filters.tsx` | Filtres recherche/statut/jeu |

### Pages

| Route | Page |
|-------|------|
| `/accounts` | Liste avec filtres + tableau |
| `/accounts/new` | Formulaire de création |
| `/accounts/[id]` | Détail du compte (stats, contact, notes) |
| `/accounts/[id]/edit` | Formulaire d'édition |

## Permissions

| Rôle | Créer | Voir | Modifier | Archiver | Supprimer |
|------|-------|------|----------|----------|-----------|
| ADMIN | ✅ | ✅ | ✅ | ✅ | ✅ |
| MEMBER | ✅ | ✅ | ✅ (ses comptes) | ✅ (ses comptes) | ❌ |

## Audit Log

Chaque action est tracée dans `AuditLog` :
- `ACCOUNT_CREATED` — création
- `ACCOUNT_UPDATED` — modification
- `ACCOUNT_ARCHIVED` — archivage
- `ACCOUNT_DELETED` — suppression

## Dépendances installées

- `zod` v4.4.3
- shadcn/ui : input, label, select (native), textarea, checkbox (native), dialog (native), alert, table, badge, card

## Composants UI personnalisés

- **Dialog** : `<dialog>` HTML natif (pas @base-ui/react — crash hydration)
- **Select** : `<select>` HTML natif
- **Checkbox** : `<input type="checkbox">` natif

## Validation

Le schéma `accountFormSchema` valide :
- `label` : requis, max 100 chars
- `gameType` : DOFUS_3 | DOFUS_RETRO | WAKFU | OTHER
- `server` : optionnel, max 50 chars
- `email` : optionnel, format email
- `phone` : optionnel, max 20 chars
- `status` : ACTIVE | PAUSED | TO_CHECK | EXPIRED | BANNED | ARCHIVED
- `subscriptionStatus` : UNKNOWN | ACTIVE | EXPIRED | CANCELLED | PAUSED
- `subscriptionExpiresAt` : optionnel, date ISO
- `hasTwoFactor` : boolean
- `notes` : optionnel, max 1000 chars

## Routes générées (build)

16 routes au total, dont 4 nouvelles pour les comptes :
- `/accounts` (dynamic)
- `/accounts/[id]` (dynamic)
- `/accounts/[id]/edit` (dynamic)
- `/accounts/new` (dynamic)
