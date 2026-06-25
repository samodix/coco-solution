# DOFUS BUSINESS — Account Manager

Application interne de gestion manuelle des comptes Dofus, personnages, teams, abonnements, objectifs, dépenses et notes.

## Stack technique

- **Framework** : Next.js 16 (App Router, TypeScript)
- **UI** : Tailwind CSS 4 + shadcn/ui
- **ORM** : Prisma
- **Base de données** : SQLite (local), PostgreSQL (production)
- **Langage** : TypeScript

## Installation

```bash
# Installer les dépendances
npm install

# Initialiser la base de données
npx prisma migrate dev

# Lancer le serveur de développement
npm run dev
```

## Commandes utiles

```bash
npm run dev        # Serveur de développement
npm run build      # Build de production
npm run start      # Démarrer le build de production
npm run lint       # Vérifier le code
npx prisma validate # Valider le schéma Prisma
npx prisma migrate dev # Créer une migration
npx prisma studio  # Interface web Prisma
```

## Structure du projet

```
src/
├── app/                    # App Router (routes Next.js)
├── components/
│   ├── ui/                 # Composants shadcn/ui
│   └── layout/             # Composants de layout
├── lib/                    # Utilitaires partagés
└── modules/                # Modules métier (par feature)
prisma/
├── schema.prisma           # Schéma de la base de données
└── dev.db                  # Base SQLite (dev)
docs/
└── 00_PROJECT_OVERVIEW.md  # Vue d'ensemble du projet
```

## Mémoire projet

Pour reprendre le projet rapidement, consulter :

- [docs/memory/PROJECT_MEMORY.md](docs/memory/PROJECT_MEMORY.md) — Vue d'ensemble, objectifs, résumé des lots
- [docs/memory/TECHNICAL_CONTEXT.md](docs/memory/TECHNICAL_CONTEXT.md) — Stack, structure, routes, modèles, scripts
- [docs/memory/SECURITY_RULES.md](docs/memory/SECURITY_RULES.md) — Règles de sécurité et interdictions
- [docs/memory/NEXT_LOTS.md](docs/memory/NEXT_LOTS.md) — Roadmap des prochains lots

## Contraintes

- Application de **gestion manuelle** uniquement
- **Aucun** bot, sniffer, script LUA, automatisation de gameplay
- **Aucune** intégration avec le jeu Dofus (pas de connexion au jeu)
- **Pas** de stockage de mots de passe Dofus
