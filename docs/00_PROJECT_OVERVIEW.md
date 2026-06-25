# Vue d'ensemble du projet — DOFUS BUSINESS Account Manager

## Objectif

Développer une application web interne permettant la gestion manuelle de comptes Dofus, incluant :

- **Comptes** : Gestion des comptes joueurs (identifiants, statut, notes)
- **Personnages** : Liste des personnages par compte (classe, niveau, serveur)
- **Teams** : Organisation des groupes de personnages (PvM, PvP, etc.)
- **Abonnements** : Suivi des abonnements et dates d'expiration
- **Objectifs** : Définition et suivi des objectifs de farming / progression
- **Dépenses** : Suivi des dépenses liées aux comptes (Ogrines, etc.)
- **Notes** : Prise de notes libre par compte / personnage

## Stack technique

| Technologie | Rôle |
|---|---|
| Next.js 16 | Framework React (App Router) |
| TypeScript | Langage typé |
| Tailwind CSS 4 | Styling utility-first |
| shadcn/ui | Composants UI réutilisables |
| Prisma | ORM pour la base de données |
| SQLite | Base de données locale (dev) |
| PostgreSQL | Base de données (production, prévu) |

## Architecture

- **App Router** : Routes basées sur le système de fichiers `src/app/`
- **Modules** : Code métier organisé par feature dans `src/modules/`
- **Composants** : Composants UI réutilisables dans `src/components/`
- **Prisma** : Schéma centralisé dans `prisma/schema.prisma`

## Lots prévus

| Lot | Description | Statut |
|---|---|---|
| LOT 0 | Reset repo + init Next.js + Prisma + shadcn/ui | ✅ Terminé |
| LOT 1 | Design système + layout interne | 🔲 À faire |
| LOT 2 | Module Comptes | 🔲 À faire |
| LOT 3 | Module Personnages | 🔲 À faire |
| LOT 4 | Module Teams | 🔲 À faire |
| LOT 5 | Module Abonnements | 🔲 À faire |
| LOT 6 | Module Objectifs | 🔲 À faire |
| LOT 7 | Module Dépenses | 🔲 À faire |
| LOT 8 | Module Notes | 🔲 À faire |

## Sécurité

- Aucune donnée d'authentification Dofus n'est stockée
- Aucune connexion au jeu Dofus
- Application 100% interne, pas d'accès public prévu
