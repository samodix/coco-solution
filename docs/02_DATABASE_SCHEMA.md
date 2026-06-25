# LOT 2 — Schéma de Base de Données

## Objectif

Définir le schéma Prisma complet des entités métier, initialiser la migration SQLite locale, ajouter un seed minimal et documenter le modèle de données.

## Modèles Prisma

### User
Représente un utilisateur de l'application (admin ou membre).

| Champ | Type | Description |
|---|---|---|
| id | String (cuid) | Identifiant unique |
| name | String | Nom d'affichage |
| email | String (unique) | Email de connexion |
| role | String | Rôle (ADMIN, MEMBER) |
| createdAt | DateTime | Date de création |
| updatedAt | DateTime | Dernière mise à jour |

### GameAccount
Représente un compte de jeu Dofus (ou autre).

| Champ | Type | Description |
|---|---|---|
| id | String (cuid) | Identifiant unique |
| ownerId | String | Propriétaire (User) |
| label | String | Nom du compte |
| gameType | String | Type de jeu (DOFUS_3, DOFUS_RETRO, etc.) |
| server | String? | Serveur du jeu |
| email | String? | Email du compte de jeu |
| phone | String? | Téléphone associé |
| status | String | Statut (ACTIVE, PAUSED, etc.) |
| subscriptionStatus | String | Statut abonnement |
| subscriptionExpiresAt | DateTime? | Date expiration abonnement |
| hasTwoFactor | Boolean | 2FA activé |
| notes | String? | Notes libres |
| createdAt | DateTime | Date de création |
| updatedAt | DateTime | Dernière mise à jour |

### Character
Représente un personnage dans un compte de jeu.

| Champ | Type | Description |
|---|---|---|
| id | String (cuid) | Identifiant unique |
| gameAccountId | String | Compte associé |
| name | String | Nom du personnage |
| className | String | Classe (Iop, Eniripsa, etc.) |
| level | Int | Niveau (défaut: 1) |
| server | String? | Serveur |
| buildElement | String | Élément principal |
| role | String | Rôle en team |
| profession1-3 | String? | Professions |
| status | String | Statut |
| notes | String? | Notes |
| createdAt | DateTime | Date de création |
| updatedAt | DateTime | Dernière mise à jour |

### Team
Représente une équipe de jeu.

| Champ | Type | Description |
|---|---|---|
| id | String (cuid) | Identifiant unique |
| name | String | Nom de la team |
| leaderCharacterId | String? | Personnage leader |
| objective | String? | Objectif de la team |
| status | String | Statut |
| notes | String? | Notes |
| createdAt | DateTime | Date de création |
| updatedAt | DateTime | Dernière mise à jour |

### TeamMember
Table de jonction Team ↔ Character.

| Champ | Type | Description |
|---|---|---|
| id | String (cuid) | Identifiant unique |
| teamId | String | Team |
| characterId | String | Personnage |
| position | Int | Position dans la team |
| roleInTeam | String? | Rôle dans la team |
| createdAt | DateTime | Date de création |

**Contrainte** : `@@unique([teamId, characterId])` — pas de doublon.

### Subscription
Représente un abonnement (Ogrines, etc.).

| Champ | Type | Description |
|---|---|---|
| id | String (cuid) | Identifiant unique |
| gameAccountId | String | Compte associé |
| startsAt | DateTime? | Date début |
| endsAt | DateTime | Date fin |
| amount | Float? | Montant |
| currency | String | Devise (défaut: MAD) |
| paymentMethod | String? | Moyen de paiement |
| status | String | Statut |
| notes | String? | Notes |
| createdAt | DateTime | Date de création |
| updatedAt | DateTime | Dernière mise à jour |

### Goal
Représente un objectif de farming / progression.

| Champ | Type | Description |
|---|---|---|
| id | String (cuid) | Identifiant unique |
| title | String | Titre de l'objectif |
| type | String | Type (LEVELING, STUFF, etc.) |
| priority | String | Priorité (LOW, MEDIUM, HIGH, URGENT) |
| status | String | Statut (TODO, IN_PROGRESS, etc.) |
| deadline | DateTime? | Date limite |
| relatedAccountId | String? | Compte lié |
| relatedCharacterId | String? | Personnage lié |
| relatedTeamId | String? | Team liée |
| notes | String? | Notes |
| createdAt | DateTime | Date de création |
| updatedAt | DateTime | Dernière mise à jour |

### AuditLog
Journal d'audit des actions.

| Champ | Type | Description |
|---|---|---|
| id | String (cuid) | Identifiant unique |
| userId | String? | Utilisateur |
| action | String | Action effectuée |
| entityType | String | Type d'entité |
| entityId | String? | ID de l'entité |
| metadata | String? | Métadonnées JSON |
| ipAddress | String? | Adresse IP |
| userAgent | String? | User-Agent |
| createdAt | DateTime | Date de création |

## Relations

```
User ──1:N──> GameAccount ──1:N──> Character
                  │                    │
                  │                    ├──N:M──> Team (via TeamMember)
                  │                    │
                  ├──1:N──> Subscription
                  │
                  └──1:N──> Goal <──N:1── Character
                                  <──N:1── Team

User ──1:N──> AuditLog
```

## Enums

| Enum | Valeurs |
|---|---|
| UserRole | ADMIN, MEMBER |
| GameType | DOFUS_3, DOFUS_RETRO, WAKFU, OTHER |
| AccountStatus | ACTIVE, PAUSED, TO_CHECK, EXPIRED, BANNED, ARCHIVED |
| SubscriptionStatus | UNKNOWN, ACTIVE, EXPIRED, CANCELLED, PAUSED |
| BuildElement | UNKNOWN, TERRE, FEU, EAU, AIR, MULTI, SAGESSE, PROSPECTION |
| CharacterRole | UNKNOWN, ROX, TANK, HEAL, PLACEMENT, SUPPORT, FARM, CRAFT, PVP, PVM |
| CharacterStatus | ACTIVE, PAUSED, ARCHIVED |
| TeamStatus | ACTIVE, PAUSED, ARCHIVED |
| GoalType | LEVELING, STUFF, KAMAS, QUEST, DUNGEON, PROFESSION, FARM, OTHER |
| GoalPriority | LOW, MEDIUM, HIGH, URGENT |
| GoalStatus | TODO, IN_PROGRESS, BLOCKED, DONE, CANCELLED |

## Règles de sécurité

1. **Pas de mots de passe Dofus** : Aucun champ `password`, `secret`, `token` ou `2FA secret` n'est stocké.
2. **Pas de tokens** : Les tokens d'authentification Dofus ne sont jamais stockés.
3. **Pas de connexion au jeu** : Cette application est 100% gestion manuelle.
4. **Données fictives** : Le seed utilise des emails `@example.local` et des données de démonstration.

## Index

| Modèle | Index |
|---|---|
| GameAccount | ownerId, status, server |
| Character | gameAccountId, className, level |
| Team | status |
| Subscription | gameAccountId, endsAt |
| Goal | status, priority |
| AuditLog | userId, entityType, createdAt |

## Commandes Prisma utiles

```bash
npx prisma format          # Formater le schéma
npx prisma validate        # Valider le schéma
npx prisma migrate dev     # Créer une migration
npx prisma db seed         # Exécuter le seed
npx prisma studio          # Interface web
npx prisma db push         # Push sans migration
```

## Données seed

Le seed crée :
- 2 users (Abdessamad ADMIN, Ami Test MEMBER)
- 2 comptes Dofus fictifs
- 3 personnages (Iop, Eniripsa, Cra)
- 1 team avec 2 membres
- 1 abonnement
- 2 objectifs
- 2 audit logs

## Prochaine étape

LOT 3 — Authentification interne
