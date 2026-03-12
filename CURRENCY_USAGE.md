# 💰 Utilisation de la devise dynamique

## 🎯 Système mis en place

La devise est maintenant **dynamique** et **configurable** depuis l'admin.

- **Par défaut :** FCFA
- **Position :** Après le montant (configurable)
- **Chargement :** Automatique au démarrage de l'app

## 📝 Comment utiliser

### Méthode 1 : Hook usePrice (Recommandé)

```tsx
import { usePrice } from '@/hooks/usePrice';

function MyComponent() {
  const { formatPrice } = usePrice();
  
  return (
    <div>
      <p>Prix: {formatPrice(25000000)}</p>
      {/* Affiche: Prix: 25 000 000 FCFA */}
    </div>
  );
}
```

### Méthode 2 : Hook useConfig (Avancé)

```tsx
import { useConfig } from '@/contexts/ConfigContext';

function MyComponent() {
  const { config, formatPrice } = useConfig();
  
  return (
    <div>
      <p>Prix: {formatPrice(25000000)}</p>
      <p>Devise: {config.currency_symbol}</p>
      <p>Position: {config.currency_position}</p>
    </div>
  );
}
```

## 🔧 Configuration

### Dans l'admin

1. Aller sur `/admin/dashboard/config`
2. Modifier :
   - **Symbole** : FCFA, €, $, etc.
   - **Nom** : Franc CFA, Euro, Dollar, etc.
   - **Position** : Avant ou Après le montant

### Exemples de configuration

**FCFA (défaut) :**
```
Symbole: FCFA
Position: after
Résultat: 25 000 000 FCFA
```

**Euro :**
```
Symbole: €
Position: after
Résultat: 25 000 €
```

**Dollar :**
```
Symbole: $
Position: before
Résultat: $ 25,000
```

## 📦 Fichiers créés

- `frontend/src/contexts/ConfigContext.tsx` - Context React
- `frontend/src/hooks/usePrice.ts` - Hook simple
- `frontend/src/app/layout.tsx` - Provider ajouté

## ✅ Avantages

- ✅ Devise configurable depuis l'admin
- ✅ Changement en temps réel
- ✅ Fallback sur FCFA si erreur
- ✅ Formatage automatique des nombres
- ✅ Position configurable (avant/après)

## 🚀 Migration des composants

Pour migrer un composant existant :

**Avant :**
```tsx
<p>{vehicle.price.toLocaleString('fr-FR')} FCFA</p>
```

**Après :**
```tsx
import { usePrice } from '@/hooks/usePrice';

function Component() {
  const { formatPrice } = usePrice();
  
  return <p>{formatPrice(vehicle.price)}</p>;
}
```

## 📋 Composants à migrer

- [ ] HeroSection.tsx
- [ ] RecentListings.tsx
- [ ] FeaturedVehicules.tsx
- [ ] BrandsGrid.tsx
- [ ] VehicleCard.tsx
- [ ] ProductsInteractive.tsx
- [ ] Admin pages (vehicles, quotes, etc.)

## 💡 Note

Le système charge la config au démarrage de l'app. Si la config change, il faut rafraîchir la page pour voir les changements.
