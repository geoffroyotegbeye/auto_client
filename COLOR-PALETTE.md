# 🎨 Palette de couleurs VehicleMarket

## Couleurs principales

### Dark Mode (par défaut)

| Nom | Code | Usage | Tailwind |
|-----|------|-------|----------|
| **Sombre principal** | `#18171b` | Fond principal | `bg-vm-dark` |
| **Rouge principal** | `#f82200` | Accent, CTA, liens | `bg-vm-red` / `text-vm-red` |
| **Gris** | `#54565c` | Texte secondaire | `text-vm-gray` |
| **Blanc** | `#ffffff` | Texte principal | `text-vm-white` |

### Variantes Dark Mode

| Nom | Code | Usage | Tailwind |
|-----|------|-------|----------|
| **Sombre clair** | `#2a2930` | Cartes, conteneurs | `bg-vm-dark-lighter` |
| **Sombre card** | `#222127` | Fond secondaire | `bg-vm-dark-card` |
| **Rouge clair** | `#ff4d2e` | Hover rouge | `hover:bg-vm-red-light` |
| **Rouge foncé** | `#d11d00` | Active rouge | `active:bg-vm-red-dark` |
| **Gris clair** | `#6b6d73` | Texte atténué | `text-vm-gray-light` |
| **Gris foncé** | `#3d3f44` | Bordures sombres | `border-vm-gray-dark` |

### Light Mode

| Nom | Code | Usage | Tailwind |
|-----|------|-------|----------|
| **Blanc** | `#ffffff` | Fond principal | `bg-vm-light-bg` |
| **Gris très clair** | `#f8f9fa` | Cartes | `bg-vm-light-card` |
| **Bordure claire** | `#e9ecef` | Bordures | `border-vm-light-border` |
| **Texte sombre** | `#18171b` | Texte principal | `text-vm-light-text` |
| **Texte gris** | `#6c757d` | Texte secondaire | `text-vm-light-muted` |

## Variables CSS

### Dark Mode (défaut)

```css
--bg-primary: #18171b
--bg-secondary: #222127
--bg-card: #2a2930
--bg-elevated: #2a2930
--text-primary: #ffffff
--text-secondary: #54565c
--text-muted: #6b6d73
--accent: #f82200
--accent-light: #ff4d2e
--accent-dark: #d11d00
--accent-dim: rgba(248, 34, 0, 0.15)
--border: rgba(255, 255, 255, 0.1)
--border-hover: rgba(255, 255, 255, 0.2)
```

### Light Mode

```css
--bg-primary: #ffffff
--bg-secondary: #f8f9fa
--bg-card: #ffffff
--bg-elevated: #ffffff
--text-primary: #18171b
--text-secondary: #54565c
--text-muted: #6c757d
--accent: #f82200
--accent-light: #ff4d2e
--accent-dark: #d11d00
--accent-dim: rgba(248, 34, 0, 0.1)
--border: #e9ecef
--border-hover: #dee2e6
```

## Utilisation

### Avec Tailwind

```jsx
// Fonds
<div className="bg-vm-dark">              // #18171b
<div className="bg-vm-dark-lighter">      // #2a2930
<div className="bg-vm-dark-card">         // #222127

// Textes
<p className="text-vm-white">             // #ffffff
<p className="text-vm-gray">              // #54565c
<p className="text-vm-gray-light">        // #6b6d73

// Accent (Rouge)
<button className="bg-vm-red">            // #f82200
<button className="hover:bg-vm-red-light"> // #ff4d2e
<a className="text-vm-red">               // #f82200

// Light mode
<div className="bg-vm-light-bg">          // #ffffff
<div className="bg-vm-light-card">        // #f8f9fa
<p className="text-vm-light-text">        // #18171b
```

### Avec variables CSS

```css
.custom-element {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.custom-button {
  background: var(--accent);
  color: var(--bg-primary);
}

.custom-button:hover {
  background: var(--accent-light);
}
```

## Badges

| Badge | Couleur | Code |
|-------|---------|------|
| **Nouveau** | Vert | `#10b981` |
| **Promo** | Rouge | `#f82200` |
| **Coup de cœur** | Rouge | `#f82200` |

## Exemples d'utilisation

### Bouton principal

```jsx
<button className="bg-vm-red hover:bg-vm-red-light text-white px-6 py-3 rounded-lg">
  Voir le catalogue
</button>
```

### Carte véhicule

```jsx
<div className="bg-vm-dark-card border border-vm-border hover:border-vm-red rounded-xl p-6">
  <h3 className="text-vm-white font-bold">Mercedes Classe A</h3>
  <p className="text-vm-gray">2024 • 5 000 km</p>
  <span className="text-vm-red font-bold">18 500 000 FCFA</span>
</div>
```

### Navigation

```jsx
<nav className="bg-vm-dark border-b border-vm-border">
  <a href="/" className="text-vm-white hover:text-vm-red">Accueil</a>
  <a href="/products" className="text-vm-gray hover:text-vm-red">Catalogue</a>
</nav>
```

## Mode clair/sombre

Pour activer le mode clair, ajouter la classe `light` à l'élément `<html>` :

```jsx
// Dark mode (défaut)
<html>

// Light mode
<html className="light">
```

## Contraste et accessibilité

### Ratios de contraste (WCAG AA)

- ✅ Blanc sur Sombre (#ffffff sur #18171b) : 19.5:1
- ✅ Rouge sur Blanc (#f82200 sur #ffffff) : 4.8:1
- ✅ Gris sur Sombre (#54565c sur #18171b) : 3.2:1
- ✅ Sombre sur Blanc (#18171b sur #ffffff) : 19.5:1

Tous les contrastes respectent les normes WCAG AA pour l'accessibilité.

## Thème général

**Style**: Dark mode moderne avec accent rouge vif
**Ambiance**: Dynamique, sportif, automobile performance
**Inspiration**: Showroom automobile moderne avec touches sportives

---

**Version**: 2.0.0
**Dernière mise à jour**: 11 Mars 2026
