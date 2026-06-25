# Prochains Lots — DOFUS BUSINESS

## LOT 3 — Authentification interne

**Statut** : ✅ Complété

- Ajouter `passwordHash` au modèle `User` (si absent)
- Créer `POST /api/auth/login` (vérification mot de passe bcrypt)
- Créer `POST /api/auth/logout` (destruction session)
- Créer middleware `src/middleware.ts` (protection des routes /dashboard, /accounts, etc.)
- Créer page `/login` (formulaire email + mot de passe)
- Protéger toutes les routes sauf `/login`
- Gérer les rôles : ADMIN (accès total), MEMBER (accès limité)
- Créer un hook `useSession()` pour le contexte utilisateur

**Fichiers concernés** :
- `src/app/api/auth/login/route.ts`
- `src/app/api/auth/logout/route.ts`
- `src/middleware.ts`
- `src/app/login/page.tsx`
- `src/lib/auth.ts` (helpers)

**Tests** :
- `npm run build` ✅
- Login/logout fonctionnel
- Routes protégées redirigent vers /login

---

## LOT 4 — CRUD Comptes Dofus

**Statut** : ✅ Complété

- Page `/accounts` : liste des comptes avec tableau
- Formulaire de création de compte
- Formulaire d'édition de compte
- Suppression de compte
- Filtrage par statut et par type de jeu

**Fichiers concernés** :
- `src/app/accounts/page.tsx` (remplace le placeholder)
- `src/app/accounts/new/page.tsx`
- `src/app/accounts/[id]/page.tsx`
- `src/components/accounts/` (nouveaux composants)

---

## LOT 5 — CRUD Personnages

**Statut** : À faire

- Page `/characters` : liste avec tableau
- Fiche personnage détaillée
- Formulaire de création/édition
- Association personnage ↔ compte
- Filtrage par classe, niveau, élément

---

## LOT 6 — Teams

**Statut** : À faire

- Page `/teams` : liste des équipes
- Détail d'une équipe avec ses membres
- Ajouter/supprimer un membre d'équipe
- Formulaire de création d'équipe

---

## LOT 7 — Abonnements et Dépenses

**Statut** : À faire

- Page `/subscriptions` : liste des abonnements
- Formulaire de création/édition
- Suivi des paiements
- Statistiques de dépenses

---

## LOT 8 — Dashboard connecté aux données

**Statut** : À faire

- Remplacer les données mockées par des données réelles
- Compter les comptes, personnages, teams, abonnements
- Afficher les dernières activités depuis AuditLog
- Graphiques simples (nombre de personnages par classe, etc.)

---

## LOT 9 — Objectifs

**Statut** : À faire

- Page `/goals` : liste des objectifs
- Formulaire de création/édition
- Suivi de progression
- Filtrage par priorité et statut

---

## LOT 10 — Audit Logs et Sécurité

**Statut** : À faire

- Page `/audit` : journal d'activité
- Filtrage par date, utilisateur, action
- Export des logs
- Nettoyage automatique des anciens logs

---

## LOT 11 — Import/Export

**Statut** : À faire

- Export CSV/JSON des comptes, personnages, teams
- Import de données depuis un fichier
- Rapports personnalisés

---

## LOT 12 — Déploiement privé

**Statut** : À faire

- Configuration Docker
- Déploiement sur serveur privé
- Sauvegarde automatique de la base SQLite
- Variables d'environnement de production
