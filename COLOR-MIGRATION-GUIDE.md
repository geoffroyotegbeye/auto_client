# 🎨 Guide de migration des couleurs - Composants

## Composants mis à jour

### ✅ Composants terminés

1. **Header.tsx** - Navigation principale
2. **Footer.tsx** - Pied de page
3. **Toast.tsx** - Notifications
4. **ConfirmModal.tsx** - Modales de confirmation
5. **HeroSection.tsx** - Section hero page d'accueil

### 🔄 Règles de remplacement

#### Anciennes couleurs → Nouvelles couleurs

| Ancienne | Nouvelle (Light) | Nouvelle (Dark) |
|----------|------------------|-----------------|
| `#0D0D0D` | `bg-white` | `bg-vm-dark` |
| `#141414` | `bg-gray-50` | `bg-vm-dark-card` |
| `#1A1A1A` | `bg-white` | `bg-vm-dark-card` |
| `#222222` | `bg-gray-100` | `bg-vm-dark-lighter` |
| `#F5F0E8` | `text-gray-900` | `text-white` |
| `#A09A8E` | `text-gray-600` | `text-gray-400` |
| `#5A5550` | `text-gray-500` | `text-gray-500` |
| `#E8A020` | `text-vm-red` | `text-vm-red` |
| `#F0B840` | `text-vm-red-light` | `text-vm-red-light` |

#### Classes Tailwind à remplacer

```jsx
// Fonds
"bg-[#0D0D0D]" → "bg-white dark:bg-vm-dark"
"bg-[#141414]" → "bg-gray-50 dark:bg-vm-dark-card"
"bg-[#1A1A1A]" → "bg-white dark:bg-vm-dark-card"

// Textes
"text-[#F5F0E8]" → "text-gray-900 dark:text-white"
"text-[#A09A8E]" → "text-gray-600 dark:text-gray-400"
"text-[#5A5550]" → "text-gray-500 dark:text-gray-500"

// Accent
"text-[#E8A020]" → "text-vm-red"
"bg-[#E8A020]" → "bg-vm-red"
"hover:bg-[#F0B840]" → "hover:bg-vm-red-light"

// Bordures
"border-[rgba(245,240,232,0.08)]" → "border-gray-200 dark:border-white/10"
"border-[rgba(245,240,232,0.2)]" → "border-gray-300 dark:border-white/20"
```

## Composants à mettre à jour

### 📋 Composants app/components/

- [ ] BrandsGrid.tsx
- [ ] BrandsMarquee.tsx
- [ ] ChineseCars3D.tsx
- [ ] FeaturedVehicules.tsx
- [ ] RecentListings.tsx
- [ ] StatsSection.tsx

### 📋 Composants products/

- [ ] FilterSidebar.tsx
- [ ] ProductsInteractive.tsx
- [ ] VehicleCard.tsx

### 📋 Pages admin/

- [ ] admin/dashboard/layout.tsx
- [ ] admin/dashboard/page.tsx
- [ ] admin/dashboard/vehicles/page.tsx
- [ ] admin/dashboard/brands/page.tsx
- [ ] admin/dashboard/hero/page.tsx
- [ ] admin/dashboard/config/page.tsx
- [ ] admin/dashboard/appointments/page.tsx
- [ ] admin/dashboard/quotes/page.tsx
- [ ] admin/dashboard/contacts/page.tsx
- [ ] admin/dashboard/reviews/page.tsx
- [ ] admin/dashboard/services/page.tsx
- [ ] admin/login/page.tsx

### 📋 Autres pages

- [ ] contact/page.tsx
- [ ] brands/page.tsx
- [ ] layout.tsx (root)
- [ ] page.tsx (home)

## Pattern de mise à jour

### 1. Fonds et conteneurs

```jsx
// Avant
className="bg-[#0D0D0D]"

// Après
className="bg-white dark:bg-vm-dark"
```

### 2. Cartes et panels

```jsx
// Avant
className="bg-[#1A1A1A] border border-[rgba(245,240,232,0.08)]"

// Après
className="bg-white dark:bg-vm-dark-card border border-gray-200 dark:border-white/10"
```

### 3. Textes

```jsx
// Avant
className="text-[#F5F0E8]"

// Après
className="text-gray-900 dark:text-white"
```

### 4. Textes secondaires

```jsx
// Avant
className="text-[#A09A8E]"

// Après
className="text-gray-600 dark:text-gray-400"
```

### 5. Accent (rouge)

```jsx
// Avant
className="text-[#E8A020] hover:text-[#F0B840]"

// Après
className="text-vm-red hover:text-vm-red-light"
```

### 6. Boutons

```jsx
// Avant
className="bg-[#E8A020] hover:bg-[#F0B840] text-[#0D0D0D]"

// Après
className="bg-vm-red hover:bg-vm-red-light text-white"
```

### 7. Inputs

```jsx
// Avant
className="bg-[#222222] border-[rgba(245,240,232,0.08)] text-[#F5F0E8]"

// Après
className="bg-gray-50 dark:bg-vm-dark-lighter border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
```

## Checklist par composant

Pour chaque composant :

1. [ ] Remplacer les couleurs de fond
2. [ ] Remplacer les couleurs de texte
3. [ ] Remplacer les couleurs d'accent
4. [ ] Remplacer les bordures
5. [ ] Ajouter les classes dark: pour le mode sombre
6. [ ] Tester en mode clair
7. [ ] Tester en mode sombre
8. [ ] Vérifier les états hover/focus/active

## Notes importantes

- **Toujours** ajouter `dark:` pour le mode sombre
- **Blanc pur** `#ffffff` pour le light mode
- **Sombre doux** `#1a1a1f` pour le dark mode
- **Rouge** `#f82200` identique dans les deux modes
- **Contraste** : Vérifier que les textes sont lisibles dans les deux modes

---

**Progression**: 5/40 composants mis à jour (12.5%)
**Dernière mise à jour**: 11 Mars 2026
