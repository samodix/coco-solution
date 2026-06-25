# LOT 1 — Design System & Layout Interne

## Objectif

Créer le design système de base et le layout interne de l'application DOFUS BUSINESS — Account Manager.

## Design System

### Palette de couleurs

#### Dark Mode (gaming/business)

| Rôle | Couleur | Code |
|---|---|---|
| Background principal | Noir profond | `#080A12` |
| Background secondaire | Bleu nuit | `#0F172A` |
| Cards | Gris foncé | `#111827` |
| Border | Gris bordure | `#1F2937` |
| Texte principal | Blanc cassé | `#F9FAFB` |
| Texte secondaire | Gris moyen | `#9CA3AF` |
| Primary violet | Violet | `#7C3AED` |
| Accent vert | Vert | `#22C55E` |
| Warning | Ambre | `#F59E0B` |
| Danger | Rouge | `#EF4444` |

#### Light Mode (professionnel)

| Rôle | Couleur | Code |
|---|---|---|
| Background principal | Gris très clair | `#F8FAFC` |
| Cards | Blanc | `#FFFFFF` |
| Border | Gris clair | `#E2E8F0` |
| Texte principal | Bleu nuit | `#0F172A` |
| Texte secondaire | Gris moyen | `#64748B` |
| Primary violet | Violet | `#7C3AED` |
| Accent vert | Vert | `#22C55E` |
| Warning | Ambre | `#F59E0B` |
| Danger | Rouge | `#EF4444` |

### Typographie

- **Font principal** : Geist Sans
- **Font mono** : Geist Mono

### Style

- Interface **dark/light/system** avec toggle dans le header
- Sidebar à gauche (desktop)
- Header en haut avec bouton thème (cycle Sun → Moon → Monitor)
- Cards avec bordures subtiles
- Hover states avec accent violet
- Responsive desktop + mobile

## Architecture du Layout

```
┌─────────────────────────────────────────┐
│  Sidebar (fixe, 256px)  │   Header      │
│  ─────────────────────  │   ──────────  │
│  Logo                   │   Titre page  │
│  Navigation             │   Actions     │
│    - Dashboard          │               │
│    - Comptes            ├───────────────┤
│    - Personnages        │               │
│    - Teams              │   Contenu     │
│  ─────────────────────  │   principal   │
│    - Abonnements        │               │
│    - Objectifs          │               │
│    - Paramètres         │               │
│  ─────────────────────  │               │
│  Profil admin           │               │
└─────────────────────────────────────────┘
```

## Composants créés

### Layout

| Composant | Fichier | Description |
|---|---|---|
| AppShell | `src/components/layout/app-shell.tsx` | Shell principal (sidebar + header + content) |
| Sidebar | `src/components/layout/sidebar.tsx` | Sidebar desktop fixe |
| Header | `src/components/layout/header.tsx` | Header sticky avec titre de page et bouton thème |
| MobileNav | `src/components/layout/mobile-nav.tsx` | Navigation mobile (Sheet) |
| NavItem | `src/components/layout/nav-item.tsx` | Lien de navigation actif/inactif |

### Dashboard

| Composant | Fichier | Description |
|---|---|---|
| StatCard | `src/components/dashboard/stat-card.tsx` | Carte de statistique |
| RecentActivity | `src/components/dashboard/recent-activity.tsx` | Section activité récente |
| ModuleCard | `src/components/dashboard/module-card.tsx` | Carte de module cliquable |

### Communs

| Composant | Fichier | Description |
|---|---|---|
| PageHeader | `src/components/common/page-header.tsx` | En-tête de page (titre + description + actions) |
| StatusBadge | `src/components/common/status-badge.tsx` | Badge de statut coloré |
| EmptyState | `src/components/common/empty-state.tsx` | État vide avec icône |

### Thème

| Composant | Fichier | Description |
|---|---|---|
| ThemeProvider | `src/components/theme/theme-provider.tsx` | Provider next-themes (attribute="class", system) |
| ThemeToggle | `src/components/theme/theme-toggle.tsx` | Bouton cycle light/dark/system avec icônes lucide |

## Composants shadcn/ui installés

| Composant | Statut |
|---|---|
| button | ✅ (LOT 0) |
| card | ✅ |
| badge | ✅ |
| separator | ✅ |
| sheet | ✅ |
| table | ✅ |
| dropdown-menu | ✅ |
| avatar | ✅ |

## Routes créées

| Route | Page | Statut |
|---|---|---|
| `/` | Redirige vers `/dashboard` | ✅ |
| `/dashboard` | Dashboard principal mocké | ✅ |
| `/accounts` | Placeholder "Comptes Dofus" | ✅ |
| `/characters` | Placeholder "Personnages" | ✅ |
| `/teams` | Placeholder "Teams" | ✅ |
| `/subscriptions` | Placeholder "Abonnements" | ✅ |
| `/goals` | Placeholder "Objectifs" | ✅ |
| `/settings` | Placeholder "Paramètres" | ✅ |

## Contenu mocké Dashboard

- 6 cartes de statistiques (toutes à 0)
- 6 cartes de modules avec liens
- Section activité récente avec EmptyState

## Décisions techniques

1. **Système de thème** : `next-themes` avec `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`. Bouton de cycle dans le header (Sun → Moon → Monitor).
2. **Layout côté client** : Le composant AppShell est `"use client"` pour gérer la navigation mobile
3. **Redirection `/`** : Utilisation de `redirect()` côté serveur pour rediriger vers `/dashboard`
4. **Navigation mobile** : Overlay React natif avec `useState` (pas de Sheet base-ui qui cause des erreurs d'hydration)
5. **Pas de Prisma dans ce lot** : Toutes les données sont mockées
6. **Pas d'auth dans ce lot** : Le profil admin est un placeholder statique
7. **Base-ui évité** : Les composants `@base-ui/react` (Sheet/Dialog, Separator, Button) causent des erreurs d'hydration avec React 19 + Next.js 16. Utiliser des composants HTML natifs ou des wrapper custom.

## Prochaine étape

LOT 2 — Prisma schema + modèles métier
