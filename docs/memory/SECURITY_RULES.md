# Règles de Sécurité — DOFUS BUSINESS

## Ce que l'application a le droit de faire

- Gérer **manuellement** des comptes Dofus
- Gérer des personnages (noms, niveaux, classes, builds)
- Gérer des équipes de jeu
- Gérer des abonnements et dépenses
- Gérer des objectifs de farming
- Journaliser des audit logs
- Exporter des rapports
- Stocker des données de session utilisateur (auth interne)

## Ce qu'elle n'a PAS le droit de faire

### Automatisation interdite

- **Aucun** bot
- **Aucun** script LUA
- **Aucune** automatisation de gameplay
- **Aucun** sniffer
- **Aucun** spoof HWID
- **Aucune** connexion au client Dofus

### Intégrations interdites

- **Aucune** intégration Frigost
- **Aucune** API externe Dofus
- **Aucun** webhook Discord en LOT précoce

### Données interdites

- **Pas** de mots de passe Dofus stockés
- **Pas** de tokens Dofus stockés
- **Pas** de code 2FA Dofus stockés
- **Pas** de clés API Dofus stockées
- **Pas** de credentials de jeu stockés

## Données autorisées

- Noms de compte (public, pas sensible)
- Noms de personnages
- Niveaux et classes
- Types d'abonnements et montants
- Noms d'équipes
- Objectifs et priorités
- Notes personnelles
- Historique d'activité

## Authentification interne (LOT 3+)

- Login/mot de passe propre à l'application
- Sessions sécurisées (cookie HttpOnly)
- Rôles : ADMIN (tout) / MEMBER (lecture + écriture limitée)
- Aucun lien avec les comptes Dofus
- Les mots de passe sont hashés (bcrypt/argon2)

## Principes de sécurité

1. **Séparation des données** : L'application ne mélange JAMAIS ses identifiants avec ceux de Dofus
2. **Minimum de privilèges** : Chaque rôle n'accède qu'à ce dont il a besoin
3. **Audit trail** : Toute action importante est journalisée
4. **Pas de données sensibles** : Aucun secret de jeu n'est stocké
5. **SQLite local** : Pas d'accès réseau, pas de risque d'exposition distante en dev

## Préparation LOT 3

- Le modèle `User` existe déjà avec `passwordHash`
- Les rôles ADMIN/MEMBER sont définis
- Il faudra ajouter un middleware de protection des routes
- Il faudra créer les pages login/logout
- Il faudra hasher les mots de passe avec bcrypt
